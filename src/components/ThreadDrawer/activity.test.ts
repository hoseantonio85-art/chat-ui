import { describe, expect, it } from 'vitest';
import {
  completeThreadActivity,
  getHistoryIndicatorState,
  markThreadActivityRead,
  startThreadActivity,
} from './activity';

interface TestThread {
  id: string;
  updatedAt: number;
  agentState?: 'running' | 'ready';
  agentUnread?: boolean;
  jobState?: 'running' | 'ready' | 'saved';
  unread?: boolean;
}

const thread = (id: string, overrides: Partial<TestThread> = {}): TestThread => ({
  id,
  updatedAt: 1,
  ...overrides,
});

describe('thread activity lifecycle', () => {
  it('marks only the target thread as running without changing business state', () => {
    const other = thread('other');
    const result = startThreadActivity([
      thread('active', { agentState: 'ready', agentUnread: true, jobState: 'ready', unread: true }),
      other,
    ], 'active', 10);

    expect(result[0]).toEqual({
      id: 'active', agentState: 'running', agentUnread: false,
      jobState: 'ready', unread: true, updatedAt: 10,
    });
    expect(result[1]).toBe(other);
  });

  it('marks a completed unseen task as ready and unread', () => {
    const result = completeThreadActivity([
      thread('active', { agentState: 'running' }),
    ], 'active', { viewed: false, at: 20 });

    expect(result[0]).toEqual({ id: 'active', agentState: 'ready', agentUnread: true, updatedAt: 20 });
  });

  it('does not mark a completed task unread when its result is already visible', () => {
    const result = completeThreadActivity([
      thread('active', { agentState: 'running' }),
    ], 'active', { viewed: true, at: 20 });

    expect(result[0]).toEqual({ id: 'active', agentState: 'ready', agentUnread: false, updatedAt: 20 });
  });

  it('ignores stale completion events when the thread is no longer running', () => {
    const threads = [thread('active', { agentState: 'ready', agentUnread: true })];
    expect(completeThreadActivity(threads, 'active', { viewed: true, at: 20 })).toBe(threads);
  });

  it('marks only the selected completed result as read', () => {
    const other = thread('other', { agentState: 'ready', agentUnread: true });
    const result = markThreadActivityRead([
      thread('active', { agentState: 'ready', agentUnread: true }),
      other,
    ], 'active');

    expect(result[0]).toEqual({ id: 'active', agentState: 'ready', agentUnread: false, updatedAt: 1 });
    expect(result[1]).toBe(other);
  });
});

describe('history trigger indicators', () => {
  it('reports running and unread-ready states independently', () => {
    expect(getHistoryIndicatorState([
      thread('running', { agentState: 'running' }),
      thread('ready', { agentState: 'ready', agentUnread: true }),
    ])).toEqual({ running: true, unreadReady: true });
  });

  it('does not show a completion sparkle for a viewed or saved result', () => {
    expect(getHistoryIndicatorState([
      thread('viewed', { agentState: 'ready', agentUnread: false }),
      thread('saved', { jobState: 'saved', unread: true }),
    ])).toEqual({ running: false, unreadReady: false });
  });
});
