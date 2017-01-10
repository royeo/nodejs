var http = require('http');
var qs = require('querystring');
var server = http.createServer(function (req, res) {
    if('/' == req.url) {
        res.writeHeader(200, {'Content-type' : 'text/html'});
        res.end([
            '<form method="POST" action="/url">'
            ,'<h1>My form</h1>'
            , '<fieldest>'
            , '<label>Personal information</label>'
            , '<p>What is your name?</p>'
            , '<input type="text" name="name">'
            , '<p><button>Submit</button></p>'
            , '</form>'
        ].join(''));
    } else if('/url' == req.url && 'POST' == req.method) {
        var body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function () {
            res.writeHead(200, {'Content-type' : 'text/html'});
            res.end('<p>Your name is <b>' + qs.parse(body).name + '</b></p>>');
            console.log('\n got name \033[90m' + qs.parse(body).name + '\033[39m\n');
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(8888, function () {
    console.log('http server running on port 8888....');
});
