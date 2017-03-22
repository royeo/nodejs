// 父进程发送一个 server 对象到子进程，则一些连接可被父进程处理，另一些可被子进程处理。
const child = require('child_process').fork('server_child.js');

// 开启 server 对象，并发送该句柄。
const server = require('net').createServer();
server.on('connection', (socket) => {
  socket.end('被父进程处理');
});
server.listen(1337, () => {
  child.send('server', server);
});