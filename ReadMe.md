# ISE - 5th SEM MERN LAB PROGRAMS - [ PART-A : 1,2,3,4,9 ]  [ PART-B : 5,6,7,8,10 ]

#### Simpler, Optimized Codes are inside ISELab-Programs  ProgramName..-Simple.js 

# 🔐 Problem 1:  

Create a simple Node.js HTTP server that listens on port 3000 and routes
requests based on the URL path. The server should handle the following:
●​ / return "Welcome to the homepage!"
●​ /about should return "This is the about page."
●​ Any other URL should return "Page not found" with a 404 status.

---

## 🧾 1.HttpServer.js

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");
    if (req.url === "/") {
        res.statusCode = 200;
        res.end("Welcome to the homepage!");
    } else if (req.url === "/about") {
        res.statusCode = 200;
        res.end("This is the about page.");
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
```

## ▶️ : Run the Server

Use the following command to run your server:

```bash
node  1.HttpServer.js
```
---

## 🌐 Access the Server

Open your browser or use curl/Postman:

- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/about](http://localhost:3000/about)
- [http://localhost:3000/invalid](http://localhost:3000/invalid)

---
---

# 🔐 Problem 2:  
Create a Node.js server to integrate of HTML tags and code directly within
server-side handlers

---

## 🧾 2.HTMLserver.js

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    if (req.url === "/") {
        res.statusCode = 200;
        res.write("<h1>Welcome to Node.js Server</h1>");
        res.write("<p>This is a simple server with HTML content.</p>");
        res.end();
    } else if (req.url === "/about") {
        res.statusCode = 200;
        res.end("This is the about page.");
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }  
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
```

## ▶️ : Run the Server

Use the following command to run your server:

```bash
node  2.HTMLserver.js
```
---

## 🌐 Access the Server

Open your browser or use curl/Postman:

- [http://localhost:3000/](http://localhost:3000/)

---
---


# 🔐 Problem 3:  
Create a Node.js server that serves static files (HTML, CSS, JS) from the
current directory. The server should return a proper 404 status code if the
requested file doesn't exist.

---

## 🧾 3.StaticServer.js

```javascript
//(Place files: index.html, style.css, script.js in same folder)

const http = require("http");
const fs = require("fs");
const path = require("path");

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript"
};

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    let ext = path.extname(filePath);
    let contentType = mimeTypes[ext] || "text/plain";
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("404 File Not Found");
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log("Static server running on http://localhost:3000");
})
```

## 🧾 index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>Node Static Server</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello from index.html used by File Server</h1>
  <script src="script.js"></script>
</body>
</html>
```

## 🧾 style.css

```css
body {
    background-color: orange;
    font-family: sans-serif;
  }
```

## 🧾 script.js

```javascript
console.log("Hello from script.js!");
```


## ▶️ : Run the Server

Use the following command to run your server:

```bash
node  3.StaticServer.js
```
---

## 🌐 Access the Server

Open your browser or use curl/Postman:

- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/style.css](http://localhost:3000/style.css)
- [http://localhost:3000/script.js](http://localhost:3000/script.js)

---
---


# 🔐 Problem 4:  
Create a Node.js server to read and write JSON objects using files to save
the json objects

---

## 🧾 4.JSON-RW.js

```javascript
const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.json");

function readData() {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (req.url === "/items" && req.method === "GET") {
        res.end(JSON.stringify(readData()));
    }
    else if (req.url === "/items" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const item = JSON.parse(body);
            const data = readData();
            data.push(item);
            writeData(data);
            res.statusCode = 201;
            res.end(JSON.stringify({ message: "Item added successfully"}));
        });
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});

server.listen(3000, () => {
    console.log("JSON server running at http://localhost:3000/items");
});
```

## ▶️ : Run the Server

Use the following command to run your server:

```bash
node  4.JSON-RW.js
```
---

## In POSTMAN 
### 1. Get all items

**Request**
```
GET /items
```

**Example in Postman:**
- Method: `GET`
- URL: `http://localhost:3000/items`
- Body: No body needed as it is GET

**Response**
```json
[]
```
Initially we will get [] empty array as we have not added any items yet.
---

### 2. Add a new item

**Request**
```
POST /items
```

**Example in Postman:**
- Method: `POST`
- URL: `http://localhost:3000/items`
- Body (select `raw` + `JSON`): and paste the below JSON
```json
{
  "name": "Pen",
  "price": 10
}
```

**Response**
```json
{
    "message": "Item added successfully"
}
```

To test whether the Product Pen is Posted/Added or not use The 1st endpoint GET /item. THis time you should get one item as a response not []

