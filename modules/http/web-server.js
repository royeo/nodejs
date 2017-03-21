const http = require('http');
let qs = require('querystring');
let server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            {
                let body =
                    `<form method="POST" action="/url">
                    <h1>My form</h1>
                    <fieldest>
                    <label>Personal information</label>
                    <p>What is your name?</p>
                    <input type="text" name="name">
                    <p><button>Submit</button></p>
                    </form>`;
                res.writeHeader(200, { 'Content-type': 'text/html', 'Content-Length': Buffer.byteLength(body) });
                res.end(body);
                break;
            }
        case 'POST':
            {
                let body = '';

                req.on('data', (chunk) => {
                    body += chunk;
                    console.log(body);
                });

                req.on('end', () => {
                    res.writeHead(200, { 'Content-type': 'text/html' });
                    res.end('<p>Your name is <b>' + qs.parse(body).name + '</b></p>>');
                    console.log('got name \033[90m' + qs.parse(body).name + '\033[39m\n');
                });
                break;
            }
        default:
            {
                res.writeHead(404);
                res.end('Not Found');
            }
    }
});

server.listen(8888, () => {
    console.log('http server running on port 8888....');
});