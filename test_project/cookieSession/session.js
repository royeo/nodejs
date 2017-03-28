var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);

var app = express();
app.listen(4000);

app.use(session({
    // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
    // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
    // 编写自己的 store 也很简单
    store: new redisStore(),
    secret: 'somesecrettoken'
}));

app.get('/', function (req, res) {
    if(req.session.isVisit) {
        req.session.isVisit++;
        res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
    } else {
        req.session.isVisit = 1;
        res.send('欢迎第一次来这里');
    }
});