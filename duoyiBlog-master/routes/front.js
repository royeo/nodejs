'use strict';

module.exports = function (router) {
  // 首页
  router.get('/', function(req, res, next) {
    res.render('index');
  });
};
