var express = require('express');
var router = express.Router();  //生成一个路由实例用来捕获访问主页的GET请求
var User = require('../models/user.js');
var Message = require('../models/message.js');
var Promise = require('bluebird');
var Reply = require('../models/reply.js');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {  //destination：上传的文件所在目录
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {     //filename：用来修改上传后的文件名，这里保持原来的名字
        cb(null, req.session.user.name + '.jpg');
    }
}); //上传头像
var upload = multer({
    storage: storage
});

//获取实时时间
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//如果用户未登录，拦截用户访问留言板
var checkLogout = function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }

    next();
}

//检查用户已登录，直接跳转到留言板
var checkLogin = function (req, res, next) {
    if (req.session.user) {
        if (req.method == 'GET') {       //如果为get请求，重定向到留言板页面
            return res.redirect('/msgboard');
        }

        if (req.method == 'POST') {      //如果为post请求，返回用户已登录到前端
            return res.json({
                "code": 1,
                "msg": "用户已登录!"
            })
        }
    }

    next();
}

//主页
router.get('/', checkLogin, function (req, res, next) {
    res.render('index', {title: '主页'});
});

//注册页面请求
router.get('/reg', checkLogin, function (req, res, next) {
    res.render('reg', {title: '注册'});
}); 

//注册请求
router.post('/reg', checkLogin, function (req, res, next) {
    var user = new User({
        id: Math.abs((new Date().getTime()) ^ Math.random()),
        name: req.body.name,
        password: req.body.password,
        head: '/images/init.jpg',
        introduction: null
    });

    User.check(user.name).then(function (data) {
        if (data) {
            return Promise.reject({
                message: '用户名已存在!'
            });
        }
    }).then(function () {
        return user.save();
    }).then(function (data) {
        if (data) {
            req.session.user = user;//用户信息存入 session
            return res.json({
                code: 0,
                msg: '注册成功'
            });
        }
    }).catch(function (data) {
        return res.json({
            code: 1,
            msg: data.message
        });
    })
})

//登录页面请求
router.get('/login', checkLogin, function (req, res, next) {
    res.render('login', {title: '登录'});
});

//登录请求
router.post('/login', checkLogin, function (req, res, next) {
    var user = new User({
        name: req.body.name,
        password: req.body.password,
    });

    User.check(req.body.name).then(function (data) {
        if(!data) {
            return Promise.reject({
                message: '用户名不存在!'
            });
        }

        if (data.password != user.password) {
            return Promise.reject({
                message: '密码错误!'
            });
        }

        req.session.user = data;
        return res.json({
            code: 0,
            msg: '登录成功!'
        });
    }).catch(function (data) {
        return res.json({
            code: 1,
            msg: data.message
        });
    })
});

//留言板页面请求
router.get('/msgboard', checkLogout, function (req, res, next) {
    res.render('msgboard', {title: '留言板'});
});

//获取10条公共留言请求
router.get('/msgboard/get10', checkLogout, function (req, res, next) {
    var docs;
    Message.getTen(null, req.query.page).then(function (_docs) {
        docs = _docs;
        return Message.getNumber();
    }).then(function (total) {
        return res.json({
            code: 0,
            msg: docs,
            total: total
        });
    }).catch(function (err) {
        return res.json({
            code: 1
        });
    })
});

//获取用户资料
router.get('/msgboard/getData', checkLogout, function (req, res, next) {
    // console.log('______________', req.query.name);
    User.check(req.query.name).then(function (user) {
        return res.json({
            code: 0,
            msg: user
        });
    }, function (err) {
        return res.json({
            code: 1,
            msg: '数据库出错!'
        });
    });
});

//获取10条回复请求
router.get('/msgboard/check', checkLogout, function (req, res, next) {
    // console.log('fatherID : ', req.query.id);
    // console.log('page : ', req.query.page);
    var docs;
    Reply.getTen(req.query.id, req.query.page).then(function (_docs) {
        docs = _docs;
        return Reply.getNumber(req.query.id);
    }).then(function (total) {
        return res.json({
            code: 0,
            msg: docs,
            total: total
        });
    }).catch(function (err) {
        return res.json({
            code: 1
        });
    })
});

//回复留言请求
router.post('/msgboard/reply', checkLogout, function (req, res, next) {
    var message = JSON.parse(req.body.msg);
    var reply = new Reply({
        id: req.session.user.id,
        name: req.session.user.name,
        targetID: null,
        targetName: null,
        content: req.body.content,
        fatherID: message._id,
        time: new Date().Format('yyyy-MM-dd hh:mm:ss')
    });

    console.log('fatherID : ', message._id);
    reply.save().then(function () {
        return Reply.getTen(message._id, 1);
    }).then(function(docs) {
      //  console.log('获取10条留言回复：', docs);
        return res.json({
            code: 0,
            msg: docs,
            total: docs.length
        });
    }).catch(function(err){
        return res.json({
            code: 1,
            msg: '数据库出错!'
        });
    })
});

//评论回复请求
router.post('/msgboard/replyReply', checkLogout, function (req, res, next) {
    var message = JSON.parse(req.body.msg);
    var comment = new Reply({
        id: req.session.user.id,
        name: req.session.user.name,
        targetID: message.id,
        targetName: message.name,
        content: req.body.content,
        fatherID: message.fatherID,
        time: new Date().Format('yyyy-MM-dd hh:mm:ss')
    });
    
    console.log('Reply - comment : ', comment);

    comment.save().then(function () {
        return  Reply.getTen(message.fatherID, 1)
    }).then(function (docs) {
        return res.json({
            code: 0,
            msg: docs,
            total: docs.length
        });
    }).catch(function (err) {
        return res.json({
            code: 1,
            msg: err.message
        });
    })
});

