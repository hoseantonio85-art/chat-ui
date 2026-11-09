import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@sber-orm/ui-kit';
import { chat$ } from './mocks/auth';
import { ERoles, type IMessage } from '@/types';
import type { ChatThread } from '../src/components/ThreadDrawer/context';
import { appendEvent, createRun, type AgentRun } from '../src/components/AgentActivity/model';
import {
  applyVndBackgroundEvent,
  parseVndSaveIntent,
  vndFolders,
  type VndBackgroundThreadState,
  type VndFolder,
} from './VndBackground.model';

export interface BackgroundThread extends ChatThread, VndBackgroundThreadState {
  documentIds?: string;
  documentName?: string;
  folder?: VndFolder;
}

export function useVndBackground<T extends BackgroundThread>(options: {
  activeId: React.MutableRefObject<string>;
  getThreads: () => T[];
  update: (change: (items: T[]) => T[]) => void;
  snapshot: () => unknown;
  append: (message: IMessage) => void;
  publishRun: (id: string, run: AgentRun) => void;
}) {
  const latest = useRef(options);
  latest.current = options;
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const [folderDialog, setFolderDialog] = useState<string>();
  const [folder, setFolder] = useState<VndFolder>(vndFolders[0]);
  const [knowledge, setKnowledge] = useState(false);
  const [files, setFiles] = useState<{ id: string; name: string; folder: VndFolder; documentIds: string }[]>([]);
  const [chatOpen, setChatOpen] = useState(chat$.value.isPortalOpen);

  const markRead = (id: string) => {
    latest.current.update(items => applyVndBackgroundEvent(items, id, { type: 'markRead' }));
  };

  useEffect(() => {
    const markVisibleResultRead = () => {
      if (chat$.value.isPortalOpen && document.visibilityState === 'visible') {
        markRead(latest.current.activeId.current);
      }
    };
    const sub = chat$.observer$.subscribe({
      next: value => {
        setChatOpen(value.isPortalOpen);
        if (value.isPortalOpen) markVisibleResultRead();
      },
    });
    document.addEventListener('visibilitychange', markVisibleResultRead);
    return () => {
      sub.unsubscribe();
      document.removeEventListener('visibilitychange', markVisibleResultRead);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const start = (id: string, documentIds: string, documentName: string) => {
    if (timers.current.has(id)) return;
    const target = latest.current.getThreads().find(item => item.id === id);
    if (!target || target.jobState === 'running') return;

    const startedAt = Date.now();
    const pendingId = `vnd-background-${crypto.randomUUID()}`;
    const pending: IMessage = {
      id: pendingId,
      role: ERoles.bot,
      text: '',
      extras: { agentPending: 'true' },
      timeCreated: new Date(startedAt).toISOString(),
    };
    let run = createRun(pendingId, `vnd-request-${crypto.randomUUID()}`, startedAt);
    run = appendEvent(run, {
      id: `${pendingId}-plan`,
      runId: pendingId,
      at: startedAt,
      kind: 'plan',
      label: 'Проверяю ВНД по групповому стандарту',
      tool: 'write_todos',
      todos: [
        { content: 'Изучить документ', status: 'in_progress' },
        { content: 'Сверить с групповым стандартом', status: 'pending' },
      ],
    });

    const isActive = latest.current.activeId.current === id;
    if (isActive) {
      latest.current.append(pending);
      latest.current.snapshot();
    }
    latest.current.update(items => applyVndBackgroundEvent(items, id, {
      type: 'start',
      documentIds,
      documentName,
      message: isActive ? undefined : pending,
      at: startedAt,
    }));
    latest.current.publishRun(id, run);

    timers.current.set(id, setTimeout(() => {
      timers.current.delete(id);
      const current = latest.current.getThreads().find(item => item.id === id);
      if (!current || current.jobState !== 'running') return;

      const visible = latest.current.activeId.current === id
        && chat$.value.isPortalOpen
        && document.visibilityState === 'visible';
      run = appendEvent(run, {
        id: `${pendingId}-complete`,
        runId: pendingId,
        at: Date.now(),
        kind: 'plan',
        tool: 'write_todos',
        todos: [
          { content: 'Изучить документ', status: 'completed' },
          { content: 'Сверить с групповым стандартом', status: 'completed' },
        ],
      });
      run = appendEvent(run, { id: `${pendingId}-finish`, runId: pendingId, at: Date.now(), kind: 'finish' });
      latest.current.publishRun(id, run);

      const message: IMessage = {
        id: crypto.randomUUID(),
        role: ERoles.bot,
        text: '**Проверка завершена.** Отклонений от выбранного группового стандарта не найдено.\n\nПредлагаю сохранить актуальный ВНД в базу знаний, в папку «Операционные риски». **Напишите «Да»**, чтобы подтвердить, или укажите другую папку: «Внутренние нормативные документы» или «Методология».',
        timeCreated: new Date().toISOString(),
      };
      const isActiveNow = latest.current.activeId.current === id;
      if (isActiveNow) {
        latest.current.append(message);
        latest.current.snapshot();
      }
      latest.current.update(items => applyVndBackgroundEvent(items, id, {
        type: 'complete',
        unread: !visible,
        message: isActiveNow ? undefined : message,
        at: Date.now(),
      }));
    }, 10_000));
  };

  const save = (id: string, targetFolder: VndFolder = folder) => {
    const thread = latest.current.getThreads().find(item => item.id === id);
    if (!thread || thread.jobState !== 'ready') return;
    setFiles(items => [
      ...items.filter(item => item.id !== id),
      {
        id,
        name: thread.documentName || 'ВНД.docx',
        folder: targetFolder,
        documentIds: thread.documentIds || '[]',
      },
    ]);
    latest.current.append({
      id: crypto.randomUUID(),
      role: ERoles.bot,
      text: `Сохранил «${thread.documentName || 'ВНД.docx'}» в базу знаний, в папку «${targetFolder}».`,
      timeCreated: new Date().toISOString(),
    });
    latest.current.snapshot();
    latest.current.update(items => applyVndBackgroundEvent(items, id, {
      type: 'save',
      folder: targetFolder,
      at: Date.now(),
    }));
    setFolderDialog(undefined);
  };

  const saveFromChat = (id: string, text: string): boolean => {
    const intent = parseVndSaveIntent(text);
    if (intent.kind === 'decline') {
      latest.current.append({
        id: crypto.randomUUID(),
        role: ERoles.bot,
        text: 'Хорошо, пока не сохраняю. Если решите сохранить ВНД позднее, напишите «Сохрани».',
        timeCreated: new Date().toISOString(),
      });
      latest.current.snapshot();
      return true;
    }
    if (intent.kind === 'save') {
      save(id, intent.folder);
      return true;
    }
    return false;
  };

  const active = options.getThreads().find(item => item.id === options.activeId.current);
  const cancel = (id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
  };
  const legacySaveControls = false; // Retain the previous folder picker flow for a later iteration.

  return {
    start,
    markRead,
    cancel,
    saveFromChat,
    ui: <>
      {legacySaveControls && chatOpen && active?.jobState === 'ready' && <div className="vnd-save-actions">
        <span>База знаний · {active.documentName}</span>
        <Button size="S" onClick={() => { setFolder(vndFolders[0]); setFolderDialog(active.id); }}>Сохранить ВНД</Button>
        <Button size="S" variant="secondary" onClick={() => { setFolder(vndFolders[0]); setFolderDialog(active.id); }}>Выбрать папку</Button>
      </div>}
      {legacySaveControls && chatOpen && active?.jobState === 'saved' && <div className="vnd-save-actions">
        <span>ВНД сохранён в базе знаний</span>
        <Button size="S" variant="secondary" onClick={() => setKnowledge(true)}>Открыть в базе знаний</Button>
      </div>}
      {legacySaveControls && folderDialog && <div className="demo-action" role="dialog" aria-modal="true" aria-label="Сохранить ВНД">
        <h2>Сохранить ВНД в базу знаний</h2>
        <p>{active?.documentName}</p>
        <label>Папка
          <select autoFocus value={folder} onChange={event => setFolder(event.target.value as VndFolder)}>
            {vndFolders.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <p>Будет сохранён только актуальный файл ВНД.</p>
        <div className="vnd-dialog-actions">
          <Button onClick={() => save(folderDialog)}>Сохранить</Button>
          <Button variant="secondary" onClick={() => setFolderDialog(undefined)}>Отмена</Button>
        </div>
      </div>}
      {knowledge && <div className="demo-action" role="dialog" aria-modal="true" aria-label="База знаний">
        <h2>База знаний</h2>
        {files.map(file => <div key={file.id} className="vnd-knowledge-file">
          <small>{file.folder}</small>
          <strong>{file.name}</strong>
          <span>Актуальная версия · DOCX</span>
        </div>)}
        <p>Демонстрационное сохранение в прототипе.</p>
        <Button variant="secondary" onClick={() => setKnowledge(false)}>Вернуться в чат</Button>
      </div>}
    </>,
  };
}
