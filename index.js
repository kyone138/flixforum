const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { getDefaultNormalizer } = require("@testing-library/react");

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'LoginSystem',
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)", 
    [username, password], 
    (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    //const username = "hello";
    //const password = 123;


    db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?', 
    [username, password], 
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

app.listen(3001, () => {
    console.log("running server");
})