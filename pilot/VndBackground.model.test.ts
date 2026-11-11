import { describe, expect, it } from 'vitest';
import {
  applyVndBackgroundEvent,
  canResolveVndAttachmentLookup,
  parseVndSaveIntent,
  type VndBackgroundThreadState,
} from './VndBackground.model';

interface TestThread extends VndBackgroundThreadState {
  id: string;
  title: string;
}

const thread = (overrides: Partial<TestThread> = {}): TestThread => ({
  id: 'vnd',
  title: 'Проверка ВНД',
  updatedAt: 1,
  messages: [],
  ...overrides,
});

describe('parseVndSaveIntent', () => {
  it.each([
    ['Да', 'Операционные риски'],
    ['Да, сохраняй', 'Операционные риски'],
    ['Да, сохранить', 'Операционные риски'],
    ['Да пожалуйста', 'Операционные риски'],
    ['Хорошо, сохраняй', 'Операционные риски'],
    ['Ок, сохраняй', 'Операционные риски'],
    ['Сохрани', 'Операционные риски'],
    ['Методология', 'Методология'],
    ['В папку «Методология»', 'Методология'],
    ['  «Внутренние нормативные документы»  ', 'Внутренние нормативные документы'],
    ['Сохрани в папку «Методология»', 'Методология'],
  ])('recognizes save request %j', (input, folder) => {
    expect(parseVndSaveIntent(input)).toEqual({ kind: 'save', folder });
  });

  it.each([
    'Нет',
    'Не сейчас',
    'Не сохраняй',
    'Не сохранить',
    'Я не хочу сохранять',
    'Пожалуйста, не сохранить',
    'Я не даю согласия на то, чтобы сохранить',
    'Я не хочу, чтобы ты сейчас решил сохранить',
    'Сохранить? Нет',
    'Да, нет',
    'Хорошо, отмена',
    'Ок, не согласен',
    'Да, но не сейчас',
    'Не сохраняй в папку «Методология»',
    'Пока не сохраняй',
    'Отмена',
  ])('gives refusal precedence for %j', input => {
    expect(parseVndSaveIntent(input)).toEqual({ kind: 'decline' });
  });

  it.each([
    'Что находится в папке Методология?',
    'нетерпение',
    'Расскажи подробнее',
    'Что мне делать, если я не уверен?',
    'Сохранить?',
    'Как сохранить ВНД?',
    'Сохрани в папку «Другое»',
  ])('leaves unrelated text unknown for %j', input => {
    expect(parseVndSaveIntent(input)).toEqual({ kind: 'unknown' });
  });

  it('recognizes requests to reopen the save choices and open the folder dialog', () => {
    expect(parseVndSaveIntent('Вернуться к сохранению')).toEqual({ kind: 'resume' });
    expect(parseVndSaveIntent('Выбрать другую папку')).toEqual({ kind: 'chooseFolder' });
  });
});

it('saves a deferred foreground review once and keeps the checked document attached to the record', () => {
  const source = [thread({ vndStage: 'saveDeferred', documentIds: '["corrected"]' })];
  const event = { type: 'save', folder: 'Методология', at: 2 } as const;
  const saved = applyVndBackgroundEvent(source, 'vnd', event);
  expect(saved[0]).toMatchObject({ jobState: 'saved', documentIds: '["corrected"]', folder: 'Методология' });
  expect(applyVndBackgroundEvent(saved, 'vnd', { ...event, folder: 'Операционные риски' })).toBe(saved);
});