For example In Postman make the following changes:

- Method: `GET`
- URL: `http://localhost:3000/items`
- Body: No body needed as it is GET

**Response**
```json
[
    {
        "name": "Pen",
        "price": 10
    }
]
```

This is the product which you added in the previous POST /items endpoint.

---
---


# 🔐 Problem 9:  
Create a Node.js application using Express.js with global middleware to
log all incoming requests in a log file (requests.log).

---

## 🧾 9.Middleware.js

```javascript
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const logFile = path.join(__dirname, "requests.log");

app.use((req, res, next) => {
    const logMessage = `${req.method} ${req.url}\n`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage);
    next();
});

function aboutMiddleware(req, res, next) {
    console.log("Accessed /about");
    next();
}

app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
});

app.get("/about", aboutMiddleware, (req, res) => {
    res.send("This is About Page");
});

app.use((req, res) => {
    res.status(404).send("404 Page Not Found");
});

app.listen(3000, () => {
    console.log("Express server running on http://localhost:3000");
});
```

## ▶️ : Run the Server

Use the following command to run your server:

```bash
node  9.Middleware.js
```
---

## 🌐 Access the Server

Open your browser or use curl/Postman:

- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/about](http://localhost:3000/about)
- [http://localhost:3000/other](http://localhost:3000/other)

---
---


# 🔐 Problem 5:  
Create a REST API using Express.js. The API should support the following
CRUD operations for managing
name,description,price fields):
items(using
arrays
&
Item
has
a.​ GET /items: Return a list of all items.
b.​ POST /items: Add a new item to the list.
c.​ PUT /items/:id: Update an item by ID.
d.​ DELETE /items/:id: Delete an item by ID.

---

## 🧾 5.CRUD-Array.js

```javascript
const express = require("express");
const app = express();
app.use(express.json()); 

let items = [];
let id_counter = 1; 

// CREATE
app.post("/product", (req, res) => {
    const { name, description, price } = req.body;
    let newItem = { 
            id    : id_counter++,
            name  : name,
            description : description,
            price : price,
    };
    items.push(newItem);
    res.send(newItem);
});

// READ
app.get("/product", (req, res) => {
    res.json(items);
});

// UPDATE
app.put("/product/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const index = items.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
        return res.send("Item not found");
    }
    
    items[index] = {
        id   : parseInt(id),
        name : name,
        description : description,
        price: price,
    };
    res.send("Updated Successfully");
});

// DELETE
app.delete("/product/:id", (req, res) => {
    const { id } = req.params;
    const index = items.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
        return res.send("Item not found");
    }
    items.splice(index, 1);
    res.send("Deleted Successfully");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
```

## ▶️ : Run the Server

Use the following command to run your server:

```bash
node  5.CRUD-Array.js
```
---


## In POSTMAN 
### 1. Get all products

**Request**
```
GET /product
```

**Example in Postman:**
- Method: `GET`
- URL: `http://localhost:3000/product`
- Body: No body needed as it is GET

**Response**
```json
[]
```
Initially we will get [] empty array as we have not added any items yet.
---

### 2. Add a new product

**Request**
```
POST /product
```

**Example in Postman:**
- Method: `POST`
- URL: `http://localhost:3000/product`
- Body (select `raw` + `JSON`): and paste the below JSON
```json
{
  "name": "Pen",
  "description" : "Ball Pen",
  "price": 10
}
```

**Response**
```json
{
  "id": 1,
  "name": "Pen",
  "description" : "Ball Pen",
  "price": 10
}
```

To test whether the Product Pen is Posted/Added or not use The 1st endpoint GET /product. THis time you should get one item as a response not []

For example In Postman make the following changes:

- Method: `GET`
- URL: `http://localhost:3000/product`
- Body: No body needed as it is GET

**Response**
```json
[
    {
        "id": 1,
        "name": "Pen",
        "description" : "Ball Pen",
        "price": 10
    }
]
```

This is the product which you added in the previous POST /product endpoint.

---

### 3. Update an product

Now imagin by miss you gave wrong product name in the prevous POST /product. So in order to change the name or any other details of previously created product you have to use PUT /product
**Request**
```
PUT /product/:id
```

**Example in Postman:**
- Method: `PUT`
- URL: `http://localhost:3000/product/1`        -->  Do not forget to add query parameter /1 the product id you want to update after /product otherwise you will get 404 Not Found.
- Body:
```json
{
  "name": "Black Rock Pen",
  "description": "Black ink pen",
  "price": 12
}
```

**Response**
```json
{
    "id": 1,
    "name": "Black Rock Pen",
    "description": "Black ink pen",
    "price": 12
}
```
---
### 4. Delete an product
Now imagin the production of the `Black Rock Pen` is stopped so we have to delete that product.
**Request**
```
DELETE /product/:id
```

**Example in Postman:**
- Method: `DELETE`
- URL: `http://localhost:3000/product/1`

**Response**
```json
{
  "status": "ok",
  "message": "Item 1 deleted successfully!"
}
```

---
---



# 🔐 Problem 6:  
Create a REST API using Express.js. The API should support the above(as in
Q.no5) CRUD operations for managing items using files(save items in
products.json). Item has name,description,price fields

---

## 🧾 6.CRUD-File.js

```javascript
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());

const file = path.join(__dirname, "product.json");
counter = 0;

function read() {
    if (!fs.existsSync(file)) {
        return { counter: 0, items: [] };
    }
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data || { counter: 0, items: [] });
}

function write(data) {
    fs.writeFileSync(file, JSON.stringify(data));
}

//CREATE
app.post("/product", (req, res) => {
    const { name, description, price } = req.body;
    let data = read();
    let newProduct = {
        id: ++data.counter,
        name: name,
        description : description,
        price: price,
    };
    data.items.push(newProduct);
    write(data);
    res.send(newProduct);
});

//READ
app.get("/product", (req, res) => {
    data = read();
    res.send(data.items);
});

//UPDATE
app.put("/product/:id", (req, res) => {
    const { id } = req.params;
    let { name, description, price } = req.body;
    let data = read();
    const index = data.items.findIndex((item) => item.id === parseInt(id));
    if (index == -1) {
        return res.send("Item not found");
    }
    data.items[index] = {
        id: parseInt(id),
        name: name,
        description : description,
        price: price,
    };
    write(data)
    res.send("Updated Successfully" );
});

//DELETE
app.delete("/product/:id", (req, res) => {
    const { id } = req.params;
    let data = read();
    const index = data.items.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
        return res.send("Item not found");
    }
    data.items.splice(index, 1); 
    write(data);res.send("Deleted Successfully");
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
});
```

## ▶️ : Run the Server

Use the following command to run your server:

```bash
node  6.CRUD-File.js
```
---

## In POSTMAN 
### 1. Get all products

**Request**
```
GET /product
```

**Example in Postman:**
- Method: `GET`
- URL: `http://localhost:3000/product`
- Body: No body needed as it is GET

**Response**
```json
[]
```
Initially we will get [] empty array as we have not added any items yet.
---

### 2. Add a new product

**Request**
```
POST /product
```

**Example in Postman:**
- Method: `POST`
- URL: `http://localhost:3000/product`
- Body (select `raw` + `JSON`): and paste the below JSON
```json
{
  "name": "Pen",
  "description" : "Ball Pen",
  "price": 10
}
```

**Response**
```json
{
  "id": 1,
  "name": "Pen",
  "description" : "Ball Pen",
  "price": 10
}
```

To test whether the Product Pen is Posted/Added or not use The 1st endpoint GET /product. THis time you should get one item as a response not []

For example In Postman make the following changes:

- Method: `GET`
- URL: `http://localhost:3000/product`
- Body: No body needed as it is GET

**Response**
```json
[
    {
        "id": 1,
        "name": "Pen",
        "description" : "Ball Pen",
        "price": 10
    }
]
```

This is the product which you added in the previous POST /product endpoint.

---

### 3. Update an product

Now imagin by miss you gave wrong product name in the prevous POST /product. So in order to change the name or any other details of previously created product you have to use PUT /product
**Request**
```
PUT /product/:id
```

**Example in Postman:**
- Method: `PUT`
- URL: `http://localhost:3000/product/1`        -->  Do not forget to add query parameter /1 the product id you want to update after /product otherwise you will get 404 Not Found.
- Body:
```json
{
  "name": "Black Rock Pen",
  "description": "Black ink pen",
  "price": 12
}
```

**Response**
```json
{
    "id": 1,
    "name": "Black Rock Pen",
    "description": "Black ink pen",
    "price": 12
}
```
---
### 4. Delete an product
Now imagin the production of the `Black Rock Pen` is stopped so we have to delete that product.
**Request**
```
DELETE /product/:id
```

**Example in Postman:**
- Method: `DELETE`
- URL: `http://localhost:3000/product/1`

**Response**
```json
{
  "status": "ok",
  "message": "Item 1 deleted successfully!"
}
```

---
---


# 🔐 Problem 7:  

Create a simple REST API using Express.js and PostgreSQL that allows users to
interact with a database. The API should support the following actions:
a.​ Create: Add a new user to the database.
b.​ Read: Retrieve all users from the database.
c.​ Update: Update a user's information in the database.
d.​ Delete: Delete a user from the database.
The database will store basic user information such as id, name, and email.

---


## 🗃️ PostgreSQL Table Creation

You have to create the following users `table` in your postgres database . Use pgAdmin to create a `databse` with name of your choice  say MyDB and inside of this database create the table named `users`. Run the following SQL command in your PostgreSQL client which is `pgAdmin`.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
```

## 🧾 pgdb.js

```javascript
const { Pool } = require('pg');
const pool = new Pool({
user: 'postgres',
password: 'admin',
host: 'localhost',
port: '5432',
database: 'MyDB',
});
module.exports=pool;
```

## 🧾 7.CRUD-PSQL.js

```javascript
const express = require("express");
const pool = require("./pgdb");
const app = express();
app.use(express.json());

// CREATE
app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    const result = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email] );
    if (result.rows.length === 0) return res.send("Row Not Found");
    res.send(result.rows);
});

