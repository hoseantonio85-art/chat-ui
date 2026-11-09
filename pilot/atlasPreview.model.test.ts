import { describe, expect, it } from 'vitest';
import { createAtlasPreview, type AtlasPreviewThread } from './atlasPreview';
import { traceSteps } from '../src/components/AgentActivity/model';
import { scenarios as mapScenarios } from './scenario-map/model';

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
    const run = vnd!.runs['atlas-vnd-running'];
    expect(traceSteps(run)).toMatchObject([{
      event: {kind: 'message', label: 'Проверяю ВНД по групповому стандарту'},
      detail: {text: expect.stringContaining('в фоне')},
    }]);
    expect(run.events.some(event => event.todos?.length)).toBe(false);
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

  it('builds conversational CSI branches without a review or consent state', () => {
    const prompt = createAtlasPreview('csi.prompt', baseThreads(), memory);
    const low = createAtlasPreview('csi.low', baseThreads(), memory);
    const neutral = createAtlasPreview('csi.neutral', baseThreads(), memory);
    const high = createAtlasPreview('csi.high', baseThreads(), memory);
    const saved = createAtlasPreview('csi.saved', baseThreads(), memory);
    const skipped = createAtlasPreview('csi.skipped', baseThreads(), memory);
    const failed = createAtlasPreview('csi.error', baseThreads(), memory);
    const declined = createAtlasPreview('csi.declined', baseThreads(), memory);

    expect(prompt?.scenario).toBe('csiProactive');
    expect(prompt?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft?.stage).toBe('rating');
    expect(low?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft?.rating?.value).toBe(1);
    expect(low?.threads.find(thread => thread.id === 'vnd')?.messages.at(-1)?.text).toContain('что помешало');
    expect(neutral?.threads.find(thread => thread.id === 'vnd')?.messages.at(-1)?.text).toContain('Что стоит улучшить');
    expect(high?.threads.find(thread => thread.id === 'vnd')?.messages.at(-1)?.text).toContain('Что понравилось');

    const savedThread = saved?.threads.find(thread => thread.id === 'vnd');
    expect(savedThread?.feedbackDraft).toMatchObject({ stage: 'submitted', status: 'submitted', mockSaveCount: 1 });
    expect(savedThread?.feedbackDraft?.rawMessages.map(message => message.text)).toEqual([
      '5 из 5',
      'Не сразу понял, где смотреть результат проверки.',
    ]);
    expect(savedThread?.messages.some(message => message.extras?.feedbackAddon === 'csi-review')).toBe(false);
    expect(savedThread?.messages.at(-1)?.text).toContain('оценка и комментарий сохранены');
    expect(skipped?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft?.rawMessages.map(message => message.text)).toEqual(['3 из 5']);
    expect(failed?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ stage: 'error', status: 'error', mockSaveCount: 1 });
    expect(declined?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ stage: 'cancelled', status: 'cancelled', mockSaveCount: 0 });
  });

  it('builds direct CSI with known and unknown services', () => {
    const known = createAtlasPreview('csi-direct.known', baseThreads(), memory);
    const service = createAtlasPreview('csi-direct.service', baseThreads(), memory);
    const rating = createAtlasPreview('csi-direct.rating', baseThreads(), memory);
    const saved = createAtlasPreview('csi-direct.saved', baseThreads(), memory);

    expect(known?.scenario).toBe('csiDirect');
    expect(service?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ stage: 'service', serviceId: null });
    expect(rating?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ stage: 'rating', serviceId: 'vnd-check' });
    expect(saved?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ stage: 'submitted', status: 'submitted' });
  });

  it('builds complaint, help, clarification, idea and praise branches', () => {
    const complaint = createAtlasPreview('feedback.complaint', baseThreads(), memory);
    const help = createAtlasPreview('feedback.help', baseThreads(), memory);
    const clarify = createAtlasPreview('feedback.clarify', baseThreads(), memory);
    const clarified = createAtlasPreview('feedback.clarified', baseThreads(), memory);
    const idea = createAtlasPreview('feedback.idea', baseThreads(), memory);
    const ideaClarify = createAtlasPreview('feedback.idea-clarify', baseThreads(), memory);
    const praise = createAtlasPreview('feedback.praise', baseThreads(), memory);
    const error = createAtlasPreview('feedback.error', baseThreads(), memory);

    expect(complaint?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ kind: 'complaint', status: 'submitted' });
    expect(help?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toBeUndefined();
    expect(help?.threads.find(thread => thread.id === 'vnd')?.messages.at(-1)?.text).toContain('не записывал это как жалобу');
    expect(clarify?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ kind: 'complaint', stage: 'clarification', clarificationCount: 0 });
    expect(clarified?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft?.rawMessages.map(message => message.text)).toEqual([
      'После возврата всё сбросилось.',
      'В сервисе проверки ВНД.',
    ]);
    expect(idea?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ kind: 'idea', status: 'submitted' });
    expect(ideaClarify?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ kind: 'idea', stage: 'clarification' });
    expect(praise?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ kind: 'praise', status: 'submitted' });
    expect(error?.threads.find(thread => thread.id === 'vnd')?.feedbackDraft).toMatchObject({ status: 'error', mockSaveCount: 1 });
  });

  it('redirects legacy CSI review links to the conversational saved state', () => {
    expect(createAtlasPreview('csi.review', baseThreads(), memory)?.stepId).toBe('csi.saved');
    expect(createAtlasPreview('csi.edited', baseThreads(), memory)?.stepId).toBe('csi.saved');
  });

  it('rejects unknown steps instead of inventing a live state', () => {
    expect(createAtlasPreview('missing.step', baseThreads(), memory)).toBeUndefined();
  });

  it('provides a deterministic live state for every map step', () => {
    for (const step of mapScenarios.flatMap(scenario => scenario.steps)) {
      expect(createAtlasPreview(step.id, baseThreads(), memory), step.id).toBeDefined();
    }
  });
});
