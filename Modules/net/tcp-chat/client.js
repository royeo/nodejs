var net = require('net') ;
var client = net.connect({port: 3000},function(){ // connect监听器
    console.log("client connected") ;
    client.write('Hello, I am client!\r\n') ;
});

client.on("data", function(data) {
    console.log(data.toString()) ;
});

client.on("end", function(){
    console.log("client disconnected") ;
}) ;