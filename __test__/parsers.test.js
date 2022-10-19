import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parser from '../src/parsers.js';
import { res1, res2 } from '../__fixtures__/testObjects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const test1 = { ...res1 };
const test2 = { ...res2 };

test('parsers', () => {
  expect(parser(
    getFixturePath('file1.yml'),
    getFixturePath('file2.yml'),
  )).toEqual([test1, test2]);

  expect(parser(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )).toEqual([test1, test2]);

  expect(typeof parser(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )).toBe('object');

  expect(test1).toEqual(res1);
});
