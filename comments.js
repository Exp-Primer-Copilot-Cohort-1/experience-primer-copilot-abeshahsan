//Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// Read file
const template = {
    index: fs.readFileSync('./index.html', 'utf8'),
    comment: fs.readFileSync('./comment.html', 'utf8'),
    commentForm: fs.readFileSync('./commentForm.html', 'utf8'),
    commentList: fs.readFileSync('./commentList.html', 'utf8')
}

// Create web server
http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/' || pathname === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(template.index);
    } else if (pathname === '/comment.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(template.comment);
    } else if (pathname === '/commentForm.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(template.commentForm);
    } else if (pathname === '/commentList.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(template.commentList);
    } else if (pathname === '/comment') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const { name, comment } = qs.parse(body);
                console.log('name:', name, 'comment:', comment);
            });
        }
        res.writeHead(301, { 'Location': '/comment.html' });
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
}).listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});