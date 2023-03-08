import { exec } from '../exec';

describe('exec', () => {
  it('should execute given command', async () => {
    const stdout = await exec('echo "howdy!"');
    expect(stdout).toEqual('howdy!');
  });

  it('should throw an error', async () => {
    await expect(exec('exit  1')).toReject();
  });
});
