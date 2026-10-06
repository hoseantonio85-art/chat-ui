import {
	appendEvent,
	createRun,
	type AgentEvent,
	type AgentEventKind,
	type AgentRun,
} from '@/components/AgentActivity/model';
import { ERoles, type IMessage } from '@/types';

import type { UniversalAgentInboundUpdate } from './types';

type JsonRecord = Record<string, unknown>;

const eventKinds = new Set<AgentEventKind>([
	'thinking',
	'message',
	'plan',
	'toolCall',
	'toolResult',
	'delegation',
	'handback',
	'error',
	'empty',
	'finish',
]);

const isRecord = (value: unknown): value is JsonRecord =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const stringValue = (value: unknown) =>
	typeof value === 'string' && value.length > 0 ? value : undefined;

const numberValue = (value: unknown) => {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}

	if (typeof value === 'string') {
		const parsed = Date.parse(value);

		return Number.isNaN(parsed) ? undefined : parsed;
	}

	return undefined;
};

const parseTodos = (value: unknown): AgentEvent['todos'] => {
	if (!Array.isArray(value)) {
		return undefined;
	}

	return value.flatMap((item) => {
		if (!isRecord(item)) {
			return [];
		}

		const content = stringValue(item.content);
		const status = item.status;

		if (
			!content ||
			(status !== 'pending' &&
				status !== 'in_progress' &&
				status !== 'completed')
		) {
			return [];
		}

		return [{ content, status }];
	});
};

export const adaptAgentEvent = (
	value: unknown,
	fallbackRunId?: string,
): AgentEvent | undefined => {
	if (!isRecord(value)) {
		return undefined;
	}

	const kind = value.kind ?? value.eventType;
	const runId = stringValue(value.runId) ?? fallbackRunId;
	const id = stringValue(value.id) ?? stringValue(value.eventId);

	if (!eventKinds.has(kind as AgentEventKind) || !runId || !id) {
		return undefined;
	}

	return {
		id,
		runId,
		at: numberValue(value.at ?? value.timestamp) ?? Date.now(),
		kind: kind as AgentEventKind,
		callId: stringValue(value.callId),
		parentCallId: stringValue(value.parentCallId),
		tool: stringValue(value.tool ?? value.toolName),
		source: stringValue(value.source),
		label: stringValue(value.label),
		text: stringValue(value.text),
		// Tool payloads are intentionally opaque at this transport boundary.
		args: value.args,
		result: value.result,
		todos: parseTodos(value.todos),
		fatal: value.fatal === true,
	};
};

export const adaptAgentRunSnapshot = (value: unknown): AgentRun | undefined => {
	if (!isRecord(value)) {
		return undefined;
	}

	const runId = stringValue(value.runId);
	const requestId = stringValue(value.requestId);
	const startedAt = numberValue(value.startedAt);

	if (!runId || !requestId || startedAt === undefined) {
		return undefined;
	}

	let run = createRun(runId, requestId, startedAt);

	if (Array.isArray(value.events)) {
		for (const rawEvent of value.events) {
			const event = adaptAgentEvent(rawEvent, runId);

			if (event) {
				run = appendEvent(run, event);
			}
		}
	}

	if (run.status === 'running' && (value.status === 'done' || value.status === 'failed')) {
		const finishedAt = numberValue(value.finishedAt) ?? Date.now();
		run = appendEvent(run, {
			id: `${runId}-snapshot-finish-${finishedAt}`,
			runId,
			at: finishedAt,
			kind: value.status === 'failed' ? 'error' : 'finish',
			fatal: value.status === 'failed',
		});
	}

	return run;
};

const adaptMessage = (value: unknown): IMessage | undefined => {
	if (!isRecord(value)) {
		return undefined;
	}

	const role = value.role;

	if (role !== ERoles.user && role !== ERoles.bot && role !== ERoles.system) {
		return undefined;
	}

	const extras = isRecord(value.extras)
		? (value.extras as IMessage['extras'])
		: undefined;

	return {
		id: stringValue(value.id),
		requestId: stringValue(value.requestId),
		text: typeof value.text === 'string' ? value.text : undefined,
		userId: stringValue(value.userId),
		timeCreated: stringValue(value.timeCreated),
		role,
		reaction:
			value.reaction === 'like' || value.reaction === 'dislike'
				? value.reaction
				: undefined,
		skill: stringValue(value.skill),
		extras,
	};
};

const persistedRunFromMessage = (message: IMessage) => {
	const rawRun = message.extras?.agentRun;

	if (typeof rawRun !== 'string') {
		return undefined;
	}

	try {
		return adaptAgentRunSnapshot(JSON.parse(rawRun));
	} catch {
		return undefined;
	}
};

const eventType = (value: JsonRecord) =>
	stringValue(value.type ?? value.event ?? value.eventName)?.replaceAll('_', '.');

export const adaptUniversalAgentPayload = (
	raw: unknown,
): UniversalAgentInboundUpdate[] => {
	if (!isRecord(raw)) {
		return [];
	}

	const type = eventType(raw);
	const payload = isRecord(raw.payload) ? raw.payload : raw;

	if (!type) {
		const message = adaptMessage(raw);

		return message
			? [{ kind: 'message', message, persistedRun: persistedRunFromMessage(message) }]
			: [];
	}

	if (type === 'chat.message') {
		const message = adaptMessage(payload.message ?? payload);

		return message
			? [{ kind: 'message', message, persistedRun: persistedRunFromMessage(message) }]
			: [];
	}

	const assistantMessageId = stringValue(
		payload.assistantMessageId ?? payload.messageId,
	);

	if (type === 'agent.run.started') {
		const requestId = stringValue(payload.requestId);
		const runId = stringValue(payload.runId);

		return assistantMessageId && requestId && runId
			? [{
				kind: 'runStarted',
				assistantMessageId,
				requestId,
				runId,
				startedAt: numberValue(payload.startedAt ?? payload.timestamp) ?? Date.now(),
			}]
			: [];
	}

	if (type === 'agent.run.event') {
		const event = adaptAgentEvent(payload.event ?? payload, stringValue(payload.runId));

		return assistantMessageId && event
			? [{ kind: 'runEvent', assistantMessageId, event }]
			: [];
	}

	if (type === 'agent.run.snapshot') {
		const run = adaptAgentRunSnapshot(payload.run ?? payload);

		return assistantMessageId && run
			? [{ kind: 'runSnapshot', assistantMessageId, run }]
			: [];
	}

	if (type === 'assistant.message.delta') {
		const text = typeof payload.delta === 'string'
			? payload.delta
			: typeof payload.text === 'string'
				? payload.text
				: undefined;

		return assistantMessageId && text !== undefined
			? [{
				kind: 'assistantDelta',
				assistantMessageId,
				requestId: stringValue(payload.requestId),
				text,
				append: payload.append !== false,
			}]
			: [];
	}

	return [];
};
