import assert from 'node:assert/strict';
import test from 'node:test';
import { assertDeploySourceBranch } from './deploy-pages.lib.mjs';

test('accepts only the universal agent source branch', () => {
  assert.doesNotThrow(() => assertDeploySourceBranch('universal-agent-ui-pilot'));
  assert.throws(
    () => assertDeploySourceBranch('gh-pages'),
    /universal-agent-ui-pilot/,
  );
  assert.throws(
    () => assertDeploySourceBranch('universal-agent-production-wiring'),
    /universal-agent-ui-pilot/,
  );
});
