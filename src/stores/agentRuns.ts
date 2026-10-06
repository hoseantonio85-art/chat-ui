import { action, atom } from '@reatom/framework';

import {
	appendEvent,
	createRun,
	type AgentEvent,
	type AgentRun,
} from '@/components/AgentActivity/model';

export interface StartAgentRunPayload {
	assistantMessageId: string;
	requestId: string;
	runId: string;
	startedAt: number;
}

export interface AppendAgentEventPayload {
	assistantMessageId: string;
	event: AgentEvent;
}

export const agentRunsAtom = atom<Readonly<Record<string, AgentRun>>>({}, 'agentRunsAtom');

export const hasRunningAgentRunAtom = atom(
	(context) => Object.values(context.spy(agentRunsAtom)).some((run) => run.status === 'running'),
	'hasRunningAgentRunAtom',
);

export const startAgentRunAction = action(
	(context, payload: StartAgentRunPayload) => {
		agentRunsAtom(context, (runs) => ({
			...runs,
			[payload.assistantMessageId]: createRun(
				payload.runId,
				payload.requestId,
				payload.startedAt,
			),
		}));
	},
	'startAgentRunAction',
);

export const appendAgentEventAction = action(
	(context, payload: AppendAgentEventPayload) => {
		agentRunsAtom(context, (runs) => {
			const run = runs[payload.assistantMessageId];

			if (!run) {
				return runs;
			}

			const nextRun = appendEvent(run, payload.event);

			return nextRun === run
				? runs
				: { ...runs, [payload.assistantMessageId]: nextRun };
		});
	},
	'appendAgentEventAction',
);

export const hydrateAgentRunsAction = action(
	(context, runs: Readonly<Record<string, AgentRun>>) => {
		agentRunsAtom(context, { ...runs });
	},
	'hydrateAgentRunsAction',
);

export const upsertAgentRunAction = action(
	(context, payload: { assistantMessageId: string; run: AgentRun }) => {
		agentRunsAtom(context, (runs) => ({
			...runs,
			[payload.assistantMessageId]: payload.run,
		}));
	},
	'upsertAgentRunAction',
);

export const clearAgentRunsAction = action((context) => {
	agentRunsAtom(context, {});
}, 'clearAgentRunsAction');
