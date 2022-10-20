import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import { obj2, obj3 } from '../__fixtures__/testObjects.js';
import json from '../src/formaters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const obj = { ...obj2 };
const objx = { ...obj3 };
const expected = fs.readFileSync(getFixturePath('expectedJson.txt'), 'utf-8');
const res = expected.split('\n\n');
const [expected1, expected2] = [res[0], res[1]];

test('json-format', () => {
  expect(json(obj)).toEqual(expected1);
  expect(json(objx)).toEqual(expected2);
});
