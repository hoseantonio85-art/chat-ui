import { describe, expect, it } from 'vitest';
import { clearMemoryFacts, forgetMemoryFact, resetThreads } from './settings';

describe('agent settings state', () => {
  it('forgets only the selected memory fact', () => {
    const facts = ['Prefers concise answers', 'Works with VND', 'Uses a business tone'];

    expect(forgetMemoryFact(facts, 'Works with VND')).toEqual([
      'Prefers concise answers',
      'Uses a business tone',
    ]);
    expect(facts).toHaveLength(3);
  });

  it('clears all memory facts', () => {
    expect(clearMemoryFacts()).toEqual([]);
  });

  it('replaces all chats with one fresh chat', () => {
    const fresh = { id: 'new', messages: [] as string[] };

    expect(resetThreads(fresh)).toEqual([fresh]);
  });
});
