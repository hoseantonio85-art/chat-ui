import type { ChatThread } from './context';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export interface ThreadHistoryGroup<T extends ChatThread = ChatThread> {
	title: 'Закреплённые' | 'Недавние' | 'Дольше 30 дней';
	items: T[];
}

export function groupThreadsForHistory<T extends ChatThread>(threads: T[], now = Date.now()): ThreadHistoryGroup<T>[] {
	const olderThanThirtyDays = now - THIRTY_DAYS_MS;
	return [
		{ title: 'Закреплённые' as const, items: threads.filter(thread => thread.pinned) },
		{ title: 'Недавние' as const, items: threads.filter(thread => !thread.pinned && thread.updatedAt >= olderThanThirtyDays) },
		{ title: 'Дольше 30 дней' as const, items: threads.filter(thread => !thread.pinned && thread.updatedAt < olderThanThirtyDays) },
	].filter(group => group.items.length > 0);
}
