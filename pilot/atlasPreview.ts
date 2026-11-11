import type { IMessage } from '@/types';
import { ERoles } from '@/types';
import { appendEvent, createRun, type AgentRun } from '../src/components/AgentActivity/model';
import { appendExplanation, explainedReply, feedbackRuns, vndBackgroundExplanation } from './scenarioExplanations';
import type { BackgroundThread } from './VndBackground';
import { type ScenarioId, vndStandardPrompt } from './scenarios';
import {
  addCsiComment,
  addFeedbackClarification,
  cancelCsi,
  createCsiDraft,
  createQualitativeFeedback,
  getCsiCommentPrompt,
  saveFeedbackMock,
  selectCsiRating,
  setFeedbackService,
  skipCsiComment,
  type FeedbackDraft,
} from './Feedback.model';

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
  | 'settings.updated'
  | 'csi.prompt'
  | 'csi.low'
  | 'csi.neutral'
  | 'csi.high'
  | 'csi.skipped'
  | 'csi.saved'
  | 'csi.error'
  | 'csi.declined'
  | 'csi-direct.known'
  | 'csi-direct.service'
  | 'csi-direct.rating'
  | 'csi-direct.saved'
  | 'feedback.complaint'
  | 'feedback.help'
  | 'feedback.clarify'
  | 'feedback.clarified'
  | 'feedback.error'
  | 'feedback.idea'
  | 'feedback.idea-clarify'
  | 'feedback.idea-clarified'
  | 'feedback.praise';

export interface AtlasPreviewThread extends BackgroundThread {
  scenario: ScenarioId;
  messages: IMessage[];
  runs: Record<string, AgentRun>;
  feedbackDraft?: FeedbackDraft;
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
  const comparisonStep = 'atlas-vnd-running-compare';
  const run = appendExplanation(createRun('atlas-vnd-running', 'atlas-vnd-request', previewTime + 4_000),
    comparisonStep, vndBackgroundExplanation, previewTime + 4_000);
  return appendEvent(run, {
    id: comparisonStep,
    runId: 'atlas-vnd-running',
    at: previewTime + 4_000,
    kind: 'message',
    label: 'Проверяю ВНД по групповому стандарту',
  });
}

function finishFeedbackPreview(
  stepId: AtlasStepId,
  scenario: Parameters<typeof feedbackRuns>[0],
  title: string,
  messages: IMessage[],
  feedbackDraft: FeedbackDraft | undefined,
  baseThreads: AtlasPreviewThread[],
  initialMemory: string[],
): AtlasPreview {
  const threads = baseThreads.map((thread, index) => ({
    ...thread,
    updatedAt: previewTime - (stableThreadOffsets[thread.id] ?? (index + 1) * 24 * 60 * 60_000),
  })).map(thread => thread.id !== 'vnd' ? thread : {
    ...thread,
    title,
    scenario,
    pinned: false,
    updatedAt: previewTime,
    messages,
    runs: feedbackRuns(scenario, messages, feedbackDraft),
    feedbackDraft,
    vndStage: 'complete' as const,
    jobState: 'saved' as const,
    agentState: undefined,
    agentUnread: false,
  });
  return { stepId, threads, activeThreadId: 'vnd', scenario, agentMemory: [...initialMemory] };
}

function createCsiPreview(stepId: Extract<AtlasStepId, `csi.${string}`>, baseThreads: AtlasPreviewThread[], initialMemory: string[]): AtlasPreview {
  const outcome = stepId === 'csi.error' ? 'error' : 'success';
  let draft = createCsiDraft('proactive', at(20), { mockOutcome: outcome });
  const messages: IMessage[] = [
    { id:'atlas-csi-context', role:ERoles.bot, text:'Готово, «Регламент управления операционными рисками.docx» сохранён в базе знаний в папке «Операционные риски».', timeCreated:at(19) },
    { id:'atlas-csi-prompt', role:ERoles.bot, text:'Можно ещё один короткий вопрос?', extras:{type:'system', feedbackAddon:'csi-rating'}, timeCreated:at(20) },
  ];
  if (stepId === 'csi.declined') {
    draft = cancelCsi(draft);
    messages.push({ id:'atlas-csi-declined', role:ERoles.bot, text:'Хорошо, вернёмся к работе.', timeCreated:at(21) });
  } else if (stepId !== 'csi.prompt') {
    const value = stepId === 'csi.low' || stepId === 'csi.error' ? 1 : stepId === 'csi.neutral' || stepId === 'csi.skipped' ? 3 : 5;
    draft = selectCsiRating(draft, value, 'atlas-csi-rating', at(21));
    messages.push(
      { id:'atlas-csi-rating', role:ERoles.user, text:`${value} из 5`, timeCreated:at(21) },
      { id:'atlas-csi-comment-prompt', role:ERoles.bot, text:getCsiCommentPrompt(value), extras:{type:'system', feedbackAddon:'csi-comment-actions'}, timeCreated:at(22) },
    );
    if (stepId === 'csi.saved') {
      const comment = 'Не сразу понял, где смотреть результат проверки.';
      draft = addCsiComment(draft, comment, 'atlas-csi-comment', at(23));
      messages.push({ id:'atlas-csi-comment', role:ERoles.user, text:comment, timeCreated:at(23) });
    }
    if (stepId === 'csi.saved' || stepId === 'csi.skipped' || stepId === 'csi.error') {
      if (draft.stage === 'comment') draft = skipCsiComment(draft);
      draft = saveFeedbackMock(draft);
      messages.push({
        id:'atlas-csi-result', role:ERoles.bot,
        text:draft.status === 'submitted'
          ? 'Спасибо, оценка и комментарий сохранены.'
          : 'Не удалось сохранить оценку. Попробуйте ещё раз позже.',
        timeCreated:at(24),
      });
    }
  }
  return finishFeedbackPreview(stepId, 'csiProactive', 'Оценка проверки ВНД', messages, draft, baseThreads, initialMemory);
}

