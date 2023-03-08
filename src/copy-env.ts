import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { exec } from './exec';

export type CopyEnvOptions = {
  /**
   * current working directory
   *
   * @defultValue `process.cwd()`
   */
  cwd?: string;
  /**
   * input file name
   *
   * @defultValue `.env`
   */
  src?: string;
  /**
   * output file name
   *
   * @defultValue `.env.sample`
   */
  dest?: string;
  /**
   * whether to check-in to git or not
   *
   * @defultValue `false`
   */
  gitAdd?: boolean;
  /**
   * regex of lines to ignore
   *
   * @defultValue `/^#/`
   */
  ignoreRegex?: RegExp | string;
};

export type CopyEnvReturnObject = {
  src: {
    path: string;
    content: string;
  };
  dest: {
    path: string;
    content: string;
  };
};

const defaults = {
  cwd: process.cwd(),
  src: '.env',
  dest: '.env.sample',
  gitAdd: false,
  ignoreRegex: /^#/,
};

/**
 *
 * Generates a public example environment file from a given `.env` file.
 * Can exclude specific lines from the file and check in to git.
 *
 * @example
 * ```ts
 * import copyEnv from 'copy-env';
 *
 * const output = await copyEnv({
 *   cwd: process.cwd(),
 *   src: '.env',
 *   dest: '.env.sample',
 *   gitAdd: false,
 *   ignoreRegex: /^#/,
 * });
 *
 * // return object
 * // {
 * //   src: {
 * //     path: string,
 * //     content: string,
 * //   },
 * //   dest: {
 * //     path: string,
 * //     content: string,
 * //   },
 * // }
 * ```
 *
 * @param {object} options - optional options object
 * @returns {object} - object containing the paths and content of the input and output files
 */
export const copyEnv = async (
  options: {
    /**
     * current working directory
     *
     * @defultValue `process.cwd()`
     */
    cwd?: string;
    /**
     * input file name
     *
     * @defultValue `.env`
     */
    src?: string;
    /**
     * output file name
     *
     * @defultValue `.env.sample`
     */
    dest?: string;
    /**
     * whether to check-in to git or not
     *
     * @defultValue `false`
     */
    gitAdd?: boolean;
    /**
     * regex of lines to ignore
     *
     * @defultValue `/^#/`
     */
    ignoreRegex?: RegExp | string;
  } = {}
): Promise<CopyEnvReturnObject> => {
  const config = {
    ...defaults,
    ...options,
  };
  const { src, dest, gitAdd, ignoreRegex } = config;
  const cwd = path.isAbsolute(config.cwd)
    ? config.cwd
    : path.resolve(process.cwd(), config.cwd);
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
