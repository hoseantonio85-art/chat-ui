import { createCtx } from '@reatom/framework';
import { describe, expect, it } from 'vitest';

import {
	agentRunsAtom,
	appendAgentEventAction,
	hasRunningAgentRunAtom,
	startAgentRunAction,
} from './agentRuns';

describe('agentRuns store', () => {
	it('owns a live run and completes it from streamed events', () => {
		const context = createCtx();
		startAgentRunAction(context, {
			assistantMessageId: 'assistant-1',
			requestId: 'request-1',
			runId: 'run-1',
			startedAt: 1000,
		});

		expect(context.get(hasRunningAgentRunAtom)).toBe(true);

		appendAgentEventAction(context, {
			assistantMessageId: 'assistant-1',
			event: {
				id: 'finish-1',
				runId: 'run-1',
				at: 2000,
				kind: 'finish',
			},
		});

		expect(context.get(agentRunsAtom)['assistant-1'].status).toBe('done');
		expect(context.get(hasRunningAgentRunAtom)).toBe(false);
	});

	it('does not append an event to an unrelated assistant message', () => {
		const context = createCtx();
		appendAgentEventAction(context, {
			assistantMessageId: 'missing',
			event: { id: 'event-1', runId: 'run-1', at: 1000, kind: 'thinking' },
		});

		expect(context.get(agentRunsAtom)).toEqual({});
	});
});
