import React, { createContext, useContext } from 'react';

export interface ChatThread {
	id: string;
	title: string;
	pinned: boolean;
	updatedAt: number;
	initialSkill?: string;
	agentState?: 'running' | 'ready';
	agentUnread?: boolean;
	unread?: boolean;
	jobState?: 'running' | 'ready' | 'saved';
}

interface ThreadUiValue {
	enabled: boolean;
	threads: ChatThread[];
	agentMemory: string[];
	activeThreadId?: string;
	onSelect: (id: string) => void;
	onNew: () => void;
	onRename: (id: string, title: string) => void;
	onTogglePin: (id: string) => void;
	onDelete: (id: string) => void;
	onForgetMemory: (fact: string) => void;
	onClearMemory: () => void;
	onClearAll: () => void;
}

const fallback: ThreadUiValue = {
	enabled: false,
	threads: [],
	agentMemory: [],
	onSelect: () => undefined,
	onNew: () => undefined,
	onRename: () => undefined,
	onTogglePin: () => undefined,
	onDelete: () => undefined,
	onForgetMemory: () => undefined,
	onClearMemory: () => undefined,
	onClearAll: () => undefined,
};

export const ThreadUiContext = createContext<ThreadUiValue>(fallback);
export const useThreadUi = () => useContext(ThreadUiContext);

