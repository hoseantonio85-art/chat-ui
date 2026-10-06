import { v4 as uuidv4 } from 'uuid';

import { getCookie } from '@/helpers/cookie';
import {
	addMessageAction,
	canLoadHistoryAtom,
	clearContextChatAction,
	isLoadingAtom,
	resetAction,
} from '@/stores';
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
				const message = JSON.parse(data.body);

				if (message.extras?.lastMessage) {
					canLoadHistoryAtom(this.store, false);
				}

				let options: IAddActionOptions = {};

				if (this.gettingHistory) {
					options = { insertToTop: true, silent: true };
				}
				this.pushIntoMessages(message, options ?? undefined);
			} catch {
				console.error('Error while parse server message:', data.body);
			}
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
		const message = {
			extras: {
				...extras,
			},
			id: uuidv4(),
			requestId: undefined,
			role: role || ERoles.user,
			text: body,
			timeCreated: new Date().toISOString(),
			userId: this.userId,
		};

		this.pushIntoMessages(message as IMessage);

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

			this.reinitialize();
		}
	};

	public reinitialize = () => {
		this.disconnect();
		this.init();
	};
}
