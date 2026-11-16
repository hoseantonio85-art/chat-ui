import React, { type ReactNode } from 'react';
import { EIconName, Icon } from '@sber-orm/ui-kit';
import './VndToBeActions.css';

export type ContextualPlacement = 'inline' | 'sticky';

type ContextualGroupProps = {
  label: string;
  placement: ContextualPlacement;
};

function ContextualPanel({ label, placement, collapsible, children }: ContextualGroupProps & {
  collapsible?: boolean;
  children: ReactNode;
}) {
  if (placement === 'inline') return <>{children}</>;
  return <div className="context-actions-sticky">
    {collapsible ? <details>
      <summary>
        <span className="context-actions-chevron" aria-hidden="true">
          <Icon name={EIconName.chevronFillRight} width={16} height={16} />
        </span>
        {label}
      </summary>
      {children}
    </details> : <>
      <div className="context-actions-label">{label}</div>
      {children}
    </>}
  </div>;
}

export function ContextualButtons({ label, placement, actions }: ContextualGroupProps & {
  actions: readonly { label: string; onSelect: () => void }[];
}) {
  return <ContextualPanel label={label} placement={placement}>
    <div className="context-actions" role="group" aria-label={label}>
      {actions.map(action => <button type="button" className="context-action" key={action.label} onClick={action.onSelect}>
        {action.label}
      </button>)}
    </div>
  </ContextualPanel>;
}

type ChoiceMode<T extends string> =
  | { onSelect: (option: T) => void; numbered?: boolean }
  | { selected: readonly T[]; onToggle: (option: T) => void; onConfirm: () => void };

export function ContextualChoices<T extends string>({ label, placement, options, mode }: ContextualGroupProps & {
  options: readonly T[];
  mode: ChoiceMode<T>;
}) {
  const multiple = 'selected' in mode;
  return <ContextualPanel label={label} placement={placement} collapsible>
    <div className="context-choice-card">
      <div className="context-actions context-actions-list" role="group" aria-label={label}>
        {options.map((option, index) => multiple
          ? <label className="context-action context-choice-option" key={option}>
            <input type="checkbox" checked={mode.selected.includes(option)} onChange={() => mode.onToggle(option)} />
            <span>{option}</span>
          </label>
          : <button type="button" className="context-action" key={option} onClick={() => mode.onSelect(option)}>
            {mode.numbered && <span className="context-action-number">{index + 1}</span>}
            <span>{option}</span>
          </button>)}
      </div>
      {multiple && <button type="button" className="context-action context-choice-confirm"
        disabled={!mode.selected.length} onClick={mode.onConfirm}>
        Подтвердить выбор
      </button>}
    </div>
  </ContextualPanel>;
}
