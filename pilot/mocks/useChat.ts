import { useSyncExternalStore } from 'react';
import { addMessageAction, contextChatAtom } from '@/stores';
import { ctx } from '@/stores/ctx';
import { ERoles, type IMessage, type TReaction } from '@/types';

type Request = {body: string; extras?: Record<string, string>};
let sender: (request: Request) => void = () => {};
let online = true;
const pending = new Map<string, Request>();
const listeners = new Set<() => void>();
let revision = 0;
function notify() { revision++; listeners.forEach(listener => listener()); }
export function setDemoSender(handler: typeof sender) { sender = handler; }
export function resetPending() { pending.clear(); notify(); }
export function setDemoOnline(value: boolean) {
  online = value;
  if (online) { const queued = [...pending.values()]; pending.clear(); queued.forEach(sender); }
  notify();
}
const api = {
  send(request: Request) {
    if (!request.body.trim()) return;
    if (online) sender(request);
    else {
      const id = `pending-${crypto.randomUUID()}`;
      pending.set(id, request);
      addMessageAction(ctx, {id, text: request.body, role: ERoles.user, timeCreated: new Date().toISOString(), extras: request.extras});
      notify();
    }
  },
  sendSystem(request: Request) { sender(request); },
  clearContext() {
    contextChatAtom(ctx, null);
    addMessageAction(ctx, {id: crypto.randomUUID(), role: ERoles.bot, text: 'Контекст очищен. Переписка осталась в чате.', timeCreated: new Date().toISOString(), extras: {contextCleared: 'true', type: 'system'}});
  },
  reactOnMessage(message: IMessage, reaction: TReaction) {
    addMessageAction(ctx, {...message, reaction: message.reaction === reaction ? undefined : reaction});
  },
  isMessageSending(id: string) { return pending.has(id); },
  loadHistory() {}, disconnect() {setDemoOnline(false);}, reinitialize() {setDemoOnline(true);},
};
export function useChat() {
  useSyncExternalStore(listener => {listeners.add(listener); return () => listeners.delete(listener);}, () => revision);
  return {...api, connected: online};
}
