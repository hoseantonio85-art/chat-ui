import { useTranslation } from 'react-i18next';
import { EIconName, Icon } from '@sber-orm/ui-kit';
import { type AgentEvent, type AgentRun, runSummary, sourcesForRun } from './model';
import classes from './styles.module.scss';
const names: Record<AgentEvent['kind'], string> = {
  thinking: 'agentActivity.thinking', message: 'agentActivity.intermediate', plan: 'agentActivity.plan', toolCall: 'agentActivity.toolCall', toolResult: 'agentActivity.toolResult', delegation: 'agentActivity.delegation', handback: 'agentActivity.handback', error: 'agentActivity.sourceError', empty: 'agentActivity.empty', finish: 'agentActivity.finish',
};
const statusLabels = { running: 'agentActivity.running', success: 'agentActivity.success', empty: 'agentActivity.noData', error: 'agentActivity.unavailable' };
const marks = { pending: 'agentActivity.pending', in_progress: 'agentActivity.inProgress', completed: 'agentActivity.completed' };
const iconByKind: Record<AgentEvent['kind'], EIconName> = {
  thinking: EIconName.clock, message: EIconName.fill, plan: EIconName.taskList, toolCall: EIconName.taskSearch, toolResult: EIconName.success, delegation: EIconName.users, handback: EIconName.userSwap, error: EIconName.errorRounded, empty: EIconName.warningRounded, finish: EIconName.check,
};

function Payload({ title, value }: { title: string; value: unknown }) {
  return <details className={classes.payload}><summary><Icon className={classes.payloadChevron} name={EIconName.chevronFillRight} width={16} height={16}/>{title}</summary><pre>{typeof value === 'string' ? value : JSON.stringify(value, null, 2)}</pre></details>;
}

function TraceSteps({ run, parent }: { run: AgentRun; parent?: string }) {
  const { t } = useTranslation();
  return <ol className={classes.trace}>
    {run.events.filter(event => event.parentCallId === parent).map(event => <li key={event.id} className={classes.step} data-kind={event.kind} data-active={run.status === 'running' && event.id === run.events.at(-1)?.id} tabIndex={0}>
      <div className={classes.stepHeader}><Icon className={classes.marker} name={iconByKind[event.kind]} width={16} height={16}/><strong>{run.status === 'running' && event.id === run.events.at(-1)?.id ? t(run.currentActivity, { defaultValue: run.currentActivity }) : event.label || t(names[event.kind])}</strong><span className={classes.time}>{t('agentActivity.seconds', { count: Number(Math.max(0, (event.at - run.startedAt) / 1000).toFixed(1)) })}</span></div>
      {(event.source || event.tool) && <div className={classes.meta}>{event.source}{event.source && event.tool ? ' · ' : ''}<code>{event.tool}</code></div>}
      {event.text && <p>{event.text}</p>}
      {event.todos && <ul className={classes.plan}>{event.todos.map((todo, index) => <li key={`${index}-${todo.content}`} data-status={todo.status}><span>{todo.content}</span><small>{t(marks[todo.status])}</small></li>)}</ul>}
      {event.args !== undefined && <Payload title={t('agentActivity.arguments')} value={event.args}/>}
      {event.result !== undefined && <Payload title={t('agentActivity.result')} value={event.result}/>}
      {event.kind === 'delegation' && event.callId && <TraceSteps run={run} parent={event.callId}/>}
    </li>)}
  </ol>;
}

/** Presentation-only trace, reusable inside an inline disclosure or drawer. */
export function AgentTrace({ run }: { run: AgentRun }) {
  const { t } = useTranslation();
  const sources = sourcesForRun(run);
  return <div className={classes.traceIslands}>
    <div className={classes.traceContent}>
    <div className={classes.traceTitle}>{t('agentActivity.title')} <span>{run.status === 'running' ? t('agentActivity.runningNow') : runSummary(run, t)}</span></div>
    <TraceSteps run={run}/>
    </div>
    {!!sources.length && <div className={`${classes.traceContent} ${classes.sourceSummary}`}><strong>{t('agentActivity.sources')}</strong><ul>{sources.map(source => <li key={source.name} data-status={source.status}><span>{source.name}</span><small>{t(statusLabels[source.status])} · {t('agentActivity.calls', { count: source.calls })}</small></li>)}</ul></div>}
  </div>;
}
