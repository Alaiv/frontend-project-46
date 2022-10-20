import _ from 'lodash';

const getValueType = (key) => {
  const keyVal = key.substring(0, 2);

  switch (keyVal) {
    case 'a+':
      return 'added';
    case 'r-':
      return 'removed';
    default:
      return 'unchanged';
  }
};

const json = (dataVal) => {
  const check = ['a+', 'r-', 'u+', 'u-'];
  let prevUpdatedVal;

  const iter = (data) => {
    if (!_.isObject(data)) return data;

    return Object.entries(data)
      .reduce((acc, [key, value]) => {
        const checkForType = check.includes(key.substring(0, 2));
        const newKey = checkForType ? key.substring(3) : key;

        if (!checkForType && _.isObject(value)) {
          acc[newKey] = iter(value);
        } else if (key.startsWith('u+')) {
          acc[newKey] = { value, type: 'updated', prevValue: prevUpdatedVal };
        } else if (key.startsWith('u-')) {
          prevUpdatedVal = value;
        } else {
          acc[newKey] = { value, type: getValueType(key) };
        }
        return acc;
      }, {});
  };

  return JSON.stringify(iter(dataVal), ' ', 4);
};

export default json;
