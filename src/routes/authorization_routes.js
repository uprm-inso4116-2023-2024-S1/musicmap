const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config()

// functions
const { generateRandomString } = require('./functions/spotify_functions');

/**
 * Here we get these variables from the `.env` file, this is done
 * for extra security measures! We also set the scope which determines
 * which permission our application wil have.
 */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const scope = "user-library-read user-top-read user-read-currently-playing"



//Reference: `Request User Authorization`
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
router.get('/', async function (req, res) {

    var state = generateRandomString(16);
    // your application requests authorization
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
        }));
});

//Reference: `Request access token`
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
router.get('/redirect', async function (req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var state = req.query.state || null;

    //Check if the state matches
    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        // Did this with axios just because, it can be 
        // done with `request` as well and it's way more readable
        axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
        })
        
        .then(response => {
            // if the response is good (200), then we get the data from it
            if (response.status === 200) {

                const access_token = response.data.access_token;
                const refresh_token = response.data.refresh_token;
                const expiration_time = new Date().getTime() + 3600000;

                const cookie = {
                    refresh_token: refresh_token,
                    access_token: access_token,
                    expiration_time: expiration_time
                };

                res.cookie('music_map', JSON.stringify(cookie), {secure: false, httpOnly: true});
                console.log("Cookie set")
                res.redirect('/');
            }
            // if the response is no good, we just send whatever the response is
            else {
                res.send(response);
            }
        })
        
        .catch(error => {
            res.send(error);
        });
    }

});

// Reference: `Refresh access token`
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
router.get('/refresh_token', async (req, res) => {

    console.log('Cookie expired. Changing tokens.');

    const cookie = JSON.parse(req.cookies.music_map);
    const url = 'https://accounts.spotify.com/api/token';
    const headers = { 
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    };
    
    // api call to refresh token
    axios({
        method: 'post',
        url: url,
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: cookie.refresh_token
        }),
        headers: headers,
    })

    .then(response => {
        if(response.status == 200) {

            const expiration_time = new Date().getTime() + 3600000;

            const newCookie = {
                ...cookie,
                access_token: response.data.access_token,
                expiration_time: expiration_time
            }

            res.cookie('music_map', JSON.stringify(newCookie), {secure: false, httpOnly: true});
            return res.redirect(req.get('referer') || '/');
        }
    })
    
    .catch(error => {
        res.send(error);
    });
});



module.exports = router;