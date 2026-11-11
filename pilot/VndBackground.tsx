import { useEffect, useRef } from 'react';
import { chat$ } from './mocks/auth';
import { saveVndToKnowledge } from './mocks/files';
import { ERoles, type IMessage } from '@/types';
import type { ChatThread } from '../src/components/ThreadDrawer/context';
import { appendEvent, createRun, type AgentRun } from '../src/components/AgentActivity/model';
import { appendExplanation, vndBackgroundExplanation } from './scenarioExplanations';
import {
  applyVndBackgroundEvent,
  canSaveVnd,
  vndSaveQuestion,
  type VndBackgroundThreadState,
  type VndFolder,
} from './VndBackground.model';

export interface BackgroundThread extends ChatThread, VndBackgroundThreadState {
  scenario?: string;
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
    const comparisonStep = `${pendingId}-compare`;
    run = appendExplanation(run, comparisonStep, vndBackgroundExplanation, startedAt);
    run = appendEvent(run, {
      id: comparisonStep,
      runId: pendingId,
      at: startedAt,
      kind: 'message',
      label: 'Проверяю ВНД по групповому стандарту',
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
      const completedAt = Date.now();
      run = appendExplanation(run, `${pendingId}-complete`, 'Проверка завершилась без отклонений. Предложу сохранить актуальную версию ВНД в базу знаний.', completedAt);
      run = appendEvent(run, {
        id: `${pendingId}-complete`,
        runId: pendingId,
        at: completedAt,
        kind: 'message',
        label: 'Готовлю итог проверки',
      });
      run = appendEvent(run, { id: `${pendingId}-finish`, runId: pendingId, at: Date.now(), kind: 'finish' });
      latest.current.publishRun(id, run);

      const isToBe = current.scenario?.endsWith('ToBe') === true;
      const result: IMessage = {
        id: crypto.randomUUID(),
        role: ERoles.bot,
        text: isToBe
          ? '**Проверка завершена.** Отклонений от выбранного группового стандарта не найдено.'
          : '**Проверка завершена.** Отклонений от выбранного группового стандарта не найдено.\n\nПредлагаю сохранить актуальный ВНД в базу знаний, в папку «Операционные риски». **Напишите «Да»**, чтобы подтвердить, или укажите другую папку: «Внутренние нормативные документы» или «Методология».',
        timeCreated: new Date(completedAt).toISOString(),
      };
      const messages = [result];
      if (isToBe) messages.push({
        id: crypto.randomUUID(),
        role: ERoles.bot,
        text: vndSaveQuestion,
        extras: { vndAddon: 'save-confirmation' },
        timeCreated: new Date(completedAt + 1).toISOString(),
      });
      const isActiveNow = latest.current.activeId.current === id;
      if (isActiveNow) {
        messages.forEach(latest.current.append);
        latest.current.snapshot();
      }
      latest.current.update(items => applyVndBackgroundEvent(items, id, {
        type: 'complete',
        unread: !visible,
        messages: isActiveNow ? undefined : messages,
        at: Date.now(),
      }));
    }, 10_000));
  };

  const save = (id: string, targetFolder: VndFolder) => {
    const thread = latest.current.getThreads().find(item => item.id === id);
    if (!thread || latest.current.activeId.current !== id || !canSaveVnd(thread)) return false;
    const record = saveVndToKnowledge(thread.documentIds, targetFolder);
    if (!record) {
      latest.current.append({
        id: crypto.randomUUID(),
        role: ERoles.bot,
        text: 'Актуальный файл недоступен. Начните проверку заново и прикрепите документ ещё раз.',
        timeCreated: new Date().toISOString(),
      });
      latest.current.snapshot();
      return false;
    }
    latest.current.update(items => applyVndBackgroundEvent(items, id, {
      type: 'save',
      folder: record.folder,
      at: Date.now(),
    }));
    latest.current.append({
      id: crypto.randomUUID(),
      role: ERoles.bot,
      text: `Сохранил «${record.name}» в базу знаний, в папку «${record.folder}».`,
      timeCreated: new Date().toISOString(),
    });
    latest.current.snapshot();
    return true;
  };

  const cancel = (id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
  };
  return { start, markRead, cancel, save };
}
