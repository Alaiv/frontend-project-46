import { expect, test } from '@jest/globals';
import stylish from '../src/formaters/stylish.js';

const obj = {
  common: {
    follow: false,
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
  },
};

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

test('stylish formatter', () => {
  const actual = stylish(obj);
  expect(actual).toEqual(result);
  expect(typeof actual).toBe('string');
  expect(stylish('')).toBeFalsy();
  expect(stylish('hello there')).toBeFalsy();
});
