import { beforeAll, expect, test } from '@jest/globals';
import { dirname } from 'path';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
let expected;

beforeAll(() => {
  const data = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');
  expected = data.split('\n\n');
});

test('genDiff_JSON', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected[0]);

  const result2 = genDiff('', '');
  expect(result2).toBeFalsy();

  const result3 = genDiff(getFixturePath('file1.json'), getFixturePath('file1.json'));
  expect(typeof result3).toBe('string');
});

test('genDiff_YAML', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toEqual(expected[0]);

  const result2 = genDiff('', '');
  expect(result2).toBeFalsy();

  const result3 = genDiff(getFixturePath('file1.yml'), getFixturePath('file1.yml'));
  expect(typeof result3).toBe('string');
});

test('genDiff_same or dif ext', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'));
  expect(result).toEqual(expected[0]);

  const result2 = genDiff(getFixturePath('file3.json'), getFixturePath('file3.json'));
  expect(result2).toEqual(expected[1]);
});
