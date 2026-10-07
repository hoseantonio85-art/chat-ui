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
  currentActivity: string;
  status: 'running' | 'done' | 'failed';
  events: AgentEvent[];
}
export const activeLabels: Record<string, string> = {
  get_company_profile: 'agentActivity.activity1',
  ask_methodologist: 'agentActivity.activity2',
  get_company_risks: 'agentActivity.activity3',
  profiler_search: 'agentActivity.activity4',
  ask_analyst: 'agentActivity.activity5',
  get_company_fin_indicators: 'agentActivity.activity6',
  task: 'agentActivity.activity7',
  write_todos: 'agentActivity.activity8',
  get_incident_form: 'agentActivity.activity9',
  create_incident: 'agentActivity.activity10',
};
export function createRun(runId: string, requestId: string, startedAt: number): AgentRun {
  return { runId, requestId, startedAt, currentActivity: 'agentActivity.activity11', status: 'running', events: [] };
}
export function appendEvent(run: AgentRun, event: AgentEvent): AgentRun {
  // A reconnect replay must not duplicate events or reopen a completed run.
  if (event.runId !== run.runId || run.events.some(item => item.id === event.id) || run.status !== 'running') return run;
  const events = [...run.events, event];
  if (event.kind === 'finish' || (event.kind === 'error' && event.fatal)) {
    const status = event.fatal ? 'failed' : 'done';
    return { ...run, events, status, finishedAt: event.at, currentActivity: status === 'failed' ? 'agentActivity.activity12' : 'agentActivity.activity13' };
  }
  const currentActivity = event.kind === 'toolCall' || event.kind === 'delegation'
    ? event.label || activeLabels[event.tool || ''] || 'agentActivity.activity14'
    : event.kind === 'error' ? 'agentActivity.activity15'
    : event.kind === 'empty' ? 'agentActivity.activity16'
    : event.kind === 'handback' ? 'agentActivity.activity17'
    : event.kind === 'plan' ? (event.todos?.every(todo => todo.status === 'completed') ? 'agentActivity.activity18' : 'agentActivity.activity19')
    : run.currentActivity;
  return { ...run, events, currentActivity };
}
export type SourceState = { name: string; status: 'running' | 'success' | 'empty' | 'error'; calls: number };
export function sourcesForRun(run: AgentRun): SourceState[] {
  const calls = new Map<string, { name: string; status: SourceState['status'] }>();
  for (const event of run.events) {
    if (!event.callId) continue;
    if (event.kind === 'toolCall' && event.source) calls.set(event.callId, {name: event.source, status: 'running'});
    const call = calls.get(event.callId);
    if (call && ['toolResult', 'empty', 'error'].includes(event.kind)) {
      call.status = event.kind === 'toolResult' ? 'success' : event.kind as 'empty' | 'error';
    }
  }
  const sources = new Map<string, SourceState>();
  // Any unavailable/empty call remains visible even when another call succeeded.
  const priority = {success: 0, empty: 1, running: 2, error: 3};
  for (const call of calls.values()) {
    const previous = sources.get(call.name);
    sources.set(call.name, {name: call.name, calls: (previous?.calls || 0) + 1,
      status: previous && priority[previous.status] > priority[call.status] ? previous.status : call.status});
  }
  return [...sources.values()];
}
export function runSummary(run: AgentRun, t: (key: string, values?: Record<string, number>) => string): string {
  const sources = sourcesForRun(run);
  const successful = sources.filter(source => source.status === 'success').length;
  const incomplete = sources.length - successful;
  const experts = run.events.filter(event => event.kind === 'delegation').length;
  const seconds = Math.max(0, Math.round(((run.finishedAt || run.startedAt) - run.startedAt) / 1000));
  return [
    t(run.status === 'failed' ? 'agentActivity.summaryFailed' : 'agentActivity.summaryDone'),
    t('agentActivity.summarySources', { successful, total: sources.length }),
    ...(incomplete ? [t('agentActivity.summaryIncomplete', { count: incomplete })] : []),
    ...(experts ? [t('agentActivity.summaryExperts', { count: experts })] : []),
    t('agentActivity.seconds', { count: seconds }),
  ].join(' · ');
}
