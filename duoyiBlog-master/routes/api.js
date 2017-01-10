'use strict';

var weibo   = require('../controllers/weibo');
var comment = require('../controllers/comment');

module.exports = function (router) {
  // 获取微博
  router.getExt('/weibo', weibo.get);
  // 发送微博
  router.postExt('/weibo', weibo.send);
  // 删除微博
  router.deleteExt('/weibo/:weiboID', weibo.remove);


  // 评论微博
  router.postExt('/comment/:weiboID', comment.add);
  // 删除评论
  router.deleteExt('/comment/:commentID', comment.remove);
};
