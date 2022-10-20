import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatType = (obj, type) => {
  switch (type) {
    case 'plain':
      return plain(obj);
    case 'json':
      return json(obj);
    default:
      return stylish(obj);
  }
};

export default getFormatType;
