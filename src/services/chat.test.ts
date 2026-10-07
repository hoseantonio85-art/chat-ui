import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { navigateToUrl } from 'single-spa';
import type { IMessage as StompMessage, StompConfig } from '@stomp/stompjs';
import { Config } from '@/config';
import { addMessageAction, canLoadHistoryAtom, isLoadingAtom, messagesAtom, resetAction, sortMessagesAtom } from '@/stores';
import { ctx } from '@/stores/ctx';
import { agentRunsAtom, clearAgentRunsAction } from '@/stores/agentRuns';
import { activeThreadIdAtom, setThreadsAction, threadsAtom, threadsScopeVersionAtom, threadsStatusAtom } from '@/stores/threads';
import { ERoles } from '@/types';
import { Chat } from './chat';

const transport = vi.hoisted(() => ({
	connected: true,
	config: undefined as StompConfig | undefined,
	receive: undefined as ((message: StompMessage) => void) | undefined,
	publish: vi.fn(), activate: vi.fn(), deactivate: vi.fn(async () => {}), unsubscribe: vi.fn(),
}));
vi.mock('@stomp/stompjs', () => ({
	Client: class {
		constructor(config: StompConfig) { transport.config = config; }
		get connected() { return transport.connected; }
		activate = transport.activate;
		deactivate = transport.deactivate;
		publish = transport.publish;
		subscribe(_destination: string, callback: (message: StompMessage) => void) {
			transport.receive = callback;
			return { id: 'subscription-1', unsubscribe: transport.unsubscribe };
		}
	},
}));
vi.mock('@/config', () => ({
	Config: { universalAgentEnabled: true, threadsEnabled: false },
	ALLOWED_EXTENSIONS: [], MAX_FILE_NAME_LENGTH: 200, MAX_FILE_SIZE: 1000,
}));
vi.mock('@/stores/ctx', async () => {
	const { createCtx } = await import('@reatom/framework');
	return { ctx: createCtx() };
});
vi.mock('@/helpers/cookie', () => ({ getCookie: () => 'session' }));
vi.mock('@sber-orm/components', () => ({ validatorsSchema: {} }));
vi.mock('@n-orm/auth-mf-app', () => ({ baseUrl$: {}, chat$: { closeChat: vi.fn() } }));
vi.mock('single-spa', () => ({ navigateToUrl: vi.fn() }));

function connect() {
	transport.config?.onConnect?.({ command: 'CONNECTED', headers: {}, body: '', isBinaryBody: false, binaryBody: new Uint8Array() });
}
function receive(payload: object) {
	if (!transport.receive) throw new Error('Subscription missing');
	transport.receive({ body: JSON.stringify(payload) } as StompMessage);
}

