import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { cpSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertDeploySourceBranch, assertPagesBuild } from './deploy-pages.lib.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '../..');
const distDir = join(repoRoot, 'pilot', 'dist');
const pagesDir = join(tmpdir(), `chat-ui-gh-pages-${process.pid}-${randomUUID()}`);
const dryRun = process.argv.includes('--dry-run');
let worktreeAdded = false;

const git = (...args) => execFileSync('git', args, {
  cwd: repoRoot,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'inherit'],
}).trim();

assertPagesBuild(distDir);
if (git('status', '--porcelain')) {
  throw new Error('Source worktree is not clean. Commit source changes before publishing.');
}
assertDeploySourceBranch(git('branch', '--show-current'));

const sourceSha = git('rev-parse', 'HEAD');

try {
  git('fetch', 'origin', '+gh-pages:refs/remotes/origin/gh-pages');
  rmSync(pagesDir, { recursive: true, force: true });
  git('worktree', 'add', '--detach', pagesDir, 'origin/gh-pages');
  worktreeAdded = true;

  for (const entry of readdirSync(pagesDir)) {
    if (entry !== '.git') rmSync(join(pagesDir, entry), { recursive: true, force: true });
  }
  cpSync(distDir, pagesDir, { recursive: true });
  writeFileSync(join(pagesDir, '.nojekyll'), '');

  execFileSync('git', ['add', '-A'], { cwd: pagesDir, stdio: 'inherit' });
  const hasChanges = execFileSync('git', ['diff', '--cached', '--name-only'], {
    cwd: pagesDir,
    encoding: 'utf8',
  }).trim();
  if (!hasChanges) {
    console.log('GitHub Pages already matches the current build.');
  } else if (dryRun) {
    console.log('Dry run: generated Pages artifact files:');
    console.log(hasChanges);
  } else {
    execFileSync('git', ['commit', '-m', `deploy: rebuild pilot from ${sourceSha.slice(0, 7)}`], {
      cwd: pagesDir,
      stdio: 'inherit',
    });
    execFileSync('git', ['push', 'origin', 'HEAD:gh-pages'], { cwd: pagesDir, stdio: 'inherit' });
    console.log(`Published GitHub Pages from source ${sourceSha}.`);
  }
} finally {
  try {
    if (worktreeAdded) {
      execFileSync('git', ['worktree', 'remove', '--force', pagesDir], { cwd: repoRoot, stdio: 'inherit' });
    }
  } finally {
    rmSync(pagesDir, { recursive: true, force: true });
    execFileSync('git', ['worktree', 'prune'], { cwd: repoRoot, stdio: 'inherit' });
  }
}
