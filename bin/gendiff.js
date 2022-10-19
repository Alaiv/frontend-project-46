#!/usr/bin/env node

import { Command } from 'commander';

import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .name('gendiff.js')
  .description('Compares two configuration __fixtures__ and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const f = options.format;
    console.log(genDiff(filepath1, filepath2, f));
  });

program.parse();
