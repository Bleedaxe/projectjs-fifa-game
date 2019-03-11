const http = require('http');
const fs = require('fs');
var url = require("url");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const mimeTypes = {
        js: 'text/javascript',
        css: 'text/css',
        html: 'text/html',
        ico: 'image/ico'
    };

    var pathname = url.parse(req.url).pathname;
    if(pathname === '/'){
        fs.readFile('./src/index.html',function (err, data){
            res.writeHead(200, {
                'Content-Type'  : mimeTypes.html,
                'Content-Length': data.length
            })
            res.write(data);
            res.end();
        });
    } else {
        const pathTokens = pathname.split('.');
        const type = pathTokens.pop();
        if(mimeTypes[type] !== undefined){
            fs.readFile('./src' + pathname ,function (err, data){
                res.writeHead(200, {
                    'Content-Type'  : mimeTypes[type],
                    'Content-Length': data.length
                })
                res.write(data);
                res.end();
            });
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});