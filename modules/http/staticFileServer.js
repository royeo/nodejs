// 静态文件服务器
const http = require('http');
const path = require('path');
const fs = require('fs');

let root = __dirname;
let server = http.createServer((req, res) => {
    let _path = path.join(root, req.url);

    // fs.stat用于获取文件的信息
    fs.stat(_path, (err, stat) => {
        if (err) {
            if ('ENOENT' == err.code) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        } else {
            res.setHeader('Content-Length', stat.size);
            let stream = fs.createReadStream(_path);
            stream.pipe(res);
            // 错误处理
            stream.on('error', (err) => {
                res.statusCode = 500;
                res.end('Internal Server Error!');
            });
        }
    });
}).listen(3000, () => {
    console.log('starting...');
});