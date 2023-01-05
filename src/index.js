import { readFileSync } from 'fs';
import path from 'path';
import getDiff from './diff.js';
import formatStylish from './stylish.js';
import getParse from './parsers.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const getFileFormat = (filename) => path.extname(filename).slice(1);

const readFile = (filepath) => readFileSync(filepath, 'utf8');

const gendiff = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const data1 = getParse(readFile(path1), getFileFormat(filepath1));

  const path2 = getPath(filepath2);
  const data2 = getParse(readFile(path2), getFileFormat(filepath2));

  const diff = getDiff(data1, data2);
  const formattedDiff = formatStylish(diff);
  return formattedDiff;
};

export default gendiff;
