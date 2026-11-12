import { describe, expect, it } from 'vitest';
import {
  scenarios,
  getAdjacentStep,
  getInitialLocation,
  getScenarioStep,
  getSettingsNextSteps,
  toLivePreviewUrl,
  toSearch,
} from './model';

describe('scenario map model', () => {
  it('keeps stable unique ids and a real screen for every step', () => {
    const ids = scenarios.flatMap(scenario => scenario.steps.map(step => step.id));
    const screens = scenarios.flatMap(scenario => scenario.steps.map(step => step.screen));

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(screens).size).toBe(screens.length);
    expect(scenarios.map(scenario => scenario.steps.length)).toEqual([6, 5, 6, 8, 4, 5, 4]);
    expect(scenarios.every(scenario => scenario.steps.every(step => step.screen.endsWith('.png')))).toBe(true);
  });

  it('restores a valid deep link', () => {
    expect(getInitialLocation('?scenario=settings&step=settings.confirm&view=screens')).toEqual({
      scenarioId: 'settings',
      stepId: 'settings.confirm',
      view: 'screens',
    });
  });

  it('opens the unread reply directly and navigates through the notification flow', () => {
    expect(getInitialLocation('?scenario=reply-ready&step=reply-ready.unread&view=screens')).toEqual({
      scenarioId: 'reply-ready', stepId: 'reply-ready.unread', view: 'screens',
    });
    expect(getAdjacentStep('reply-ready', 'reply-ready.switch', 1)?.id).toBe('reply-ready.running');
    expect(getAdjacentStep('reply-ready', 'reply-ready.running', 1)?.id).toBe('reply-ready.menu');
    expect(getAdjacentStep('reply-ready', 'reply-ready.menu', 1)?.id).toBe('reply-ready.unread');
    expect(getAdjacentStep('reply-ready', 'reply-ready.unread', 1)?.id).toBe('reply-ready.read');
  });

  it('restores the empty memory branch and navigates to its confirmation', () => {
    expect(getInitialLocation('?scenario=settings-clear&step=settings-clear.empty&view=screens')).toEqual({
      scenarioId: 'settings',
      stepId: 'settings-clear.empty',
      view: 'screens',
    });
    expect(getInitialLocation('?scenario=settings-clear&step=settings-clear.overview').stepId).toBe('settings.overview');
    expect(getAdjacentStep('settings', 'settings-clear.empty', -1)?.id).toBe('settings-clear.confirm');
  });

  it('offers both paths at the common overview and stops at the end of each path', () => {
    expect(getSettingsNextSteps('settings.overview').map(step => step.id)).toEqual(['settings.confirm', 'settings-clear.confirm']);
    expect(getAdjacentStep('settings', 'settings.confirm', -1)?.id).toBe('settings.overview');
    expect(getAdjacentStep('settings', 'settings-clear.confirm', -1)?.id).toBe('settings.overview');
    expect(getAdjacentStep('settings', 'settings.updated', 1)?.id).toBe('settings.updated');
    expect(getAdjacentStep('settings', 'settings-clear.empty', 1)?.id).toBe('settings-clear.empty');
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
    expect(getScenarioStep('settings', 'settings.confirm')?.title).toBe('Удалить один факт');
    expect(getScenarioStep('settings', 'vnd.result')).toBeUndefined();
  });

  it('redirects legacy CSI review links to the new conversational saved state', () => {
    expect(getInitialLocation('?scenario=csi&step=csi.review&view=screens')).toEqual({
      scenarioId: 'csi',
      stepId: 'csi.saved',
      view: 'screens',
    });
    expect(getScenarioStep('csi', 'csi.saved')?.summary).toContain('без отдельного подтверждения');
  });

  it('restores every TO-BE feedback route as a separate scenario', () => {
    expect(getInitialLocation('?scenario=csi-direct&step=csi-direct.service&view=story').scenarioId).toBe('csi-direct');
    expect(getInitialLocation('?scenario=feedback-complaint&step=feedback.help&view=screens').stepId).toBe('feedback.help');
    expect(getInitialLocation('?scenario=feedback-positive&step=feedback.praise&view=story').stepId).toBe('feedback.praise');
  });
});
