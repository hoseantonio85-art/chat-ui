export type FeedbackSource = 'proactive' | 'user_initiated' | 'observed';
export type FeedbackStatus = 'draft' | 'submitted' | 'error' | 'cancelled';
export type FeedbackKind = 'csi' | 'complaint' | 'idea' | 'praise';
export type MockSaveOutcome = 'success' | 'error';
export type CsiStage = 'service' | 'rating' | 'comment' | 'ready' | 'submitted' | 'error' | 'cancelled';
export type QualitativeStage = 'clarification' | 'ready' | 'submitted' | 'error';
export type FeedbackExampleIntent = FeedbackKind | 'help_request' | 'csi_request' | 'unknown';

export interface FeedbackRawMessage {
  messageId: string;
  role: 'user';
  text: string;
  timestamp: string;
  contextScope: 'feedback' | 'clarification';
}

interface FeedbackInterpretation {
  category: FeedbackKind;
  summary: string;
  tags: string[];
  recipient: string;
}

interface FeedbackBase {
  feedbackId: string;
  kind: FeedbackKind;
  serviceId: 'vnd-check' | 'general-feedback' | null;
  serviceTitle: 'Проверка ВНД' | 'Обратная связь без привязки' | null;
  scenarioId: 'vnd-background-review' | 'unresolved-feedback';
  source: FeedbackSource;
  status: FeedbackStatus;
  rawMessages: FeedbackRawMessage[];
  aiInterpretation: FeedbackInterpretation;
  userNote: string;
  delivery: 'mock';
  mockOutcome: MockSaveOutcome;
  mockSaveCount: number;
  clarificationCount: number;
  createdAt: string;
}

export interface CsiDraft extends FeedbackBase {
  kind: 'csi';
  stage: CsiStage;
  rating: {
    scale: 5;
    value: number | null;
    questionId: 'csi-vnd-check-completion-v1' | null;
    question: 'Насколько вы довольны процессом проверки ВНД?' | null;
  };
}

export interface QualitativeFeedbackDraft extends FeedbackBase {
  kind: Exclude<FeedbackKind, 'csi'>;
  stage: QualitativeStage;
  rating: null;
}

export type FeedbackDraft = CsiDraft | QualitativeFeedbackDraft;

interface DraftOptions {
  feedbackId?: string;
  serviceKnown?: boolean;
  mockOutcome?: MockSaveOutcome;
  initialMessage?: FeedbackRawMessage;
}

const cloneMessages = (messages: FeedbackRawMessage[]): FeedbackRawMessage[] =>
  messages.map(message => ({ ...message }));

const serviceFields = (serviceKnown: boolean) => serviceKnown
  ? {
      serviceId: 'vnd-check' as const,
      serviceTitle: 'Проверка ВНД' as const,
      scenarioId: 'vnd-background-review' as const,
      recipient: 'Команда сервиса «Проверка ВНД»',
    }
  : {
      serviceId: null,
      serviceTitle: null,
      scenarioId: 'unresolved-feedback' as const,
      recipient: 'Общая очередь обратной связи',
    };

export function createCsiDraft(source: Extract<FeedbackSource, 'proactive' | 'user_initiated'>, timestamp: string, options: DraftOptions = {}): CsiDraft {
  const serviceKnown = options.serviceKnown ?? true;
  const service = serviceFields(serviceKnown);
  return {
    feedbackId: options.feedbackId ?? 'csi-demo-001',
    kind: 'csi',
    ...service,
    source,
    status: 'draft',
    stage: serviceKnown ? 'rating' : 'service',
    rawMessages: options.initialMessage ? [{ ...options.initialMessage }] : [],
    aiInterpretation: serviceKnown ? {
      category: 'csi',
      summary: 'Оценка опыта проверки и сохранения ВНД.',
      tags: ['проверка ВНД', 'завершённый сценарий'],
      recipient: service.recipient,
    } : {
      category: 'csi',
      summary: 'Запрос пользователя на CSI; сервис пока не определён.',
      tags: ['сервис не определён'],
      recipient: service.recipient,
    },
    rating: {
      scale: 5,
      value: null,
      questionId: serviceKnown ? 'csi-vnd-check-completion-v1' : null,
      question: serviceKnown ? 'Насколько вы довольны процессом проверки ВНД?' : null,
    },
    userNote: '',
    delivery: 'mock',
    mockOutcome: options.mockOutcome ?? 'success',
    mockSaveCount: 0,
    clarificationCount: 0,
    createdAt: timestamp,
  };
}

