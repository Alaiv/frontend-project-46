import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

const getFileInfo = (extName, pathName) => (extName === '.yml' || extName === '.yaml'
  ? yaml.load(readFileSync(pathName, 'utf8'))
  : JSON.parse(readFileSync(pathName, 'utf8')));

const parser = (filepath1, filepath2) => {
  const [path1, path2] = [path.resolve(filepath1), path.resolve(filepath2)];
  const extName1 = path.extname(filepath1);
  const extName2 = path.extname(filepath2);

  const file1 = getFileInfo(extName1, path1);
  const file2 = getFileInfo(extName2, path2);

  return [file1, file2];
};

export default parser;
