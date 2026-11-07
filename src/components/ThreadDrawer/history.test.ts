import { describe, expect, it } from 'vitest';
import type { ChatThread } from './context';
import { groupThreadsForHistory } from './history';

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 10, 7);
const thread = (id: string, daysAgo: number, pinned = false): ChatThread => ({
	id,
	title: id,
	pinned,
	updatedAt: NOW - daysAgo * DAY,
});

describe('groupThreadsForHistory', () => {
	it('separates unpinned chats older than 30 days', () => {
		const groups = groupThreadsForHistory([
			thread('pinned-old', 90, true),
			thread('recent', 12),
			thread('boundary', 30),
			thread('old', 31),
		], NOW);

		expect(groups.map(group => ({
			title: group.title,
			ids: group.items.map(item => item.id),
		}))).toEqual([
			{ title: 'Закреплённые', ids: ['pinned-old'] },
			{ title: 'Недавние', ids: ['recent', 'boundary'] },
			{ title: 'Дольше 30 дней', ids: ['old'] },
		]);
	});

	it('omits empty groups', () => {
		expect(groupThreadsForHistory([thread('recent', 1)], NOW).map(group => group.title)).toEqual(['Недавние']);
	});
});
