import _ from 'lodash';

const stylish = (data, dex = ' ') => {
  if (!data || !_.isObject(data)) return false;
  const count = 2;

  const iter = (dataValue, del) => {
    if (typeof dataValue !== 'object' || dataValue === null) {
      return `${dataValue}`;
    }

    const entries = Object.entries(dataValue);
    const finalInd = dex.repeat(del - count);

    const mapped = entries
      .map(([key, value]) => {
        const reps = key.startsWith('+') || key.startsWith('-') ? del : del + 2;
        const defaultInd = dex.repeat(reps);
        return `${defaultInd}${key}: ${iter(value, del + 4)}`;
      });
    return ['{', ...mapped, `${finalInd}}`].join('\n').trim();
  };

  return iter(data, count);
};

export default stylish;
