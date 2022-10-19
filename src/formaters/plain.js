import _ from 'lodash';

const getType = (value) => {
  let result;
  if (_.isObject(value)) {
    result = '[complex value]';
  } else if (typeof value === 'string') {
    result = `'${value}'`;
  } else {
    result = value;
  }
  return result;
};

const plain = (data) => {
  const check = ['a+', 'r-', 'u+', 'u-'];

  const iter = (d, depth, k) => {
    if (!_.isObject(d)) return `${d}`;
    let updatedValue = '';

    return Object.entries(d)
      .reduce((acc, [key, value]) => {
        if (!check.includes(key.substring(0, 2)) && _.isObject(value)) {
          acc.push(iter(value, depth + 1, `${k}${key}.`));
        }
        const newValue = getType(value);

        if (key.startsWith('a+')) {
          acc.push(`Property '${k}${key.substring(3)}' was added with value: ${newValue}`);
        } else if (key.startsWith('r-')) {
          acc.push(`Property '${k}${key.substring(3)}' was removed`);
        } else if (key.startsWith('u+')) {
          acc.push(`Property '${k}${key.substring(3)}' was updated. From ${updatedValue} to ${newValue}`);
        } else if (key.startsWith('u-')) {
          updatedValue = newValue;
        }

        return acc;
      }, [])
      .join('\n');
  };

  return iter(data, 1, '');
};

export default plain;
