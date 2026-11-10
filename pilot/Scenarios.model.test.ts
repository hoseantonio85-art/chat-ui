import { describe, expect, it } from 'vitest';
import { fixture, isVndBackgroundScenario, isVndToBeScenario, scenarioGroups, scenarios, ungroupedScenarioIds, vndStandards } from './scenarios';

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

  it('keeps expert work in one flat activity trace', () => {
    const {events} = fixture('subagent', 'run', 0);
    expect(events.every(event => !event.parentCallId)).toBe(true);
    expect(events.filter(event => event.kind === 'delegation').map(event => event.callId)).toEqual(['expert']);
    expect(events.filter(event => event.kind === 'toolCall').map(event => event.callId)).toEqual(['profile', 'risks']);
    const expert = events.find(event => event.kind === 'delegation');
    const handback = events.find(event => event.kind === 'handback');
    expect(handback!.at - expert!.at).toBe(2100);
  });

  it('places every scenario in the tree exactly once', () => {
    const treeIds = [...scenarioGroups.flatMap(group => group.scenarioIds), ...ungroupedScenarioIds];
    expect(new Set(treeIds).size).toBe(treeIds.length);
    expect(new Set(treeIds)).toEqual(new Set(scenarios.map(scenario => scenario.id)));
  });

  it('keeps future VND flows separate from the current MVP flows', () => {
    const futureGroup = scenarioGroups.find(group => group.id === 'vnd-to-be');
    expect(futureGroup?.scenarioIds).toEqual(['vndBackgroundToBe', 'vndToBe', 'vndWelcomeToBe']);
    expect(futureGroup?.scenarioIds.every(isVndToBeScenario)).toBe(true);
    expect(isVndBackgroundScenario('vndBackground')).toBe(true);
    expect(isVndBackgroundScenario('vndBackgroundToBe')).toBe(true);
    expect(vndStandards).toHaveLength(4);
  });
});
