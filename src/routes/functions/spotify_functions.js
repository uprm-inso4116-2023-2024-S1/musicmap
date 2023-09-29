const { response } = require('express');
const fetch = require('node-fetch')
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
        method
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
async function getCurrentlyPlaying(access_token) {

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
            
            if (access_token) {
                const currPlayEndpoint = 'v1/me/player/currently-playing';
                var curr = await fetchWebApi(currPlayEndpoint, 'GET', access_token);
            }

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
                time: "loading",
                error: err
            }
        }
        return data
    return null;
}



module.exports = {
    getCurrentlyPlaying,
    generateRandomString
}