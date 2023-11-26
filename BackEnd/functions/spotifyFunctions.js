const { response } = require('express');
const fetch = require('node-fetch')
const axios = require('axios')



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
 * 
 * NOTE : When there is nothing playing, we receive "EMPTY_RESPONSE"
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
     */
    try {

        if (access_token) {
            const currPlayEndpoint = 'v1/me/player/currently-playing';
            var curr = await fetchWebApi(currPlayEndpoint, 'GET', access_token);
        }

        /**
         * Here we get the artist and track names, cover art and time.
         * However, in the future we ought to be more careful when 
         * getting this data because Spotify does allow for local
         * files to be played, which could sometimes be missing
         * some of the data we've got here. 
         */
        data = {
            artist_name: curr.item.artists[0].name,
            artist_id: curr.item.artists[0].id,
            track_name: curr.item.name,
            album_name: curr.item.album.name,
            cover_art: curr.item.album.images[0].url,
        }
    }
    catch (err) {
        data = {
            artist_name: "loading",
            artist_id: "loading",
            track_name: "loading",
            album_name: "loading",
            cover_art: "loading"
        }
    }
    return data
}

/**
 *  This method acquires the Top 5 artists from a user in a `short_term`
 *  time range. This time range can be `long_term` or `medium_term` as well.
 * 
 *  I've gone with `short_term` since it provides accurate results for the 
 *  user's top artists in the past month or so. Meaning that we should be 
 *  updating this data at least monthly to provide better results
 * 
 * 
 * @returns {topArtists} - This is a dictionary that follows the format of
 *                         {artist_name : artist_id} it includes the Top 5
 *                         artists from a user.
 * 
 *  Reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
async function getTopArtists(access_token) {
    const ENDPOINT = 'v1/me/top/artists?time_range=short_term&limit=5';
    const result = await fetchWebApi(ENDPOINT, 'GET', access_token);

    const topArtists = {};
    for (index in result.items) {
        var artist_name = result.items[index].name;
        var artist_id = result.items[index].id;

        // Here we add the artists to the Dict and
        // assign their ID to their name!
        topArtists[artist_name] = artist_id;
    }
    return topArtists;
}

/**
 *  This method acquires 5 related artists for a provided artist. 
 * 
 * @param {id} - This is the id of the artist for which to search related artists.
 * 
 * @returns {similarArtists} - This is an array with 5 related artists for an artist. Each item 
 *                              in the array is the object that spotify api returns.
 * 
 * Reference: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
 */
async function getSimilarArtists(access_token, id) {
    const ENDPOINT = `v1/artists/${id}/related-artists`;
    const result = await fetchWebApi(ENDPOINT, 'GET', access_token);

    var similarArtists = [];
    for(i = 0; i < 5; i++) {
        similarArtists[i] = result.artists[i];
    }
    return similarArtists;
}

/**
 * This method gets your last played song. This might be used as a
 * safety for when there is no currently playing music, then we would
 * display the last played track for a user.
 *  
 * @returns {data} - This is a dictionary containing the following:
 *                          artist_name
 *                          track_name
 *                          album_name
 *                          cover_art
 * 
 *                    If we identify that the song is a local file, then
 *                    we'd have to modify the `cover_art` attribute.
 * 
 * Reference : https://developer.spotify.com/documentation/web-api/reference/get-recently-played
 */
async function getLastPlayed(access_token) {
    const ENDPOINT = 'v1/me/player/recently-played?limit=1';
    const result = await fetchWebApi(ENDPOINT, 'GET', access_token)

    var data = {
        artist_name: result.items[0].track.album.artists[0].name,
        track_name: result.items[0].track.name,
        album_name: result.items[0].track.album.name,
        cover_art: result.items[0].track.album.images[0].url
    }

    return data
}

/**
 * This method allows us to acquire the Spotify ID for the current user.
 * By using the `v1/me` ENDPOINT we can get user information like their
 * display name, followers, profile picture etc... but we only care about
 * the ID.
 * 
 * @returns {`user.id`} - This is simply the Spotify ID, we will be using it
 *                        to be able to work with our documents more efficiently.
 *                        Since Spotify IDs are unique, it allows for us to easily
 *                        perform CRUD operations by using this ID with `find()` to
 *                        get the User's information from our collection.
 *           
 */
async function getUserID(access_token) {
    const ENDPOINT = 'v1/me'
    const user = await fetchWebApi(ENDPOINT, 'GET', access_token)
    return user.id
}

async function getUsername(){
    const response = await axios.get(`http://localhost:9000/user`)
    return response.data
}


module.exports = {
    getCurrentlyPlaying,
    getTopArtists,
    getLastPlayed,
    getUserID,
    generateRandomString,
    getSimilarArtists,
    getUsername
}