import { describe, expect, it } from 'vitest';

import { createHttpThreadRepository } from './http';

const thread = {
	id: 'thread-1',
	title: 'Проверка рисков',
	pinned: false,
	updatedAt: 1000,
};

const snapshot = {
	thread,
	messages: [{
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
	}],
	agentRuns: {},
	canLoadHistory: false,
};

describe('HTTP thread repository', () => {
	it('loads messages and their persisted trace through the configured API', async () => {
		const requests: Array<{ url: string; method: string; tenantId?: string }> = [];
		const fetcher: typeof fetch = async (input, init) => {
			requests.push({
				url: String(input),
				method: init?.method ?? 'GET',
				tenantId: new Headers(init?.headers).get('tenantId') ?? undefined,
			});
			return Response.json(String(input).endsWith('/thread-1') ? snapshot : [thread]);
		};
		const repository = createHttpThreadRepository({
			baseUrl: '/api/chat/threads/',
			fetcher,
			headers: () => ({ tenantId: 'tenant-1' }),
		});

		expect(await repository.list()).toEqual([thread]);
		const loaded = await repository.load('thread-1');
		expect(loaded.messages[0].text).toBe('Ответ');
		expect(loaded.agentRuns['assistant-1'].status).toBe('done');
		expect(requests).toEqual([
			{ url: '/api/chat/threads', method: 'GET', tenantId: 'tenant-1' },
			{ url: '/api/chat/threads/thread-1', method: 'GET', tenantId: 'tenant-1' },
		]);
	});

	it('rejects malformed snapshots rather than hydrating corrupt state', async () => {
		const fetcher: typeof fetch = async () => Response.json({ thread, messages: 'invalid' });
		const repository = createHttpThreadRepository({ baseUrl: '/api/chat/threads', fetcher });
		await expect(repository.load('thread-1')).rejects.toThrow('Invalid thread snapshot response');
	});
});
