var express = require('express');

var cookieParser = require('cookie-parser');

var app = express();

app.listen(3000);

// 使用 cookieParser 中间件，cookieParser(secret, options)
// 其中 secret 用来加密 cookie 字符串（下面会提到 signedCookies）
// options 传入上面介绍的 cookie 可选参数
app.use(cookieParser());

app.get('/', function (req, res) {
    // 如果请求中的 cookie 存在 isVisit, 则输出 cookie
    // 否则，设置 cookie 字段 isVisit, 并设置过期时间为1分钟
    if(req.cookies.isVisit) {
        console.log(req.cookies);
        res.send('欢迎再次访问');
    }
    else {
        res.cookie('isVisit', 1, {maxAge: 60 * 1000});
        res.send('欢迎首次访问');
    }
});


