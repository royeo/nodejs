'use strict';

var BBPromise = require('bluebird');
var db        = require('../models');
var BBPromise = require('bluebird');
var reject    = BBPromise.reject;
var request   = BBPromise.promisifyAll(require('request'));



module.exports = {
  get    : get,
  send   : send,
  remove : remove
};

// 获取微博
function get(req) {
  var userID = parseInt(req.query.userID);
  var where = {};

  if (userID) {
    where.userID = userID;
  }

  // console.log('userID: ', userID);
  // console.log('where: ', where);

  return db.Weibo.findAndCount({where: where});
}

// 发送微博
function send(req) {
  var weiboContent = req.body.weiboContent;
  if (!weiboContent) {
    return reject('缺少微博内容');
  }

  var weiboType    = req.body.weiboType;
  if (!weiboContent) {
    return reject('缺少微博类型');
  }

  var weiboImage   = req.body.weiboImage || '';
  var weiboTime    = Date.now();
  // var userID       = req.session.user.userID;
  var userID       = 1;

  // var pushedUrl = '127.0.0.1/weibo';
  // var topic = [];
  // var remind = [];
  // topic.push(content.match('#'));
  // remind.push(content.match('@(.*)'));

  console.log('userID: ', userID);
  console.log('weiboContent: ', weiboContent);
  console.log('weiboImage: ', weiboImage);
  console.log('weiboType: ', weiboType);
  console.log('weiboTime: ', weiboTime);

  return db.Weibo.create({
    userID       : userID,
    weiboType    : weiboType,
    weiboContent : weiboContent,
    weiboImage   : weiboImage,
    weiboTime    : weiboTime
  })
  //   .then(function () {
  //   return res.json({code: 200, success: true, msg: '发送成功'});
  //     // return request.postAsync({
  //     //   url: pushedUrl,
  //     //   json: {topic: topic, remind: remind}
  //     // })
  //     // .then(function () {
  //     //   res.json({code: 1000, success: true, msg: '发送成功'});
  //     // });
  // })
}

// 删除微博
function remove(req) {
  var weiboID = req.params.weiboID;
  if (!weiboID) {
    return reject('缺少微博ID');
  }
  // var userID = req.session.user.userID;
  var userID = 1;

  console.log('weiboID: ', weiboID)

  return db.Weibo.destroy({where: {
      weiboID : weiboID,
      userID  : userID
    }
  }).then(function (result) {
    return result ? '删除成功' : '微博不存在，删除失败';
  });
}
