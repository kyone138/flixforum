const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bycrypt = require("bcrypt");

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

app.post("/register", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const hashedPassword = await bycrypt.hash(req.body.password, 10);

        db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
        [username, email, hashedPassword], 
        (err, result) => {
            if(err) {
                console.log(err);
            }
            res.status(201).send(result);
        });
    } catch {
        res.status(500).send();
    }
    
});

app.post("/login", async (req, res) => {
    try {
        console.log("inside of login of /login");
        const email = req.body.email;
        const password = req.body.password;

        db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, result) => {
            if(err) {
                res.send({err:err});
            }
            if (result.length > 0) {
                if(bycrypt.compare(password, result[0].password)){
                    res.send(result);
                } else {
                    res.send({message: "Wrong username/password combination!"});
                }
            } else {
                res.send({message: "No such username."});
            }
        });
    } catch {
        res.status(500).send();
    }
});


app.post("/newpostmodal", async (req, res) => {
    try {
        //console.log("inside of index of /newpostmodal");
        //info needed to grab the forumId from the DB
        // info passed from NEW POST MODAL
        const showtitle = req.body.showtitle;
        const season = req.body.season;
        const episode = req.body.episode;

        const userid = req.body.userid;
        const posttitle = req.body.posttitle;
        const postcontent = req.body.postcontent;

        const dbtitle = "";
        const dbseason = "";
        const dbepisode = "";
        var dbforum_id = "";

        db.query(
            // check if the forum exists in the forums table
            "SELECT forum_id FROM forums WHERE title = ? AND season = ? AND episode = ?",
            [showtitle, season, episode], 
            (err, result) => {
                if(err) {
                    console.log(err);
                }
                else {
                    if (result.length === 0) {
                        console.log("forum not in database yet");
                        // push to the forums table
                        db.query(
                            "INSERT INTO forums (title, season, episode) VALUES (?, ?, ?)",
                            [showtitle, season, episode],
                            (err, result) => {
                                if(err) {
                                    console.log(err);
                                }
                                console.log(result);
                            });
                        // grab from the forums the newly added forum 
                        db.query(
                            "SELECT forum_id FROM forums WHERE title = ? AND season = ? AND episode = ?",
                            [showtitle, season, episode],
                            (err, result) => {
                                if(err) {
                                    console.log(err);
                                }
                                dbforum_id = result[0].forum_id;
                                // insert into posts 
                                db.query(
                                    "INSERT INTO posts (user_id, forum_id, title, content) VALUES (?, ?, ?, ?)",
                                    [userid, dbforum_id, posttitle, postcontent],
                                    (err, result) => {
                                        if(err) {
                                            console.log(err);
                                        }
                                        console.log(result);
                                    });
                            });
                        
                    }
                    else {
                        dbforum_id = result[0].forum_id;
                        console.log("forum in database and forumID = ", dbforum_id);
                        // insert into posts table because the forum_id exists
                        db.query(
                        "INSERT INTO posts (user_id, forum_id, title, content) VALUES (?, ?, ?, ?)",
                        [userid, dbforum_id, posttitle, postcontent],
                        (err, result) => {
                            if(err) {
                                console.log(err);
                            }
                            console.log(result);
                        });
                    }
                }
            });

    } catch {
        res.status(500).send();
    }
    
});

app.listen(3001, () => {
    console.log("running server");
})