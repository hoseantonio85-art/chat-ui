import { describe, expect, it } from 'vitest';
import { createAtlasPreview, type AtlasPreviewThread } from './atlasPreview';

const baseThreads = (): AtlasPreviewThread[] => [
  {
    id: 'vnd',
    title: 'Проверка ВНД',
    scenario: 'vnd',
    pinned: true,
    updatedAt: 1,
    runs: {},
    vndStage: 'start',
    messages: [],
  },
  {
    id: 'risk',
    title: 'Анализ рисков компании',
    scenario: 'normal',
    pinned: true,
    updatedAt: 2,
    runs: {},
    messages: [],
  },
];

const memory = ['Первый факт', 'Второй факт', 'Третий факт'];

describe('atlas live preview states', () => {
  it('builds a running VND state with a pending activity run', () => {
    const preview = createAtlasPreview('vnd.running', baseThreads(), memory);
    const vnd = preview?.threads.find(thread => thread.id === 'vnd');

    expect(preview?.activeThreadId).toBe('vnd');
    expect(preview?.scenario).toBe('vndBackground');
    expect(vnd?.jobState).toBe('running');
    expect(vnd?.agentState).toBe('running');
    expect(vnd?.pinned).toBe(false);
    expect(Object.keys(vnd?.runs ?? {})).toEqual(['atlas-vnd-running']);
    expect(vnd?.messages.at(-1)?.extras?.agentPending).toBe('true');
  });

  it('keeps a completed VND result unread while another thread is active', () => {
    const preview = createAtlasPreview('vnd.unread', baseThreads(), memory);
    const vnd = preview?.threads.find(thread => thread.id === 'vnd');

    expect(preview?.activeThreadId).toBe('risk');
    expect(preview?.drawer).toBe('history');
    expect(vnd).toMatchObject({ jobState: 'ready', agentState: 'ready', agentUnread: true });
  });

  it('builds result and saved chat states without timers', () => {
    const result = createAtlasPreview('vnd.result', baseThreads(), memory);
    const saved = createAtlasPreview('vnd.saved', baseThreads(), memory);

    expect(result?.threads.find(thread => thread.id === 'vnd')?.messages.at(-1)?.text).toContain('Проверка завершена');
    expect(saved?.threads.find(thread => thread.id === 'vnd')).toMatchObject({ jobState: 'saved' });
    expect(saved?.threads.find(thread => thread.id === 'vnd')?.messages.at(-1)?.text).toContain('Сохранил');
  });

  it('opens deterministic settings layers and removes one fact in the updated state', () => {
    expect(createAtlasPreview('settings.history', baseThreads(), memory)?.drawer).toBe('history');
    expect(createAtlasPreview('settings.overview', baseThreads(), memory)?.drawer).toBe('settings');
    expect(createAtlasPreview('settings.confirm', baseThreads(), memory)?.drawer).toBe('memory-confirm');
    const settingsSteps = ['settings.history', 'settings.overview', 'settings.confirm', 'settings.updated'];
    for (const step of settingsSteps) {
      const settingsVnd = createAtlasPreview(step, baseThreads(), memory)?.threads.find(thread => thread.id === 'vnd');
      expect(settingsVnd?.jobState).toBe('saved');
      expect(settingsVnd?.messages.at(-1)?.text).toContain('Сохранил');
      expect(settingsVnd?.messages.some(message => message.extras?.agentPending === 'true')).toBe(false);
    }
    const updated = createAtlasPreview('settings.updated', baseThreads(), memory);
    expect(updated?.agentMemory).toEqual(['Второй факт', 'Третий факт']);
    expect(updated?.drawerFocus).toBe('memory-heading');
  });

  it('normalizes history timestamps independently of wall-clock input', () => {
    const first = createAtlasPreview('vnd.history-running', baseThreads(), memory);
    const changedBase = baseThreads().map((thread, index) => ({ ...thread, updatedAt: Date.now() + index * 999_999 }));
    const second = createAtlasPreview('vnd.history-running', changedBase, memory);

    expect(first?.threads.map(thread => [thread.id, thread.updatedAt]))
      .toEqual(second?.threads.map(thread => [thread.id, thread.updatedAt]));
  });

  it('rejects unknown steps instead of inventing a live state', () => {
    expect(createAtlasPreview('missing.step', baseThreads(), memory)).toBeUndefined();
  });
});
