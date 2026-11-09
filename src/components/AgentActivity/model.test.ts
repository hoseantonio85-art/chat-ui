import { describe, it, expect } from 'vitest';
import { activityLabel, appendEvent, callDuration, createRun, hasTrace, openCalls, runSummary, sourcesForRun, traceSteps, type AgentEvent } from './model';
const event = (id: string, kind: AgentEvent['kind'], extra: Partial<AgentEvent> = {}): AgentEvent => ({ id, kind, runId: 'run', at: 1000, ...extra });
describe('UI run protocol', () => {
  it('isolates runs and deduplicates reconnect replay', () => {
    const initial = createRun('run', 'request', 0);
    const first = event('a', 'thinking', { text: 'public trace' });
    const run = appendEvent(initial, first);
    expect(appendEvent(run, first)).toBe(run);
    expect(appendEvent(run, { ...first, id: 'b', runId: 'another' })).toBe(run);
  });
  it('keeps full payload and nested parent correlation', () => {
    const payload = 'x'.repeat(4000);
    const run = appendEvent(createRun('run', 'request', 0), event('a', 'toolResult', {parentCallId: 'expert', result: payload}));
    expect(run.events[0].result).toBe(payload);
    expect(run.events[0].parentCallId).toBe('expert');
  });
  it('keeps a source error visible after a successful call and continues the run', () => {
    let run = createRun('run', 'request', 0);
    for (const e of [event('a', 'toolCall', {callId: '1', source: 'Реестр'}), event('b', 'error', {callId: '1'}), event('c', 'toolCall', {callId: '2', source: 'Реестр'}), event('d', 'toolResult', {callId: '2'})]) run = appendEvent(run, e);
    expect(run.status).toBe('running');
    expect(sourcesForRun(run)).toEqual([{name: 'Реестр', status: 'error', calls: 2}]);
    expect(runSummary(run)).toContain('с замечаниями: 1');
  });
  it('distinguishes empty from error and counts only successfully checked sources', () => {
    let run = createRun('run', 'request', 0);
    for (const e of [event('a', 'toolCall', {callId: '1', source: 'Компания', tool: 'get_company_profile'}), event('b', 'empty', {callId: '1'}), event('c', 'finish', {at: 12000})]) run = appendEvent(run, e);
    expect(sourcesForRun(run)[0].status).toBe('empty');
    expect(runSummary(run)).toContain('0/1');
    expect(runSummary(run)).not.toMatch(/\d+ с(?:\s|$)/);
    expect(appendEvent(run, event('late', 'toolCall'))).toBe(run);
  });
  it('terminates on fatal error without claiming a completed answer', () => {
    const run = appendEvent(createRun('run', 'request', 0), event('a', 'error', {fatal: true}));
    expect(run.status).toBe('failed');
    expect(runSummary(run)).toContain('Прогон прерван');
  });
  it('uses the thinking status between calls, including when the plan completes', () => {
    let run = createRun('run', 'request', 0);
    run = appendEvent(run, event('done', 'plan', {todos: [
      {content: 'Проверить источник', status: 'completed'},
      {content: 'Подготовить ответ', status: 'completed'},
    ]}));
    expect(activityLabel(run)).toBe('Думаю');
    const storedRun = {...run, currentActivity: 'Старая подпись из истории'};
    expect(activityLabel(storedRun)).toBe('Думаю');
  });
  it('keeps each parallel call active until its outcome and freezes its own timer', () => {
    const first = event('first', 'toolCall', {callId: 'profile'});
    const second = event('second', 'toolCall', {callId: 'risks', at: 1600});
    const expert = event('expert', 'delegation', {callId: 'expert', at: 1800});
    let run = [first, second, expert].reduce(appendEvent, createRun('run', 'request', 0));
    expect(activityLabel(run)).toBe('Делегирую');
    expect(openCalls(run)).toEqual([first, second, expert]);
    expect(callDuration(run, second, 3700)).toBe('2 с');

    run = appendEvent(run, event('profile-error', 'error', {callId: 'profile', at: 3900}));
    expect(openCalls(run)).toEqual([second, expert]);
    expect(callDuration(run, first, 9000)).toBe('2 с');
    run = appendEvent(run, event('expert-result', 'handback', {callId: 'expert', parentCallId: 'expert', at: 4700}));
    expect(activityLabel(run)).toBe('Собираю источники');
    expect(callDuration(run, expert, 9000)).toBe('2 с');
    run = appendEvent(run, event('finished', 'finish', {at: 5000}));
    expect(openCalls(run)).toEqual([]);
    expect(callDuration(run, second, 9000)).toBe('3 с');
  });
  it('keeps a public detail attached to its own step through interleaved events', () => {
    const raw = event('raw', 'thinking', {text: 'private reasoning'});
    let run = appendEvent(createRun('run', 'request', 0), raw);
    expect(hasTrace(run)).toBe(false);
    expect(traceSteps(run)).toEqual([]);

    const delta = event('part-one', 'thinking', {progressDelta: {stepId: 'target', text: 'Проверяю профиль.'}});
    run = appendEvent(run, delta);
    expect(traceSteps(run)[0].event).toBe(delta);
    const unrelated = event('other', 'toolCall', {callId: 'other'});
    const target = event('target', 'toolCall', {callId: 'profile'});
    run = [
      unrelated,
      event('part-two', 'thinking', {progressDelta: {stepId: 'target', text: ' Сверяю данные.'}}),
      target,
      event('expert-detail', 'thinking', {parentCallId: 'expert', progressDelta: {text: 'Работа эксперта.'}}),
      event('final-detail', 'thinking', {progressDelta: {text: 'Готовлю выводы.'}}),
      event('finish', 'finish'),
    ].reduce(appendEvent, run);
    expect(traceSteps(run).map(step => step.event.id)).toEqual(['other', 'target', 'final-detail']);
    expect(traceSteps(run)[1].detail).toMatchObject({event: delta, text: 'Проверяю профиль. Сверяю данные.'});
    expect(traceSteps(run, 'expert')[0].detail?.text).toBe('Работа эксперта.');
  });
  it('shows one row per call and keeps service steps and nested expert work accessible', () => {
    const run = [
      event('profile', 'toolCall', {callId: 'profile'}),
      event('risks', 'toolCall', {callId: 'risks'}),
      event('profile-result', 'toolResult', {callId: 'profile'}),
      event('unlabeled', 'message', {text: 'Промежуточная реплика'}),
      event('risks-error', 'error', {callId: 'risks', text: 'Источник не ответил'}),
      event('expert', 'delegation', {callId: 'expert'}),
      event('expert-note', 'message', {parentCallId: 'expert', text: 'Проверяю критерии'}),
      event('handback', 'handback', {callId: 'expert', parentCallId: 'expert'}),
      event('service-step', 'message', {label: 'Сверяю документ с требованиями'}),
    ].reduce(appendEvent, createRun('run', 'request', 0));

    expect(traceSteps(run).map(step => [step.event.id, step.outcome?.id])).toEqual([
      ['profile', 'profile-result'], ['risks', 'risks-error'], ['expert', 'handback'], ['service-step', undefined],
    ]);
    expect(traceSteps(run, 'expert').map(step => step.event.id)).toEqual(['expert-note']);
  });
  it('summarizes backend text steps without inventing source-call counts', () => {
    let run = createRun('run', 'request', 0);
    run = appendEvent(run, event('step', 'message', {label: 'Посмотрел профиль компании'}));
    run = appendEvent(run, event('finish', 'finish', {at: 2000}));
    expect(runSummary(run)).toBe('Ответ готов');
  });
});
