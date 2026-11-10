import React from 'react';
import type { CsiDraft } from './Feedback.model';
import { MessageSecondaryAction } from './MessageSecondaryAction';
import './FeedbackCard.css';

type FeedbackAddon = 'csi-rating' | 'csi-comment-actions';

interface FeedbackCardProps {
  addon: FeedbackAddon;
  draft: CsiDraft;
  onRate: (value: number) => void;
  onSkipComment: () => void;
}

const Star = ({ selected }: { selected: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.2-5.6-2.9L6.4 20l1.1-6.2-4.6-4.4 6.3-.9L12 2.8Z" fill={selected ? 'currentColor' : 'none'} />
  </svg>
);

function RatingCard({ draft, onRate }: Pick<FeedbackCardProps, 'draft' | 'onRate'>) {
  const selected = draft.rating.value;
  return <section className="feedback-card feedback-rating-card" aria-labelledby="csi-question">
    <fieldset>
      <legend id="csi-question">{draft.rating.question}</legend>
      <p>1 — совсем не доволен, 5 — полностью доволен</p>
      <div className="feedback-stars" role="radiogroup" aria-label="Оценка от 1 до 5">
        {[1, 2, 3, 4, 5].map(value => <label
          key={value}
          className={`${selected !== null && value <= selected ? 'selected' : ''} ${draft.stage !== 'rating' ? 'disabled' : ''}`}
        >
          <input
            type="radio"
            name={`csi-rating-${draft.feedbackId}`}
            value={value}
            checked={selected === value}
            aria-label={`${value} из 5`}
            disabled={draft.stage !== 'rating'}
            onChange={() => onRate(value)}
          />
          <span className="feedback-star-control"><Star selected={selected !== null && value <= selected} /><span>{value}</span></span>
        </label>)}
      </div>
    </fieldset>
  </section>;
}

export function FeedbackCard(props: FeedbackCardProps) {
  if (props.addon === 'csi-rating') return <RatingCard draft={props.draft} onRate={props.onRate} />;
  return <MessageSecondaryAction onClick={props.onSkipComment}>Без комментария</MessageSecondaryAction>;
}

export function FeedbackCancelAction({ onCancel }: { onCancel: () => void }) {
  return <MessageSecondaryAction onClick={onCancel}>Не сейчас</MessageSecondaryAction>;
}

export type { FeedbackAddon };
