import type { AgentRun } from '@/components/AgentActivity/model';
import type { ChatThread } from '@/stores/threads';
import type { IMessage } from '@/types';

export interface ThreadSnapshot {
	thread: ChatThread;
	messages: IMessage[];
	agentRuns: Readonly<Record<string, AgentRun>>;
	canLoadHistory: boolean;
}

export interface CreateThreadInput {
	title: string;
	initialSkill?: string;
}

export interface ThreadRepository {
	list: () => Promise<ChatThread[]>;
	load: (threadId: string) => Promise<ThreadSnapshot>;
	create: (input: CreateThreadInput) => Promise<ThreadSnapshot>;
	rename: (threadId: string, title: string) => Promise<ChatThread>;
	setPinned: (threadId: string, pinned: boolean) => Promise<ChatThread>;
	delete: (threadId: string) => Promise<void>;
}
