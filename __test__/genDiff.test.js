import { expect, test } from '@jest/globals';
import { dirname } from 'path';
import * as path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const data = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const data2 = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`;

test('genDiff_JSON', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(data);

  const result2 = genDiff('', '');
  expect(result2).toBeFalsy();

  const result3 = genDiff(getFixturePath('file1.json'), getFixturePath('file1.json'));
  expect(result3).toEqual(data2);
});

test('genDiff_YAML', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toEqual(data);

  const result2 = genDiff('', '');
  expect(result2).toBeFalsy();

  const result3 = genDiff(getFixturePath('file1.yml'), getFixturePath('file1.yml'));
  expect(result3).toEqual(data2);
});

test('genDiff_YAML+JSON', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'));
  expect(result).toEqual(data);
});
