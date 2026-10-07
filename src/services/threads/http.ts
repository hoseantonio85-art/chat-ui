import { adaptAgentRunSnapshot, adaptUniversalAgentPayload } from '@/services/universalAgent/adapter';
import type { AgentRun } from '@/components/AgentActivity/model';
import type { IMessage } from '@/types';
import type { ChatThread } from '@/stores/threads';

import type { CreateThreadInput, ThreadRepository, ThreadSnapshot } from './types';

type JsonRecord = Record<string, unknown>;

export interface HttpThreadRepositoryOptions {
	baseUrl: string;
	fetcher?: typeof fetch;
	headers?: () => Record<string, string>;
}

const isRecord = (value: unknown): value is JsonRecord =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const parseThread = (value: unknown): ChatThread => {
	if (!isRecord(value) || typeof value.id !== 'string' ||
		typeof value.title !== 'string' || typeof value.pinned !== 'boolean' ||
		typeof value.updatedAt !== 'number' || !Number.isFinite(value.updatedAt) ||
		(value.initialSkill !== undefined && typeof value.initialSkill !== 'string')) {
		throw new Error('Invalid thread response');
	}

	return {
		id: value.id,
		title: value.title,
		pinned: value.pinned,
		updatedAt: value.updatedAt,
		initialSkill: value.initialSkill,
	};
};

const parseMessage = (value: unknown): { message: IMessage; run?: AgentRun } => {
	const update = adaptUniversalAgentPayload(value)[0];
	if (update?.kind !== 'message' || !update.message.id) {
		throw new Error('Invalid thread message response');
	}

	return { message: update.message, run: update.persistedRun };
};

const parseSnapshot = (value: unknown): ThreadSnapshot => {
	if (!isRecord(value) || !Array.isArray(value.messages) ||
		typeof value.canLoadHistory !== 'boolean' ||
		(value.agentRuns !== undefined && !isRecord(value.agentRuns))) {
		throw new Error('Invalid thread snapshot response');
	}

	const thread = parseThread(value.thread);
	const messages: IMessage[] = [];
	const agentRuns: Record<string, AgentRun> = {};

	for (const rawMessage of value.messages) {
		const { message, run } = parseMessage(rawMessage);
		messages.push(message);
		if (run && message.id) {
			agentRuns[message.id] = run;
		}
	}

	if (isRecord(value.agentRuns)) {
		for (const [messageId, rawRun] of Object.entries(value.agentRuns)) {
			const run = adaptAgentRunSnapshot(rawRun);
			if (!run) {
				throw new Error('Invalid agent run response');
			}
			agentRuns[messageId] = run;
		}
	}

	return { thread, messages, agentRuns, canLoadHistory: value.canLoadHistory };
};

/** HTTP boundary for the proposed thread API; wire the base URL in the host config. */
export const createHttpThreadRepository = ({
	baseUrl,
	fetcher = fetch,
	headers,
}: HttpThreadRepositoryOptions): ThreadRepository => {
	const collectionUrl = baseUrl.replace(/\/$/, '');
	if (!collectionUrl) {
		throw new Error('Thread API URL is required');
	}

	const itemUrl = (threadId: string) => `${collectionUrl}/${encodeURIComponent(threadId)}`;
	const request = async (url: string, init?: RequestInit): Promise<unknown> => {
		const response = await fetcher(url, {
			...init,
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				...headers?.(),
				...(init?.body ? { 'Content-Type': 'application/json' } : {}),
			},
		});
		if (!response.ok) {
			throw new Error(`Thread API request failed: ${response.status}`);
		}
		return response.status === 204 ? undefined : response.json();
	};

	return {
		list: async () => {
			const data = await request(collectionUrl);
			if (!Array.isArray(data)) {
				throw new Error('Invalid thread list response');
			}
			return data.map(parseThread);
		},
		load: async (threadId) => parseSnapshot(await request(itemUrl(threadId))),
		create: async (input: CreateThreadInput) => parseSnapshot(await request(collectionUrl, {
			method: 'POST',
			body: JSON.stringify(input),
		})),
		rename: async (threadId, title) => parseThread(await request(itemUrl(threadId), {
			method: 'PATCH',
			body: JSON.stringify({ title }),
		})),
		setPinned: async (threadId, pinned) => parseThread(await request(itemUrl(threadId), {
			method: 'PATCH',
			body: JSON.stringify({ pinned }),
		})),
		delete: async (threadId) => {
			await request(itemUrl(threadId), { method: 'DELETE' });
		},
	};
};
