
const fs=require('fs');
const express=require('express');
const app=express();
app.use(express.json());

app.use('/',(req,res,next)=>{
    const logEntry=`[${req.method}${req.url}]`
    console.log(logEntry.trim());
    fs.appendFileSync("requests.log",logEntry);
    next();
});

function middleware1(req,res,next){
    console.log("Good morning");
    next();
}

function middleware2(req,res,next){
    console.log("Good Evening");
    next();
}

app.get('/',middleware1,middleware2,(req,res)=>{
    res.send("Middleware activated");
    
})

app.listen(3000);