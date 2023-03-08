import cp from 'child_process';

export const exec = (cmd: string, options = {}): Promise<string> => {
  return new Promise((resolve, reject) => {
    cp.exec(cmd, options, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(stderr));
      }
      resolve(`${stdout}`.trim());
    });
  });
};
