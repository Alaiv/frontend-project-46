import _ from 'lodash';
import parsers from './parsers.js';
import getFormatType from './formaters/index.js';

const genDiff = (filepath1, filepath2, formatterType = 'stylish') => {
  if (!filepath1 || !filepath2) return false;
  const [file1, file2] = parsers(filepath1, filepath2);

  const iter = (first, second) => {
    const [keys1, keys2] = [Object.keys(first), Object.keys(second)];
    const sumKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

    return sumKeys.map((key) => {
      const fir = first[key];
      const sec = second[key];

      if (fir === undefined) {
        return { name: key, content: sec, type: 'added' };
      }
      if (sec === undefined) {
        return { name: key, content: fir, type: 'removed' };
      }
      if (_.isObject(fir) && _.isObject(sec)) {
        return { name: key, children: iter(fir, sec), type: 'nested' };
      }
      if (fir === sec) {
        return { name: key, children: fir, type: 'unchanged' };
      }
      return {
        name: key, content: sec, prevContent: fir, type: 'updated',
      };
    });
  };

  return getFormatType(iter(file1, file2), formatterType);
};

export default genDiff;
