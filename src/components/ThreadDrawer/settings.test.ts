import { describe, expect, it } from 'vitest';
import { clearMemoryFacts, forgetMemoryFact, getDeletionCopy, resetThreads } from './settings';

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

  it('describes deletion of one memory fact', () => {
    expect(getDeletionCopy({ kind: 'memory-fact', fact: 'Краткие ответы' }, 4)).toEqual({
      title: 'Удалить запись из памяти?',
      text: '«Краткие ответы» больше не будет использоваться агентом.',
      confirmLabel: 'Удалить',
    });
  });

  it('describes deletion of all chats with the current count', () => {
    expect(getDeletionCopy({ kind: 'chats-all' }, 4).text).toContain('4');
  });
});
