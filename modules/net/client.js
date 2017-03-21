const net = require('net');
const client = net.connect({ port: 3000 }, () => { // connect监听器
    console.log("client connected");
    client.write('Hello, I am client!\r\n');
});

client.on("data", (data) => {
    console.log(data.toString());
});

client.on("end", () => {
    console.log("client disconnected");
});