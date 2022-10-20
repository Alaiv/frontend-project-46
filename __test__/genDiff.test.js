import { expect, test } from '@jest/globals';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const data = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');
const data2 = fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8');
const data3 = fs.readFileSync(getFixturePath('expectedJson.txt'), 'utf-8');
const expected = data.split('\n\n');
const plain = data2;
const [, json] = data3.split('\n\n');

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

test('different formatters', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'), 'stylish');
  expect(result).toEqual(expected[0]);

  const result3 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(result3).toEqual(json);

  const result2 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain');
  expect(result2).toEqual(plain);
});
