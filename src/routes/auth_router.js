const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config()


// functions
const { getCurrentlyPlaying,
    getLastPlayed,
    getSimilarArtists,
    getTopArtists,
    getUserID,
} = require('./functions/spotify_functions');

const { createOrUpdateUser } = require('./functions/db_functions');






// auth middleware to manage tokens
const token_middleware = (req, res, next) => {
    // check if cookie exists
    if (!req.cookies.music_map) return res.redirect('/auth/login');

    const cookie = JSON.parse(req.cookies.music_map);
    const currentTime = new Date().getTime();

    // check if cookie is expired
    if (currentTime > cookie.expiration_time) {
        console.log('Token expired');
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
 *           Update:
 *                 `/currPlay` now also saves the acquired
 *                  information to the current user. By 
 *                  calling the `createOrUpdateUser()`
 *                  method, it passes the acquired data
 *                  which is then saved to the curr user
 *                  and then saved to the Users Collection.
 */
router.get('/currPlay', async function (req, res) {

    const cookie = JSON.parse(req.cookies.music_map);

    if (cookie.access_token) {
        var user_id = await getUserID(cookie.access_token)
        var data = await getCurrentlyPlaying(cookie.access_token);
        createOrUpdateUser(user_id, data, null, null);
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


// Get the top artists
router.get('/getTopArtists', async (req, res) => {
    const cookie = JSON.parse(req.cookies.music_map);

    if (cookie.access_token) {
        const data = await getTopArtists(cookie.access_token);
        res.json(data);
    }
    else {
        res.send("Please make sure you're logged in")
    }
});

// Get the similar artists
router.get('/getSimilarArtists', async (req, res) => {
    const cookie = JSON.parse(req.cookies.music_map);

    if (cookie.access_token) {
        const topArtists = await getTopArtists(cookie.access_token);
        const similarArtists = {};

        for (const artist in topArtists) {
            const id = topArtists[artist];
            const similar = await getSimilarArtists(cookie.access_token, id);
            similarArtists[artist] = similar;
        }

        res.json(similarArtists);
    }
    else {
        res.send("Please make sure you're logged in")
    }
});

// update user with based artists and related artists
router.get('/updateUser', async (req, res) => {
    const cookie = JSON.parse(req.cookies.music_map);

    if (cookie.access_token) {
        // get all the necesary information to update user
        const userId = await getUserID(cookie.access_token);
        const curr = await getCurrentlyPlaying(cookie.access_token);
        const baseArtists = await getTopArtists(cookie.access_token);
        const similarArtists = {};

        for(artist in baseArtists) {
            const similarArtistsList =  await getSimilarArtists(cookie.access_token, baseArtists[artist]);
            for(index in similarArtistsList) {
                similarArtists[similarArtistsList[index].name] = similarArtistsList[index].id;
            }
        }

        // store on db
        try {
            const user = await createOrUpdateUser(userId, curr, baseArtists, similarArtists);
            res.json({
                message: 'Everything is fine!',
                db_item: user
            })
        } catch(e) {
            res.json({
                message: 'Everything is not fine!',
                error: e
            })
        }
    }
    else {
        res.send("Please make sure you're logged in")
    }
});

module.exports = router;