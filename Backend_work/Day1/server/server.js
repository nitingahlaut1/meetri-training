var http = require('http');

const app = http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});

  res.write('Hello Nitin!');
  res.end();
})

app.listen(8080);