var db = require('../db/conn.js')
var User = require('../models/user.js')


async function userExists(uname, em){

  // calling collection "users" from db
  let usersCollection = await db.collection("users");

  // Getting all users that could have newUser's credentials already as an array.
  let currentUsers = await usersCollection.find({username:{$in:[uname]}, email:{$in:[em]}}).toArray()

  // If there is any user with this credentials
  if (currentUsers.length != 0) {
      return 0;
  }
  else{
      return 1;
  }

}

module.exports = userExists;