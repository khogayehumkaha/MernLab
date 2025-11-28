const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Welcome to Node.js Server</h1>");
    res.write("<p>This is a simple server with HTML content.</p>");
    res.write("<br><a href='http://lms.nmamit.in' target='_blank'>Goto LMS </a>");
    res.end();
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});