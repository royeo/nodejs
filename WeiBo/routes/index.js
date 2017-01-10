var express = require('express');
var db = require('../models');
var request = require('bluebird').promisifyAll(require('request'));
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendweibo', function (req, res) {
  var userId = req.body.userId;
  var content = req.body.content;
  var imgUrl = req.body.imgUrl;
  var type = req.body.type;
  var time = Date.now();

  var pushedUrl = '127.0.0.1/weibo';
  var topic = [];
  var remind = [];

  // topic.push(content.match('#'));
  // remind.push(content.match('@(.*)'));


  if (!(userId && content && type)) {
    res.json({code: 500, success: false, msg: '参数缺失'});
  }


  console.log('')

  db.weibo.create({
    userId  : userId,
    type    : type,
    content : content,
    imgUrl  : imgUrl,
    time    : time
  })
  .then(function () {
    return res.json({code: 200, success: true, msg: '发送成功'});
    // return request.postAsync({
    //   url: pushedUrl,
    //   json: {topic: topic, remind: remind}
    // })
    // .then(function () {
    //   res.json({code: 1000, success: true, msg: '发送成功'});
    // });
  })
  .catch(function (err) {
     res.json({code: 500, success: false, msg: err});
  })
});

router.post('/deleteweibo', function (req, res) {
  var weiboId = req.body.weiboId;

  db.weibo.destroy({
    weiboId: weiboId
  })
  .then(function () {
    res.json({code: 1000, success: true, msg: '删除成功'});
  })
  .catch(function (err) {
    res.json({code: 1001, success: false, msg: err});
  })
});



module.exports = router;