describe('Chat transport integration', () => {
	let chat: Chat;
	afterEach(() => vi.unstubAllGlobals());
	beforeEach(() => {
		vi.clearAllMocks();
		transport.connected = true;
		Config.threadsEnabled = false;
		Config.universalAgentEnabled = true;
		resetAction(ctx);
		clearAgentRunsAction(ctx);
		canLoadHistoryAtom(ctx, true);
		isLoadingAtom(ctx, false);
		activeThreadIdAtom(ctx, undefined);
		chat = new Chat({ brokerURL: '/ws', host: 'wss://norm.example', loadLimit: 10, tenantId: 'tenant', userId: 'user' });
		connect();
		transport.publish.mockClear();
	});

	it('streams into the pending turn, completes it and deduplicates final replay', () => {
		chat.send({ body: 'Question' });
		const [user, pending] = ctx.get(messagesAtom);
		receive({ type: 'agent.run.started', payload: { assistantMessageId: 'server-a', requestId: user.id, runId: 'server-run', startedAt: 1000 } });
		receive({ type: 'assistant.message.delta', payload: { assistantMessageId: 'server-a', runId: 'server-run', delta: 'Answer' } });
		expect(ctx.get(messagesAtom)[1].text).toBe('Answer');
		const final = { id: 'server-a', role: 'bot', requestId: user.id, text: 'Answer complete' };
		receive(final);
		receive(final);
		expect(ctx.get(messagesAtom)).toHaveLength(2);
		expect(ctx.get(messagesAtom)[1]).toMatchObject({ id: pending.id, text: 'Answer complete', extras: { agentPending: 'false', backendMessageId: 'server-a' } });
		expect(ctx.get(isLoadingAtom)).toBe(false);
		expect(Object.values(ctx.get(agentRunsAtom))[0].status).toBe('done');
	});

	it('does not replace the pending assistant with a user echo', () => {
		chat.send({ body: 'Question' });
		const [user, pending] = ctx.get(messagesAtom);
		receive({ ...user, requestId: user.id });
		expect(ctx.get(messagesAtom)[1]).toEqual(pending);
	});

	it('sends feedback using the server ID while preserving the UI ID', () => {
		const message = { id: 'local-a', role: ERoles.bot, extras: { backendMessageId: 'server-a' } };
		addMessageAction(ctx, message);
		chat.reactOnMessage(message, 'like');
		expect(JSON.parse(transport.publish.mock.calls[0][0].body)).toMatchObject({ id: 'server-a', reaction: 'like' });
		expect(ctx.get(messagesAtom)[0]).toMatchObject({ id: 'local-a', reaction: 'like' });
	});

	it.each([false, 'false'])('keeps pagination enabled for lastMessage=%s', (lastMessage) => {
		receive({ id: 'history', role: 'bot', extras: { lastMessage } });
		expect(ctx.get(canLoadHistoryAtom)).toBe(true);
	});
	it.each([true, 'true'])('ends pagination for lastMessage=%s', (lastMessage) => {
		receive({ id: 'history', role: 'bot', extras: { lastMessage } });
		expect(ctx.get(canLoadHistoryAtom)).toBe(false);
	});
	it('ignores events from another thread', () => {
		Config.threadsEnabled = true;
		activeThreadIdAtom(ctx, 'active');
		receive({ id: 'other', role: 'bot', extras: { threadId: 'other' } });
		expect(ctx.get(messagesAtom)).toHaveLength(0);
	});
	it('ignores agent events when the feature is disabled', () => {
		Config.universalAgentEnabled = false;
		receive({ type: 'agent.run.started', payload: { assistantMessageId: 'a', requestId: 'q', runId: 'r' } });
		expect(ctx.get(messagesAtom)).toHaveLength(0);
		expect(ctx.get(agentRunsAtom)).toEqual({});
	});
	it('keeps the original thread on queued messages after switching threads', () => {
		Config.threadsEnabled = true;
		activeThreadIdAtom(ctx, 'first');
		transport.connected = false;
		chat.send({ body: 'Offline question' });
		const user = ctx.get(messagesAtom)[0];
		expect(chat.isMessageSending(user.id!)).toBe(true);
		activeThreadIdAtom(ctx, 'second');
		transport.connected = true;
		connect();
		expect(JSON.parse(transport.publish.mock.calls[0][0].body)).toMatchObject({ id: user.id, extras: { threadId: 'first' } });
		expect(chat.isMessageSending(user.id!)).toBe(false);
	});
	it('deactivates an offline client to cancel scheduled reconnects', () => {
		transport.connected = false;
		chat.disconnect();
		expect(transport.deactivate).toHaveBeenCalledOnce();
	});
	it('unsubscribes using the subscription handle', () => {
		chat.unsubscribe();
		expect(transport.unsubscribe).toHaveBeenCalledOnce();
	});
	it('does not include server payloads in parse-error logs', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		transport.receive?.({ body: 'private malformed content' } as StompMessage);
		expect(spy).toHaveBeenCalledWith('Unable to process chat server message');
		spy.mockRestore();
	});
	it('executes a product action when final output replaces a pending turn, only once', () => {
		vi.stubGlobal('location', { pathname: '/company/profile' });
		chat.send({ body: 'Create incident' });
		chat.loadHistory(); // History may be requested on reconnect before the live final arrives.
		const user = ctx.get(messagesAtom)[0];
		const final = { id: 'server-a', role: 'bot', requestId: user.id, extras: { action: 'createIncident' } };
		receive(final);
		receive(final);
		expect(navigateToUrl).toHaveBeenCalledOnce();
		expect(navigateToUrl).toHaveBeenCalledWith(`/create?requestId=${user.id}&startModalUrl=%2Fcompany%2Fprofile`);
	});
	it('removes a stored message through its public action', () => {
		addMessageAction(ctx, { id: 'a', role: ERoles.bot });
		ctx.get(messagesAtom)[0].remove(ctx);
		expect(ctx.get(messagesAtom)).toEqual([]);
	});
	it('does not mutate prior message snapshots when sorting or appending', () => {
		addMessageAction(ctx, { id: 'later', timeCreated: '2026-01-02' });
		const prior = ctx.get(messagesAtom);
		addMessageAction(ctx, { id: 'earlier', timeCreated: '2026-01-01' });
		expect(prior).toHaveLength(1);
		expect(ctx.get(sortMessagesAtom).map(message => message.id)).toEqual(['earlier', 'later']);
		expect(ctx.get(messagesAtom).map(message => message.id)).toEqual(['later', 'earlier']);
	});
	it('keeps loading active during deltas and resets it when changing the conversation', () => {
		chat.send({ body: 'Question' });
		const [user, pending] = ctx.get(messagesAtom);
		receive({ type: 'assistant.message.delta', payload: { assistantMessageId: pending.id, requestId: user.id, delta: 'Part' } });
		expect(ctx.get(isLoadingAtom)).toBe(true);
		resetAction(ctx);
		expect(ctx.get(isLoadingAtom)).toBe(false);
	});
	it('does not publish feedback while offline', () => {
		transport.connected = false;
		chat.reactOnMessage({ id: 'a' }, 'like');
		expect(transport.publish).not.toHaveBeenCalled();
	});
	it('scopes history and context reset to the active thread', () => {
		Config.threadsEnabled = true;
		activeThreadIdAtom(ctx, 'active');
		chat.loadHistory('cursor');
		chat.clearContext();
		expect(JSON.parse(transport.publish.mock.calls[0][0].body)).toMatchObject({ id: 'cursor', extras: { threadId: 'active' } });
		expect(JSON.parse(transport.publish.mock.calls[1][0].body)).toMatchObject({ threadId: 'active' });
	});
	it('uses the server ID as pagination cursor for a completed streamed answer', () => {
		addMessageAction(ctx, { id: 'local-a', extras: { backendMessageId: 'server-a' } });
		chat.loadHistory('local-a');
		expect(JSON.parse(transport.publish.mock.calls[0][0].body).id).toBe('server-a');
	});
	it('discards the previous tenant queue, threads and late socket events', () => {
		Config.threadsEnabled = true;
		activeThreadIdAtom(ctx, 'old-thread');
		setThreadsAction(ctx, [{ id: 'old-thread', title: 'Old', updatedAt: 1, pinned: false }]);
		threadsStatusAtom(ctx, 'loading');
		const oldVersion = ctx.get(threadsScopeVersionAtom);
		const oldReceive = transport.receive;
		transport.connected = false;
		chat.send({ body: 'Private queued question' });
		const queuedId = ctx.get(messagesAtom)[0].id!;
		chat.reconnect('new-tenant');
		expect(chat.isMessageSending(queuedId)).toBe(false);
		expect(ctx.get(threadsAtom)).toEqual([]);
		expect(ctx.get(activeThreadIdAtom)).toBeUndefined();
		expect(ctx.get(threadsStatusAtom)).toBe('idle');
		expect(ctx.get(threadsScopeVersionAtom)).toBe(oldVersion + 1);
		// Even a quick switch back must not revive the original subscription.
		chat.reconnect('tenant');
		Config.threadsEnabled = false;
		oldReceive?.({ body: JSON.stringify({ id: 'late', role: 'bot', text: 'Old tenant data' }) } as StompMessage);
		expect(ctx.get(messagesAtom)).toEqual([]);
	});
});
