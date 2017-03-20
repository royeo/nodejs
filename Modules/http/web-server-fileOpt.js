var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var count = 1;
var server = http.createServer(function (req, res) {
    if('/' == req.url) {
        sendHtml(req, res);
    } else if('/url' == req.url && 'POST' == req.method) {
        messageHandle(req, res);
    } else {
        notFound(req, res);
    }
});

server.listen(8888, function () {
    console.log('http server running on port 8888....');
});

//发送html到浏览器
function sendHtml(req, res) {
    res.writeHeader(200, {'Content-type' : 'text/html'});   //发送头信息
    res.end([                                               //发送html
        '<form method="POST" action="/url">'
        ,'<h1>File Operation</h1>'
        , '<fieldest>'
        , '<label>Read or Write?</label>'
        , '<p><input type="text" name="opt"></p>'
        , '<p><button>OK</button></p>'
        , '</form>'
    ].join(''));
}

//错误的命令
function notFound(req, res) {
    res.writeHead(404);
    res.end('Not Found');
}

//解析用户操作
function messageHandle(req, res) {
    var body = '';

    req.on('data', function(chunk) {      //当接受到数据就放到body中
        body += chunk;
    });

    req.on('end', function () {           //当接受完数据对数据进行解析
        var opt = qs.parse(body).opt;

        console.log('Operation : ' + opt);

        switch (opt) {
            case 'read':
            {
                res.writeHead(200, {'Content-type': 'text/html'});
                fs.createReadStream('./my-file.txt').pipe(res);

                break;
            }

            case 'write':
            {
                var text = 'Are you OK? ';

                fs.appendFile('./my-file.txt', count, function (err) {
                    if (err) throw err;
                    console.log('write :' + count);
                });

                res.writeHead(200, {'Content-type': 'text/html'});
                res.write('Write : ' + count);
                res.end();

                count++;

                break;
            }

            default:
            {
                res.end('<p>Wrong operation<b>');
            }
        }
    });
}
