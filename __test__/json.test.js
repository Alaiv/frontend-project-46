import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import json from '../src/formaters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = fs.readFileSync(getFixturePath('expectedJson.txt'), 'utf-8');
const res = expected.split('\n\n')[0];

const obj22 = [
  { name: 'fifth', content: 'val', type: 'removed' },
  {
    name: 'first',
    content: { someVal: 'test', someVal2: 'test2' },
    prevContent: 'checker',
    type: 'updated',
  },
  { name: 'fourth', content: 'check2', type: 'removed' },
];
const newObj = [...obj22];

test('json-format', () => {
  const testValue = json(newObj);
  expect(testValue).toEqual(res);
  expect(newObj).toEqual(obj22);
});
