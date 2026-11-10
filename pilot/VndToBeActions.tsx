import React, { useState } from 'react';
import { Button, Select } from '@sber-orm/ui-kit';
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
  </div>;
}

export function VndSaveActions({
  onConfirm,
}: {
  onConfirm: (folder: VndFolder) => void;
}) {
  const [folder, setFolder] = useState<VndFolder>(vndFolders[0]);
  const folderOptions = vndFolders.map(value => ({ value, label: value }));

  return <div className="vnd-to-be-card vnd-to-be-save" aria-label="Подтверждение сохранения ВНД">
    <Select
      className="vnd-to-be-select"
      dropdownProps={{ className: 'vnd-to-be-select-dropdown' }}
      label="Папка в базе знаний"
      labelInside
      limitByWidth
      options={folderOptions}
      showCheckMark={false}
      size="M"
      value={folder}
      onChange={value => setFolder(value as VndFolder)}
    />
    <div className="vnd-to-be-actions">
      <Button size="S" onClick={() => onConfirm(folder)}>Сохранить</Button>
    </div>
  </div>;
}
