import stylish from './stylish.js';
import plain from './plain.js';

const getFormatType = (obj, type) => {
  switch (type) {
    case 'plain':
      return plain(obj);
    default:
      return stylish(obj);
  }
};

export default getFormatType;
