import React, { useState } from 'react';
import { Button } from '@sber-orm/ui-kit';
import { vndFolders, type VndFolder } from './VndBackground.model';
import { vndStandards } from './scenarios';
import './VndToBeActions.css';

export function VndStandardActions({ onSelect }: { onSelect: (number: number) => void }) {
  return <div className="vnd-to-be-card" aria-label="Выбор группового документа">
    <div className="vnd-to-be-options">
      {vndStandards.map((standard, index) => <button
        type="button"
        className="vnd-to-be-option"
        key={standard}
        onClick={() => onSelect(index + 1)}
      >
        <span aria-hidden="true">{index + 1}</span>
        <span>{standard}</span>
      </button>)}
    </div>
    <p className="vnd-to-be-hint">Или впишите номер от 1 до 4 в поле сообщения.</p>
  </div>;
}

export function VndSaveActions({
  onConfirm,
  onDecline,
}: {
  onConfirm: (folder: VndFolder) => void;
  onDecline: () => void;
}) {
  const [folder, setFolder] = useState<VndFolder>(vndFolders[0]);

  return <div className="vnd-to-be-card vnd-to-be-save" aria-label="Подтверждение сохранения ВНД">
    <label>
      <span>Папка в базе знаний</span>
      <select value={folder} onChange={event => setFolder(event.target.value as VndFolder)}>
        {vndFolders.map(item => <option key={item}>{item}</option>)}
      </select>
    </label>
    <div className="vnd-to-be-actions">
      <Button size="S" onClick={() => onConfirm(folder)}>Сохранить</Button>
      <Button size="S" variant="secondary" onClick={onDecline}>Не сохранять</Button>
    </div>
  </div>;
}
