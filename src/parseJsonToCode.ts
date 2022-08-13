import fs from 'fs';
import { dirname as getDirName } from 'path';

import camelCase from 'lodash/camelCase';
import flatter from 'lodash/flatten';
import flatten from 'lodash/flatten';
import flow from 'lodash/flow';
import head from 'lodash/head';
import isObject from 'lodash/isObject';
import reduce from 'lodash/reduce';
import uniq from 'lodash/uniq';
import values from 'lodash/values';

import log from './helpers/log';
import { recursiveDotNotationToSquareBackets, returnImports, writeFile } from './utils';

const run = (input: string, output: string, options: { outputExtension?: string }) => {
  log.info('start reading path ', input);
  fs.readdir(input, async (err, files) => {
    log.info(`files found on path ${input}`, files.join(', '));
    files.forEach((fileName) => {
      const stat = fs.lstatSync(`${input + fileName}`).isDirectory();
      if (stat) {
        // run recurring read
        return run(input + fileName + '/', output, options);
      }
      fs.readFile(input + fileName, 'utf-8', function (err, content) {
        if (err) {
          log.error(err);

          return;
        }
        const fileNameNoExtension = fileName.replace('.json', '');
        // @TODO pass this as prop on arguments in the future
        const tranformFileNameFun = camelCase;
        const newFileName = tranformFileNameFun(fileNameNoExtension);

        const convertedData = recursiveDotNotationToSquareBackets(
          JSON.parse(content),
          tranformFileNameFun
        );
        const data = JSON.stringify(convertedData, null, 4).replace(/"{|\}"/gi, '');

        const importsArray = returnImports(JSON.parse(content)).map(
          (dat) => `import ${tranformFileNameFun(dat)} from './${tranformFileNameFun(dat)}'; \n`
        );

        log.info('start transforming', fileName);

        const isTypescript = options.outputExtension === 'ts';

        writeFile(
          `${output}${input.replace(input, '')}${newFileName}.${options.outputExtension}`,
          `${importsArray.toString().replace(',', '')}${
            importsArray.length > 0 ? `\n` : ``
          }const ${newFileName} = ${data}${
            isTypescript ? ' as const' : ''
          }; \n\nexport default ${newFileName};`,
          () => {
            log.success('done transforming', `${newFileName}.${options.outputExtension}`);
          }
        );
      });
    });
  });
};

export default run;
