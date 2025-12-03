// Query Parameters 
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// http://localhost:3000/greet`?name=Pramod`

app.get('/greet', (req, res) => {
    const name = req.query.name || 'Guest'; // Default to 'Guest' if no name is provided
    res.send(`Hello, ${name}!`);
});


// http://localhost:3000/student/51

app.get('/student/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID is ${userId}`);
});


// Read JSON

app.post('/login', (req, res) => {
    console.log(req.body); // { username: "John", password: "1234" }
    res.send(`Welcome, ${req.body.username}`);
});


// Access Header

app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.send(`User-Agent: ${userAgent}`);
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});