export function setFeedbackService<T extends FeedbackDraft>(draft: T, serviceId: 'vnd-check', serviceTitle: 'Проверка ВНД'): T {
  if (draft.kind === 'csi' && draft.stage !== 'service') throw new Error('CSI draft is not waiting for a service');
  if (draft.kind !== 'csi' && draft.stage !== 'clarification') throw new Error('Feedback draft is not waiting for clarification');
  if (draft.clarificationCount >= 1) throw new Error('Only one clarification is allowed');
  return {
    ...draft,
    serviceId,
    serviceTitle,
    scenarioId: 'vnd-background-review',
    stage: draft.kind === 'csi' ? 'rating' : 'ready',
    clarificationCount: draft.clarificationCount + 1,
    aiInterpretation: draft.kind === 'csi' ? {
      category: 'csi',
      summary: 'Оценка опыта проверки и сохранения ВНД.',
      tags: ['проверка ВНД', 'завершённый сценарий'],
      recipient: 'Команда сервиса «Проверка ВНД»',
    } : {
      ...draft.aiInterpretation,
      recipient: 'Команда сервиса «Проверка ВНД»',
      tags: Array.from(new Set([...draft.aiInterpretation.tags.filter(tag => tag !== 'сервис не определён'), 'проверка ВНД'])),
    },
    ...(draft.kind === 'csi' ? {
      rating: {
        ...draft.rating,
        questionId: 'csi-vnd-check-completion-v1' as const,
        question: 'Насколько вы довольны процессом проверки ВНД?' as const,
      },
    } : {}),
  } as T;
}

export function setCsiService(draft: CsiDraft, text: string, messageId: string, timestamp: string): CsiDraft {
  if (!text.trim()) throw new Error('Service clarification must not be empty');
  const resolved = setFeedbackService(draft, 'vnd-check', 'Проверка ВНД');
  return {
    ...resolved,
    rawMessages: [
      ...cloneMessages(draft.rawMessages),
      { messageId, role: 'user', text, timestamp, contextScope: 'clarification' },
    ],
  };
}

export function selectCsiRating(draft: CsiDraft, value: number, messageId: string, timestamp: string, rawText = `${value} из 5`): CsiDraft {
  if (!Number.isInteger(value) || value < 1 || value > draft.rating.scale) throw new Error('Rating must be between 1 and 5');
  if (draft.stage !== 'rating') throw new Error('CSI draft is not waiting for a rating');
  if (draft.rating.questionId === null || draft.rating.question === null) throw new Error('CSI service is unresolved');
  return {
    ...draft,
    stage: 'comment',
    rawMessages: [
      ...cloneMessages(draft.rawMessages),
      { messageId, role: 'user', text: rawText, timestamp, contextScope: 'feedback' },
    ],
    rating: { ...draft.rating, value },
  };
}

export function getCsiCommentPrompt(value: number): string {
  if (value <= 2) return 'Похоже, что-то пошло не так. Расскажете, что помешало?';
  if (value === 3) return 'Спасибо. Что стоит улучшить? Можно буквально пару слов.';
  return 'Спасибо! Что понравилось или что можно сделать удобнее? Можно буквально пару слов.';
}

