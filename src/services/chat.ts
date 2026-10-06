import { v4 as uuidv4 } from 'uuid';

import { getCookie } from '@/helpers/cookie';
import { Config } from '@/config';
import { adaptUniversalAgentPayload } from '@/services/universalAgent/adapter';
import type { UniversalAgentInboundUpdate } from '@/services/universalAgent/types';
import {
	addMessageAction,
	canLoadHistoryAtom,
	clearContextChatAction,
	isLoadingAtom,
	resetAction,
	messagesAtom,
} from '@/stores';
import {
	agentRunsAtom,
	appendAgentEventAction,
	clearAgentRunsAction,
	startAgentRunAction,
	upsertAgentRunAction,
} from '@/stores/agentRuns';
import { activeThreadIdAtom } from '@/stores/threads';
import {
	ERoles,
	type IAddActionOptions,
	type IMessage,
	type TReaction,
} from '@/types';
import { Client, type Message, type StompConfig } from '@stomp/stompjs';

import { ChatStore } from './store';
import type { IChatClass, ISendActionProps } from './types';

export class Chat extends ChatStore {
	private stompClient?: Client;
	private brokerURL: string;
	private host: string;
	private userId: string;
	private tenantId: string;
	private contextDestination = '/app/context';
	private destination = '/app/chat';
	private reactionDestination = '/app/reaction';
	private historyDestination = '/app/history';
	private gettingHistory = false;
	private waitingMessages: IMessage[] = [];
	private LOAD_LIMIT = 10;

	constructor({ brokerURL, host, loadLimit, tenantId, userId }: IChatClass) {
		super();
		this.userId = userId;
		this.tenantId = tenantId;
		this.brokerURL = brokerURL;
		this.LOAD_LIMIT = loadLimit;
		this.host = host;
		this.init();
	}

	private get defaultHeaders() {
		return {
			'X-Sber-Auth-Session': getCookie('X-Sber-Auth-Session') as string,
			...(this.tenantId ? { tenantId: this.tenantId } : {}),
		};
	}

	private subscribeOnMessages() {
		this.stompClient?.subscribe(this.subscriptionPath, (data: Message) => {
			try {
				const payload: unknown = JSON.parse(data.body);
				const updates = adaptUniversalAgentPayload(payload);

				for (const update of updates) {
					this.applyInboundUpdate(update);
				}
			} catch {
				console.error('Error while parse server message:', data.body);
			}
		});
	}

	private findPendingAssistant(requestId?: string) {
		if (!requestId) {
			return undefined;
		}

		return this.store
			.get(messagesAtom)
			.find(
				(message) =>
					message.role === ERoles.bot &&
					message.requestId === requestId &&
					message.extras?.agentPending === 'true',
			);
	}

	private resolveAssistantMessageId(
		assistantMessageId: string,
		requestId?: string,
		runId?: string,
	) {
		const pending = this.findPendingAssistant(requestId);
		if (pending?.id) {
			return pending.id;
		}

		if (runId) {
			const existing = Object.entries(this.store.get(agentRunsAtom)).find(
				([, run]) => run.runId === runId,
			);
			if (existing) {
				return existing[0];
			}
		}

		return assistantMessageId;
	}

	private ensurePendingAssistant(
		assistantMessageId: string,
		requestId: string,
		startedAt: number,
	) {
		const existing = this.store
			.get(messagesAtom)
			.find((message) => message.id === assistantMessageId);

		if (!existing) {
			this.pushIntoMessages({
				id: assistantMessageId,
				requestId,
				role: ERoles.bot,
				text: '',
				timeCreated: new Date(startedAt + 1).toISOString(),
				extras: { agentPending: 'true' },
			});
		}
	}

