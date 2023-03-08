#!/usr/bin/env node
import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pwd = path.resolve(__dirname, '../..');
const dirname = path.basename(pwd);
const templatesDir = path.join(__dirname, 'templates');
const files = [
  'package.json',
  'package-lock.json',
  'README.md',
  '.github/settings.yml',
];
const templates = [...files].map((file) =>
  path.join(templatesDir, `${file}.tpl`)
);

const prompt = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'name',
      message: 'Repo Name',
      default: dirname,
    },
    {
      name: 'user',
      message: 'GitHub User',
    },
    {
      name: 'author',
      message: 'Author',
    },
    {
      name: 'description',
      message: 'Description',
    },
    {
      name: 'keywords',
      message: 'Keywords',
      filter: (input) => {
        return input.split(',').map((value) => value.trim());
      },
    },
  ]);
  return { ...answers, version: '1.0.0' };
};

const findAndReplaceInFile = async (file, hash) => {
  const content = await fs.readFile(file, 'utf-8');
  let newContent = content;
  Object.entries(hash).forEach(([key, value]) => {
    let stringValue = value;
    if (Array.isArray(value)) {
      if (file.endsWith('.json.tpl')) {
        stringValue = JSON.stringify(value);
      } else {
        stringValue = value.join(', ');
      }
    }
    newContent = newContent.replace(new RegExp(`{{${key}}}`, 'g'), stringValue);
  });
  const basename = file
    .replace(templatesDir, '')
    .replace(/^\//, '')
    .replace(/\.tpl$/, '');
  const dest = path.join(pwd, basename);
  await fs.writeFile(dest, newContent);
};

const setup = async () => {
  const answers = await prompt();
  const promises = templates.map((file) => {
    return findAndReplaceInFile(file, answers);
  });
  await Promise.all(promises);
};

setup().catch(console.error);
