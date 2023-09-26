const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config()

/**
 * Here we set up our express application and listen to Port:5000.
 * Additionally, our `view` engine will be set to `.ejs` this is
 * simply to render the `index.ejs` file and show the data acquired.
 */
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.listen(5000, () => { console.log("Listening to on Port 5000") });

/**
 * Here we get these variables from the `.env` file, this is done
 * for extra security measures! We also set the scope which determines
 * which permission our application wil have.
 */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const scope = "user-library-read user-top-read user-read-currently-playing"

//Variables to later on grab the necessary tokens
var access_token = null;
var refresh_token = null;


//Reference: `Request User Authorization`
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
app.get('/login', async function (req, res) {

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
app.get('/redirect', async function (req, res) {

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
                    access_token = response.data.access_token;
                    refresh_token = response.data.refresh_token;

                    res.send(response.data);
                }
                // if the response is no good, we just send whatever the response is
                else {
                    res.send(response);
                }
            })
            // if there is an error, send it.
            .catch(error => {
                res.send(error);
            })
    }

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
app.get('/currPlay', async function (req, res) {
    if (access_token) {
        var data = await getCurrentlyPlaying();
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
app.get('/render', async function (req, res) {
    if (access_token) {
        var data = await getCurrentlyPlaying();
        res.render("index", data)
    }
    else {
        res.send("Please make sure you're logged in")
    }
});


// ------------------------------- FUNCTIONS -------------------------------



/**
 * Generates a random string containing numbers and letters
 * for the state variable to use in our calls
 
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


/**
 * This will be our template function to fetch all the ENDPOINTS
 * from the SpotifyAPI. All other functions will use it to
 * gather the responses from the SpotifyAPI.
 * 
 * 
 * @param {endpoint}        - This will determine which ENDPOINT from the SpotifyAPI
 *                        it will make a request to.
 * 
 * @param {method}          - Determines whether this will be a `GET` or `POST`
 * 
 * @param {access_token}    - This is the access token that we've previously
 *                         acquired when logging in and providing permissions
 * 
 * @returns {res.json()}    -sends a response with the JSON data that was 
 *                        acquired from the call to the API.
*/
async function fetchWebApi(endpoint, method, access_token, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method,
        body: JSON.stringify(body)
    });
    return await res.json();
}

/**
 * 
 * @returns {data} - This is the data retrieved from the currently-playing
 *                   ENDPOINT which includes the following:
 * 
 *                         Cover Art
 *                         Track Name
 *                         Artist Name
 *                         Time
 *              
 *                   However, if we detect that we haven't retrieved an access
 *                   token then we simply return null.
 */
async function getCurrentlyPlaying() {
    if (access_token) {
        const currPlayEndpoint = 'v1/me/player/currently-playing';
        var curr = await fetchWebApi(
            currPlayEndpoint, 'GET', access_token
        );

        /**
         * We do a `try and catch` because of the nature of this
         * code and SpotifyAPI. As of now, it seems that the `await`
         * call is not enough for the API to send a complete response.
         * 
         * For such reason, we must allow for error handling in these
         * occassions. Perhaps this can be fixed, but I don't see it as
         * a huge problem, since by using something like WebSockets or
         * any other method for bi-directional communication, there will
         * barely pass any time in which the data stays as `loading`
         * 
         * Lastly, another solution is to treat the `data` variable as a
         * state / global and only alter it when we get something. What I
         * mean, is that it will stay it's last response until we receive
         * another complete response. This could be easily implemented but
         * idk lol.
         */
        try {
            // Code to get time in M:SS format
            var milliseconds = curr.progress_ms;
            var seconds = Math.floor(milliseconds / 1000);
            var remSec = seconds % 60;
            var minutes = Math.floor(seconds / 60);
            var time = `${minutes}:${remSec.toString().padStart(2, '0')}`;


            /**
             * Here we get the artist and track names, cover art and time.
             * However, in the future we ought to be more careful when 
             * getting this data because Spotify does allow for local
             * files to be played, which could sometimes be missing
             * some of the data we've got here. 
             */
            data = {
                artist_name: curr.item.artists[0].name,
                track_name: curr.item.name,
                cover_art: curr.item.album.images[0].url,
                time: time
            }
        }
        catch (err) {
            data = {
                artist_name: "loading",
                track_name: "loading",
                cover_art: "loading",
                time: "loading"
            }
        }
        return data
    }
    return null;
}


