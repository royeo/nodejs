const net = require('net');
let clientList = [];
const server = net.createServer((client) => { // conn : net.Stream
    client.name = client.remoteAddress + ':' + client.remotePort;
    console.log(client.name + ' connected successfully');
    clientList.push(client);

    client.on('data', (data) => {
        broadcast(data, client);
    });

    client.on('end', () => {
        console.log(client.name + ' disconected');
        clientList.splice(clientList.indexOf(client), 1); //从clientList中删除已断开连接的客户端socket
    });

    client.on('error', function(err) {
        console.log(err);
    });
});

server.listen(3000, function() {
    console.log('server is listening');
});

//转发客户端的聊天信息
function broadcast(message, client) {
    let clean = []; //保存需要销毁的socket

    for (let i = 0; i < clientList.length; i++) {
        if (client != clientList[i]) {
            if (clientList[i].writable) { //检查socket是否可写
                clientList[i].write(client.name + ' says ' + message);
            } else {
                clean.push(clientList[i]);
            }
        }
    }

    for (let i = 0; i < clean.length; i++) { //从clientList中删除异常的socket
        clientList.splice(clientList.indexOf(clean[i]), 1);
    }
}