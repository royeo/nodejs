var eventEmitter = require('events').EventEmitter;
var tableTenis = new eventEmitter();

tableTenis.on('ping', function () {
    console.log('ping');
})

tableTenis.on('pong', function () {
    console.log('pong');
})

setTimeout(function () {
    tableTenis.emit('ping');
}, 1000);

setTimeout(function () {
    tableTenis.emit('pong');
}, 2000);