import * as path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);
  const file1 = JSON.parse(readFileSync(path1));
  const file2 = JSON.parse(readFileSync(path2));

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const sumKeys = _.sortBy(_.uniq([...keys1, ...keys2]));
  let result = '{';

  for (let i = 0; i < sumKeys.length; i += 1) {
    const key = sumKeys[i];
    if (file1[key] === file2[key]) {
      result = `${result}\n    ${key}: ${file1[key]}`;
    } else if (file1[key] !== file2[key] && keys2.includes(key) && keys1.includes(key)) {
      result = `${result}\n  - ${key}: ${file1[key]}`;
      result = `${result}\n  + ${key}: ${file2[key]}`;
    } else if (!keys1.includes(key)) {
      result = `${result}\n  + ${key}: ${file2[key]}`;
    } else if (!keys2.includes(key)) {
      result = `${result}\n  - ${key}: ${file1[key]}`;
    }
  }

  return `${result}\n}`;
};

export default genDiff;
