export type FeedbackSource = 'proactive' | 'user_initiated';
export type FeedbackStatus = 'draft' | 'submitted' | 'cancelled';
export type CsiStage = 'rating' | 'comment' | 'confirm' | 'submitted' | 'cancelled';

export interface FeedbackRawMessage {
  messageId: string;
  role: 'user';
  text: string;
  timestamp: string;
  contextScope: 'feedback';
}

export interface CsiDraft {
  feedbackId: string;
  serviceId: 'vnd-check';
  serviceTitle: 'Проверка ВНД';
  scenarioId: 'vnd-background-review';
  source: FeedbackSource;
  status: FeedbackStatus;
  stage: CsiStage;
  rawMessages: FeedbackRawMessage[];
  aiInterpretation: {
    category: 'csi';
    summary: string;
    tags: string[];
    recipient: string;
  };
  rating: {
    scale: 5;
    value: number | null;
    questionId: 'csi-vnd-check-completion-v1';
    question: string;
  };
  userNote: string;
  consentToSend: boolean;
  delivery: 'mock';
}

const cloneMessages = (messages: FeedbackRawMessage[]): FeedbackRawMessage[] =>
  messages.map(message => ({ ...message }));

export function createCsiDraft(source: FeedbackSource, timestamp: string): CsiDraft {
  return {
    feedbackId: 'csi-demo-001',
    serviceId: 'vnd-check',
    serviceTitle: 'Проверка ВНД',
    scenarioId: 'vnd-background-review',
    source,
    status: 'draft',
    stage: 'rating',
    rawMessages: [],
    aiInterpretation: {
      category: 'csi',
      summary: 'Оценка опыта проверки и сохранения ВНД.',
      tags: ['проверка ВНД', 'завершённый сценарий'],
      recipient: 'Команда сервиса «Проверка ВНД»',
    },
    rating: {
      scale: 5,
      value: null,
      questionId: 'csi-vnd-check-completion-v1',
      question: 'Насколько вы довольны процессом проверки ВНД?',
    },
    userNote: '',
    consentToSend: false,
    delivery: 'mock',
  };
}

export function selectCsiRating(
  draft: CsiDraft,
  value: number,
  messageId: string,
  timestamp: string,
): CsiDraft {
  if (!Number.isInteger(value) || value < 1 || value > draft.rating.scale) {
    throw new Error('Rating must be between 1 and 5');
  }
  return {
    ...draft,
    stage: 'comment',
    rawMessages: [
      ...cloneMessages(draft.rawMessages),
      { messageId, role: 'user', text: `${value} из 5`, timestamp, contextScope: 'feedback' },
    ],
    rating: { ...draft.rating, value },
  };
}

export function addCsiComment(
  draft: CsiDraft,
  text: string,
  messageId: string,
  timestamp: string,
): CsiDraft {
  const exactText = text.trim();
  if (!exactText) throw new Error('Comment must not be empty');
  return {
    ...draft,
    stage: 'confirm',
    rawMessages: [
      ...cloneMessages(draft.rawMessages),
      { messageId, role: 'user', text: exactText, timestamp, contextScope: 'feedback' },
    ],
    userNote: exactText,
    aiInterpretation: {
      ...draft.aiInterpretation,
      summary: draft.rating.value !== null && draft.rating.value <= 3
        ? 'Пользователю было сложно найти результат завершённой проверки ВНД.'
        : 'Пользователь в целом доволен проверкой ВНД, но отметил сложность поиска результата.',
      tags: [...draft.aiInterpretation.tags, 'поиск результата'],
    },
  };
}

export function updateCsiInterpretation(draft: CsiDraft, summary: string): CsiDraft {
  return {
    ...draft,
    consentToSend: false,
    rawMessages: cloneMessages(draft.rawMessages),
    aiInterpretation: { ...draft.aiInterpretation, summary },
  };
}

export function skipCsiComment(draft: CsiDraft): CsiDraft {
  return {
    ...draft,
    stage: 'confirm',
    rawMessages: cloneMessages(draft.rawMessages),
    userNote: '',
    aiInterpretation: {
      ...draft.aiInterpretation,
      summary: `Оценка процесса проверки ВНД: ${draft.rating.value ?? 'не указана'} из 5.`,
    },
  };
}

export function submitCsi(draft: CsiDraft): CsiDraft {
  if (!draft.consentToSend) throw new Error('Explicit consent is required');
  if (draft.rating.value === null) throw new Error('Rating is required');
  return { ...draft, status: 'submitted', stage: 'submitted', delivery: 'mock' };
}

export function cancelCsi(draft: CsiDraft): CsiDraft {
  return {
    ...draft,
    status: 'cancelled',
    stage: 'cancelled',
    consentToSend: false,
    rawMessages: cloneMessages(draft.rawMessages),
  };
}
