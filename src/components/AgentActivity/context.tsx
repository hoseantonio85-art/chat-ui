import { createContext, useContext } from 'react';
import type { AgentRun } from './model';
/** Optional presentation data: no addition to the production IMessage wire contract. */
export const AgentRunsContext = createContext<Readonly<Record<string, AgentRun>>>({});
export const useAgentRun = (messageId?: string) => useContext(AgentRunsContext)[messageId || ''];

/** Initial disclosure state for a standalone preview. Applied once on mount. */
export const AgentPreviewContext = createContext<Readonly<Record<string, {
  expanded?: boolean;
  detailTitle?: string;
}>>>({});
