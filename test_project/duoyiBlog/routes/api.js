'use strict';

var weibo   = require('../controllers/weibo');
var comment = require('../controllers/comment');

module.exports = function (router) {
  // 微博
  router.getExt('/weibo', weibo.list);
  // 评论微博
  router.postExt('/comment/:weiboID', comment.add);
  // 删除评论
  router.deleteExt('/comment/:commentID', comment.remove);
};
