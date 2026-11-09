import { type ReactNode, useEffect, useId, useState } from 'react';
import { EIconName, Icon } from '@sber-orm/ui-kit';
import { type AgentEvent, type AgentRun, callDuration, openCalls, runSummary, sourcesForRun, traceSteps } from './model';
import classes from './styles.module.scss';
const names: Record<AgentEvent['kind'], string> = {
  thinking: 'Обдумывание', message: 'Промежуточная реплика', plan: 'План · write_todos', toolCall: 'Вызов источника', toolResult: 'Результат', delegation: 'Делегирование', handback: 'Возврат эксперта', error: 'Ошибка источника', empty: 'Ничего не найдено', finish: 'Завершено',
};
const statusLabels = { running: 'Выполняется', success: 'Завершён', empty: 'Нет данных', error: 'Недоступен' };
const marks = { pending: 'Ожидает', in_progress: 'В работе', completed: 'Готово' };
const iconByKind: Record<AgentEvent['kind'], EIconName> = {
  thinking: EIconName.clock, message: EIconName.fill, plan: EIconName.taskList, toolCall: EIconName.taskSearch, toolResult: EIconName.success, delegation: EIconName.users, handback: EIconName.userSwap, error: EIconName.errorRounded, empty: EIconName.warningRounded, finish: EIconName.check,
};

function StepDetail({ title, text, header }: { title: string; text: string; header: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const detailId = useId();
  return <>
    <button type="button" className={`${classes.stepHeader} ${classes.detailToggle}`} aria-expanded={expanded}
      aria-controls={detailId} aria-label={`${title} · подробности`} onClick={() => setExpanded(value => !value)}>
      {header}<Icon className={classes.chevron} name={expanded ? EIconName.chevronFillUp : EIconName.chevronFillDown} width={16} height={16}/>
    </button>
    <p id={detailId} hidden={!expanded}>{text}</p>
  </>;
}

function TraceSteps({ run, activeIds, now, parent }: { run: AgentRun; activeIds: ReadonlySet<string>; now: number; parent?: string }) {
  return <ol className={classes.trace}>
    {traceSteps(run, parent).map(({ event, detail }) => {
      const pendingDetail = event.kind === 'thinking';
      const text = pendingDetail || event.kind === 'toolResult' ? undefined : event.text;
      const lines = text?.split('\n').map(line => line.trim()).filter(Boolean) || [];
      const bulletItems = event.kind !== 'toolResult' && lines.length > 1 && lines.every(line => /^[✓→•]\s+/.test(line))
        ? lines.map(line => line.replace(/^[✓→•]\s+/, ''))
        : null;
      const title = pendingDetail
        ? detail?.event.progressDelta?.stepId ? 'Подготовка шага' : 'Подготовка ответа'
        : event.label || ((event.kind === 'toolCall' || event.kind === 'delegation') && event.source) || names[event.kind];
      const active = activeIds.has(event.id) || (pendingDetail && !!detail && activeIds.has(detail.lastId));
      const duration = event.callId && (event.kind === 'toolCall' || event.kind === 'delegation') ? callDuration(run, event, now) : undefined;
      const header = <><Icon className={classes.marker} name={iconByKind[event.kind]} width={16} height={16}/><strong>{title}</strong></>;
      return <li key={detail?.event.id ?? event.id} className={classes.step} data-kind={event.kind} data-active={active} tabIndex={detail ? undefined : 0}>
      <div className={classes.stepHeading}>
        {detail ? <StepDetail title={title} text={detail.text} header={header}/> : <div className={classes.stepHeader}>{header}</div>}
        {duration && <small className={classes.duration} aria-label={`Длительность: ${duration}`}>{duration}</small>}
        {active && duration && <small className={classes.callState}>В работе</small>}
      </div>
      {!pendingDetail && (event.source || event.tool) && <div className={classes.meta}>{event.source}{event.source && event.tool ? ' · ' : ''}<code>{event.tool}</code></div>}
      {bulletItems ? <ul className={classes.backendPlan}>{bulletItems.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul>
        : text && <p>{text}</p>}
      {!pendingDetail && event.todos && <ul className={classes.plan}>{event.todos.map((todo, index) => <li key={`${index}-${todo.content}`} data-status={todo.status}><span>{todo.content}</span><small>{marks[todo.status]}</small></li>)}</ul>}
      {event.kind === 'delegation' && event.callId && <TraceSteps run={run} activeIds={activeIds} now={now} parent={event.callId}/>}
    </li>})}
  </ol>;
}

/** Presentation-only trace, reusable inside an inline disclosure or drawer. */
export function AgentTrace({ run }: { run: AgentRun }) {
  const sources = sourcesForRun(run);
  const calls = openCalls(run);
  const ticking = calls.length > 0;
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!ticking) return;
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [ticking]);
  const activeIds = new Set(calls.map(call => call.id));
  if (run.status === 'running' && !ticking) {
    const latest = run.events.slice().reverse().find(event => event.kind !== 'thinking' || event.progressDelta?.text);
    if (latest && (latest.kind === 'plan' || latest.kind === 'message' || latest.kind === 'thinking')) activeIds.add(latest.id);
  }
  return <div className={classes.traceIslands}>
    <div className={classes.traceContent}>
    <div className={classes.traceTitle}>Ход работы <span>{run.status === 'running' ? 'Выполняется сейчас' : runSummary(run)}</span></div>
    <TraceSteps key={run.runId} run={run} activeIds={activeIds} now={now}/>
    </div>
    {!!sources.length && <div className={`${classes.traceContent} ${classes.sourceSummary}`}><strong>Источники</strong><ul>{sources.map(source => <li key={source.name} data-status={source.status}><span>{source.name}</span><small>{statusLabels[source.status]} · {source.calls} обр.</small></li>)}</ul></div>}
  </div>;
}
