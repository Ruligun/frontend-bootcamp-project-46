import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('file json', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');
  const resultname = getFixturePath('file-result.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(gendiff(filename1, filename2)).toBe(result);
});

test('file yml', () => {
  const filename1 = getFixturePath('file1.yml');
  const filename2 = getFixturePath('file2.yml');
  const resultname = getFixturePath('file-result.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(gendiff(filename1, filename2)).toBe(result);
});
