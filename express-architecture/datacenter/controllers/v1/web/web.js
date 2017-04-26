'use strict';

module.exports = {
  index,
  detail
};

function index(req, res, next) {
  return next({code: 200, ext: "It's is Index."});
}

function detail(req, res, next) {
  return next({code: 200, ext: "It's is Detail."});
}
