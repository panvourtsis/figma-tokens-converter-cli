import fs from 'fs';
import { dirname as getDirName } from 'path';

import _ from 'lodash';
import flatten from 'lodash/flatten';
import flow from 'lodash/flow';
import head from 'lodash/head';
import isObject from 'lodash/isObject';
import reduce from 'lodash/reduce';
import uniq from 'lodash/uniq';
import values from 'lodash/values';

import log from './helpers/log';

export const writeFile = (path: string, contents: string, cb: (data?: any) => void) => {
  fs.mkdir(getDirName(path), { recursive: true }, (err) => {
    if (err) {
      return cb(err);
    }

    return fs.writeFile(path, contents, cb);
  });
};

export const recursiveWrite = (
  data: Record<string, unknown>,
  output: string,
  expands: string[] = [],
  outputExtension = 'ts'
) => {
  _.keys(data).forEach((key) => {
    const keyFoundOnExpanded = expands.includes(key);
    if (keyFoundOnExpanded) {
      recursiveWrite(
        _.get(data, key) as Record<string, unknown>,
        `${output + key}/`,
        expands,
        outputExtension
      );
    } else {
      const filePath = `${output}${key}.${outputExtension}`;
      writeFile(filePath, JSON.stringify(_.get(data, key), null, 4), () => {
        log.success('done converting -', filePath);
      });
    }
  });
};

export const recursiveDotNotationToSquareBackets = <T>(
  obj: Record<string, any>,
  tranformFileNameFun: (val: string) => string
): T =>
  _.cloneDeepWith(obj, function (v) {
    if (!_.isObject(v)) {
      if (/\{|\}/gi.test(v)) {
        return `{${v
          .replace(/{|\}/gi, '')
          .split('.')
          .map((val: string, index: number) =>
            index === 0 ? tranformFileNameFun(val) : `['${val}']`
          )
          .join('')}}`;
      }

      return v;
    }
  });

export const returnImports = (data: Record<string, string>): string[] =>
  flow(
    values,
    (data: Record<string, string>) =>
      reduce<Record<string, string>, string[]>(
        data,
        (acc, val) => {
          if (isObject(val)) {
            acc = [...acc, ...returnImports(val)];
          } else if (val.match(/\{|\}/gi)) {
            const matchedVal = head(val.replace(/\{|\}/gi, '').split('.'));
            if (matchedVal) {
              acc.push(matchedVal);
            }
          }

          return uniq(acc);
        },
        []
      ),
    flatten,
    uniq
  )(data);
