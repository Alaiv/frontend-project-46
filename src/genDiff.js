import * as path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  if (!filepath1 || !filepath2) return false;

  const [path1, path2] = [path.resolve(filepath1), path.resolve(filepath2)];
  const file1 = JSON.parse(readFileSync(path1, 'utf8'));
  const file2 = JSON.parse(readFileSync(path2, 'utf8'));
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
