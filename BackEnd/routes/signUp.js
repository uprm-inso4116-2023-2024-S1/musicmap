
const express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user.js')
var db = require('../db/conn.js')
var router = express.Router();
const encrypt = require("../tools/cryption.js");
const userExists = require("../tools/userVerificaton.js");
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


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
  
  /*
  * Function below verifies if there is a user in the database
  * with those credentials. Returns 0 if there is, 1 if there 
  * is none (New User).
  */
  let userVerification = await userExists(uname, em)
  
  if (userVerification == 0) {
    res.send("User already registered, Log In").status(200)
  }
  else{
    await newUser.save();
    res.send("New User Added").status(200)

  }
    
})


module.exports = router;
