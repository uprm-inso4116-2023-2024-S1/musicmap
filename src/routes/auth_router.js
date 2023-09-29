const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config()

// functions
const { getCurrentlyPlaying } = require('./functions/spotify_functions');


// auth middleware to manage tokens
const token_middleware = (req, res, next) => {
    // check if cookie exists
    if(!req.cookies.music_map) return res.redirect('/auth/login');

    const cookie = JSON.parse(req.cookies.music_map);
    const currentTime = new Date().getTime();

    // check if cookie is expired
    if(currentTime > cookie.expiration_time) {
        console.log('Cookie expired');
        return res.redirect('/auth/refresh_token');
    }
    next();
};

router.use(token_middleware);




// all routes that need authentication fall under here.'
router.get('/', (req, res) => {
    res.send('User is authenticated. This is a protected route');
});


/**
 * @response - As a response, we send one of two things:
 * 
 *                  We either send a JSON of our `data`
 *                  variable, the same one that can be
 *                  acquired from `getCurrentlyPlaying()`
 * 
 *                  Send the user a message to log in, 
 *                  this would only occurr if the user
 *                  hasn't logged in or denied permissions
 *                  which would cause for us to not have
 *                  an access token.
 * 
 */
router.get('/currPlay', async function (req, res) {

    const cookie = JSON.parse(req.cookies.music_map);

    if (cookie.access_token) {
        var data = await getCurrentlyPlaying(cookie.access_token);
        res.json(data)
    }
    else {
        res.send("Please make sure you're logged in")
    }
});


/**
 * Similar to the last function, however, here we just make
 * a starter call for data, and then render it in our `index.ejs`
 * file.
 * 
 * If we were to not have permissions, we'd urge the
 * user to please log in :)
 */
router.get('/render', async function (req, res) {

    const cookie = JSON.parse(req.cookies.music_map);

    if (cookie.access_token) {
        var data = await getCurrentlyPlaying(cookie.access_token);
        res.render("index", data)
    }
    else {
        res.send("Please make sure you're logged in")
    }
});


module.exports = router;