	private applyInboundUpdate(update: UniversalAgentInboundUpdate) {
		if (update.kind === 'message') {
			if (update.message.extras?.lastMessage) {
				canLoadHistoryAtom(this.store, false);
			}

			const pending = this.findPendingAssistant(update.message.requestId);
			const message = pending?.id
				? {
						...update.message,
						id: pending.id,
						extras: {
							...pending.extras,
							...update.message.extras,
							agentPending: 'false',
							backendMessageId: update.message.id ?? null,
						},
					}
				: update.message;
			const options: IAddActionOptions | undefined = this.gettingHistory
				? { insertToTop: true, silent: true }
				: undefined;

			this.pushIntoMessages(message, options);
			if (pending?.id) {
				const run = this.store.get(agentRunsAtom)[pending.id];
				if (run?.status === 'running') {
					appendAgentEventAction(this.store, {
						assistantMessageId: pending.id,
						event: {
							id: `message-finish-${update.message.id ?? Date.now()}`,
							runId: run.runId,
							at: Date.now(),
							kind: 'finish',
						},
					});
				}
			}

			if (update.persistedRun && message.id) {
				upsertAgentRunAction(this.store, {
					assistantMessageId: message.id,
					run: update.persistedRun,
				});
			}
			return;
		}

		if (update.kind === 'runStarted') {
			const assistantMessageId = this.resolveAssistantMessageId(
				update.assistantMessageId,
				update.requestId,
				update.runId,
			);
			this.ensurePendingAssistant(
				assistantMessageId,
				update.requestId,
				update.startedAt,
			);
			startAgentRunAction(this.store, { ...update, assistantMessageId });
			return;
		}

		if (update.kind === 'runEvent') {
			const assistantMessageId = this.resolveAssistantMessageId(
				update.assistantMessageId,
				undefined,
				update.event.runId,
			);
			appendAgentEventAction(this.store, {
				assistantMessageId,
				event: update.event,
			});
			if (update.event.kind === 'finish' || (update.event.kind === 'error' && update.event.fatal)) {
				isLoadingAtom(this.store, false);
			}
			return;
		}

		if (update.kind === 'runSnapshot') {
			const assistantMessageId = this.resolveAssistantMessageId(
				update.assistantMessageId,
				update.run.requestId,
				update.run.runId,
			);
			upsertAgentRunAction(this.store, { assistantMessageId, run: update.run });
			return;
		}

		const assistantMessageId = this.resolveAssistantMessageId(
			update.assistantMessageId,
			update.requestId,
		);
		const existing = this.store
			.get(messagesAtom)
			.find((message) => message.id === assistantMessageId);
		const text = update.append ? `${existing?.text ?? ''}${update.text}` : update.text;
		this.pushIntoMessages({
			...existing,
			id: assistantMessageId,
			requestId: update.requestId ?? existing?.requestId,
			role: ERoles.bot,
			text,
			timeCreated: existing?.timeCreated ?? new Date().toISOString(),
			extras: { ...existing?.extras, agentPending: 'true' },
		});
	}

	private pushIntoMessages(message: IMessage, options?: IAddActionOptions) {
		addMessageAction(this.store, message, options);
	}

	public unsubscribe() {
		this.stompClient?.unsubscribe(this.subscriptionPath);
	}

	private get subscriptionPath() {
		const path = ['', 'user', this.userId];

		if (this.tenantId) {
			path.push('tenant', this.tenantId);
		}
		path.push('chat');

		return path.join('/');
	}

	private init() {
		const url =
			this.brokerURL.startsWith('ws') || this.brokerURL.startsWith('wss')
				? this.brokerURL
				: this.host + this.brokerURL;
		this.stompClient = new Client({
			brokerURL: url,
			connectionTimeout: 30_000,
			heartbeatIncoming: 5000,
			heartbeatOutgoing: 5000,
			onConnect: () => {
				this.subscribeOnMessages();
				this.sendWaitingMessages();
				this.loadHistory();
			},
			reconnectDelay: 1000,
		} as StompConfig);
		this.stompClient.activate();
	}

	public isConnected = () => this.stompClient?.connected;

	public sendSystem = (parameters: ISendActionProps) => {
		this.send({ ...parameters, role: ERoles.user });
	};

