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
        
        /*
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
        */
    } catch {
        res.status(500).send();
    }
});


//submit new post 
app.post("/newpostmodal", async (req, res) => {
    try {
        //console.log("inside of index of /newpostmodal");
        //info needed to grab the forumId from the DB
        const showtitle = req.body.showtitle;
        const season = req.body.season;
        const episode = req.body.episode;
        //const forum_id = req.body.forum_id;
        const forum_id = 0;

        const userid = req.body.userid;
        const posttitle = req.body.posttitle;
        const postcontent = req.body.postcontent;


        const dbtitle = "";
        const dbseason = "";
        const dbepisode = "";
        const dbforum_id = "";

        //console.log("show title is:", showtitle)

        db.query(
            "SELECT forum_id FROM forums WHERE title = 'criminal minds' AND season = 1 AND episode = 1", 
            [forum_id], 
            (err, result) => {
                if(err) {
                    console.log(err);
                }
                res.status(201).send(result);
                console.log("forum_id from db", result[0].forum_id);
            });


        // if forum_id not found in db yet, i.e it's the first post under a forum then push to both forums & posts table
        // if (forum_id == "") {
        //     //push to forums table 
        //     db.query(
        //         "INSERT INTO forums (title, season, episode) VALUES (?, ?, ?)", 
        //         ['ginny and georgia', 1, 1], 
        //         (err, result) => {
        //             if(err) {
        //                 console.log(err);
        //             }
        //             res.status(201).send(result);
        //         });
            
        //     // pull from forum table to get the newly made forum_id
        //     db.query(
        //         "SELECT forum_id FROM forums VALUES (?) WHERE 'title' = 'ginny and georgia' AND 'season' = 1 AND 'episode' = 1", 
        //         [forum_id], 
        //         (err, result) => {
        //             if(err) {
        //                 console.log(err);
        //             }
        //             res.status(201).send(result);
        //         });

        //     //push to posts table 
        //     db.query(
        //         "INSERT INTO posts (user_id, forum_id, title, content) VALUES (?, ?, ?, ?)", 
        //         [userid, forum_id, 'test post tile', 'test post content'], 
        //         (err, result) => {
        //             if(err) {
        //                 console.log(err);
        //             }
        //             res.status(201).send(result);
        //         });
        // } else {
            // if forum_id is found just push to posts table 
            // db.query(
            //     "INSERT INTO posts (user_id, forum_id, title, content) VALUES (?, ?, ?, ?)", 
            //     [userid, forum_id, posttitle, postcontent], 
            //     (err, result) => {
            //         if(err) {
            //             console.log(err);
            //         }
            //         res.status(201).send(result);
            //         console.log(userid);
            //         console.log(forum_id);
            //         console.log(posttitle);
            //         console.log(postcontent);

            //     });
        //}

    } catch {
        res.status(500).send();
    }
    
});

app.listen(3001, () => {
    console.log("running server");
})