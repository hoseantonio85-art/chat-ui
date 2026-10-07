import { describe, expect, it } from 'vitest';

import { belongsToActiveThread } from './routing';
import type { UniversalAgentInboundUpdate } from './types';

const update: UniversalAgentInboundUpdate = {
	kind: 'assistantDelta',
	assistantMessageId: 'assistant-1',
	text: 'Ответ',
	append: true,
	threadId: 'thread-1',
};

describe('stream thread routing', () => {
	it('accepts only events for the open thread when thread mode is enabled', () => {
		expect(belongsToActiveThread(update, true, 'thread-1')).toBe(true);
		expect(belongsToActiveThread(update, true, 'thread-2')).toBe(false);
		expect(belongsToActiveThread({ ...update, threadId: undefined }, true, 'thread-1')).toBe(false);
		expect(belongsToActiveThread(update, true)).toBe(false);
		expect(belongsToActiveThread(update, false)).toBe(true);
	});
});
