import fs from 'fs';
import fsp from 'fs/promises';
import os from 'os';
import path from 'path';
import copyEnv, { exec } from '..';

describe('exec', () => {
  it('should execute given command', async () => {
    const stdout = await exec('echo "howdy!"');
    expect(stdout).toEqual('howdy!');
  });

  it('should throw an error', async () => {
    await expect(exec('exit  1')).toReject();
  });
});

describe('copyEnv', () => {
  // vars
  let cwd = '';
  const src = '.env';
  const dest = '.env.sample';
  let srcPath = '';
  let destPath = '';
  const content = `ENV_VAR_STRING="string value"
ENV_VAR_NO_QUOTES=no quotes
ENV_VAR_NUMBER=123

# comments should be ignore
`;
  const expected = `ENV_VAR_STRING=""
ENV_VAR_NO_QUOTES=
ENV_VAR_NUMBER=`;

  // setup - create tmp dir, git init, write src file
  beforeEach(async () => {
    cwd = await fsp.mkdtemp(path.join(os.tmpdir(), 'copy-env-test-'));
    srcPath = path.join(cwd, src);
    destPath = path.join(cwd, dest);
    await exec('git init', { cwd });
    await fsp.writeFile(path.join(cwd, src), content);
    await fsp.writeFile(path.join(cwd, src), content);
  });

  // teardown - remove tmp dir
  afterEach(async () => {
    await fsp.rm(cwd, { recursive: true, force: true });
  });

  it('should be defined', () => {
    expect(copyEnv).toBeFunction();
  });

  it('should write to .env.sample', async () => {
    await copyEnv({ cwd });
    expect(fs.existsSync(destPath)).toBeTrue();
  });

  it('should generate expected output', async () => {
    const output = await copyEnv({ cwd });
    const actual = await fsp.readFile(destPath, 'utf-8');
    expect(output.dest.content).toEqual(expected);
    expect(actual).toEqual(expected);
  });

  it('should accept ignoreRegex as a string', async () => {
    const output = await copyEnv({ cwd, ignoreRegex: '^#' });
    const actual = await fsp.readFile(destPath, 'utf-8');
    expect(output.dest.content).toEqual(expected);
    expect(actual).toEqual(expected);
  });

  it('should throw an error if `src` does not exist', async () => {
    await expect(copyEnv({ cwd, src: '.env.not-found' })).toReject();
  });

  it('should delete dest if no src content', async () => {
    await fsp.writeFile(destPath, expected);
    await fsp.writeFile(srcPath, '');
    await copyEnv({ cwd });
    expect(fs.existsSync(destPath)).toBeFalse();
  });

  it('should stage dest when gitAdd=true', async () => {
    await copyEnv({ cwd, gitAdd: true });
    const response = await exec('git diff --name-only --cached', { cwd });
    const stagedFiles = response
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    expect(stagedFiles.includes(dest)).toBeTrue();
  });
});
