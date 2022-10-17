import genDiff from '../src/genDiff.js';

const data = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff', () => {
  const result = genDiff('./files/file1.json', './files/file2.json');
  expect(result).toEqual(data);
});
