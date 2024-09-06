var http = require('http'); 
var fs = require('fs'); 
var path = require('path'); 

var PORT = 3000; 
var publicDir = path.join(__dirname, 'public');


var server = http.createServer((req, res) => {
    var filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url); 

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
        } else {
            // Serve the requested file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server runn http://localhost:${PORT}`);
});
