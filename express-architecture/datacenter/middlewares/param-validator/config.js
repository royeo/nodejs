'use strict';

// 自定义验证方法
let customValidators = {
  isArray(value) {
    try {
      return _.isArray((typeof value === 'string') ? JSON.parse(value) : value);
    } catch (e) {
      return false;
    }
  },
  isIntArray(value) {
    try {
      value = (typeof value === 'string') ? JSON.parse(value) : value;
      return _.isArray(value) && _.every(value, (item) => _.isInteger(_.toInteger(item)));
    } catch (e) {
      return false;
    }
  },
  isObject(value) {
    try {
      return _.isObject((typeof value === 'string') ? JSON.parse(value) : value);
    } catch (e) {
      return false;
    }
  },
  isString: _.isString
};

// 自定义sanitizer
let customSanitizers = {
  toArray(value) {
    return (typeof value === 'string') ? JSON.parse(value) : value;
  },
  toIntArray(value) {
    return _.map((typeof value === 'string') ? JSON.parse(value) : value, _.toInteger);
  },
  toObject(value) {
    return (typeof value === 'string') ? JSON.parse(value) : value;
  }
};

// 自定义错误格式化
function errorFormatter(param, msg, value) {
  let namespace = param.split('.');
  let formParam = namespace.shift();

  while (namespace.length) {
    formParam += `[${namespace.shift()}]`;
  }

  return {
    param : formParam,
    msg   : msg,
    value : value
  };
}

module.exports = {
  customSanitizers,
  customValidators,
  errorFormatter
};