	public send = ({
		body,
		extras = {},
		headers = {},
		role,
	}: ISendActionProps) => {
		const activeThreadId = Config.threadsEnabled
			? this.store.get(activeThreadIdAtom)
			: undefined;
		const requestId = uuidv4();
		const startedAt = Date.now();
		const localAgentRun = Config.universalAgentEnabled && (role ?? ERoles.user) === ERoles.user
			? { assistantMessageId: uuidv4(), runId: uuidv4() }
			: undefined;
		const message = {
			extras: {
				...extras,
				...(activeThreadId ? { threadId: activeThreadId } : {}),
				...(localAgentRun
					? {
							assistantMessageId: localAgentRun.assistantMessageId,
							agentRunId: localAgentRun.runId,
						}
					: {}),
			},
			id: requestId,
			requestId: undefined,
			role: role || ERoles.user,
			text: body,
			timeCreated: new Date(startedAt).toISOString(),
			userId: this.userId,
		};

		this.pushIntoMessages(message as IMessage);

		if (localAgentRun) {
			this.ensurePendingAssistant(
				localAgentRun.assistantMessageId,
				message.id,
				startedAt,
			);
			startAgentRunAction(this.store, {
				assistantMessageId: localAgentRun.assistantMessageId,
				requestId: message.id,
				runId: localAgentRun.runId,
				startedAt,
			});
		}

		if (!this.stompClient?.connected) {
			this.waitingMessages.push(message);

			return;
		}

		this.gettingHistory = false;

		isLoadingAtom(this.store, true);

		this.stompClient.publish({
			body: JSON.stringify({
				extras: message.extras,
				id: message.id,
				role: role || ERoles.user,
				text: body,
				timeCreated: message.timeCreated,
				userId: this.userId,
			}),
			destination: this.destination,
			headers: {
				...this.defaultHeaders,
				...headers,
			},
		});
	};

	private sendWaitingMessages() {
		if (this.stompClient?.connected) {
			for (const message of this.waitingMessages) {
				this.stompClient.publish({
					body: JSON.stringify({
						extras: message.extras,
						id: message.id,
						role: ERoles.user,
						text: message.text,
						timeCreated: message.timeCreated,
						userId: this.userId,
					}),
					destination: this.destination,
					headers: {
						...this.defaultHeaders,
					},
				});
			}

			this.waitingMessages = [];
		}
	}

	public reactOnMessage = (data: IMessage, reaction?: TReaction) => {
		if (!this.stompClient?.connected) {
			return;
		}

		this.gettingHistory = false;
		const messageReaction = reaction === data.reaction ? undefined : reaction;

		const message = {
			...data,
			reaction: messageReaction,
		};

		this.pushIntoMessages(message);

		this.stompClient.publish({
			body: JSON.stringify(message),
			destination: this.reactionDestination,
			headers: this.defaultHeaders,
		});
	};

	public loadHistory = (messageId?: string) => {
		if (!this.stompClient?.connected || !this.store.get(canLoadHistoryAtom)) {
			return;
		}

		this.gettingHistory = true;

		const message = {
			extras: {
				loadLast: this.LOAD_LIMIT,
			},
			id: messageId,
			role: ERoles.system,
			timeCreated: new Date().toISOString(),
			userId: this.userId,
		};

		this.stompClient.publish({
			body: JSON.stringify(message),
			destination: this.historyDestination,
			headers: this.defaultHeaders,
		});
	};

	public clearContext = () => {
		if (!this.stompClient?.connected) {
			return;
		}

		clearContextChatAction(this.store);
		this.stompClient.publish({
			body: JSON.stringify({
				userId: this.userId,
			}),
			destination: this.contextDestination,
			headers: this.defaultHeaders,
		});
	};

	public isMessageSending = (id: string) =>
		this.waitingMessages.some((message) => message.id === id);

	public disconnect = () => {
		if (this.stompClient?.connected) {
			this.stompClient.deactivate();
		}
	};

	public reconnect = (tenantId: string) => {
		if (this.tenantId !== tenantId) {
			this.tenantId = tenantId;
			resetAction(this.store);
			clearAgentRunsAction(this.store);

			this.reinitialize();
		}
	};

	public reinitialize = () => {
		this.disconnect();
		this.init();
	};
}