export function addCsiComment(draft: CsiDraft, text: string, messageId: string, timestamp: string): CsiDraft {
  if (!text.trim()) throw new Error('Comment must not be empty');
  if (draft.stage !== 'comment') throw new Error('CSI draft is not waiting for a comment');
  return {
    ...draft,
    stage: 'ready',
    rawMessages: [
      ...cloneMessages(draft.rawMessages),
      { messageId, role: 'user', text, timestamp, contextScope: 'feedback' },
    ],
    userNote: text,
    aiInterpretation: {
      ...draft.aiInterpretation,
      summary: `Комментарий к оценке ${draft.rating.value ?? 'без балла'} из 5: ${text}`,
      tags: Array.from(new Set([...draft.aiInterpretation.tags, 'комментарий пользователя'])),
    },
  };
}

export function skipCsiComment(draft: CsiDraft): CsiDraft {
  if (draft.stage !== 'comment') throw new Error('CSI draft is not waiting for a comment');
  return {
    ...draft,
    stage: 'ready',
    rawMessages: cloneMessages(draft.rawMessages),
    userNote: '',
    aiInterpretation: {
      ...draft.aiInterpretation,
      summary: `Оценка процесса проверки ВНД: ${draft.rating.value ?? 'не указана'} из 5.`,
    },
  };
}

const qualitativeLabel: Record<QualitativeFeedbackDraft['kind'], string> = {
  complaint: 'Жалоба пользователя',
  idea: 'Идея пользователя',
  praise: 'Положительный отзыв пользователя',
};

export function createQualitativeFeedback(
  kind: QualitativeFeedbackDraft['kind'],
  text: string,
  messageId: string,
  timestamp: string,
  options: DraftOptions = {},
): QualitativeFeedbackDraft {
  if (!text.trim()) throw new Error('Feedback must not be empty');
  const serviceKnown = options.serviceKnown ?? true;
  const service = serviceFields(serviceKnown);
  return {
    feedbackId: options.feedbackId ?? `feedback-demo-${kind}`,
    kind,
    ...service,
    source: 'observed',
    status: 'draft',
    stage: serviceKnown ? 'ready' : 'clarification',
    rawMessages: [{ messageId, role: 'user', text, timestamp, contextScope: 'feedback' }],
    aiInterpretation: {
      category: kind,
      summary: `${qualitativeLabel[kind]}: ${text}`,
      tags: [kind, serviceKnown ? 'проверка ВНД' : 'сервис не определён'],
      recipient: service.recipient,
    },
    rating: null,
    userNote: text,
    delivery: 'mock',
    mockOutcome: options.mockOutcome ?? 'success',
    mockSaveCount: 0,
    clarificationCount: 0,
    createdAt: timestamp,
  };
}

export function addFeedbackClarification(
  draft: QualitativeFeedbackDraft,
  text: string,
  messageId: string,
  timestamp: string,
  serviceId: 'vnd-check',
  serviceTitle: 'Проверка ВНД',
): QualitativeFeedbackDraft {
  if (draft.clarificationCount >= 1) throw new Error('Only one clarification is allowed');
  if (!text.trim()) throw new Error('Clarification must not be empty');
  const resolved = setFeedbackService(draft, serviceId, serviceTitle);
  return {
    ...resolved,
    stage: 'ready',
    clarificationCount: 1,
    rawMessages: [
      ...cloneMessages(draft.rawMessages),
      { messageId, role: 'user', text, timestamp, contextScope: 'clarification' },
    ],
    aiInterpretation: {
      ...resolved.aiInterpretation,
      summary: `${draft.aiInterpretation.summary} Уточнение: ${text}`,
    },
  };
}

export function addUnresolvedFeedbackClarification(
  draft: QualitativeFeedbackDraft,
  text: string,
  messageId: string,
  timestamp: string,
): QualitativeFeedbackDraft {
  if (draft.stage !== 'clarification' || draft.clarificationCount >= 1) throw new Error('Only one clarification is allowed');
  if (!text.trim()) throw new Error('Clarification must not be empty');
  return {
    ...draft,
    stage: 'ready',
    clarificationCount: 1,
    rawMessages: [
      ...cloneMessages(draft.rawMessages),
      { messageId, role: 'user', text, timestamp, contextScope: 'clarification' },
    ],
    aiInterpretation: {
      ...draft.aiInterpretation,
      summary: `${draft.aiInterpretation.summary} Уточнение не позволило определить сервис: ${text}`,
    },
  };
}

