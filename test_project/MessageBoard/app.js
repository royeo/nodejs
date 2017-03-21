var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session); //使用 express-session 和 connect-mongo 模块实现了将会化信息存储到mongoldb中

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //设置视图文件所在目录
app.set('view engine', 'ejs');                    //设置模版引擎

var a = {
    a: 1,
    b: 2
}

JSON.stringify(a)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));     //加载日志中间件
app.use(bodyParser.json()); //加载解析json的中间件
app.use(bodyParser.urlencoded({extended: false}));      //加载解析urlencoded请求体的中间件
app.use(cookieParser());    //加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));  //设置public文件夹为存放静态文件的目录。
app.use(flash());

// secret 用来防止篡改 cookie，key 的值为 cookie 的名字，通过设置 cookie 的 maxAge 值设定 cookie 的生存期，
// 这里我们设置 cookie 的生存期为 30 天，设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，以避免丢失。
// 在后面的小节中，我们可以通过 req.session 获取当前用户的会话对象，获取用户的相关信息。
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        url: 'mongodb://localhost/blog'
    })
}));

//flash 是一个在 session 中用于存储信息的特定区域。信息写入 flash ，下一次显示完毕后即被清除。
// 典型的应用是结合重定向的功能，确保信息是提供给下一个被渲染的页面。
app.use(flash());

app.use('/', routes);   //路由控制器
app.use('/users', users);

// catch 404 and forward to error handler
// 捕获404错误，并转发到错误处理器。
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
// 开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktr aces leaked to user
// 生产环境下的错误处理器，不会将错误信息泄露给用户。
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
