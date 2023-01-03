import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import _ from 'lodash';

const getFilepath = (filepath) => resolve(cwd(), filepath);

const readFile = (path) => readFileSync(path, 'utf-8');

const getParsedFile = (file) => JSON.parse(file);

const getDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const result = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 === value2) {
      return { key, value: value1, type: 'unchanged' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: value1, type: 'removed' };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, value: value2, type: 'added' };
    }
    return {
      key, oldValue: value1, newValue: value2, type: 'changed',
    };
  });
  return result;
};

const gendiff = (filepath1, filepath2) => {
  const file1 = getParsedFile(readFile(getFilepath(filepath1)));
  const file2 = getParsedFile(readFile(getFilepath(filepath2)));
  const diff = getDiff(file1, file2);

  const result = diff.map((property) => {
    // eslint-disable-next-line prefer-destructuring
    const type = property.type;
    switch (type) {
      case 'removed':
        return `  - ${property.key}: ${property.value}`;
      case 'unchanged':
        return `    ${property.key}: ${property.value}`;
      case 'changed':
        return `  - ${property.key}: ${property.oldValue} \n  + ${property.key}: ${property.newValue}`;
      case 'added':
        return `  + ${property.key}: ${property.value}`;
      default:
        return null;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export default gendiff;
