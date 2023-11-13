
var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user.js')
var db = require('../db/conn.js')
var bodyParser = require('body-parser');
var router = express.Router();
const app = express();
const encrypt = require("../tools/encryptionTools.js");

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
  
  // Getting credentials from request body
  var uname = req.body.username;
  var pword = req.body.password;
  var em = req.body.email;

  // Password encryption
  var encryptedPassword= await encrypt(pword)
  
  // New user using model instance
  let newUser = new User({username: uname,password: encryptedPassword,email:em});
  
  // calling collection "users" from db
  let usersCollection = await db.collection("users");

  // Getting all users that could have newUser's credentials already as an array.
  let currentUsers = await usersCollection.find({username:{$in:[uname]}, email:{$in:[em]}}).toArray()

  // If there is any user with this credentials
  if (currentUsers.length != 0) {
    res.send("User already registered, Log In").status(200)
  }
  else{
    await newUser.save();
    res.send("New User Added").status(200)

  }
    
})










module.exports = router;
