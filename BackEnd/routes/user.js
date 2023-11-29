var express = require('express');
var router = express.Router();

/**
 * We're just sending the user data back :)
 */
router.get('/', function (req, res) {
    if (req.session.user) {
        res.send(req.session.user)
        console.log("Request.Session.User :", req.session.user)
    }
    else{
        res.send(false)
    } 
})

module.exports = router