//发布留言页面请求
router.get('/msgboard/release', checkLogout, function (req, res, next) {
    res.render('release', {title: '发布留言'});
});

//发布留言请求
router.post('/msgboard/release', checkLogout, function (req, res, next) {
    var msg = new Message({
        id: req.session.user.id,
        name: req.session.user.name,
        content: req.body.content,
        time: new Date().Format('yyyy-MM-dd hh:mm:ss')
    });

    console.log('[msg] ', msg);
    msg.save().then(function (data) {
        return res.json({
            code: 0,
            msg: '发表成功!'
        });
    }, function (err) {
        return res.json({
            code: 1,
            msg: '数据库保存失败!'
        });
    })
});

//管理留言页面请求
router.get('/msgboard/manage', checkLogout, function (req, res, next) {
    res.render('manage', {title: '留言管理'});
});

//删除留言请求
router.post('/msgboard/manage/del', checkLogout, function (req, res, next) {
    // console.log('Router ID : ' + req.body.id);
    Message.remove(req.body.id).then(function () {
        return Reply.remove(req.body.id);
    }).then(function () {
        return res.json({
            code: 0,
            msg: '删除成功!'
        });
    }).catch(function(err) {
        return res.json({
            code: 1,
            msg: "删除失败!"
        });
    })
});

//删除回复请求
router.post('/msgboard/manage/delReply', checkLogout, function (req, res, next) {
    console.log('Router ID : ' + req.body.id);
    Reply.removeOne(req.body.id).then(function () {
        return res.json({
            code: 0,
            msg: '删除成功!'
        });
    }, function (err) {
        return res.json({
            code: 1,
            msg: '删除留言失败!'
        });
    })
});

//获取10条个人留言请求
router.get('/msgboard/manage/get10', checkLogout, function (req, res, next) {
    // console.log('++++++++++++++++++++++++++++++++++++')
    // console.log('[id] : ', req.session.user.id);
    var docs;
    Message.getTen(req.session.user.id, req.query.page).then(function (_docs) {
        docs = _docs;
        return Message.getNumber(req.session.user.id);
    }).then(function (total) {
        return res.json({
            code: 0,
            msg: docs,
            total: total
        });
    }).catch(function (err) {
        return res.json({
            code: 1
        });
    })
});

//获取10条个人回复请求
router.get('/msgboard/manage/getTenReply', checkLogout, function (req, res, next) {
    console.log('++++++++++++++++++++++++++++++++++++')
    console.log('[id] : ', req.session.user.id)
    var docs;
    Reply.getTenOwn(req.session.user.id, req.query.page).then(function (_docs) {
        docs = _docs;
        return Reply.getNumber(req.session.user.id);
    }).then(function (total) {
        return res.json({
            code: 0,
            msg: docs,
            total: total
        });
    }).catch(function (err) {
        return res.json({
            code: 1
        });
    })
});

//退出留言板请求
router.get('/logout', function (req, res, next) {
    delete req.session.user;
    res.redirect('/');
});

//编辑资料页面请求
router.get('/edit', checkLogout, function (req, res, next) {
    res.render('edit', {
        title: '个人资料',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

//获取个人资料请求
router.get('/edit/get', checkLogout, function (req, res, next) {
    User.check(req.session.user.name).then(function (user) {
        if (!user) {
            return res.json({
                code: 1,
                msg: '获取失败!'
            });
        }

        return res.json({
            code: 0,
            msg: user
        });
    }, function (err) {
        return res.json({
            code: 1,
            msg: '数据库出错!'
        });
    })
});

//修改昵称
router.post('/edit/name', checkLogout, function (req, res, next) {
    var oldName = req.session.user.name;
    //修改user集合中的用户名
    User.updateName(oldName, req.body.name).then(function (data) {
        if (data.name == req.body.name) {
            return Promise.reject({
                message: '用户名已存在!'
            });
        }
        return Message.updateName(req.session.user.id, req.body.name);
    }).then(function (data) {
        if (!data) {
            return Promise.reject({
                message: '修改失败!'
            });
        }
        return Reply.updateName(req.session.user.id, req.body.name);
    }).then(function (data) {
        if (!data) {
            return Promise.reject({
                message: '修改失败!'
            });
        }
        return User.check(req.body.name);
    }).then(function (data) {
        if (!data) {
            return Promise.reject({
                message: '修改失败!'
            });
        }
        console.log("[change name] : ", data);
        req.session.user = data;

        return res.json({
            code: 0,
            msg: "修改成功!"
        });
    }).catch(function (data) {
        return res.json({
            code: 1,
            msg: data.message
        });
    })
})

//修改个人简介
router.post('/edit/intruduction', checkLogout, function (req, res, next) {
    User.updateIntroduction(req.session.user.name, req.body.introduction).then(function (user) {
        if (!user) {
            return res.json({
                code: 1,
                msg: "修改失败!"
            });
        }
        return res.json({
            code: 0,
            msg: "修改成功!"
        });
    }, function (err) {
        return res.json({
            code: 1,
            msg: "数据库出错!"
        });
    })
});

//修改头像
router.post('/edit', upload.array('field1', 1), function (req, res, next) {
    User.updateHead(req.session.user.name, '/images/' + req.session.user.name + '.jpg').then(function (user) {
        if (!user) {
            return res.json({
                code: 1,
                msg: "修改失败!"
            });
        }

        res.render('edit', {
            title: '个人资料',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    }, function (err) {
        return res.json({
            code: 1,
            msg: "数据库出错!"
        });
    });
});

module.exports = router;
