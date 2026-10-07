import React, { createContext, useContext } from 'react';
import type { ChatThread } from '@/stores/threads';

export type { ChatThread } from '@/stores/threads';

interface ThreadUiValue {
	enabled: boolean;
	busy: boolean;
	threads: ChatThread[];
	activeThreadId?: string;
	onSelect: (id: string) => void;
	onNew: () => void;
	onRename: (id: string, title: string) => void;
	onTogglePin: (id: string) => void;
	onDelete: (id: string) => void;
}

const fallback: ThreadUiValue = {
	enabled: false,
	busy: false,
	threads: [],
	onSelect: () => undefined,
	onNew: () => undefined,
	onRename: () => undefined,
	onTogglePin: () => undefined,
	onDelete: () => undefined,
};

export const ThreadUiContext = createContext<ThreadUiValue>(fallback);
export const useThreadUi = () => useContext(ThreadUiContext);

