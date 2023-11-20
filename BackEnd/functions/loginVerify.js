const db = require('../db/conn.js')
const verify = require('../tools/verify.js')
const User = require('../models/user.js')



async function loginVerify(username, password){

    var existingUser = await User.findOne({username:username})
    
    // if the user does exist, we have to check if the password is right
    if(existingUser){
        var hashed_password = existingUser.password;
        var success = await verify(password, hashed_password)

        console.log("Success :",success)
        return success
    }

    return null
}


module.exports = loginVerify;