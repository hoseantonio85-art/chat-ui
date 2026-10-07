import type { UniversalAgentInboundUpdate } from './types';

/** A thread-enabled stream must identify its thread to avoid cross-chat updates. */
export const belongsToActiveThread = (
	update: UniversalAgentInboundUpdate,
	threadsEnabled: boolean,
	activeThreadId?: string,
): boolean => !threadsEnabled || (!!activeThreadId && update.threadId === activeThreadId);
