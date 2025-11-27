const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200; // Status Code OK
  res.setHeader('Content-Type', 'text/plain');    // Indicates the type of data sent to Client
  res.end('Hello, Node.js Server!');              // End the Response with Hello, Node.js Server!
});

server.listen(port, hostname, () => {             // START the server.
  console.log(`Server running at http://${hostname}:${port}/`);
});
