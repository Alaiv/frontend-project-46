import { expect, test } from '@jest/globals';

import { obj } from '../__fixtures__/testObjects.js';
import chooseFormatType from '../src/formaters/index.js';

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
  expect(chooseFormatType(obj, 'stylish')).toEqual(result);
  expect(chooseFormatType(obj)).toEqual(result);
});