// READ
app.get("/users", async (req, res) => {
    const result = await pool.query("SELECT * FROM users");
    if (result.rows.length === 0) return res.send("Row Not Found");
    res.send(result.rows);
});

// UPDATE
app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const result = await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *", [name, email, id] );
    if (result.rows.length === 0) return res.send("Row Not Found");
    res.send(result.rows);
});

// DELETE
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *",[id]);
    if (result.rows.length === 0) return res.send("Row Not Found");
    res.send(result.rows);
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000/users");
});
```

## ▶️ : Run the Server

Use the following command to run your server:

```bash
node  7.CRUD-PSQL.js
```
---


## ✅  Testing the API

### Test with Postman
To test the endpoint make use of PostMan API Client. To learn how to use PostMan follow this documentation:
#### 1. Create User

`Method`: POST
`URL`: http://localhost:3000/users
`Body`: 
```js
{
    "name": "Vaikunt Pai",
    "email": "vaiku@example.com"
}
```
`Response`: 
```js
{
    "id": 1,
    "name": "Vaikunt Pai",
    "email": "vaiku@example.com"
}
```

#### 2. Get All Users
`Method`: GET
`URL`: http://localhost:3000/users
`Body`: Not needed as it is GET request
`Response`: Server returns list of all the users from the users table.

#### 3. Update User
`Method`: PUT
`URL`: http://localhost:3000/users/1        // Here /1 is the User id which I want to update
`Body`: Now I want update the name so my req body look like this
```js
{
    "name": "Vaikunt Pai Nitte",
    "email": "vaikunt@example.com"
}
```
`Response`: 
```js
{
    "id": 1,
    "name": "Vaikunt Pai Nitte",
    "email": "vaikunt@example.com"
}
```

#### 4. Delete User
`Method`: DELETE
`URL`: http://localhost:3000/users/1    	    // /3 is the ID of the user which I want to delete
`Body`: No Body needed
`Response`: 
```js
{
    "message": "User deleted successfully"
}
```

---
---


# 🔐 Problem 8:  
Create a simple REST API using Express.js, MongoDB and Mongoose that
allows users to interact with a database. The API should support the following actions:
a.​ Create: Add a new user to the database.
b.​ Read: Retrieve all users from the database.
c.​ Update: Update a user's information in the database(document id)
d.​ Delete: Delete a user from the database (document id).
The database will store basic user information such as id, name, and email.

---

## 🧾 8.CRUD-Mongo.js

```javascript
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