function createDirectCsiPreview(stepId: Extract<AtlasStepId, `csi-direct.${string}`>, baseThreads: AtlasPreviewThread[], initialMemory: string[]): AtlasPreview {
  const unknown = stepId !== 'csi-direct.known';
  let draft = createCsiDraft('user_initiated', at(20), { serviceKnown: !unknown });
  const messages: IMessage[] = [
    { id:'atlas-csi-direct-request', role:ERoles.user, text:unknown ? 'Хочу оценить сервис.' : 'Хочу оценить сервис проверки ВНД.', timeCreated:at(20) },
  ];
  if (unknown) messages.push({ id:'atlas-csi-direct-service', role:ERoles.bot, text:'Конечно. Какой сервис оценим?', timeCreated:at(21) });
  else messages.push({ id:'atlas-csi-direct-prompt', role:ERoles.bot, text:'Конечно. Один короткий вопрос.', extras:{type:'system', feedbackAddon:'csi-rating'}, timeCreated:at(21) });
  if (stepId === 'csi-direct.rating' || stepId === 'csi-direct.saved') {
    messages.push({ id:'atlas-csi-direct-answer', role:ERoles.user, text:'Проверка ВНД', timeCreated:at(22) });
    draft = setFeedbackService(draft, 'vnd-check', 'Проверка ВНД');
    messages.push({ id:'atlas-csi-direct-rating', role:ERoles.bot, text:'Спасибо, понял. Тогда один короткий вопрос.', extras:{type:'system', feedbackAddon:'csi-rating'}, timeCreated:at(23) });
  }
  if (stepId === 'csi-direct.saved') {
    draft = selectCsiRating(draft, 4, 'atlas-csi-direct-value', at(24));
    messages.push({ id:'atlas-csi-direct-value', role:ERoles.user, text:'4 из 5', timeCreated:at(24) });
    draft = saveFeedbackMock(skipCsiComment(draft));
    messages.push({ id:'atlas-csi-direct-result', role:ERoles.bot, text:'Спасибо, оценка сохранена.', timeCreated:at(25) });
  }
  return finishFeedbackPreview(stepId, unknown ? 'csiDirectUnknown' : 'csiDirect', 'Оценка проверки ВНД', messages, draft, baseThreads, initialMemory);
}

