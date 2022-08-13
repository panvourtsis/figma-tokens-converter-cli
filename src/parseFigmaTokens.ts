#!/usr/bin/env node
import fs, { promises as fsPromise } from 'fs';
import { dirname as getDirName } from 'path';

import _pick from 'lodash/pick';
import { hideBin } from 'yargs/helpers';

import log from './helpers/log';
import { recursiveWrite, writeFile } from './utils';

const run = async (
  input: string,
  output: string,
  options: { pick?: string; expand?: string; outputExtension?: string }
) => {
  const picks = typeof options.pick === 'string' ? options.pick.split(',') : options.pick || [];
  const expands =
    typeof options.expand === 'string' ? options.expand.split(',') : options.expand || [];

  if (fs.existsSync(input)) {
    const pickExists = picks.length > 0;
    const expandsExists = expands.length > 0;

    log.info('fetching file from ', input);

    const contents = await fsPromise.readFile(input, 'utf-8');
    const newData = pickExists ? _pick(JSON.parse(contents), picks) : JSON.parse(contents);

    log.success('file fetched successfully');

    pickExists && log.info(`using pick: ${picks}`);
    expandsExists && log.info(`using expand: ${expands}`);

    if (pickExists && expandsExists) {
      log.warning(
        `Note: if you expand something that is not in the 'pick' section it will be skipped.`
      );
    }

    log.info(`writing tokens to output: ${output}`);

    recursiveWrite(newData, output, expands, options.outputExtension);
  } else {
    log.error(`Input not found at ${input}`);
  }
};

export default run;
