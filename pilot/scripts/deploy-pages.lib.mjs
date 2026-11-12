import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const DEPLOY_SOURCE_BRANCH = 'universal-agent-ui-pilot';
export const PAGES_SCREEN_ASSETS = [
  'csi-01-prompt.png',
  'csi-02-low.png',
  'csi-03-neutral.png',
  'csi-04-high.png',
  'csi-05-skipped.png',
  'csi-06-saved.png',
  'csi-07-error.png',
  'csi-08-declined.png',
  'csi-direct-01-known.png',
  'csi-direct-02-service.png',
  'csi-direct-03-rating.png',
  'csi-direct-04-saved.png',
  'feedback-complaint-01-complaint.png',
  'feedback-complaint-02-help.png',
  'feedback-complaint-03-clarify.png',
  'feedback-complaint-04-clarified.png',
  'feedback-complaint-05-error.png',
  'feedback-positive-01-idea.png',
  'feedback-positive-02-idea-clarify.png',
  'feedback-positive-03-idea-clarified.png',
  'feedback-positive-04-praise.png',
  'reply-ready-01-switch.png',
  'reply-ready-02-running.png',
  'reply-ready-02-menu.png',
  'reply-ready-02-unread.png',
  'reply-ready-03-read.png',
  'settings-01-history.png',
  'settings-02-overview.png',
  'settings-03-confirm.png',
  'settings-04-updated.png',
  'settings-clear-01-overview.png',
  'settings-clear-02-confirm.png',
  'settings-clear-03-empty.png',
  'vnd-01-start.png',
  'vnd-02-running.png',
  'vnd-03-history-running.png',
  'vnd-04-unread.png',
  'vnd-05-result.png',
  'vnd-06-saved.png',
];

export function assertDeploySourceBranch(branch) {
  if (branch !== DEPLOY_SOURCE_BRANCH) {
    throw new Error(`GitHub Pages must be published from ${DEPLOY_SOURCE_BRANCH}; current branch is ${branch || 'detached HEAD'}.`);
  }
}

export function assertPagesBuild(distDir) {
  if (!existsSync(join(distDir, 'index.html'))) {
    throw new Error('Chat UI artifact is missing: dist/index.html.');
  }
  if (!existsSync(join(distDir, 'scenario-map', 'index.html'))) {
    throw new Error('Scenario map artifact is missing: dist/scenario-map/index.html.');
  }
  const screensDir = join(distDir, 'scenario-map', 'screens');
  const screens = existsSync(screensDir) ? new Set(readdirSync(screensDir)) : new Set();
  if (!PAGES_SCREEN_ASSETS.every(file => screens.has(file))) {
    throw new Error(`Expected all ${PAGES_SCREEN_ASSETS.length} scenario map screenshots in dist/scenario-map/screens.`);
  }
}
