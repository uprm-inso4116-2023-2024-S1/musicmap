var express = require('express');
var router = express.Router();


var User = require('../models/user.js')
const loginVerify = require('../functions/loginVerify.js');



router.post('/', async function (req, res) {
    const username = req.body.username
    const password = req.body.password

    /**
     * This function below allows us to verify that both
     * the username and password for the user are correct. 
     * If they are, we indicate a successful login.
     */
    var verifyUser = await loginVerify(username, password)

    /**
     * What will be returned here is either a boolean or a null.
     * In the condition that it does return a true, we will consider
     * this a successful login, however, if it's either false or null,
     * then it failed.
     * 
     * All we're doing here is returning one of those 3 possibilites. 
     * Then in the Front End, we handle this and call another set
     * of functions. Also, if the user succesfully logged in, we
     * save some data in the session.
     */
    console.log(verifyUser)
    if (verifyUser == true){
        var userData = {username : username}
        req.session.user = userData
    }

    res.send(verifyUser)


})

module.exports = router