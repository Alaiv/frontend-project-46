import _ from 'lodash';

const getType = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (data) => {
  const check = ['a+', 'r-', 'u+', 'u-'];

  const iter = (d, depth, k) => {
    if (!_.isObject(d)) return `${d}`;

    return Object.entries(d)
      .reduce((acc, [key, value]) => {
        const keyType = key.substring(0, 2);
        if (!check.includes(keyType) && _.isObject(value)) {
          return [...acc, iter(value, depth + 1, `${k}${key}.`)];
        }
        const newValue = getType(value);
        const newKey = key.substring(3);
        switch (keyType) {
          case 'a+':
            return [...acc, `Property '${k}${newKey}' was added with value: ${newValue}`];
          case 'r-':
            return [...acc, `Property '${k}${newKey}' was removed`];
          case 'u+':
            return [...acc,
              `Property '${k}${newKey}' was updated. From ${getType(d[`u- ${newKey}`])} to ${newValue}`];
          default:
            return acc;
        }
      }, [])
      .join('\n');
  };

  return iter(data, 1, '');
};

export default plain;