async function connectdb() {
    await mongoose.connect("mongodb://localhost:27017/TestDB");
    console.log("Connected to mongodb");
}
connectdb();

// Without Schema
const UserSchema = new mongoose.Schema({}, { strict: false });

const User = mongoose.model("User", UserSchema);

//CREATE
app.post("/users", async (req, res) => {
    data = req.body;
    result = await User.create(data);
    console.log(result);
    res.send({ message: "success", result: result });
});

//READ
app.get("/users", async (req, res) => {
    result = await User.find();
    console.log("success", result);
    res.send({ message: "success", result: result });
});

//UPDATE
app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const newdata = req.body;
    result = await User.findByIdAndUpdate(id, newdata, { new: true });
    if (result == null) console.log( "id not found" );
    console.log(result);
    res.send({ message: "success", result: result });
});

//DELETE
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    result = await User.findByIdAndDelete(id);
    if (result == null) console.log( "id not found" );
    console.log(result);
    res.send({ message: "success", result: result });
    // res.send(result);
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000/users");
});
```

## ▶️ : Run the Server

Use the following command to run your server:

```bash
node  8.CRUD-Mongo.js
```
---

## ✅ Testing the API

### Test with Postman

#### 1. Create User

#### `Method`: POST
#### `URL`: http://localhost:3000/users
#### `Body`: 
```js
{
    "name": "Vaikunt Pai",
    "email": "vaiku@example.com"
}
```
#### #### `Response`: 
```js
{
    "name": "Vaikunt Pai",
    "email": "vaiku@example.com",
    "_id": "684f0eff17abc4e41f7cc459",     // This _id and _V are generated automatically by Mongodb
    "__v": 0
}
```

#### 2. Get All Users
#### `Method`: GET
#### `URL`: http://localhost:3000/users
#### `Body`: Not needed as it is GET request
#### `Response`: Server returns list of all the users from the users table.

#### 3. Update User
#### `Method`: PUT
#### `URL`: http://localhost:3000/users/684f0eff17abc4e41f7cc459      
// Here /684f0eff17abc4e41f7cc459 is the User id which I want to update
#### `Body`: Now I want update the name so my req body look like this
```js
{
    "name": "Vaikunt Pai Nitte",
    "email": "vaikunt@example.com"
}
```
#### `Response`: 
```js
{
    "name": "Vaikunt Pai Nitte",
    "email": "vaikunt@example.com",
    "_id": "684f0eff17abc4e41f7cc459",     
    "__v": 0
}
```

#### 4. Delete User
#### `Method`: DELETE
#### `URL`: http://localhost:3000/users/684f0eff17abc4e41f7cc459    	    
// /684f0eff17abc4e41f7cc459 is the ID of the user which I want to delete
#### `Body`: No Body needed
#### `Response`: 
```js
{
    "message": "User deleted successfully"
}
```

---
---


# 🔐 Problem 10:  
Create a simple authentication system using JSON Web Tokens (JWT). You will
build the following components:
a.​ A about route to authenticate the user and issue a JWT.
b.​ A protected login route that can only be accessed by users with a valid JWT.

---

## 🗃️ PostgreSQL Table Creation

You have to create the following users `table` in your postgres database . Use pgAdmin to create a `databse` with name of your choice  say MyDB and inside of this database create the table named `clients`. Run the following SQL command in your PostgreSQL client which is `pgAdmin`.

```sql
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);


