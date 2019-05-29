import { isNull, has } from 'lodash';

class Model {
  constructor() {
    this.data = {};
    this.children = {};
  }

  getValues = () => {
    return {
      ...this.data,
      ...this.children,
    };
  };

  setValues = (values) => {
    for (var property in values) {
      if (has(this.data, property)) {
        this.data[property] = values[property];
      }
    }
  };

  __getNullOrFloat = (value) => {
    return isNull(value) ? null : parseFloat(value);
  }

  __getBoolean = (value) => {
    const type = typeof value;
    switch (type) {
      case 'number':
        return value === 0 ? false : true;
      case 'string':
        return value === '0' ? false : true;
      case 'boolean':
        return value;
      default:
        return Boolean(value);
    }
  }
}

export default Model;
