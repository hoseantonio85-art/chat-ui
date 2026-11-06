export const DEPLOY_SOURCE_BRANCH = 'universal-agent-ui-pilot';

export function assertDeploySourceBranch(branch) {
  if (branch !== DEPLOY_SOURCE_BRANCH) {
    throw new Error(`GitHub Pages must be published from ${DEPLOY_SOURCE_BRANCH}; current branch is ${branch || 'detached HEAD'}.`);
  }
}