-- Insert a client
INSERT INTO clients (username, password) VALUES ('student', 'student123');
```

## 🧾 pgdb.js

```javascript
const { Pool } = require('pg');
const pool = new Pool({
user: 'postgres',
password: 'admin',
host: 'localhost',
port: '5432',
database: 'MyDB',
});
module.exports=pool;
```


# 🧾 10.WebToken.js

```javascript
const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("./pgdb");
const app = express();
app.use(express.json());

const JWT_SECRET = "anytexthere"
pool.connect(() => { });

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM clients WHERE username=$1 AND password=$2', [username, password]);
    if (result.rows.length == 0) {
        return res.send("Unauthorized Credentials");
    } 
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.send(token);
});

function authorizeMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.send("Invalid Authorization");
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.send(err);
        }
        req.user = user;
        next();
    })
}

app.get("/home", authorizeMiddleware, (req, res) => {
    res.send({ "message": "Authenticated", "user": req.user });
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000/");
});
```

## ▶️ : Run the Server

Use the following command to run your server:

```bash
node  10.WebToken.js
```

---

## 🧪 Test the API Endpoints using  Postman
#### `Method`: POST
#### `URL`: http://localhost:3000/login
#### `Body`: 
```js
{
    "username": "student",
    "password": "student123"
}
```
#### `Response`: 
```js
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzUwNTk5MDAwLCJleHAiOjE3NTA2MDI2MDB9.C_m4_xumwk0BjK51LmKmPHJbCvz4KetKeNSzc6LXBsY
}
```

#### 2. Get Profile Details
Now, the /profile is authorized so we have to pass the Token which we got from the server after login using /login in the Header of the /profile endpoint

#### `Method`: GET
#### `URL`: http://localhost:3000/profile
#### `Body`: Not needed as it is GET request
#### `Header`: 
In the Header section of the Postman under Authorization -> select Type : Bearer Token 

Set The Token : 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzUwNTk5MDAwLCJleHAiOjE3NTA2MDI2MDB9.C_m4_xumwk0BjK51LmKmPHJbCvz4KetKeNSzc6LXBsY 


#### `Response`: Server greets the user with name as 
```js
{
    "message":"Authenticated",
    "user":{"username":"student","iat":1764349035,"exp":1764352635}
}
```
---
