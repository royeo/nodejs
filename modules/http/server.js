var qs = require('querystring');
require('http').createServer(function (req, res) {
    var body = '';
    console.log('starting...');

    req.on('data', function (chunk) {
        console.log(1);
        body += chunk;
        console.log(`receive data: ${chunk}`);
    });

    req.on('end', function () {
        res.writeHead(200);
        res.end('Done');
        console.log('\n got name \033[90m' + qs.parse(body).name + '\033[39m');
    });
}).listen(3000);