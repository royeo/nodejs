let http = require('http');
let server = http.createServer((req, res) => {
    res.end("hello");
}).listen(2222);