describe('canResolveVndAttachmentLookup', () => {
  const waitingThread = { scenario: 'vndBackground', vndStage: 'chooseStandard', jobState: undefined };

  it('allows the current lookup after switching away from its thread', () => {
    expect(canResolveVndAttachmentLookup('lookup-1', 'lookup-1', waitingThread)).toBe(true);
    expect(canResolveVndAttachmentLookup('lookup-1', 'lookup-1', { ...waitingThread, scenario: 'vndBackgroundToBe' })).toBe(true);
  });

  it('rejects a stale lookup after the scenario was restarted', () => {
    expect(canResolveVndAttachmentLookup('lookup-2', 'lookup-1', waitingThread)).toBe(false);
    expect(canResolveVndAttachmentLookup('lookup-1', 'lookup-1', { ...waitingThread, vndStage: 'start' })).toBe(false);
  });

  it('rejects a lookup after the thread changed scenario or already started', () => {
    expect(canResolveVndAttachmentLookup('lookup-1', 'lookup-1', { ...waitingThread, scenario: 'ordinary' })).toBe(false);
    expect(canResolveVndAttachmentLookup('lookup-1', 'lookup-1', { ...waitingThread, jobState: 'running' })).toBe(false);
  });
});

describe('applyVndBackgroundEvent', () => {
  it('starts the target thread and keeps pending activity with an inactive chat', () => {
    const other = thread({ id: 'other', title: 'Другой чат' });
    const pending = { id: 'pending', extras: { agentPending: 'true' } };
    const result = applyVndBackgroundEvent([
      thread({ jobState: 'saved', folder: 'Методология', unread: true }),
      other,
    ], 'vnd', {
      type: 'start',
      documentIds: '["draft"]',
      documentName: 'Регламент.docx',
      message: pending,
      at: 10,
    });

    expect(result[0]).toMatchObject({
      jobState: 'running',
      agentState: 'running',
      agentUnread: false,
      documentIds: '["draft"]',
      documentName: 'Регламент.docx',
      unread: false,
      updatedAt: 10,
    });
    expect(result[0].folder).toBeUndefined();
    expect(result[0].messages).toEqual([pending]);
    expect(result[1]).toBe(other);
  });

  it('completes an inactive thread exactly once and stores its result', () => {
    const messages = [{ id: 'result', text: 'Готово' }, { id: 'save-prompt', text: 'Сохранить ВНД?' }];
    const running = thread({ jobState: 'running' });
    const first = applyVndBackgroundEvent([running], 'vnd', {
      type: 'complete',
      unread: true,
      messages,
      at: 20,
    });
    const second = applyVndBackgroundEvent(first, 'vnd', {
      type: 'complete',
      unread: true,
      messages,
      at: 21,
    });

    expect(first[0]).toMatchObject({
      jobState: 'ready', unread: true,
      agentState: 'ready', agentUnread: true,
      updatedAt: 20,
    });
    expect(first[0].messages).toEqual(messages);
    expect(second).toBe(first);
  });

  it('marks a result read without changing its content or state', () => {
    const ready = thread({ jobState: 'ready', unread: true, agentState: 'ready', agentUnread: true, documentName: 'Регламент.docx', messages: [{ id: 'result' }] });
    const result = applyVndBackgroundEvent([ready], 'vnd', { type: 'markRead' });

    expect(result[0]).toEqual({ ...ready, unread: false, agentUnread: false });
  });

  it('saves only a ready result into the selected folder', () => {
    const ready = thread({ jobState: 'ready', unread: true });
    const running = thread({ id: 'running', jobState: 'running' });
    const saved = applyVndBackgroundEvent([ready, running], 'vnd', {
      type: 'save',
      folder: 'Методология',
      at: 30,
    });
    const unchanged = applyVndBackgroundEvent(saved, 'running', {
      type: 'save',
      folder: 'Методология',
      at: 31,
    });

    expect(saved[0]).toMatchObject({ jobState: 'saved', folder: 'Методология', unread: false, agentUnread: false, updatedAt: 30 });
    expect(unchanged).toBe(saved);
  });

  it('ignores events for missing threads', () => {
    const threads = [thread()];
    expect(applyVndBackgroundEvent(threads, 'missing', { type: 'markRead' })).toBe(threads);
  });
});
