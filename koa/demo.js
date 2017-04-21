const Koa = require('koa');
const bodyParser = require ('koa-bodyparser');
const route = require('koa-router')();
const multer = require('koa-multer');

const app = new Koa();
const upload = multer({dest: 'upload/'});

app.use(bodyParser());
app.use(require('koa-static')(__dirname + '/public'));

app.use(route.routes())
   .use(route.allowedMethods());
   
// get 请求
route.get('/topic', (ctx, next) => {
    ctx.body = 'Hello koa ' + ctx.query['a'];
    console.log (ctx.query['vehicle']);
});

// post 请求
route.post('/toc/aaa', (ctx, next) => {
    ctx.body = ctx.request.body['a'];
    console.log (ctx.request.body['vehicle']);
});

// 上传文件
route.post('/profile', upload.single('upfiles'), (ctx, next) => {
  ctx.body = 'upload is success';
});

app.listen(3000, () => {
  console.log('Start...');
});