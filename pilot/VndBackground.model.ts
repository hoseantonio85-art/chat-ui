export const vndFolders = [
  'Операционные риски',
  'Внутренние нормативные документы',
  'Методология',
] as const;

export type VndFolder = (typeof vndFolders)[number];
export type VndStage = 'start' | 'chooseStandard' | 'reviewing' | 'reviewed' | 'confirmSave' | 'saveDeferred' | 'complete';

export const vndSaveQuestion = 'Сохранить актуальный ВНД в базе знаний, в папке «Операционные риски»?';

export type VndSaveIntent =
  | { kind: 'save'; folder: VndFolder }
  | { kind: 'decline' }
  | { kind: 'chooseFolder' }
  | { kind: 'resume' }
  | { kind: 'unknown' };

export interface VndBackgroundMessage {
  id?: string;
}

export interface VndAttachmentLookupThread {
  scenario?: string;
  vndStage?: string;
  jobState?: 'running' | 'ready' | 'saved';
}

export interface VndBackgroundThreadState {
  id: string;
  updatedAt: number;
  messages: VndBackgroundMessage[];
  vndStage?: VndStage;
  agentState?: 'running' | 'ready';
  agentUnread?: boolean;
  jobState?: 'running' | 'ready' | 'saved';
  documentIds?: string;
  documentName?: string;
  folder?: VndFolder;
  unread?: boolean;
}

type VndBackgroundEvent =
  | { type: 'start'; documentIds: string; documentName: string; message?: VndBackgroundMessage; at: number }
  | { type: 'complete'; unread: boolean; messages?: VndBackgroundMessage[]; at: number }
  | { type: 'markRead' }
  | { type: 'save'; folder: VndFolder; at: number };

const normalize = (text: string) => text
  .normalize('NFKC')
  .toLocaleLowerCase('ru-RU')
  .replace(/[«»"'’.!?,:;()]/gu, ' ')
  .replace(/\s+/gu, ' ')
  .trim();

export function canSaveVnd(thread: Pick<VndBackgroundThreadState, 'jobState' | 'vndStage'>): boolean {
  return thread.jobState !== 'saved'
    && (thread.jobState === 'ready' || thread.vndStage === 'confirmSave' || thread.vndStage === 'saveDeferred');
}

export function parseVndSaveIntent(text: string): VndSaveIntent {
  const input = normalize(text);
  if (!input) return { kind: 'unknown' };

  const words = input.split(' ');
  const saveIndex = words.findIndex(word => /^(?:сохранить|сохрани|сохраняй|сохранять)$/u.test(word));
  const hasRefusalMarker = (saveIndex >= 0 || /^(?:да|давай|ок|окей|хорошо)\s/u.test(input))
    && words.some(word => word === 'не' || word === 'нет' || word === 'отмена');
  const decline = /^(?:нет|не сейчас|не надо|не нужно|отмена)(?:\s|$)/u;
  if (decline.test(input) || hasRefusalMarker) return { kind: 'decline' };

  if (/^(?:вернуться к сохранению|покажи варианты сохранения)$/u.test(input)) return { kind: 'resume' };
  if (/^(?:выбрать|выбери|давай выберем) другую папку$/u.test(input)) return { kind: 'chooseFolder' };
  if (text.trimEnd().endsWith('?')) return { kind: 'unknown' };

  const folder = vndFolders.find(item => input.includes(normalize(item)));
  const saveVerb = /^(?:(?:да|давай|хорошо|ок|окей|пожалуйста)\s+)?(?:сохранить|сохрани|сохраняй)(?:\s|$)/u.test(input);
  const affirmative = /^(?:да|давай|подтверждаю|ок|окей|хорошо)(?:\s+пожалуйста)?$/u.test(input);
  const folderOnly = folder && new RegExp(`^(?:да\\s+)?(?:папка\\s+|в папку\\s+)?${normalize(folder)}$`, 'u').test(input);

  if (folder && (saveVerb || folderOnly)) return { kind: 'save', folder };
  if (saveVerb && /(?:^|\s)(?:в|папку)(?:\s|$)/u.test(input)) return { kind: 'unknown' };
  if (saveVerb || affirmative) return { kind: 'save', folder: vndFolders[0] };
  return { kind: 'unknown' };
}

export function canResolveVndAttachmentLookup(
  currentToken: string | undefined,
  expectedToken: string,
  thread: VndAttachmentLookupThread | undefined,
): boolean {
  return currentToken === expectedToken
    && (thread?.scenario === 'vndBackground' || thread?.scenario === 'vndBackgroundToBe')
    && thread.vndStage === 'chooseStandard'
    && thread.jobState !== 'running';
}

export function applyVndBackgroundEvent<T extends VndBackgroundThreadState>(
  threads: T[],
  id: string,
  event: VndBackgroundEvent,
): T[] {
  const index = threads.findIndex(thread => thread.id === id);
  if (index < 0) return threads;

  const current = threads[index];
  let next: T | undefined;

  switch (event.type) {
    case 'start':
      if (current.jobState === 'running') return threads;
      next = {
        ...current,
        agentState: 'running',
        agentUnread: false,
        jobState: 'running',
        documentIds: event.documentIds,
        documentName: event.documentName,
        folder: undefined,
        unread: false,
        updatedAt: event.at,
        messages: event.message && !current.messages.some(message => message.id === event.message?.id)
          ? [...current.messages, event.message]
          : current.messages,
      };
      break;
    case 'complete': {
      if (current.jobState !== 'running') return threads;
      const messages = event.messages?.filter(message => !current.messages.some(existing => existing.id === message.id));
      next = {
        ...current,
        agentState: 'ready',
        agentUnread: event.unread,
        jobState: 'ready',
        unread: event.unread,
        updatedAt: event.at,
        messages: messages?.length ? [...current.messages, ...messages] : current.messages,
      };
      break;
    }
    case 'markRead':
      if (!current.unread && !current.agentUnread) return threads;
      next = { ...current, unread: false, agentUnread: false };
      break;
    case 'save':
      if (!canSaveVnd(current)) return threads;
      next = {
        ...current,
        jobState: 'saved',
        folder: event.folder,
        unread: false,
        agentUnread: false,
        updatedAt: event.at,
      };
      break;
  }

  const result = [...threads];
  result[index] = next;
  return result;
}
