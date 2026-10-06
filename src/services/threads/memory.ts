import type { ChatThread } from '@/stores/threads';

import type {
	CreateThreadInput,
	ThreadRepository,
	ThreadSnapshot,
} from './types';

const copySnapshot = (snapshot: ThreadSnapshot): ThreadSnapshot => ({
	thread: { ...snapshot.thread },
	messages: snapshot.messages.map((message) => ({
		...message,
		extras: message.extras ? { ...message.extras } : undefined,
	})),
	agentRuns: { ...snapshot.agentRuns },
	canLoadHistory: snapshot.canLoadHistory,
});

/** Development implementation of the production repository contract. */
export const createMemoryThreadRepository = (
	seed: ThreadSnapshot[] = [],
): ThreadRepository => {
	const snapshots = new Map(seed.map((item) => [item.thread.id, copySnapshot(item)]));

	const requireSnapshot = (threadId: string) => {
		const snapshot = snapshots.get(threadId);

		if (!snapshot) {
			throw new Error(`Unknown thread: ${threadId}`);
		}

		return snapshot;
	};

	const updateThread = (
		threadId: string,
		change: (thread: ChatThread) => ChatThread,
	) => {
		const snapshot = requireSnapshot(threadId);
		const thread = change(snapshot.thread);
		snapshots.set(threadId, { ...snapshot, thread });

		return { ...thread };
	};

	return {
		list: async () => [...snapshots.values()].map((item) => ({ ...item.thread })),
		load: async (threadId) => copySnapshot(requireSnapshot(threadId)),
		create: async (input: CreateThreadInput) => {
			const thread: ChatThread = {
				id: crypto.randomUUID(),
				title: input.title,
				pinned: false,
				updatedAt: Date.now(),
				initialSkill: input.initialSkill,
			};
			const snapshot: ThreadSnapshot = {
				thread,
				messages: [],
				agentRuns: {},
				canLoadHistory: false,
			};
			snapshots.set(thread.id, snapshot);

			return copySnapshot(snapshot);
		},
		rename: async (threadId, title) =>
			updateThread(threadId, (thread) => ({ ...thread, title, updatedAt: Date.now() })),
		setPinned: async (threadId, pinned) =>
			updateThread(threadId, (thread) => ({ ...thread, pinned, updatedAt: Date.now() })),
		delete: async (threadId) => {
			snapshots.delete(threadId);
		},
	};
};
