const express = require("express");
const app = express();
const session = require('express-session');
//const AWS = require('aws-sdk');
const res = require("express/lib/response");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
//const { resetWatchers } = require("nodemon/lib/monitor/watch");
//const functions = require('./functions.js');
const port = process.env.PORT || 3636;
const startHealth = 100;
const beasts = [
    {name: "snake", speed: 5, power: 1, damage: 5, health: 50},
    {name: "wolf", speed: 4, power: 2, damage: 10, health: 60},
    {name: "buck", speed: 3, power: 4, damage: 20, health: 75},
    {name: "raven", speed: 5, power: 2, damage: 10, health: 50},
    {name: "boar", speed: 3, power: 4, damage: 20, health: 80},
    {name: "bear", speed: 5, power: 5, damage: 25, health: 120}
    ];

const weapons = [
    {name: "sword", speed: 3, power: 3, damage: 6},
    {name: "axe", speed: 2, power: 5, damage: 10},
    {name: "gun", speed: 4, power: 4, damage: 8}
];

/*
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",

};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
*/

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(session({
    secret: 'username',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.listen(port, () => {
    console.log(`Hosting game on localhost:${port}`);
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    let user = "";
    let punctuation = "";
    let invalid_login = false;
    invalid_login = req.query.reason || null;

    if (req.session && req.session.username){
        user = req.session.username;
        punctuation = ", ";
    }
    res.render("index", {my_user: user, punctuation: punctuation, invalid_login: invalid_login});
});


app.post("/login", (req, res) => {
    const valid_users = [
        {"username": "sue", "password": "sue"},
        {"username": "joe", "password": "joe"},
        {"username": "sam", "password": "sam"}];
    const user = req.body.username;
    const pass = req.body.password;

    const foundUser = valid_users.find(user1 => user1.username == user && user1.password == pass);

    if (foundUser){
        req.session.username = user;
        res.redirect("/Woodlands");
    }
    else {
        req.session.destroy(() => {});
        res.redirect("/?reason=invalid_user");
    }
});

app.get("/Woodlands", (req, res) => {
    if (req.session && req.session.username){
       res.render("Woodlands", {user: req.session.username});
    }
    else {
        res.redirect("/");
    }
    
});


/*
app.post('/signup', (req, res) => {
    let body = req.body;
    console.log(body);

    let input = {
        username: body.username,
        email: body.email,
        password: body.password
    };
    let params = {
        TableName: body.TableName,
        Item: input
    };
    docClient.put(params, function(err, data){
        if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));
            res.status(484).send("Oops! Sign up failed.");
        }

        else {
            console.log("users::save::success");
            res.status(200).send("Sign up successful!")
        }
    });
});

app.post("/read", (req, res) => {
    let body=req.body;
    let params = {
        TableName: body.TableName,
        Key: {
            "username": body.username
        }};
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            res.status(404).send("No users with this username found.");
        }
        else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
            res.status(200).send(data);
        }
    });
});

app.post("/delete", (req, res) => {
    let body=req.body;
    let params = {
        TableName: body.TableName,
        Key: {
            "username": body.username
        }
    };
    docClient.delete(params, function (err, data) {
        if (err) {
            console.log("users::delete::error - " + JSON.stringify(err, null, 2));
            res.status(404).send("Unable to delete user at this time.");
        }
        else {
            console.log("users::delete::success");
            res.status(200).send("You have been deleted from the game.");
        }
    });
});

app.post("/update", (req, res) => {
    let body=req.body;
    let params = {
        TableName: body.TableName,
        Key: {"username": body.username},
        UpdateExpression: "set phone = :phoneNum, birthday = :birthDay",
        ExpressionAttributeValues: {
            ":phoneNum": body.phoneNum,
            ":birthDay": body.birthDay
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, function (err, data) {
        if (err) {
            console.log("users::update::error - " + JSON.stringify(err, null, 2));
            res.status(404).send("Unable to update user info.");
        }
        else {
            console.log("users::update::success " + JSON.stringify(data));
            res.status(200).send(data);
        }
    });
});
*/

app.get("/StartAdventure", (req, res) => {

    if (req.session && req.session.username){
        res.render("StartAdventure");
     }
     else {
         res.redirect("/");
     }
    //res.render("StartAdventure");
});

app.get("/:weapon/:power/:luck", (req, res) => {

    if (req.session && req.session.username){
        const weap = req.params['weapon'];
        const magic = req.params['power'];
        const luck = req.params['luck'];

        let beast = beasts[0];
        let weapon = weapons.find(weapon => weapon.name == weap);
        res.render("LevelOne", {weapon, magic, luck, beast, startHealth});
     }
     else {
         res.redirect("/");
     }
    /*
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[0];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelOne", {weapon, magic, luck, beast, startHealth});
    */
});

app.get("/:weapon/:power/:luck/2", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let weapon = weapons.find(weapon => weapon.name == weap);
    let randomNum = parseInt(Math.random() * (10-1) + 1);
    res.render("LevelTwo", {weapon, magic, luck, startHealth, randomNum});
});

app.get("/:weapon/:power/:luck/3", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[1];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelThree", {weapon, magic, luck, beast, startHealth});
});

app.get("/:weapon/:power/:luck/4", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[2];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelFour", {weapon, magic, luck, beast, startHealth});
});

app.get("/:weapon/:power/:luck/5", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[3];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelFive", {weapon, magic, luck, beast, startHealth});
});

app.get("/:weapon/:power/:luck/6", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let weapon = weapons.find(weapon => weapon.name == weap);
    let randomNum = parseInt(Math.random() * (10-1) + 1);
    res.render("LevelSix", {weapon, magic, luck, startHealth, randomNum});
});

app.get("/:weapon/:power/:luck/7", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[4];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelSeven", {weapon, magic, luck, beast, startHealth});
});

app.get("/:weapon/:power/:luck/8", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[5];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelEight", {weapon, magic, luck, beast, startHealth});
});

app.get("/:weapon/:power/:luck/9", (req, res) => {
    res.render("Complete");
});