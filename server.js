const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

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
    console.log('API requested'); // Log to see if the request reaches here
    res.setHeader('Access-Control-Allow-Origin', '*'); // Add CORS header
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const arr = ['Rock', 'Paper', 'Scissor'];
    const rand = Math.floor(Math.random() * arr.length);
    const valComputer = arr[rand];
    const objToJson = { computerVal: valComputer };
    res.end(JSON.stringify(objToJson));
}
  } else if (page === '/css/style.css') {
    fs.readFile('css/style.css', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } else if (page === '/js/main.js') {
    fs.readFile('js/main.js', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(data);
    });
  } else {
    figlet('404!!', (err, data) => {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  }
});

// Change to use process.env.PORT first, then fallback to 8000
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
