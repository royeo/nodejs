const koa = require('koa');  
let app = koa();

app.experimental = true;

app.use(async function (){  
  this.body = await Promise.resolve('Hello Reader!')
})

app.listen(3000);  