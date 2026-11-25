import React, { useLayoutEffect, useRef, useState } from 'react';
import { ContextualButtons, ContextualChoices, type ContextualPlacement } from './ContextualActions';
import { vndFolders, type VndFolder } from './VndBackground.model';
import { vndStandards } from './scenarios';

export function VndStandardActions({ placement, onSelect, onSkip }: {
  placement: ContextualPlacement;
  onSelect: (standard: string) => void;
  onSkip: () => void;
}) {
  return <ContextualChoices
    label="Выберите групповой стандарт"
    placement={placement}
    options={vndStandards}
    onSkip={onSkip}
    mode={{ onSelect, numbered: true }}
  />;
}

export function VndSaveActions({ placement, onReply, onSkip }: {
  placement: ContextualPlacement;
  onReply: (reply: string) => void;
  onSkip: () => void;
}) {
  return <ContextualButtons
    label="Сохранить ВНД в «Стандарты»?"
    placement={placement}
    onSkip={onSkip}
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
