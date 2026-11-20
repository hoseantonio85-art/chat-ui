import { ERoles, type IMessage } from '@/types';
import { appendEvent, createRun, type AgentRun } from '../src/components/AgentActivity/model';
import type { AtlasPreview, AtlasPreviewThread } from './atlasPreview';
import { fixture, scenarios } from './scenarios';

export const reasoningSteps = ['reasoning.request', 'reasoning.thinking', 'reasoning.sources', 'reasoning.answer', 'reasoning.trace'] as const;
export type ReasoningStepId = typeof reasoningSteps[number];
export const reasoningRunId = 'atlas-reasoning-answer';
const requestId = 'atlas-reasoning-request';

export function createReasoningPreview(stepId:ReasoningStepId, baseThreads:AtlasPreviewThread[], memory:string[]):AtlasPreview {
  const initial = fixture('normal', reasoningRunId, 0);
  const complete = stepId === 'reasoning.answer' || stepId === 'reasoning.trace';
  const cutoff = stepId === 'reasoning.request' ? 0
    : stepId === 'reasoning.thinking' ? initial.events.findIndex(event => event.kind === 'toolCall')
    : stepId === 'reasoning.sources' ? initial.events.findIndex(event => event.tool === 'ask_methodologist' && event.kind === 'toolCall') + 1
    : initial.events.length;
  const elapsed = initial.events[cutoff - 1]?.at ?? 0;
  const start = Date.now() - elapsed;
  const {events, answer} = fixture('normal', reasoningRunId, start);
  let run = createRun(reasoningRunId, requestId, start);
  events.slice(0, cutoff).forEach(event => { run = appendEvent(run, event); });
  if (complete) run = appendEvent(run, {id:reasoningRunId+'-finish', runId:reasoningRunId, kind:'finish', at:events.at(-1)!.at + 700});
  const messages:IMessage[] = [
    {id:requestId, role:ERoles.user, text:scenarios.find(item => item.id === 'normal')!.question, timeCreated:new Date(start).toISOString()},
    {id:reasoningRunId, requestId, role:ERoles.bot, text:complete ? answer : '',
      extras:complete ? undefined : {agentPending:'true'}, timeCreated:new Date(start+1).toISOString()},
  ];
  return {
    stepId,
    threads:baseThreads.map(thread => thread.id === 'risk' ? {
      ...thread, scenario:'normal', title:'Анализ рисков компании', messages, runs:{[run.runId]:run},
      agentState:complete ? 'ready' : 'running', agentUnread:false,
    } : {...thread}),
    activeThreadId:'risk', scenario:'normal', agentMemory:[...memory],
    activityPreview:{[reasoningRunId]:{
      expanded:stepId === 'reasoning.sources' || stepId === 'reasoning.trace',
      detailTitle:'Профайлер',
    }},
  };
}

export function remainingReasoningEvents(run:AgentRun) {
  return fixture('normal', run.runId, run.startedAt).events.filter(event => !run.events.some(existing => existing.id === event.id));
}
