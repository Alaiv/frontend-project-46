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
  const iter = (d, depth, k) => {
    if (!_.isObject(d)) return `${d}`;

    return d
      .reduce((acc, val) => {
        const { name } = val;
        const value = val.children ?? val.content;
        if (val.type === 'nested') {
          return [...acc, iter(value, depth + 1, `${k}${name}.`)];
        }
        const newValue = getType(value);
        switch (val.type) {
          case 'added':
            return [...acc, `Property '${k}${name}' was added with value: ${newValue}`];
          case 'removed':
            return [...acc, `Property '${k}${name}' was removed`];
          case 'updated':
            return [...acc,
              `Property '${k}${name}' was updated. From ${getType(val.prevContent)} to ${newValue}`];
          default:
            return acc;
        }
      }, [])
      .join('\n');
  };

  return iter(data, 1, '');
};

export default plain;
