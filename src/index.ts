#!/usr/bin/env node
import { Command } from 'commander';

import log from './helpers/log';
import parseFigmaTokens from './parseFigmaTokens';
import parseJsonToCode from './parseJsonToCode';

const program = new Command();

program
  .name('figma-tokens-converter-cli')
  .description('CLI figma design tokens utils for easy integration from figma to code.');

program
  .command('parseJsonToCode')
  .description('This command parse exported .json files and converts them to code')
  .argument('<input>', 'Input directory')
  .argument('<output>', 'Output directory to write the transformed tokens to')
  .option(
    '-oe, --outputExtension [outputExtension]',
    'The output file extension that must be transformed to',
    'ts'
  )
  .action((input: string, output: string, options: { outputExtension?: string }) => {
    parseJsonToCode(input, output, options);
  });

program
  .command('parseFigmaTokens')
  .description('This command parse figma token .json like tokens.json and exports it to a path')
  .argument('<input>', 'Specify the .json figma file')
  .argument('<output>', 'Output directory to write the converted results')
  .option('-p, --pick <pick>', 'Pick only what is specified in the value')
  .option(
    '-e, --expand <expand>',
    'Expand properties to different files, otherwise will use the parent property'
  )
  .option(
    '-oe, --outputExtension <outputExtension>',
    'The output file extension that must be transformed to. Defaults to json',
    'json'
  )
  .action(
    (
      input: string,
      output: string,
      options: { pick?: string; expand?: string; outputExtension?: string }
    ) => {
      parseFigmaTokens(input, output, options);
    }
  );

program.parse(process.argv);