export function saveFeedbackMock<T extends FeedbackDraft>(draft: T): T {
  if (draft.status === 'submitted' || draft.status === 'error' || draft.status === 'cancelled') return draft;
  if (draft.stage !== 'ready') throw new Error('Feedback draft is not ready to save');
  if (draft.kind === 'csi' && draft.rating.value === null) throw new Error('Rating is required');
  return {
    ...draft,
    status: draft.mockOutcome === 'success' ? 'submitted' : 'error',
    stage: draft.mockOutcome === 'success' ? 'submitted' : 'error',
    mockSaveCount: draft.mockSaveCount + 1,
    rawMessages: cloneMessages(draft.rawMessages),
  } as T;
}

export function parseCsiRatingInput(text: string): number | undefined {
  const match = text.trim().match(/^([1-5])(?:\s+из\s+5)?$/i);
  return match ? Number(match[1]) : undefined;
}

export function cancelCsi(draft: CsiDraft): CsiDraft {
  return {
    ...draft,
    status: 'cancelled',
    stage: 'cancelled',
    rawMessages: cloneMessages(draft.rawMessages),
  };
}

export function classifyFeedbackExample(text: string): FeedbackExampleIntent {
  const normalized = text.trim().toLocaleLowerCase('ru-RU');
  if (/хочу\s+оценить|поставить\s+оценку/.test(normalized)) return 'csi_request';
  if (/помогите|помоги|подскажите|подскажи/.test(normalized) && /найти|открыть|где/.test(normalized)) return 'help_request';
  if (/невозмож|неудоб|непонят|сбрасыва|не\s+работает|слишком\s+слож/.test(normalized)) return 'complaint';
  if (/добавьте|хотелось\s+бы|предлагаю|сделайте/.test(normalized)) return 'idea';
  if (/спасибо|понравил|стал(?:о|а)?\s+(?:очень\s+)?(?:удобн|понятн)|очень\s+(?:удобн|понятн)/.test(normalized)) return 'praise';
  return 'unknown';
}

export type FeedbackExampleScenario =
  | 'feedbackComplaint'
  | 'feedbackComplaintClarify'
  | 'feedbackHelp'
  | 'feedbackIdea'
  | 'feedbackIdeaClarify'
  | 'feedbackPraise';

export function isVndServiceMention(text: string): boolean {
  return /(?:^|[^a-zа-яё0-9])внд(?:$|[^a-zа-яё0-9])|проверк(?:а|и|у|ой)\s+внд/i.test(text);
}

export type ComposerRoute = 'feedback-intent' | 'vnd' | 'csi' | 'feedback-clarification' | 'general';

export function resolveComposerRoute(scenario: string, text: string): ComposerRoute {
  if (classifyFeedbackExample(text) !== 'unknown') return 'feedback-intent';
  if (scenario.startsWith('vnd')) return 'vnd';
  if (scenario.startsWith('csi')) return 'csi';
  if (scenario === 'feedbackComplaintClarify' || scenario === 'feedbackIdeaClarify') return 'feedback-clarification';
  return 'general';
}

export function resolveFeedbackExampleScenario(intent: FeedbackExampleIntent, text: string): FeedbackExampleScenario | undefined {
  if (intent === 'help_request') return 'feedbackHelp';
  if (intent === 'complaint') return isVndServiceMention(text) ? 'feedbackComplaint' : 'feedbackComplaintClarify';
  if (intent === 'idea') return isVndServiceMention(text) ? 'feedbackIdea' : 'feedbackIdeaClarify';
  if (intent === 'praise') return 'feedbackPraise';
  return undefined;
}