'use strict';

/**
 * 对 controller 进行异常捕捉
 * @param {any}
 */
module.exports = function (params) {
  if (typeof params === 'function') {
    return catchError(params);
  }
  if (typeof params === 'object') {
    for (let key in params) {
      if (typeof params[key] === 'function') {
        params[key] = catchError(params[key]);
      }
    }
  }
};

/**
 * 处理错误
 * @param {any} controller
 * @returns {function}
 */
function catchError(controller) {
  return function (req, res, next) {
    let ret = controller.apply(this, arguments);
    if (ret && typeof ret.then === 'function') {
      return ret.catch(err => {
        return next({code: 500, msg: err.message || err, err: err});
      });
    }
    logger.error(`${controller.name} doesn't return a promise`);
    return ret;
  };
}
