import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { assertDeploySourceBranch, assertPagesBuild, PAGES_SCREEN_ASSETS } from './deploy-pages.lib.mjs';

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

test('requires both the chat and scenario map artifacts', () => {
  const root = mkdtempSync(join(tmpdir(), 'chat-ui-pages-test-'));
  try {
    writeFileSync(join(root, 'index.html'), '<!doctype html>');
    assert.throws(() => assertPagesBuild(root), /scenario-map/);

    mkdirSync(join(root, 'scenario-map', 'screens'), { recursive: true });
    writeFileSync(join(root, 'scenario-map', 'index.html'), '<!doctype html>');
    writeFileSync(join(root, 'scenario-map', 'screens', 'screen.png'), 'image');
    assert.throws(() => assertPagesBuild(root), /10 scenario map screenshots/);

    for (const screen of PAGES_SCREEN_ASSETS) {
      writeFileSync(join(root, 'scenario-map', 'screens', screen), 'image');
    }
    assert.doesNotThrow(() => assertPagesBuild(root));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
