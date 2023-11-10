var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user.js')
var db = require('../db/conn.js')
var router = express.Router();

// GET all users
router.get('/', async (req, res, next) =>{
  let usersCollection = await db.collection("users");
  let currentUsers = await usersCollection.find({})
  .toArray();
  res.send(currentUsers).status(200);
});

// POST a new user
router.post('/', async (req, res, next) =>{
  let usersCollection = await db.collection("users");
  let newUser = new User({username:'testUsername',password:'12345678',email:'testEmail1@gmail.com'});
  await newUser.save();
  res.send("New User Added").status(200)
})










module.exports = router;
