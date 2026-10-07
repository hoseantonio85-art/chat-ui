import { action, atom } from '@reatom/framework';

export interface ChatThread {
	id: string;
	title: string;
	pinned: boolean;
	updatedAt: number;
	initialSkill?: string;
}

export type ThreadsStatus = 'idle' | 'loading' | 'ready' | 'error';

export const threadsAtom = atom<ChatThread[]>([], 'threadsAtom');
export const activeThreadIdAtom = atom<string | undefined>(undefined, 'activeThreadIdAtom');
export const threadsStatusAtom = atom<ThreadsStatus>('idle', 'threadsStatusAtom');
export const threadsScopeVersionAtom = atom(0, 'threadsScopeVersionAtom');

export const resetThreadsAction = action((context) => {
	threadsScopeVersionAtom(context, (version) => version + 1);
	threadsAtom(context, []);
	activeThreadIdAtom(context, undefined);
	threadsStatusAtom(context, 'idle');
}, 'resetThreadsAction');

export const setThreadsAction = action((context, threads: ChatThread[]) => {
	threadsAtom(context, [...threads]);
}, 'setThreadsAction');

export const setActiveThreadAction = action((context, threadId?: string) => {
	activeThreadIdAtom(context, threadId);
}, 'setActiveThreadAction');

export const setThreadsStatusAction = action((context, status: ThreadsStatus) => {
	threadsStatusAtom(context, status);
}, 'setThreadsStatusAction');

export const upsertThreadAction = action((context, thread: ChatThread) => {
	threadsAtom(context, (threads) => {
		const index = threads.findIndex((item) => item.id === thread.id);

		if (index === -1) {
			return [...threads, thread];
		}

		const next = [...threads];
		next[index] = thread;

		return next;
	});
}, 'upsertThreadAction');

export const removeThreadAction = action((context, threadId: string) => {
	threadsAtom(context, (threads) => threads.filter((thread) => thread.id !== threadId));
}, 'removeThreadAction');
