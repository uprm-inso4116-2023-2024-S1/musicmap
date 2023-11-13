var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user.js')
var db = require('../db/conn.js')
var router = express.Router();
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// GET all users
router.get('/', async (req, res, next) =>{
  let usersCollection = await db.collection("users");
  let currentUsers = await usersCollection.find({})
  .toArray();
  res.send(currentUsers).status(200);
});

// POST a new user
router.post('/', async (req, res, next) =>{
  
  var uname = req.body.username;
  var pword = req.body.password;
  var em = req.body.email;
  let usersCollection = await db.collection("users");
  let newUser = new User({username: uname,password:pword,email:em});
  let currentUsers = await usersCollection.find({username:{$in:[uname]}, email:{$in:[em]}}).toArray()
  if (currentUsers.length != 0) {
    res.send("User already registered, Log In").status(200)
  }
  else{
    await newUser.save();
    res.send("New User Added").status(200)

  }
    
})










module.exports = router;
