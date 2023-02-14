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

 
// app.post("/newpostmodal", async (req, res) => {
//     //const showtitle = req.body.showtitle;
//     //const season = req.body.season;
//     //const episode = req.body.episode;
//     const showtitle = "criminal minds";
//     const season = 1;
//     const episode = 1;
//     console.log(showtitle, season, episode);
//     var dbforum_id = "";
//     console.log("inside get");
//     db.query(
//         // check if the forum exists in the forums table
//         "SELECT * FROM forums WHERE title = ? AND season = ? AND episode = ?",
//         [showtitle, season, episode], 
//         (err, result) => {
//             if(err) {
//                 console.log(err);
//             }
//             else {
//                 //dbforum_id = result[0].forum_id;
//                 //console.log(dbforum_id);
//                 console.log(result);
//                 //console.log(result);
//             }
//         });

//     console.log("outside of db", dbforum_id);

// });

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
                    }
                    else {
                        dbforum_id = result[0].forum_id;
                        console.log("forum in database and forumID = ", dbforum_id);
                        db.query(
                        "INSERT INTO posts (user_id, forum_id, title, content) VALUES (?, ?, ?, ?)",
                        [userid, dbforum_id, posttitle, postcontent],
                        (err, result) => {
                            if(err) {
                                console.log(err);
                            }
                            console.log(result);
                            //res.status(201).send(result);
                        });
                    }
                }
            });


                //res.status(201).send(result);
                //console.log(result.length);
                //console.log("the other select forum", result);
                // if (result.length === 0) {
                //     //if there is a forum_id already, then get the forum_id then publish to the DB 
                //     db.query(
                //         "SELECT forum_id FROM forums WHERE title = ? AND season = ? AND episode = ?", 
                //         [showtitle, season, episode], 
                //         (err, result) => {
                //             if(err) {
                //                 console.log(err);
                //             }
                //             res.status(201).send(result);
                //             dbforum_id =  result[0].forum_id;
                //             console.log("forum_id from db", dbforum_id);
                //         });

                //         console.log("forum_id test", dbforum_id);

                    
                    
                //     // db.query(
                //     //     "INSERT INTO posts (user_id, forum_id, title, content) VALUES (?, ?, ?, ?)",
                //     //     [userid, dbforum_id, posttitle, postcontent],
                //     //     (err, result) => {
                //     //         if(err) {
                //     //             console.log(err);
                //     //         }
                //     //         res.status(201).send(result);
                //     //     });
                // }
                // else {
                //     console.log("else case");

                // }


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

                //});
        //}

    } catch {
        res.status(500).send();
    }
    
});

app.listen(3001, () => {
    console.log("running server");
})