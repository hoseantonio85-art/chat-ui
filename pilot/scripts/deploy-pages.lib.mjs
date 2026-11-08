import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const DEPLOY_SOURCE_BRANCH = 'universal-agent-ui-pilot';
export const PAGES_SCREEN_ASSETS = [
  'csi-01-prompt.png',
  'csi-02-rating.png',
  'csi-03-review.png',
  'csi-04-edited.png',
  'csi-05-submitted.png',
  'settings-01-history.png',
  'settings-02-overview.png',
  'settings-03-confirm.png',
  'settings-04-updated.png',
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
