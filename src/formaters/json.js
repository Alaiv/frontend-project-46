import _ from 'lodash';

const getValueType = (key) => {
  const check = ['a+', 'r-', 'u+', 'u-'];
  const keyVal = key.substring(0, 2);
  const checkForType = check.includes(key.substring(0, 2));
  const newKey = checkForType ? key.substring(3) : key;

  switch (keyVal) {
    case 'a+':
      return [newKey, 'added', checkForType];
    case 'r-':
      return [newKey, 'removed', checkForType];
    case 'u+':
      return [newKey, 'updated', checkForType];
    default:
      return [newKey, 'unchanged', checkForType];
  }
};

const json = (dataVal) => {
  const iter = (data) => {
    if (!_.isObject(data)) return data;

    return Object.entries(data)
      .reduce((acc, [key, value]) => {
        const [newKey, type, checkForType] = getValueType(key);
        if (!checkForType && _.isObject(value)) {
          return { ...acc, [newKey]: iter(value) };
        }
        if (key.startsWith('u+')) {
          return { ...acc, [newKey]: { value, type, prevValue: data[`u- ${newKey}`] } };
        }
        return { ...acc, [newKey]: { value, type } };
      }, {});
  };

  return JSON.stringify(iter(dataVal), ' ', 4);
};

export default json;
