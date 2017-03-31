'use strict';

var express   = require('express');
var BBPromise = require('bluebird');
var router    = express.Router();

module.exports = function (app) {
  // 前端
  app.use('/', router);
  // 接口
  app.use('/api', router);
};

var methods = ['get', 'post', 'patch', 'delete'];
// router方法扩展
methods.map(function (method) {
  var ext = method + 'Ext';
  router[ext] = function (path, fn) {
    router[method](path, proxy(fn));
  }
});

require('./front')(router);
require('./api')(router);

function proxy(fn) {
  return function (req, res, next) {
    // 使用Promise连接
    BBPromise.resolve()
      .then(function () {
        return fn(req, res, next);
      })
      .then(function (data) {
        res.json({code: 200, msg: data});
      })
      .catch(function (error) {
        res.json({error: error.message || error});
      });
  };
}
