import { expect, test } from '@jest/globals';
import { formatObject } from '../src/genDiff.js';
import { obj } from '../__fixtures__/testObjects.js';

const result = `{
    common: {
        follow: false
        setting5: {
            key5: value5
        }
        setting6: {
            key: value
            doge: {
                wow: so much
            }
        }
    }
    group1: {
        foo: bar
        baz: bars
    }
}`;

test('formatType', () => {
  expect(formatObject(obj, 'stylish')).toEqual(result);
  expect(formatObject(obj, '3')).toEqual('wrong type');
});
