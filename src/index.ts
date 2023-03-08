import cp from 'child_process';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

export type TConfig = {
  cwd?: string;
  src?: string;
  dest?: string;
  gitAdd?: boolean;
  ignoreRegex?: RegExp | string;
};

export const configDefaults = {
  cwd: process.cwd(),
  src: '.env',
  dest: '.env.sample',
  gitAdd: false,
  ignoreRegex: /^#/,
};

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

const copyEnv = async (options: TConfig = { ...configDefaults }) => {
  const config = {
    ...configDefaults,
    ...options,
  };
  const { cwd, src, dest, gitAdd, ignoreRegex } = config;
  const srcPath = path.join(cwd, src);
  const destPath = path.join(cwd, dest);
  const ignoreRgxExp =
    typeof ignoreRegex === 'string' ? new RegExp(ignoreRegex) : ignoreRegex;

  // check that the source file exists
  if (!fs.existsSync(srcPath)) {
    throw new Error(`${srcPath} does not exist`);
  }

  // read content from source file
  const srcContent = await fsp.readFile(srcPath, 'utf-8');
  const lines = srcContent.split('\n');
  const newLines = lines
    .filter((line) => {
      return !!line.trim() && !ignoreRgxExp.test(line);
    })
    .map((line) => {
      const [key, value] = line.split('=');
      let newValue = value;
      if (/"|'/.test(value)) {
        newValue = '""';
      } else {
        newValue = '';
      }
      return `${key.trim()}=${newValue.trim()}`;
    });
  const newContent = newLines.join('\n');

  // get current sample file content, if it exists
  let oldContent = '';
  const destPathExists = fs.existsSync(destPath);
  if (destPathExists) {
    oldContent = await fsp.readFile(destPath, 'utf-8');
  }

  // remove dest if it exists and nothing in .env file
  if (!newContent.length && destPathExists) {
    await fsp.rm(destPath);
  }

  // write new content to file
  if (newContent.length) {
    await fsp.writeFile(destPath, newContent);
  }

  // git add
  if (gitAdd && newContent !== oldContent) {
    await exec(`git add ${destPath}`, { cwd });
  }

  return {
    src: {
      path: srcPath,
      content: srcContent,
    },
    dest: {
      path: destPath,
      content: newContent,
    },
  };
};

export default copyEnv;
