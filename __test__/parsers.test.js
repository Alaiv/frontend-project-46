import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const res1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const res2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('parsers', () => {
  expect(parser(
    getFixturePath('file1.yml'),
    getFixturePath('file2.yml'),
  )).toEqual([res1, res2]);
});
