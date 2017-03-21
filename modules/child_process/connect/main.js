const connect = require('connect');
const server = connect.createServer(); //通过Connect创建http.Server
server.use(connect.static(__dirname + '/website'));
server.listen(3000);