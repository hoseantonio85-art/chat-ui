import React, { useLayoutEffect, useRef, useState } from 'react';
import { vndFolders, type VndFolder } from './VndBackground.model';
import { vndStandards } from './scenarios';
import './VndToBeActions.css';

type Action = { label: string; onSelect: () => void };
type Placement = 'inline' | 'sticky';

function ContextualActions({ label, actions, placement, long }: {
  label: string;
  actions: Action[];
  placement: Placement;
  long?: boolean;
}) {
  const buttons = <div className={long ? 'context-actions context-actions-long' : 'context-actions'} role="group" aria-label={label}>
    {actions.map(({ label: text, onSelect }, index) => (
      <button type="button" className="context-action" key={text} onClick={onSelect}>
        {long && <span className="context-action-number">{index + 1}</span>}
        <span>{text}</span>
      </button>
    ))}
  </div>;

  if (placement === 'inline') return buttons;
  return <div className="context-actions-sticky">
    {long ? <details><summary>{label}</summary>{buttons}</details> : <>
      <div className="context-actions-label">{label}</div>
      {buttons}
    </>}
  </div>;
}

export function VndStandardActions({ placement, onSelect }: {
  placement: Placement;
  onSelect: (standard: string) => void;
}) {
  return <ContextualActions
    label="Выберите групповой стандарт"
    placement={placement}
    long
    actions={vndStandards.map(standard => ({ label: standard, onSelect: () => onSelect(standard) }))}
  />;
}

export function VndSaveActions({ placement, onReply }: {
  placement: Placement;
  onReply: (reply: string) => void;
}) {
  return <ContextualActions
    label="Сохранить ВНД в «Операционные риски»?"
    placement={placement}
    actions={['Да, сохранить', 'Выбрать другую папку', 'Не сейчас'].map(label => ({
      label,
      onSelect: () => onReply(label),
    }))}
  />;
}

export function VndFolderDialog({ onCancel, onConfirm }: {
  onCancel: () => void;
  onConfirm: (folder: VndFolder) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [folder, setFolder] = useState<VndFolder>();

  useLayoutEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  return <dialog className="vnd-folder-dialog" ref={dialog} aria-labelledby="vnd-folder-title" onCancel={event => {
    event.preventDefault();
    event.stopPropagation();
    onCancel();
  }}>
    <form onSubmit={event => {
      event.preventDefault();
      if (folder) onConfirm(folder);
    }}>
      <h2 id="vnd-folder-title">Папка для актуального ВНД</h2>
      <fieldset>
        <legend className="sr-only">Выберите папку в базе знаний</legend>
        {vndFolders.map(item => <label key={item}>
          <input type="radio" name="vnd-folder" value={item} checked={folder === item} onChange={() => setFolder(item)} />
          {item}
        </label>)}
      </fieldset>
      <div className="vnd-folder-footer">
        <button type="button" className="context-action" onClick={onCancel}>Отмена</button>
        <button type="submit" className="context-action" disabled={!folder}>Сохранить</button>
      </div>
    </form>
  </dialog>;
}
