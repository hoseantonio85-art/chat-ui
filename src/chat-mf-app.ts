import { cssLifecycleFactory } from 'vite-plugin-single-spa/ex';

// This entry exports React components rather than single-spa lifecycles.
// Mount its generated CSS once when the ESM module is imported.
const cssLc = cssLifecycleFactory('chat-mf-app');
void cssLc.bootstrap({} as never);
void cssLc.mount({} as never);

// Export React components from this file and import them into your microfrontends
export { default as Chat } from './chat.component';
export { default as ChatIcon } from './chat.icon.component';
export { default as ChatInput } from './chat.input.component';
export { default as SkillList } from './chat.skills.component';
export { default as ChatModal } from './chat.chatModal.component';
export { type ISendActionProps } from './services/types';
export { configureThreadRepository } from './services/threads/repository';
export { createMemoryThreadRepository } from './services/threads/memory';
export type {
	CreateThreadInput,
	ThreadRepository,
	ThreadSnapshot,
} from './services/threads/types';
