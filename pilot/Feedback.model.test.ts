import { describe, expect, it } from 'vitest';
import {
  addCsiComment,
  cancelCsi,
  createCsiDraft,
  selectCsiRating,
  skipCsiComment,
  submitCsi,
  updateCsiInterpretation,
} from './Feedback.model';

const at = '2026-11-08T10:00:00.000Z';

describe('CSI feedback model', () => {
  it('creates a formal CSI draft separately from qualitative feedback', () => {
    const draft = createCsiDraft('proactive', at);

    expect(draft).toMatchObject({
      feedbackId: 'csi-demo-001',
      serviceId: 'vnd-check',
      scenarioId: 'vnd-background-review',
      source: 'proactive',
      status: 'draft',
      delivery: 'mock',
      consentToSend: false,
      rating: {
        scale: 5,
        value: null,
        questionId: 'csi-vnd-check-completion-v1',
      },
    });
    expect(draft.rawMessages).toEqual([]);
  });

  it('preserves exact rating and comment messages in order', () => {
    const rated = selectCsiRating(createCsiDraft('proactive', at), 4, 'csi-rating', at);
    const commented = addCsiComment(
      rated,
      'Не сразу понял, где смотреть результат проверки.',
      'csi-comment',
      '2026-11-08T10:01:00.000Z',
    );

    expect(commented.stage).toBe('confirm');
    expect(commented.rating.value).toBe(4);
    expect(commented.rawMessages.map(message => [message.messageId, message.text])).toEqual([
      ['csi-rating', '4 из 5'],
      ['csi-comment', 'Не сразу понял, где смотреть результат проверки.'],
    ]);
  });

  it('edits the AI interpretation without mutating the original quotes', () => {
    const withComment = addCsiComment(
      selectCsiRating(createCsiDraft('proactive', at), 3, 'rating', at),
      'Долго искал готовый результат.',
      'comment',
      at,
    );
    const original = withComment.rawMessages;
    const edited = updateCsiInterpretation(
      { ...withComment, consentToSend: true },
      'Результат проверки сложно найти после завершения.',
    );

    expect(edited.aiInterpretation.summary).toBe('Результат проверки сложно найти после завершения.');
    expect(edited.consentToSend).toBe(false);
    expect(edited.rawMessages).toEqual(original);
    expect(edited.rawMessages).not.toBe(original);
  });

  it('requires explicit consent before mock submission', () => {
    const ready = addCsiComment(
      selectCsiRating(createCsiDraft('proactive', at), 5, 'rating', at),
      'Всё получилось.',
      'comment',
      at,
    );

    expect(() => submitCsi(ready)).toThrow('Explicit consent is required');
    expect(submitCsi({ ...ready, consentToSend: true })).toMatchObject({
      status: 'submitted',
      stage: 'submitted',
      delivery: 'mock',
    });
  });

  it('allows a formal rating without an optional comment', () => {
    const rated = selectCsiRating(createCsiDraft('proactive', at), 4, 'rating', at);
    const ready = skipCsiComment(rated);

    expect(ready.stage).toBe('confirm');
    expect(ready.rawMessages.map(message => message.text)).toEqual(['4 из 5']);
    expect(ready.userNote).toBe('');
  });

  it('cancels without submitting or losing the original messages', () => {
    const rated = selectCsiRating(createCsiDraft('user_initiated', at), 2, 'rating', at);
    const cancelled = cancelCsi(rated);

    expect(cancelled).toMatchObject({ status: 'cancelled', stage: 'cancelled', consentToSend: false });
    expect(cancelled.rawMessages[0].text).toBe('2 из 5');
  });

  it('rejects values outside the five-star scale', () => {
    expect(() => selectCsiRating(createCsiDraft('proactive', at), 0, 'rating', at)).toThrow('Rating must be between 1 and 5');
    expect(() => selectCsiRating(createCsiDraft('proactive', at), 6, 'rating', at)).toThrow('Rating must be between 1 and 5');
  });
});