function createQualitativePreview(stepId: Extract<AtlasStepId, `feedback.${string}`>, baseThreads: AtlasPreviewThread[], initialMemory: string[]): AtlasPreview {
  const isIdea = stepId.startsWith('feedback.idea');
  const isPraise = stepId === 'feedback.praise';
  const isHelp = stepId === 'feedback.help';
  const source = isIdea ? 'Добавьте быстрый фильтр по статусу.' : isPraise ? 'Проверка стала очень удобной.' : isHelp ? 'Помогите найти результат проверки.' : stepId === 'feedback.clarify' || stepId === 'feedback.clarified' ? 'После возврата всё сбросилось.' : 'Невозможно найти результат после проверки.';
  const messages: IMessage[] = [{ id:'atlas-feedback-source', role:ERoles.user, text:source, timeCreated:at(20) }];
  if (isHelp) {
    messages.push({ id:'atlas-feedback-help', role:ERoles.bot, text:'Результат проверки можно открыть в истории чатов. **Я не записывал это как жалобу.**', timeCreated:at(21) });
    return finishFeedbackPreview(stepId, 'feedbackHelp', 'Помощь с результатом', messages, undefined, baseThreads, initialMemory);
  }
  const needsClarification = stepId === 'feedback.clarify' || stepId === 'feedback.clarified' || stepId === 'feedback.idea-clarify' || stepId === 'feedback.idea-clarified';
  const kind = isIdea ? 'idea' : isPraise ? 'praise' : 'complaint';
  let draft = createQualitativeFeedback(kind, source, 'atlas-feedback-source', at(20), { serviceKnown:!needsClarification, mockOutcome:stepId === 'feedback.error' ? 'error' : 'success' });
  if (needsClarification) {
    messages.push({ id:'atlas-feedback-clarify', role:ERoles.bot, text:isIdea ? 'Хорошая мысль. Подскажете, для какого сервиса нужен фильтр?' : 'Понял, что было неудобно. Подскажете, в каком сервисе?', timeCreated:at(21) });
  }
  if (stepId === 'feedback.clarified' || stepId === 'feedback.idea-clarified') {
    const clarification = 'В сервисе проверки ВНД.';
    messages.push({ id:'atlas-feedback-clarification', role:ERoles.user, text:clarification, timeCreated:at(22) });
    draft = addFeedbackClarification(draft, clarification, 'atlas-feedback-clarification', at(22), 'vnd-check', 'Проверка ВНД');
  }
  if (!needsClarification || stepId === 'feedback.clarified' || stepId === 'feedback.idea-clarified') {
    draft = saveFeedbackMock(draft);
    const success = draft.status === 'submitted';
    const text = !success ? 'Не удалось сохранить отзыв. Попробуйте ещё раз позже.'
      : kind === 'idea' ? 'Хорошая мысль. Предложение сохранено и передано команде сервиса.'
        : kind === 'praise' ? 'Рад, что проверка пригодилась. Спасибо за отзыв!'
          : 'Понял: результат проверки было непросто найти. Отзыв сохранён и передан команде сервиса.';
    messages.push({ id:'atlas-feedback-result', role:ERoles.bot, text, timeCreated:at(23) });
  }
  const scenario = isIdea || isPraise ? (isPraise ? 'feedbackPraise' : needsClarification ? 'feedbackIdeaClarify' : 'feedbackIdea') : stepId === 'feedback.error' ? 'feedbackError' : needsClarification ? 'feedbackComplaintClarify' : 'feedbackComplaint';
  return finishFeedbackPreview(stepId, scenario, 'Обратная связь о проверке', messages, draft, baseThreads, initialMemory);
}

const knownSteps = new Set<AtlasStepId>([
  'vnd.start', 'vnd.running', 'vnd.history-running', 'vnd.unread', 'vnd.result', 'vnd.saved',
  'settings.history', 'settings.overview', 'settings.confirm', 'settings.updated',
  'csi.prompt', 'csi.low', 'csi.neutral', 'csi.high', 'csi.skipped', 'csi.saved', 'csi.error', 'csi.declined',
  'csi-direct.known', 'csi-direct.service', 'csi-direct.rating', 'csi-direct.saved',
  'feedback.complaint', 'feedback.help', 'feedback.clarify', 'feedback.clarified', 'feedback.error',
  'feedback.idea', 'feedback.idea-clarify', 'feedback.idea-clarified', 'feedback.praise',
]);

const legacySteps: Record<string, AtlasStepId> = {
  'csi.rating': 'csi.high',
  'csi.review': 'csi.saved',
  'csi.edited': 'csi.saved',
  'csi.submitted': 'csi.saved',
};

export function createAtlasPreview(
  requestedStep: string | null,
  baseThreads: AtlasPreviewThread[],
  initialMemory: string[],
): AtlasPreview | undefined {
  if (!requestedStep) return undefined;
  const resolvedStep = legacySteps[requestedStep] ?? requestedStep;
  if (!knownSteps.has(resolvedStep as AtlasStepId)) return undefined;
  const stepId = resolvedStep as AtlasStepId;
  if (stepId.startsWith('csi.')) {
    return createCsiPreview(stepId as Extract<AtlasStepId, `csi.${string}`>, baseThreads, initialMemory);
  }
  if (stepId.startsWith('csi-direct.')) {
    return createDirectCsiPreview(stepId as Extract<AtlasStepId, `csi-direct.${string}`>, baseThreads, initialMemory);
  }
  if (stepId.startsWith('feedback.')) {
    return createQualitativePreview(stepId as Extract<AtlasStepId, `feedback.${string}`>, baseThreads, initialMemory);
  }
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
  const completedRun = ready || saved || settingsStep ? explainedReply(resultMessage, [
    'Готовлю итог проверки', 'В документе не найдено отклонений от выбранного стандарта. Предложу сохранить актуальную версию ВНД.',
  ]) : undefined;
  const reviewRun = runningRun ?? completedRun;
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
    runs: reviewRun ? { [reviewRun.runId]: reviewRun } : {},
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
