import { describe, expect, it } from 'vitest';
import {
  scenarios,
  getAdjacentStep,
  getInitialLocation,
  getScenarioStep,
  toLivePreviewUrl,
  toSearch,
} from './model';

describe('scenario map model', () => {
  it('keeps stable unique ids and a real screen for every step', () => {
    const ids = scenarios.flatMap(scenario => scenario.steps.map(step => step.id));

    expect(new Set(ids).size).toBe(ids.length);
    expect(scenarios.map(scenario => scenario.steps.length)).toEqual([6, 4]);
    expect(scenarios.every(scenario => scenario.steps.every(step => step.screen.endsWith('.png')))).toBe(true);
  });

  it('restores a valid deep link', () => {
    expect(getInitialLocation('?scenario=settings&step=settings.confirm&view=screens')).toEqual({
      scenarioId: 'settings',
      stepId: 'settings.confirm',
      view: 'screens',
    });
  });

  it('falls back safely when a deep link is inconsistent', () => {
    expect(getInitialLocation('?scenario=settings&step=vnd.saved&view=unknown')).toEqual({
      scenarioId: 'settings',
      stepId: 'settings.history',
      view: 'story',
    });
    expect(getInitialLocation('?scenario=missing')).toEqual({
      scenarioId: 'vnd',
      stepId: 'vnd.start',
      view: 'story',
    });
  });

  it('serializes the selected scenario, step, and view', () => {
    expect(toSearch({ scenarioId: 'vnd', stepId: 'vnd.result', view: 'screens' }))
      .toBe('?scenario=vnd&step=vnd.result&view=screens');
  });

  it('creates a same-origin live preview URL for the 100% viewer', () => {
    expect(toLivePreviewUrl('/chat-ui/', 'settings.confirm'))
      .toBe('/chat-ui/?atlas=settings.confirm&embed=1');
  });

  it('moves through steps without wrapping at the boundaries', () => {
    expect(getAdjacentStep('vnd', 'vnd.start', -1)?.id).toBe('vnd.start');
    expect(getAdjacentStep('vnd', 'vnd.start', 1)?.id).toBe('vnd.running');
    expect(getAdjacentStep('vnd', 'vnd.saved', 1)?.id).toBe('vnd.saved');
  });

  it('returns only a step that belongs to the selected scenario', () => {
    expect(getScenarioStep('settings', 'settings.confirm')?.title).toContain('Подтверждение');
    expect(getScenarioStep('settings', 'vnd.result')).toBeUndefined();
  });
});
