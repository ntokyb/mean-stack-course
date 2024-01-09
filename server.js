const http = require('http');

const server = http.createServer((req, res) => {
  res.end('My first server');
});


server.listen(process.env.PORT || 3000);