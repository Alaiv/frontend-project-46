import _ from 'lodash';

const stylish = (data, dex = ' ') => {
  if (!data || !_.isObject(data)) return false;
  const defSpace = 2;
  const addSpaceCount = 4;

  const iter = (dataValue, del) => {
    if (!_.isObject(dataValue)) {
      return `${dataValue}`;
    }
    const finalInd = dex.repeat(del - defSpace);

    const mapped = Object.entries(dataValue)
      .map(([key, value]) => {
        const reps = key.startsWith('+') || key.startsWith('-') ? del : del + defSpace;
        const defaultInd = dex.repeat(reps);
        return `${defaultInd}${key}: ${iter(value, del + addSpaceCount)}`;
      });
    return ['{', ...mapped, `${finalInd}}`].join('\n').trim();
  };

  return iter(data, defSpace);
};

export default stylish;
