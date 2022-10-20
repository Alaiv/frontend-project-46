import _ from 'lodash';

const json = (dataVal) => {
  const check = ['a+', 'r-', 'u+', 'u-'];
  let prevUpdatedVal;

  const iter = (data) => {
    if (!_.isObject(data)) return data;

    return Object.entries(data)
      .reduce((acc, [key, value]) => {
        const substrKey = key.substring(3);
        if (!check.includes(key.substring(0, 2)) && _.isObject(value)) {
          acc[key] = iter(value);
        } else if (key.startsWith('a+')) {
          acc[substrKey] = { value, type: 'added' };
        } else if (key.startsWith('r-')) {
          acc[substrKey] = { value, type: 'removed' };
        } else if (key.startsWith('u+')) {
          acc[substrKey] = { value, type: 'updated', prevValue: prevUpdatedVal };
        } else if (key.startsWith('u-')) {
          prevUpdatedVal = value;
        } else {
          acc[key] = { value, type: 'unchanged' };
        }
        return acc;
      }, {});
  };

  return JSON.stringify(iter(dataVal), ' ', 4);
};

export default json;
