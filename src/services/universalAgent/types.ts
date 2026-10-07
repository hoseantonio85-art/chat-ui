import type { AgentEvent, AgentRun } from '@/components/AgentActivity/model';
import type { IMessage } from '@/types';

export type UniversalAgentInboundUpdate = (
	| { kind: 'message'; message: IMessage; persistedRun?: AgentRun }
	| {
			kind: 'runStarted';
			assistantMessageId: string;
			requestId: string;
			runId: string;
			startedAt: number;
	  }
	| { kind: 'runEvent'; assistantMessageId: string; event: AgentEvent }
	| {
			kind: 'assistantDelta';
			assistantMessageId: string;
			requestId?: string;
			runId?: string;
			text: string;
			append: boolean;
	  }
	| { kind: 'runSnapshot'; assistantMessageId: string; run: AgentRun }
) & { threadId?: string };
