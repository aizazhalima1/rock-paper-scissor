const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;

  if (page === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (page === '/api') {
   
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const arr = ['Rock', 'Paper', 'Scissor'];
    const rand = Math.floor(Math.random() * arr.length);
    const valComputer = arr[rand];
    const objToJson = { computerVal: valComputer };
    res.end(JSON.stringify(objToJson));
  } else {
 
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
