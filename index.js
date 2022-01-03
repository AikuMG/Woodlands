const express = require("express");
const app = express();
const session = require('express-session');
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
    ]

const weapons = [
    {name: "sword", speed: 3, power: 3, damage: 6},
    {name: "axe", speed: 2, power: 5, damage: 10},
    {name: "gun", speed: 4, power: 4, damage: 8}
]

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: 'username',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.listen(port, () => {
    console.log(`Hosting game on localhost:${port}`);
})

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const session_username = req.session.username;
    res.render("index", {user: session_username});
})

app.post('/login', (req, res) => {
    const user = req.body.username;
    const validUsers = [
        {name: "aag", password: "passw0rd"},
        {name: "tp6", password: "t@l3nt"},
        {name: "sarah", password: "cAt1uvR"}
    ]

    console.log(user);

    if (validUsers.includes(user)){
        console.log(`I'm in the if statement with the user ${user}`);
        req.session.username = user;
        res.redirect("/Woodlands");
    }

    else { res.redirect("/"); }
})

app.get("/Woodlands", (req, res) => {
    res.render("Woodlands");
})

app.get("/StartAdventure", (req, res) => {
    res.render("StartAdventure");
})

app.get("/:weapon/:power/:luck", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[0];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelOne", {weapon, magic, luck, beast, startHealth});
})

app.get("/:weapon/:power/:luck/2", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let weapon = weapons.find(weapon => weapon.name == weap);
    let randomNum = parseInt(Math.random() * (10-1) + 1);
    res.render("LevelTwo", {weapon, magic, luck, startHealth, randomNum});
})

app.get("/:weapon/:power/:luck/3", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[1];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelThree", {weapon, magic, luck, beast, startHealth});
})

app.get("/:weapon/:power/:luck/4", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[2];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelFour", {weapon, magic, luck, beast, startHealth});
})

app.get("/:weapon/:power/:luck/5", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[3];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelFive", {weapon, magic, luck, beast, startHealth});
})

app.get("/:weapon/:power/:luck/6", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let weapon = weapons.find(weapon => weapon.name == weap);
    let randomNum = parseInt(Math.random() * (10-1) + 1);
    res.render("LevelSix", {weapon, magic, luck, startHealth, randomNum});
})

app.get("/:weapon/:power/:luck/7", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[4];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelSeven", {weapon, magic, luck, beast, startHealth});
})

app.get("/:weapon/:power/:luck/8", (req, res) => {
    const weap = req.params['weapon'];
    const magic = req.params['power'];
    const luck = req.params['luck'];

    let beast = beasts[5];
    let weapon = weapons.find(weapon => weapon.name == weap);

    res.render("LevelEight", {weapon, magic, luck, beast, startHealth});
})

app.get("/:weapon/:power/:luck/9", (req, res) => {
    res.render("Complete");
})