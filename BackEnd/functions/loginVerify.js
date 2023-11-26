const db = require('../db/conn.js')
const verify = require('../tools/verify.js')
const User = require('../models/user.js')


/**
 * @param {String} username : This is simply the username that 
 * was given in the Login page. It's a simple string, currently
 * it has no specific limitations or restrictions.
 * 
 * 
 * @param {String} password : This is the unhashed password which
 * is given as an input in the Login page.
 * 
 * In this function we will first be checking if the User Exists.
 * If not, we return `null`. However, if the user DOES exist, we 
 * will then proceed to check if the password they've provided is 
 * valid. Then, given if the password is valid or not, we will
 * return `true` or `false`
 * 
 * @returns : true , [false or null]
 */
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


module.exports = loginVerify