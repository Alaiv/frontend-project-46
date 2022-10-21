import _ from 'lodash';

const getKey = (name, type) => {
  switch (type) {
    case 'removed':
      return `- ${name}`;
    case 'added':
      return `+ ${name}`;
    case 'nested':
      return `  ${name}`;
    default:
      return `  ${name}`;
  }
};

const stylish = (data, dex = ' ') => {
  if (!_.isObject(data)) return false;
  const defSpace = 2;
  const addSpaceCount = 4;

  const iter = (dataValue, del) => {
    if (!_.isObject(dataValue)) return `${dataValue}`;
    const finalInd = ' '.repeat(del - defSpace);

    const mapValue = _.isArray(dataValue) ? dataValue : Object.entries(dataValue);
    const mapped = mapValue
      .flatMap((val) => {
        const defaultInd = dex.repeat(del);
        const name = val.name ?? val[0];
        const value = val.children ?? val.content ?? val[1] ?? null;

        return val.type === 'updated'
          ? [`${defaultInd}- ${val.name}: ${iter(val.prevContent, del + addSpaceCount)}`,
            `${defaultInd}+ ${val.name}: ${iter(val.content, del + addSpaceCount)}`]
          : `${defaultInd}${getKey(name, val.type)}: ${iter(value, del + addSpaceCount)}`;
      });
    return ['{', ...mapped, `${finalInd}}`].join('\n').trim();
  };

  return iter(data, defSpace);
};

export default stylish;
