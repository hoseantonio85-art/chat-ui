import React, { useState } from 'react';
import { Button } from '@sber-orm/ui-kit';
import type { CsiDraft } from './Feedback.model';
import './FeedbackCard.css';

type FeedbackAddon = 'csi-rating' | 'csi-comment-actions' | 'csi-review' | 'csi-list';

interface FeedbackCardProps {
  addon: FeedbackAddon;
  draft: CsiDraft;
  onRate: (value: number) => void;
  onSkipComment: () => void;
  onSummaryChange: (value: string) => void;
  onConsentChange: (value: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const Star = ({ selected }: { selected: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.2-5.6-2.9L6.4 20l1.1-6.2-4.6-4.4 6.3-.9L12 2.8Z" fill={selected ? 'currentColor' : 'none'} />
  </svg>
);

function RatingCard({ draft, onRate, onCancel }: Pick<FeedbackCardProps, 'draft' | 'onRate' | 'onCancel'>) {
  const selected = draft.rating.value;
  return <section className="feedback-card feedback-rating-card" aria-labelledby="csi-question">
    <div className="feedback-card-heading">
      <span className="feedback-demo-badge">Демонстрационная оценка CSI</span>
      <span>Ответ можно пропустить</span>
    </div>
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
    <div className="feedback-rating-actions"><Button size="S" variant="secondary" disabled={draft.stage !== 'rating'} onClick={onCancel}>Не сейчас</Button></div>
    <small>В прототипе используется фиксированный вопрос. Методика и правила выборки требуют отдельного согласования.</small>
  </section>;
}

function ReviewCard({ draft, onSummaryChange, onConsentChange, onConfirm, onCancel }: Pick<FeedbackCardProps, 'draft' | 'onSummaryChange' | 'onConsentChange' | 'onConfirm' | 'onCancel'>) {
  const disabled = draft.stage !== 'confirm';
  return <section className="feedback-card feedback-review-card" aria-labelledby="feedback-review-title">
    <div className="feedback-review-header">
      <div>
        <span className="feedback-demo-badge">Демо · данные не отправляются</span>
        <h3 id="feedback-review-title">Проверьте оценку перед отправкой</h3>
      </div>
      <strong>{draft.rating.value} из 5</strong>
    </div>

    <div className="feedback-source">
      <h4>Ваши ответы · без изменений</h4>
      {draft.rawMessages.map(message => <blockquote key={message.messageId}>
        <span>Исходная реплика</span>
        <p>«{message.text}»</p>
      </blockquote>)}
    </div>

    <label className="feedback-summary">
      <span>Интерпретация AI · можно изменить</span>
      <textarea
        value={draft.aiInterpretation.summary}
        disabled={disabled}
        onChange={event => onSummaryChange(event.target.value)}
        rows={3}
      />
    </label>

    <dl className="feedback-meta">
      <div><dt>Сервис</dt><dd>{draft.serviceTitle}</dd></div>
      <div><dt>Сценарий</dt><dd>Фоновая проверка ВНД</dd></div>
      <div><dt>Адресат</dt><dd>{draft.aiInterpretation.recipient}</dd></div>
    </dl>

    <div className="feedback-transfer">
      <h4>Состав демонстрационной записи</h4>
      <p><strong>Передадим:</strong> оценку и вопрос CSI, показанные исходные ответы, интерпретацию AI, сервис и сценарий.</p>
      <p><strong>Не передадим:</strong> весь чат, вложения и другие диалоги.</p>
    </div>

    <label id="csi-consent" className="feedback-consent">
      <input
        type="checkbox"
        checked={draft.consentToSend}
        disabled={disabled}
        onChange={event => onConsentChange(event.target.checked)}
      />
      <span>Подтверждаю состав данных для демонстрационной отправки</span>
    </label>

    <div id="csi-actions" className="feedback-actions">
      <Button size="S" disabled={disabled || !draft.consentToSend} onClick={onConfirm}>Подтвердить</Button>
      <Button size="S" variant="secondary" disabled={disabled} onClick={onCancel}>Отменить</Button>
    </div>
  </section>;
}

function FeedbackList({ draft }: Pick<FeedbackCardProps, 'draft'>) {
  const [service, setService] = useState('all');
  const visible = service === 'all' || service === draft.serviceId;
  return <section className="feedback-card feedback-list" aria-labelledby="feedback-list-title">
    <div className="feedback-list-header">
      <div>
        <span className="feedback-demo-badge">Демо-список</span>
        <h3 id="feedback-list-title">Собранные оценки</h3>
      </div>
      <label><span>Сервис</span><select value={service} onChange={event => setService(event.target.value)}>
        <option value="all">Все сервисы</option>
        <option value="vnd-check">Проверка ВНД</option>
        <option value="risk-registry">Реестр рисков</option>
      </select></label>
    </div>
    {visible ? <article className="feedback-list-item">
      <div><strong>{draft.serviceTitle}</strong><span>{draft.rating.value} из 5 · CSI</span></div>
      <p>{draft.aiInterpretation.summary}</p>
      <details>
        <summary>Показать исходные ответы ({draft.rawMessages.length})</summary>
        {draft.rawMessages.map(message => <blockquote key={message.messageId}>«{message.text}»</blockquote>)}
      </details>
      <small>Статус: демонстрационно сохранено · реальной передачи нет</small>
    </article> : <p className="feedback-empty">Для выбранного сервиса демонстрационных записей нет.</p>}
  </section>;
}

export function FeedbackCard(props: FeedbackCardProps) {
  if (props.addon === 'csi-rating') return <RatingCard draft={props.draft} onRate={props.onRate} onCancel={props.onCancel} />;
  if (props.addon === 'csi-comment-actions') return <div className="feedback-inline-action">
    <Button size="S" variant="secondary" disabled={props.draft.stage !== 'comment'} onClick={props.onSkipComment}>Продолжить без комментария</Button>
  </div>;
  if (props.addon === 'csi-review') return <ReviewCard {...props} />;
  return <FeedbackList draft={props.draft} />;
}

export type { FeedbackAddon };
