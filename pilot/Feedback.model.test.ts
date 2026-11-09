import { describe, expect, it } from 'vitest';
import {
  addCsiComment,
  addFeedbackClarification,
  addUnresolvedFeedbackClarification,
  cancelCsi,
  classifyFeedbackExample,
  resolveFeedbackExampleScenario,
  createCsiDraft,
  createQualitativeFeedback,
  getCsiCommentPrompt,
  isVndServiceMention,
  parseCsiRatingInput,
  resolveComposerRoute,
  saveFeedbackMock,
  selectCsiRating,
  setCsiService,
  setFeedbackService,
  skipCsiComment,
} from './Feedback.model';

const at = '2026-11-09T10:00:00.000Z';

describe('conversational feedback model', () => {
  it('creates the unchanged formal CSI question without a confirmation stage', () => {
    const draft = createCsiDraft('proactive', at);

    expect(draft).toMatchObject({
      feedbackId: 'csi-demo-001',
      kind: 'csi',
      serviceId: 'vnd-check',
      scenarioId: 'vnd-background-review',
      source: 'proactive',
      status: 'draft',
      stage: 'rating',
      delivery: 'mock',
      mockOutcome: 'success',
      rating: {
        scale: 5,
        value: null,
        questionId: 'csi-vnd-check-completion-v1',
        question: 'Насколько вы довольны процессом проверки ВНД?',
      },
    });
    expect(draft).not.toHaveProperty('consentToSend');
    expect(draft.rawMessages).toEqual([]);
  });

  it.each([
    [1, 'Похоже, что-то пошло не так. Расскажете, что помешало?'],
    [3, 'Спасибо. Что стоит улучшить? Можно буквально пару слов.'],
    [5, 'Спасибо! Что понравилось или что можно сделать удобнее? Можно буквально пару слов.'],
  ])('uses a contextual, non-leading follow-up for rating %s', (value, prompt) => {
    expect(getCsiCommentPrompt(value)).toBe(prompt);
  });

  it('stores the rating immediately and preserves the exact optional comment', () => {
    const rated = selectCsiRating(createCsiDraft('proactive', at), 4, 'rating', at);
    const commented = addCsiComment(
      rated,
      'Кнопка результата оказалась не там, где я ожидал.',
      'comment',
      '2026-11-09T10:01:00.000Z',
    );

    expect(rated.stage).toBe('comment');
    expect(rated.rating.value).toBe(4);
    expect(commented.stage).toBe('ready');
    expect(commented.rawMessages.map(message => [message.messageId, message.text])).toEqual([
      ['rating', '4 из 5'],
      ['comment', 'Кнопка результата оказалась не там, где я ожидал.'],
    ]);
    expect(commented.aiInterpretation.summary).toContain('Кнопка результата оказалась не там, где я ожидал.');
    expect(commented.aiInterpretation.summary).not.toContain('поиск результата');
  });

  it('saves a selected rating without an optional comment and without review or consent', () => {
    const rated = selectCsiRating(createCsiDraft('proactive', at), 3, 'rating', at);
    const ready = skipCsiComment(rated);
    const saved = saveFeedbackMock(ready);

    expect(ready.stage).toBe('ready');
    expect(ready.rating.value).toBe(3);
    expect(ready.rawMessages.map(message => message.text)).toEqual(['3 из 5']);
    expect(saved).toMatchObject({ status: 'submitted', stage: 'submitted', delivery: 'mock', mockSaveCount: 1 });
  });

  it('fails honestly in the mock error branch and never creates duplicate saves', () => {
    const draft = createCsiDraft('proactive', at, { mockOutcome: 'error' });
    const ready = skipCsiComment(selectCsiRating(draft, 2, 'rating', at));
    const failed = saveFeedbackMock(ready);

    expect(failed).toMatchObject({ status: 'error', stage: 'error', mockSaveCount: 1 });
    expect(saveFeedbackMock(failed)).toBe(failed);

    const successful = saveFeedbackMock(skipCsiComment(selectCsiRating(createCsiDraft('proactive', at), 5, 'rating', at)));
    expect(saveFeedbackMock(successful)).toBe(successful);
    expect(successful.mockSaveCount).toBe(1);
  });

  it('asks for an unknown service once before the same formal CSI question', () => {
    const unknown = createCsiDraft('user_initiated', at, { serviceKnown: false });
    const resolved = setFeedbackService(unknown, 'vnd-check', 'Проверка ВНД');

    expect(unknown).toMatchObject({ stage: 'service', serviceId: null, serviceTitle: null });
    expect(unknown.rating).toMatchObject({ value: null, questionId: null, question: null });
    expect(unknown.aiInterpretation).toMatchObject({
      summary: 'Запрос пользователя на CSI; сервис пока не определён.',
      tags: ['сервис не определён'],
      recipient: 'Общая очередь обратной связи',
    });
    expect(resolved).toMatchObject({ stage: 'rating', serviceId: 'vnd-check', serviceTitle: 'Проверка ВНД' });
    expect(resolved.clarificationCount).toBe(1);
    expect(resolved.rating.questionId).toBe('csi-vnd-check-completion-v1');
    expect(() => setFeedbackService(resolved, 'vnd-check', 'Проверка ВНД')).toThrow('not waiting for a service');
  });

  it('preserves exact direct CSI, service, and typed-rating messages', () => {
    const requested = createCsiDraft('user_initiated', at, {
      serviceKnown: false,
      initialMessage: {
        messageId: 'request', role: 'user', text: '  Хочу оценить сервис.  ', timestamp: at, contextScope: 'feedback',
      },
    });
    const resolved = setCsiService(requested, '  ВНД  ', 'service', at);
    const rated = selectCsiRating(resolved, 4, 'rating', at, ' 4 ');

    expect(rated.rawMessages.map(message => message.text)).toEqual([
      '  Хочу оценить сервис.  ',
      '  ВНД  ',
      ' 4 ',
    ]);
    expect(rated.rating.value).toBe(4);
  });

  it.each(['complaint', 'idea', 'praise'] as const)('keeps exact source words for %s feedback', kind => {
    const text = kind === 'complaint'
      ? 'Фильтр сбрасывается после возврата назад.'
      : kind === 'idea'
        ? 'Добавьте сохранение выбранного фильтра.'
        : 'Проверка стала заметно понятнее.';
    const draft = createQualitativeFeedback(kind, text, `${kind}-message`, at);

    expect(draft.kind).toBe(kind);
    expect(draft.rating).toBeNull();
    expect(draft.rawMessages.map(message => message.text)).toEqual([text]);
    expect(draft.aiInterpretation.summary).toContain(text);
    expect(draft.aiInterpretation.summary).not.toContain('результат завершённой проверки');
  });

  it('accepts at most one exact clarification and updates the same mock record', () => {
    const draft = createQualitativeFeedback(
      'complaint',
      'После возврата всё сбросилось.',
      'complaint',
      at,
      { serviceKnown: false },
    );
    const clarified = addFeedbackClarification(
      draft,
      'В сервисе проверки ВНД.',
      'clarification',
      at,
      'vnd-check',
      'Проверка ВНД',
    );
    const saved = saveFeedbackMock(clarified);

    expect(clarified.clarificationCount).toBe(1);
    expect(clarified.rawMessages.map(message => message.text)).toEqual([
      'После возврата всё сбросилось.',
      'В сервисе проверки ВНД.',
    ]);
    expect(() => addFeedbackClarification(clarified, 'Ещё одно уточнение.', 'again', at, 'vnd-check', 'Проверка ВНД'))
      .toThrow('Only one clarification is allowed');
    expect(saved.mockSaveCount).toBe(1);
  });

  it('keeps an unsupported service answer in the general queue without inventing a match', () => {
    const draft = createQualitativeFeedback('complaint', 'После возврата всё сбросилось.', 'source', at, { serviceKnown:false });
    const unresolved = addUnresolvedFeedbackClarification(draft, 'В другом окне.', 'clarification', at);
    const saved = saveFeedbackMock(unresolved);
    expect(saved).toMatchObject({ serviceId:null, stage:'submitted', clarificationCount:1 });
    expect(saved.rawMessages.map(message => message.text)).toEqual(['После возврата всё сбросилось.', 'В другом окне.']);
  });

  it('distinguishes deterministic complaint, help, idea, praise and unknown examples', () => {
    expect(classifyFeedbackExample('Невозможно найти результат после проверки')).toBe('complaint');
    expect(classifyFeedbackExample('Помогите найти результат проверки')).toBe('help_request');
    expect(classifyFeedbackExample('Добавьте фильтр по статусу')).toBe('idea');
    expect(classifyFeedbackExample('Проверка стала очень удобной')).toBe('praise');
    expect(classifyFeedbackExample('Понятно, подготовь отчёт')).toBe('unknown');
    expect(classifyFeedbackExample('Проверка ВНД непонятная')).toBe('complaint');
    expect(classifyFeedbackExample('Неудобный результат проверки')).toBe('complaint');
    expect(classifyFeedbackExample('Подготовь отчёт по рискам')).toBe('unknown');
  });

  it('detects standalone Cyrillic VND names and prioritizes feedback intents in VND threads', () => {
    expect(isVndServiceMention('ВНД')).toBe(true);
    expect(isVndServiceMention('Хочу оценить ВНД')).toBe(true);
    expect(resolveComposerRoute('vndBackground', 'Хочу оценить ВНД')).toBe('feedback-intent');
    expect(resolveComposerRoute('vndBackground', 'Помогите найти результат')).toBe('feedback-intent');
    expect(resolveComposerRoute('vndBackground', 'Проверь документ')).toBe('vnd');
    expect(resolveComposerRoute('csiDirect', '4')).toBe('csi');
    expect(resolveComposerRoute('feedbackComplaintClarify', 'ВНД')).toBe('feedback-clarification');
    expect(resolveComposerRoute('ordinary', 'Подготовь отчёт')).toBe('general');
  });

  it('asks once for the service when free feedback does not name VND', () => {
    expect(resolveFeedbackExampleScenario('complaint', 'В другом окне всё сбрасывается')).toBe('feedbackComplaintClarify');
    expect(resolveFeedbackExampleScenario('idea', 'Добавьте фильтр по статусу')).toBe('feedbackIdeaClarify');
    expect(resolveFeedbackExampleScenario('complaint', 'Проверка ВНД не работает')).toBe('feedbackComplaint');
    expect(resolveFeedbackExampleScenario('idea', 'Добавьте фильтр в проверку ВНД')).toBe('feedbackIdea');
    expect(resolveFeedbackExampleScenario('help_request', 'Помогите найти результат')).toBe('feedbackHelp');
  });

  it('cancels an invitation without saving and keeps an already selected rating locally', () => {
    const rated = selectCsiRating(createCsiDraft('user_initiated', at), 2, 'rating', at);
    const cancelled = cancelCsi(rated);

    expect(cancelled).toMatchObject({ status: 'cancelled', stage: 'cancelled', mockSaveCount: 0 });
    expect(cancelled.rating.value).toBe(2);
    expect(cancelled.rawMessages[0].text).toBe('2 из 5');
  });

  it('rejects values outside the five-star scale', () => {
    expect(() => selectCsiRating(createCsiDraft('proactive', at), 0, 'rating', at)).toThrow('Rating must be between 1 and 5');
    expect(() => selectCsiRating(createCsiDraft('proactive', at), 6, 'rating', at)).toThrow('Rating must be between 1 and 5');
  });

  it('accepts only complete typed CSI values', () => {
    expect(parseCsiRatingInput('4')).toBe(4);
    expect(parseCsiRatingInput('4 из 5')).toBe(4);
    expect(parseCsiRatingInput('10')).toBeUndefined();
    expect(parseCsiRatingInput('5abc')).toBeUndefined();
  });

  it('saves only a ready draft', () => {
    const rated = selectCsiRating(createCsiDraft('proactive', at), 4, 'rating', at);
    expect(() => saveFeedbackMock(rated)).toThrow('not ready to save');
    const unresolved = createQualitativeFeedback('idea', 'Добавьте фильтр.', 'idea', at, { serviceKnown: false });
    expect(() => saveFeedbackMock(unresolved)).toThrow('not ready to save');
  });
});
