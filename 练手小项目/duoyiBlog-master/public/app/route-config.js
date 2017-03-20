'use strict';

module.exports = function (router) {
  router.map({
    '/list': {
      name: 'weiboList',
      component: require('./views/weibo-list.vue')
    }
  });
  // 未匹配的路径重定向
  router.redirect({
    '*': '/list'
  });
};