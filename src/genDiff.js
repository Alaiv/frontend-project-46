import _ from 'lodash';
import parsers from './parsers.js';
import getFormatType from './formaters/index.js';

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
        return { ...acc, [`a+ ${key}`]: sec };
      }
      if (sec === undefined) {
        return { ...acc, [`r- ${key}`]: fir };
      }
      if (_.isObject(fir) && _.isObject(sec)) {
        return { ...acc, [`${key}`]: iter(fir, sec) };
      }
      if (fir === sec) {
        return { ...acc, [key]: fir };
      }

      return { ...acc, [`u- ${key}`]: fir, [`u+ ${key}`]: sec };
    }, {});
  };

  return getFormatType(iter(file1, file2), formatterType);
};

export default genDiff;
