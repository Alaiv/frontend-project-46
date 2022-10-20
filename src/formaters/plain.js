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
        if (!check.includes(key.substring(0, 2)) && _.isObject(value)) {
          return [...acc, iter(value, depth + 1, `${k}${key}.`)];
        }
        const newValue = getType(value);
        const newKey = key.substring(3);
        if (key.startsWith('a+')) {
          return [...acc, `Property '${k}${newKey}' was added with value: ${newValue}`];
        }
        if (key.startsWith('r-')) {
          return [...acc, `Property '${k}${newKey}' was removed`];
        }
        if (key.startsWith('u+')) {
          const updatedValue = getType(d[`u- ${newKey}`]);
          return [...acc, `Property '${k}${newKey}' was updated. From ${updatedValue} to ${newValue}`];
        }
        return acc;
      }, [])
      .join('\n');
  };

  return iter(data, 1, '');
};

export default plain;
