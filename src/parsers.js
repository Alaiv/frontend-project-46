import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

const parser = (filepath1, filepath2) => {
  const [path1, path2] = [path.resolve(filepath1), path.resolve(filepath2)];
  const extName1 = path.extname(filepath1);
  const extName2 = path.extname(filepath2);

  const file1 = extName1 === '.yml' || extName1 === '.yaml'
    ? yaml.load(readFileSync(path1, 'utf8'))
    : JSON.parse(readFileSync(path1, 'utf8'));

  const file2 = extName2 === '.yml' || extName1 === '.yaml'
    ? yaml.load(readFileSync(path2, 'utf8'))
    : JSON.parse(readFileSync(path2, 'utf8'));

  return [file1, file2];
};

export default parser;
