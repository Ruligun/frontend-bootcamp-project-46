import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('stylish.txt');
const expectedPlain = readFile('plain.txt');
const expectedJSON = readFile('json.txt');

test('file json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(gendiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(gendiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
  expect(gendiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(gendiff(filepath1, filepath2, 'json')).toBe(expectedJSON);
});

test('file yml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  expect(gendiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(gendiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
  expect(gendiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(gendiff(filepath1, filepath2, 'json')).toBe(expectedJSON);
});
