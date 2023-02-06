const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    user: 'admin',
    host: 'flixforum-db.cdwyjlv3wddo.us-west-2.rds.amazonaws.com',
    password: 'FlixForum',
    port: '3306',
    database: 'LoginSystem',
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //db.end();
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
    [username, email, password], 
    (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);


    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?', 
    [email, password], 
    (err, result) => {
        if(err) {
            res.send({err:err});
        } 

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "Wrong username/password combination!"});
        }
    });
});

app.listen(3000, () => {
    console.log("running server");
})
