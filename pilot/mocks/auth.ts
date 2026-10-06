export enum EChatState { small = 'small', fullScreen = 'fullScreen' }
export interface IChatState { isPortalOpen: boolean; state: EChatState; messageQueue?: unknown; showResizeButton: boolean }
function observable<T>(initial: T) {
  const listeners = new Set<{ next(value: T): void }>();
  return { value: initial, observer$: { subscribe(listener: {next(value: T): void}) { listeners.add(listener); return {unsubscribe: () => listeners.delete(listener)}; } },
    update(patch: Partial<T>) { this.value = {...this.value, ...patch}; for (const listener of listeners) listener.next(this.value); } };
}
export const chat$ = Object.assign(observable<IChatState>({isPortalOpen: true, state: EChatState.fullScreen, showResizeButton: false}), {
  changeChatState(state: EChatState) { chat$.update({state}); },
  openChat() { chat$.update({isPortalOpen: true}); },
  closeChat() { chat$.update({isPortalOpen: false}); },
  clearMessageQueue() { chat$.update({messageQueue: undefined}); },
});
export const tenant$ = observable({tenantId: 'demo-tenant'});
export const user$ = observable({userId: 'demo-user'});
export const baseUrl$ = {incidents: '/demo-incidents'};
export const accessControl$ = { userHasAccess: (_permission: string) => true };
