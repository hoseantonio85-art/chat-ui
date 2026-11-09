import { type ReactNode, useEffect, useId, useState } from 'react';
import { EIconName, Icon } from '@sber-orm/ui-kit';
import { type AgentEvent, type AgentRun, callDuration, callTitle, formatDuration, openCalls, runSummary, sourcesForRun, traceSteps } from './model';
import classes from './styles.module.scss';
const names: Record<AgentEvent['kind'], string> = {
  thinking: 'Думаю', message: 'Промежуточная реплика', plan: 'План', toolCall: 'Вызов источника', toolResult: 'Результат', delegation: 'Делегирование', handback: 'Возврат эксперта', error: 'Ошибка источника', empty: 'Ничего не найдено', finish: 'Завершено',
};
const statusLabels = { running: 'Выполняется', success: 'Завершён', empty: 'Нет данных', error: 'Недоступен' };
const marks = { pending: 'Ожидает', in_progress: 'В работе', completed: 'Готово' };
const iconByKind: Record<AgentEvent['kind'], EIconName> = {
  thinking: EIconName.clock, message: EIconName.fill, plan: EIconName.taskList, toolCall: EIconName.taskSearch, toolResult: EIconName.success, delegation: EIconName.users, handback: EIconName.userSwap, error: EIconName.errorRounded, empty: EIconName.warningRounded, finish: EIconName.check,
};

function StepDetail({ title, children, header }: { title: string; children: ReactNode; header: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const detailId = useId();
  return <>
    <button type="button" className={`${classes.stepHeader} ${classes.detailToggle}`} aria-expanded={expanded}
      aria-controls={detailId} aria-label={`${title} · подробности`} onClick={() => setExpanded(value => !value)}>
      {header}<Icon className={classes.chevron} name={expanded ? EIconName.chevronFillUp : EIconName.chevronFillDown} width={16} height={16}/>
    </button>
    <div id={detailId} hidden={!expanded} className={classes.stepDetails}>{children}</div>
  </>;
}

function TraceSteps({ run, activeIds, now, parent }: { run: AgentRun; activeIds: ReadonlySet<string>; now: number; parent?: string }) {
  return <ol className={classes.trace}>
    {traceSteps(run, parent).map(({ event, detail, outcome }) => {
      const pendingDetail = event.kind === 'thinking';
      const isCall = event.kind === 'toolCall' || event.kind === 'delegation';
      const text = pendingDetail || isCall ? undefined : event.text;
      const lines = text?.split('\n').map(line => line.trim()).filter(Boolean) || [];
      const bulletItems = lines.length > 1 && lines.every(line => /^[✓→•]\s+/.test(line))
        ? lines.map(line => line.replace(/^[✓→•]\s+/, ''))
        : null;
      const warning = outcome?.kind === 'error' || outcome?.kind === 'empty' ? outcome : undefined;
      const suffix = warning?.kind === 'error' ? ' — недоступен' : warning ? ' — нет данных' : '';
      const title = isCall ? `${callTitle(event)}${suffix}`
        : pendingDetail && run.status !== 'running' ? 'Итоговое рассуждение'
        : event.label || names[event.kind];
      const active = activeIds.has(event.id) || (pendingDetail && !!detail && activeIds.has(detail.lastId));
      const duration = isCall && event.callId ? callDuration(run, event, now) : undefined;
      const expertCallId = event.kind === 'delegation' ? event.callId : undefined;
      const hasNested = expertCallId && traceSteps(run, expertCallId).length > 0;
      const outcomeText = warning?.text || (outcome?.kind === 'handback' ? outcome.text : undefined);
      const expandable = !!(detail || hasNested || outcomeText);
      const displayKind = warning?.kind ?? event.kind;
      const header = <><Icon className={classes.marker} name={iconByKind[displayKind]} width={16} height={16}/><strong>{title}</strong>
        {duration && <small className={classes.duration}>{duration}</small>}
      </>;
      return <li key={detail?.event.id ?? event.id} className={classes.step} data-kind={displayKind} data-active={active} tabIndex={expandable ? undefined : 0}>
      {expandable ? <StepDetail title={title} header={header}>
          {detail && <p>{detail.text}</p>}
          {hasNested && <TraceSteps run={run} activeIds={activeIds} now={now} parent={expertCallId}/>}
          {outcomeText && <p>{outcomeText}</p>}
      </StepDetail> : <div className={classes.stepHeader}>{header}</div>}
      {bulletItems ? <ul className={classes.backendPlan}>{bulletItems.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul>
        : text && <p>{text}</p>}
      {!pendingDetail && event.todos && <ul className={classes.plan}>{event.todos.map((todo, index) => <li key={`${index}-${todo.content}`} data-status={todo.status}><span>{todo.content}</span><small>{marks[todo.status]}</small></li>)}</ul>}
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
    const latest = traceSteps(run).at(-1);
    if (latest) activeIds.add(latest.event.id);
  }
  const status = run.status === 'running' ? 'Выполняется сейчас' : run.status === 'failed' ? 'Прогон прерван'
    : run.finishedAt === undefined ? 'Ответ готов' : `Ответ готов за ${formatDuration(run.finishedAt - run.startedAt)}`;
  return <div className={classes.traceIslands}>
    <div className={classes.traceContent}>
    <div className={classes.traceTitle}>Ход работы
      {sources.length > 0 ? <details className={classes.sourceSummary}>
        <summary aria-label={`${status} · Источники`}>{status}</summary>
        {run.status !== 'running' && <span>{runSummary(run)}</span>}
        <ul>{sources.map(source => <li key={source.name} data-status={source.status}><span>{source.name}</span><small>{statusLabels[source.status]} · {source.calls} обр.</small></li>)}</ul>
      </details> : <span>{status}</span>}
    </div>
    <TraceSteps key={run.runId} run={run} activeIds={activeIds} now={now}/>
    </div>
  </div>;
}
