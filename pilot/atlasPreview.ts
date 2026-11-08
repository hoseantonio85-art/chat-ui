import type { IMessage } from '@/types';
import { ERoles } from '@/types';
import { appendEvent, createRun, type AgentRun } from '../src/components/AgentActivity/model';
import type { BackgroundThread } from './VndBackground';
import { type ScenarioId, vndStandardPrompt } from './scenarios';

export type AtlasDrawerState = 'history' | 'settings' | 'memory-confirm';
export type AtlasStepId =
  | 'vnd.start'
  | 'vnd.running'
  | 'vnd.history-running'
  | 'vnd.unread'
  | 'vnd.result'
  | 'vnd.saved'
  | 'settings.history'
  | 'settings.overview'
  | 'settings.confirm'
  | 'settings.updated';

type VndStage = 'start' | 'chooseStandard' | 'reviewed' | 'complete';

export interface AtlasPreviewThread extends BackgroundThread {
  scenario: ScenarioId;
  messages: IMessage[];
  runs: Record<string, AgentRun>;
  vndStage?: VndStage;
}

export interface AtlasPreview {
  stepId: AtlasStepId;
  threads: AtlasPreviewThread[];
  activeThreadId: string;
  scenario: ScenarioId;
  agentMemory: string[];
  drawer?: AtlasDrawerState;
  drawerFocus?: 'memory-heading';
}

const previewTime = Date.parse('2026-11-08T06:00:00.000Z');
const at = (seconds: number) => new Date(previewTime + seconds * 1_000).toISOString();
const stableThreadOffsets: Record<string, number> = {
  vnd: 0,
  risk: 8 * 60_000,
  registration: 22 * 60_000,
  expert: 65 * 60_000,
  registry: 45 * 24 * 60 * 60_000,
  finance: 90 * 24 * 60 * 60_000,
};

const startMessage: IMessage = {
  id: 'atlas-vnd-welcome',
  role: ERoles.bot,
  text: 'Здравствуйте! Я помогу проверить ваш ВНД на соответствие стандартам группы. Прикрепите документ — затем я предложу выбрать групповой стандарт для проверки.',
  timeCreated: at(0),
};
const requestMessage: IMessage = {
  id: 'atlas-vnd-request',
  role: ERoles.user,
  text: 'Проверь ВНД на соответствие стандартам группы.',
  timeCreated: at(1),
  extras: { fileIds: '["vnd-draft"]' },
};
const standardMessage: IMessage = {
  id: 'atlas-vnd-standard',
  role: ERoles.bot,
  text: vndStandardPrompt,
  timeCreated: at(2),
};
const choiceMessage: IMessage = {
  id: 'atlas-vnd-choice',
  role: ERoles.user,
  text: '2',
  timeCreated: at(3),
};
const pendingMessage: IMessage = {
  id: 'atlas-vnd-running',
  role: ERoles.bot,
  text: '',
  extras: { agentPending: 'true' },
  timeCreated: at(4),
};
const resultMessage: IMessage = {
  id: 'atlas-vnd-result',
  role: ERoles.bot,
  text: '**Проверка завершена.** Отклонений от выбранного группового стандарта не найдено.\n\nПредлагаю сохранить актуальный ВНД в базу знаний, в папку «Операционные риски». **Напишите «Да»**, чтобы подтвердить, или укажите другую папку: «Внутренние нормативные документы» или «Методология».',
  timeCreated: at(10),
};
const saveRequestMessage: IMessage = {
  id: 'atlas-vnd-save-request',
  role: ERoles.user,
  text: 'Да',
  timeCreated: at(11),
};
const savedMessage: IMessage = {
  id: 'atlas-vnd-saved',
  role: ERoles.bot,
  text: 'Сохранил «Регламент управления операционными рисками.docx» в базу знаний, в папку «Операционные риски».',
  timeCreated: at(12),
};

function createRunningRun(): AgentRun {
  let run = createRun('atlas-vnd-running', 'atlas-vnd-request', previewTime + 4_000);
  run = appendEvent(run, {
    id: 'atlas-vnd-running-plan',
    runId: 'atlas-vnd-running',
    at: previewTime + 4_000,
    kind: 'plan',
    tool: 'write_todos',
    todos: [
      { content: 'Изучить документ', status: 'completed' },
      { content: 'Сверить с групповым стандартом', status: 'in_progress' },
    ],
  });
  return { ...run, currentActivity: 'Проверяю ВНД по групповому стандарту…' };
}

const knownSteps = new Set<AtlasStepId>([
  'vnd.start', 'vnd.running', 'vnd.history-running', 'vnd.unread', 'vnd.result', 'vnd.saved',
  'settings.history', 'settings.overview', 'settings.confirm', 'settings.updated',
]);

export function createAtlasPreview(
  requestedStep: string | null,
  baseThreads: AtlasPreviewThread[],
  initialMemory: string[],
): AtlasPreview | undefined {
  if (!requestedStep || !knownSteps.has(requestedStep as AtlasStepId)) return undefined;
  const stepId = requestedStep as AtlasStepId;
  const settingsStep = stepId.startsWith('settings.');
  const running = stepId === 'vnd.running' || stepId === 'vnd.history-running';
  const ready = stepId === 'vnd.unread' || stepId === 'vnd.result';
  const saved = stepId === 'vnd.saved';
  const vndMessages = stepId === 'vnd.start'
    ? [startMessage]
    : saved || settingsStep
      ? [requestMessage, standardMessage, choiceMessage, resultMessage, saveRequestMessage, savedMessage]
      : ready
        ? [requestMessage, standardMessage, choiceMessage, resultMessage]
        : [requestMessage, standardMessage, choiceMessage, pendingMessage];
  const runningRun = running ? createRunningRun() : undefined;
  const normalizedThreads = baseThreads.map((thread, index) => ({
    ...thread,
    updatedAt: previewTime - (stableThreadOffsets[thread.id] ?? (index + 1) * 24 * 60 * 60_000),
  }));
  const threads = normalizedThreads.map(thread => thread.id !== 'vnd' ? thread : {
    ...thread,
    title: 'Проверка ВНД',
    scenario: 'vndBackground' as ScenarioId,
    pinned: false,
    updatedAt: previewTime,
    messages: vndMessages,
    runs: runningRun ? { [runningRun.runId]: runningRun } : {},
    vndStage: stepId === 'vnd.start' ? 'start' as const : 'complete' as const,
    documentIds: stepId === 'vnd.start' ? undefined : '["vnd-draft"]',
    documentName: stepId === 'vnd.start' ? undefined : 'Регламент управления операционными рисками.docx',
    jobState: running ? 'running' as const : ready ? 'ready' as const : saved || settingsStep ? 'saved' as const : undefined,
    agentState: running ? 'running' as const : ready ? 'ready' as const : undefined,
    agentUnread: stepId === 'vnd.unread',
  });

  let drawer: AtlasDrawerState | undefined;
  if (stepId === 'vnd.history-running' || stepId === 'vnd.unread' || stepId === 'settings.history') drawer = 'history';
  if (stepId === 'settings.overview' || stepId === 'settings.updated') drawer = 'settings';
  if (stepId === 'settings.confirm') drawer = 'memory-confirm';

  return {
    stepId,
    threads,
    activeThreadId: stepId === 'vnd.unread' ? 'risk' : 'vnd',
    scenario: stepId.startsWith('vnd.') ? 'vndBackground' : 'vnd',
    agentMemory: stepId === 'settings.updated' ? initialMemory.slice(1) : [...initialMemory],
    drawer,
    drawerFocus: stepId === 'settings.updated' ? 'memory-heading' : undefined,
  };
}
