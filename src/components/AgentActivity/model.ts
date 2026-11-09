/** UI protocol v1. Transport adapters own AG-UI/STOMP decoding. */
export type AgentEventKind = 'thinking' | 'message' | 'plan' | 'toolCall' | 'toolResult' | 'delegation' | 'handback' | 'error' | 'empty' | 'finish';
export interface AgentEvent {
  id: string;
  runId: string;
  at: number;
  kind: AgentEventKind;
  callId?: string;
  parentCallId?: string;
  tool?: string;
  source?: string;
  label?: string;
  text?: string;
  /** User-facing thinking fragment. stepId references a step in the same scope, or is omitted for the answer summary. */
  progressDelta?: { text: string; stepId?: string };
  args?: unknown;
  result?: unknown;
  todos?: { content: string; status: 'pending' | 'in_progress' | 'completed' }[];
  fatal?: boolean;
}
export interface AgentRun {
  runId: string;
  requestId: string;
  startedAt: number;
  finishedAt?: number;
  status: 'running' | 'done' | 'failed';
  events: AgentEvent[];
}
export function callOutcome(run: AgentRun, call: AgentEvent): AgentEvent | undefined {
  if (!call.callId || (call.kind !== 'toolCall' && call.kind !== 'delegation')) return;
  return run.events.find(event => event.callId === call.callId && (
    event.kind === 'error' || event.kind === 'empty' ||
    (call.kind === 'delegation' ? event.kind === 'handback' : event.kind === 'toolResult')
  ));
}

export function openCalls(run: AgentRun): AgentEvent[] {
  if (run.status !== 'running') return [];
  return run.events.filter(event => (event.kind === 'toolCall' || event.kind === 'delegation') &&
    event.callId && !callOutcome(run, event));
}

export function activityLabel(run?: AgentRun): string {
  if (!run) return 'Думаю';
  if (run.status === 'failed') return 'Не удалось завершить ответ';
  if (run.status === 'done') return 'Ответ готов';
  const calls = openCalls(run).filter(call => !call.parentCallId);
  const experts = calls.flatMap(call => {
    const name = callTitle(call);
    if (expertNames.has(name)) return [name.toLowerCase()];
    return call.kind === 'delegation' ? ['эксперт'] : [];
  });
  if (experts.length) return `Делегирую: ${[...new Set(experts)].join(', ')}`;
  return calls.length ? 'Собираю источники' : 'Думаю';
}

export const formatDuration = (ms: number) => `${Math.max(0, Math.floor(ms / 1000))} с`;

export function callDuration(run: AgentRun, call: AgentEvent, now: number): string {
  const end = callOutcome(run, call)?.at ?? run.finishedAt ??
    (run.status === 'running' ? now : run.events.at(-1)?.at ?? call.at);
  return formatDuration(end - call.at);
}

const sourceNames: Record<string, string> = {
  get_company_profile: 'Профайлер',
  profiler_search: 'Профайлер',
  ask_methodologist: 'Методолог',
  ask_analyst: 'Аналитик',
  get_company_fin_indicators: 'Аналитик',
  get_company_laws: 'Законы',
  get_company_risks: 'Реестр рисков',
  get_incident_form: 'Регистрация события',
  create_incident: 'Регистрация события',
};
const expertNames = new Set(['Профайлер', 'Методолог', 'Аналитик']);

export function callTitle(event: AgentEvent): string {
  return (event.tool && sourceNames[event.tool]) || event.source || event.label ||
    (event.kind === 'delegation' ? 'Профильный эксперт' : 'Источник');
}

export function traceSteps(run: AgentRun, parentCallId?: string) {
  const events = run.events.filter(event => event.parentCallId === parentCallId && event.kind !== 'finish');
  const outcomes = new Map<string, AgentEvent>();
  const foldedIds = new Map<string, string>();
  for (const event of events) {
    const outcome = callOutcome(run, event);
    if (!outcome) continue;
    outcomes.set(event.id, outcome);
    foldedIds.set(outcome.id, event.id);
  }
  const visible = events.filter(event => event.kind !== 'thinking' && event.kind !== 'toolResult' &&
    event.kind !== 'handback' && !foldedIds.has(event.id) && (event.kind !== 'message' || !!event.label || !!parentCallId));
  const stepIds = new Set(visible.map(event => event.id));
  const details = new Map<string | undefined, { event: AgentEvent; lastId: string; text: string }>();
  for (const event of events) {
    // Only explicitly public fragments can enter the trace. Older thinking events contain raw text.
    const delta = event.kind === 'thinking' ? event.progressDelta : undefined;
    if (!delta?.text) continue;
    const stepId = delta.stepId ? foldedIds.get(delta.stepId) ?? delta.stepId : undefined;
    const detail = details.get(stepId);
    if (detail) {
      detail.text += delta.text;
      detail.lastId = event.id;
    } else details.set(stepId, { event, lastId: event.id, text: delta.text });
  }

  const steps = visible.map(event => ({
    event,
    detail: details.get(event.id),
    outcome: outcomes.get(event.id),
  }));
  for (const [stepId, detail] of details) {
    if (!stepId || !stepIds.has(stepId)) steps.push({ event: detail.event, detail, outcome: undefined });
  }
  return steps;
}

export function hasTrace(run?: AgentRun): boolean {
  return !!run && traceSteps(run).length > 0;
}

export function createRun(runId: string, requestId: string, startedAt: number): AgentRun {
  return { runId, requestId, startedAt, status: 'running', events: [] };
}
export function appendEvent(run: AgentRun, event: AgentEvent): AgentRun {
  // A reconnect replay must not duplicate events or reopen a completed run.
  if (event.runId !== run.runId || run.events.some(item => item.id === event.id) || run.status !== 'running') return run;
  const events = [...run.events, event];
  if (event.kind === 'finish' || (event.kind === 'error' && event.fatal)) {
    const status = event.fatal ? 'failed' : 'done';
    return { ...run, events, status, finishedAt: event.at };
  }
  return { ...run, events };
}
export function runSummary(run: AgentRun): string {
  if (run.status === 'running') return 'Выполняется сейчас';
  const status = run.status === 'failed' ? 'Прогон прерван' : 'Ответ готов';
  return run.finishedAt === undefined ? status : `${status} за ${formatDuration(run.finishedAt - run.startedAt)}`;
}
