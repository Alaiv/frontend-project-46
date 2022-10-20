import _ from 'lodash';

const getSpacing = (key, delim, defSpace) => {
  const diffType = ['u+', 'u-', 'r-', 'a+'];

  if (diffType.includes(key.substring(0, 2))) {
    return [key.substring(1), delim];
  }
  return [key, delim + defSpace];
};

const stylish = (data, dex = ' ') => {
  if (!_.isObject(data)) return false;
  const defSpace = 2;
  const addSpaceCount = 4;

  const iter = (dataValue, del) => {
    if (!_.isObject(dataValue)) return `${dataValue}`;
    const finalInd = dex.repeat(del - defSpace);

    const mapped = Object.entries(dataValue)
      .map(([key, value]) => {
        const [newKey, reps] = getSpacing(key, del, defSpace);
        const defaultInd = dex.repeat(reps);
        return `${defaultInd}${newKey}: ${iter(value, del + addSpaceCount)}`;
      });
    return ['{', ...mapped, `${finalInd}}`].join('\n').trim();
  };

  return iter(data, defSpace);
};

export default stylish;
