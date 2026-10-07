import { describe, expect, it } from 'vitest';

import { adaptUniversalAgentPayload } from './adapter';

describe('adaptUniversalAgentPayload', () => {
	it('normalizes a backend run event without exposing its envelope to UI', () => {
		const updates = adaptUniversalAgentPayload({
			type: 'agent_run_event',
			payload: {
				messageId: 'assistant-1',
				threadId: 'thread-1',
				runId: 'run-1',
				event: {
					eventId: 'event-1',
					eventType: 'toolCall',
					toolName: 'get_company_profile',
					callId: 'call-1',
					source: 'Данные компании',
					args: { companyId: 'company-1' },
				},
			},
		});

		expect(updates).toHaveLength(1);
		expect(updates[0]).toMatchObject({
			kind: 'runEvent',
			assistantMessageId: 'assistant-1',
			event: {
				id: 'event-1',
				kind: 'toolCall',
				runId: 'run-1',
				tool: 'get_company_profile',
			},
			threadId: 'thread-1',
		});
	});

	it('restores a persisted trace carried by a history message', () => {
		const updates = adaptUniversalAgentPayload({
			id: 'assistant-1',
			requestId: 'request-1',
			role: 'bot',
			text: 'Ответ',
			extras: {
				agentRun: JSON.stringify({
					runId: 'run-1',
					requestId: 'request-1',
					startedAt: 1000,
					status: 'done',
					finishedAt: 2000,
					events: [],
				}),
			},
		});

		expect(updates[0]).toMatchObject({
			kind: 'message',
			persistedRun: { runId: 'run-1', requestId: 'request-1', status: 'done' },
		});
	});

	it('keeps the thread id on a final message for reactions and routing', () => {
		const updates = adaptUniversalAgentPayload({
			type: 'chat.message',
			payload: {
				threadId: 'thread-1',
				message: { id: 'assistant-1', role: 'bot', text: 'Ответ' },
			},
		});
		expect(updates[0]).toMatchObject({
			kind: 'message',
			threadId: 'thread-1',
			message: { extras: { threadId: 'thread-1' } },
		});
	});

	it('ignores malformed transport data', () => {
		expect(adaptUniversalAgentPayload({ type: 'agent_run_event', payload: {} })).toEqual([]);
		expect(adaptUniversalAgentPayload('not-an-object')).toEqual([]);
	});
});
