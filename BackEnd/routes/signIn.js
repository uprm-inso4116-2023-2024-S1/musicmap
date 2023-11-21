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

    console.log(verifyUser)
    res.send(verifyUser)
})

module.exports = router