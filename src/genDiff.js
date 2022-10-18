import _ from 'lodash';
import parsers from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  if (!filepath1 || !filepath2) return false;

  const [file1, file2] = parsers(filepath1, filepath2);
  const [keys1, keys2] = [Object.keys(file1), Object.keys(file2)];
  const sumKeys = _.sortBy(_.uniq([...keys1, ...keys2]));
  let result = '{';

  sumKeys.forEach((key) => {
    if (file1[key] === file2[key]) {
      result = `${result}\n    ${key}: ${file1[key]}`;
    } else if (!keys1.includes(key)) {
      result = `${result}\n  + ${key}: ${file2[key]}`;
    } else if (!keys2.includes(key)) {
      result = `${result}\n  - ${key}: ${file1[key]}`;
    } else {
      result = `${result}\n  - ${key}: ${file1[key]}`;
      result = `${result}\n  + ${key}: ${file2[key]}`;
    }
  });

  return `${result}\n}`;
};

export default genDiff;
