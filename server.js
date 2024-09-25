const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

  else if (page == '/api') {
   
        res.writeHead(200, {'Content-Type': 'application/json'});
        let arr=['Rock','Paper','Scissor']
        let rand=Math.floor(Math.random() * 3)
        let valComputer=arr[rand]
        const objToJson = {
          computerVal: valComputer
        }
        
        res.end(JSON.stringify(objToJson));
      }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {

      res.write(data);
      res.end();
    }
    
  );
  }
  else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000||process.env.PORT,()=>{
  console.log(`The port is listening on port 8000`)
})
