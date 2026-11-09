import { describe, expect, it } from 'vitest';
import { fixture } from './scenarios';

describe('pilot explanations', () => {
  it('answers a definition without pretending to research a company', () => {
    const {events, answer} = fixture('ordinary', 'run', 0);
    expect(events.length).toBeGreaterThan(0);
    expect(events.every(event => event.kind === 'thinking' && !event.progressDelta?.stepId)).toBe(true);
    expect(events.map(event => event.progressDelta?.text).join('')).toContain('Пользователь просит краткое определение');
    expect(answer).toContain('сбой платёжной системы');
  });

  it('keeps calls and timers in the model without reasoning', () => {
    const {events} = fixture('noReasoning', 'run', 0);
    expect(events.filter(event => event.kind === 'thinking')).toEqual([]);
    expect(events.filter(event => event.kind === 'toolCall').map(event => event.callId)).toEqual(['profile', 'method', 'risks']);
    expect(events.find(event => event.kind === 'toolResult')?.at).toBe(4500);
  });
});
