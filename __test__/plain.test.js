import { expect, test } from '@jest/globals';
import { obj2 } from '../__fixtures__/testObjects.js';
import plain from '../src/formaters/plain.js';

const val = [...obj2];
const data = `Property 'first' was added with value: 'checker'
Property 'second' was removed
Property 'third' was updated. From 'check3' to 'check2'`;

test('plain', () => {
  const check = plain(val);
  expect(typeof check).toBe('string');
  expect(check).toEqual(data);
  expect(val).toEqual(obj2);
});
