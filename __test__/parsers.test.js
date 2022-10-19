import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const res1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const res2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};
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
