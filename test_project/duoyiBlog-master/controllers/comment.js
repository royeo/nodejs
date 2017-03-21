'use strict';

var BBPromise = require('bluebird');
var db        = require('../models');
var reject    = BBPromise.reject;

module.exports = {
  add   : add,
  remove: remove
};

function add(req) {
  var weiboID = parseInt(req.params.weiboID) || 0;
  if (!weiboID) {
    return reject('缺少微博ID');
  }
  var content = req.body.content;
  if (!content) {
    return reject('缺少评论内容');
  }
  content = content.trim();
  if (!content) {
    return reject('评论内容不能为空');
  }
  // var userID = req.session.user.userID;
  var userID = 1;
  return db.Comment.create({
    commentContent: content,
    weiboID       : weiboID,
    userID        : userID
  });
}

function remove(req) {
  var commentID = parseInt(req.params.commentID) || 0;
  if (!commentID) {
    return reject('缺少评论ID');
  }
  // var userID = req.session.user.userID;
  var userID = 1;
  return db.Comment.destroy({
    where: {
      commentID: commentID,
      userID   : userID
    }
  })
    .then(function (comment) {
      return comment ? '删除成功' : '评论不存在，删除失败';
    });
}