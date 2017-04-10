'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const SessStore = require('connect-redis')(expressSession);
const responseTime = require('response-time');
const compression = require('compression');

const finallyResp = require('../middlewares/finally-resp');

const app = express();

app.set('views', path.join(__dirname, '..', config.view.dir));
app.set('view engine', config.view.engine);

// 禁用 x-powered-by 头部
// 防止攻击者可能会使用该头（缺省情况下已启用）来检测运行 Express 的应用程序，然后发动针对特定目标的攻击。
app.disable('x-powered-by');

// 对响应进行 gzip 压缩，降低响应主体的大小，提高 web 应用程序的速度
app.use(compression());

// 在 Response Headers 里添加 X-Response-Time 首部来显示响应的时间
app.use(responseTime());

// 记录日志
app.use(logger.log4js.connectLogger(logger, config.log));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
  name              : 'test',
  proxy             : true,
  resave            : true,
  saveUninitialized : false,
  secret            : 'secret',
  store             : new SessStore(config.redisSession),
  cookie            : {maxAge: 1000 * 60 * 60 * 24 * 7}
}));

// maxAge 设置缓存的有效期
app.use(express.static(config.static.dir, {maxAge: config.static.maxAge}));
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

require('../routes/web')(app);

app.use(function (req, res, next) {
  next({status: 'pageNotFound', code: 404});
});

// 错误处理
app.use(finallyResp({
  format: 'JSON',
  encoding: 'utf8',
  views: {
    400: '404.ejs',
    500: '500.ejs'
  }
}));

function start() {
  app.listen(config.web.port, function () {
    logger.info(config.web.name, config.web.url, 'start up');
  });
}

if (!module.parent) {
  start();
} else {
  exports.start = start;
}
