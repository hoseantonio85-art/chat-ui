import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { createCsiDraft, selectCsiRating } from './Feedback.model';
import { FeedbackCancelAction, FeedbackCard } from './FeedbackCard';

describe('CSI secondary actions', () => {
  it('uses the same lightweight action for skipping a comment and declining CSI', () => {
    const draft = selectCsiRating(createCsiDraft('proactive', '2026-11-09T10:00:00.000Z'), 3, 'rating', '2026-11-09T10:01:00.000Z');
    const skip = renderToStaticMarkup(FeedbackCard({ addon:'csi-comment-actions', draft, onRate:vi.fn(), onSkipComment:vi.fn() }));
    const decline = renderToStaticMarkup(FeedbackCancelAction({ onCancel:vi.fn() }));

    expect(skip).toContain('class="message-secondary-action"');
    expect(decline).toContain('class="message-secondary-action"');
    expect(skip).toContain('Без комментария');
    expect(decline).toContain('Не сейчас');
  });
});
