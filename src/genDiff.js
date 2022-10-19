import _ from 'lodash';
import parsers from './parsers.js';
import stylish from './formaters/stylish.js';

export const formatObject = (obj, type) => {
  switch (type) {
    case 'stylish':
      return stylish(obj);
    default:
      return 'wrong type';
  }
};

const genDiff = (filepath1, filepath2, formatterType = 'stylish') => {
  if (!filepath1 || !filepath2) return false;
  const [file1, file2] = parsers(filepath1, filepath2);

  const iter = (first, second) => {
    const [keys1, keys2] = [Object.keys(first), Object.keys(second)];
    const sumKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

    return sumKeys.reduce((acc, key) => {
      const fir = first[key];
      const sec = second[key];

      if (fir === undefined) {
        acc[`+ ${key}`] = sec;
      } else if (sec === undefined) {
        acc[`- ${key}`] = fir;
      } else if (_.isObject(fir) && _.isObject(sec)) {
        acc[`${key}`] = iter(fir, sec);
      } else if (fir === sec) {
        acc[`${key}`] = fir;
      } else {
        acc[`- ${key}`] = fir;
        acc[`+ ${key}`] = sec;
      }
      return acc;
    }, {});
  };

  return formatObject(iter(file1, file2), formatterType);
};

export default genDiff;
