export interface ThreadActivityState {
  id: string;
  updatedAt: number;
  agentState?: 'running' | 'ready';
  agentUnread?: boolean;
}

export interface HistoryIndicatorState {
  running: boolean;
  unreadReady: boolean;
}

export function startThreadActivity<T extends ThreadActivityState>(
  threads: T[],
  id: string,
  at: number,
): T[] {
  const index = threads.findIndex(thread => thread.id === id);
  if (index < 0) return threads;
  const result = [...threads];
  result[index] = {
    ...threads[index],
    agentState: 'running',
    agentUnread: false,
    updatedAt: at,
  };
  return result;
}

export function completeThreadActivity<T extends ThreadActivityState>(
  threads: T[],
  id: string,
  options: { viewed: boolean; at: number },
): T[] {
  const index = threads.findIndex(thread => thread.id === id);
  if (index < 0 || threads[index].agentState !== 'running') return threads;
  const result = [...threads];
  result[index] = {
    ...threads[index],
    agentState: 'ready',
    agentUnread: !options.viewed,
    updatedAt: options.at,
  };
  return result;
}

export function markThreadActivityRead<T extends ThreadActivityState>(
  threads: T[],
  id: string,
): T[] {
  const index = threads.findIndex(thread => thread.id === id);
  if (index < 0 || !threads[index].agentUnread) return threads;
  const result = [...threads];
  result[index] = { ...threads[index], agentUnread: false };
  return result;
}

export function getHistoryIndicatorState(
  threads: ThreadActivityState[],
): HistoryIndicatorState {
  return {
    running: threads.some(thread => thread.agentState === 'running'),
    unreadReady: threads.some(thread => thread.agentState === 'ready' && thread.agentUnread),
  };
}
