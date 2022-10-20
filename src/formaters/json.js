import _ from 'lodash';

const getValueType = (key) => {
  const check = ['a+', 'r-', 'u+', 'u-'];
  const keyVal = key.substring(0, 2);
  const checkForType = check.includes(key.substring(0, 2));
  const newKey = checkForType ? key.substring(3) : key;
  let type;

  switch (keyVal) {
    case 'a+':
      type = 'added';
      break;
    case 'r-':
      type = 'removed';
      break;
    default:
      type = 'unchanged';
  }

  return [newKey, type, checkForType];
};

const json = (dataVal) => {
  let prevUpdatedVal;

  const iter = (data) => {
    if (!_.isObject(data)) return data;

    return Object.entries(data)
      .reduce((acc, [key, value]) => {
        const [newKey, type, checkForType] = getValueType(key);

        if (!checkForType && _.isObject(value)) {
          acc[newKey] = iter(value);
        } else if (key.startsWith('u+')) {
          acc[newKey] = { value, type: 'updated', prevValue: prevUpdatedVal };
        } else if (key.startsWith('u-')) {
          prevUpdatedVal = value;
        } else {
          acc[newKey] = { value, type };
        }
        return acc;
      }, {});
  };

  return JSON.stringify(iter(dataVal), ' ', 4);
};

export default json;
