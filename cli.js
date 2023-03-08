#!/usr/bin/env node
const { program } = require('commander');
const copyEnv = require('./dist/cjs').default;
const pkg = require('./package.json');

program
  .name('copy-env')
  .version(pkg.version)
  .description(pkg.description)
  .option('--cwd <string>', 'Current working directory', process.cwd())
  .option('--src <string>', 'Source file to read from', '.env')
  .option('--dest <string>', 'File to write to', '.env.sample')
  .option(
    '--ignore-regex <string>',
    'Regex string of what to omit from output',
    '^#'
  )
  .option('--git-add', 'Stage the output file after update', false)
  .action(async () => {
    const options = program.opts();
    await copyEnv(options);
  });

program.parse();
