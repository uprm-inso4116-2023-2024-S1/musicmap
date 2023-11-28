require('dotenv').config()

// Setting up mongoDB and our userModel
const db = require ('../db/conn')
const user = require('../models/user')


/**
 * This method either creates or updates a user. In the case that it's 
 * `ID` isn't in our collection, then it will create a new User, otherwise
 * it will update an existing one.
 * 
 * It aims to provide all the data in the parameters as long as it isn't `null`,
 * which is what we see being done with `currUserData`. It checks if these are
 * not null, and if such is the case, then they'll be assigned to the parameter.
 * 
 * The elements we see here are according to that seeing in our userSchema, 
 * which you can check out to further understand how these work.
 * 
 * It is also worth noting that there is an additional condition for `curr`.
 * This is in the case that an error occurrs, then we simply will not update
 * that data.
 * 
 * 
 * @param {String} ID - This is just the SpotifyID for the current user.
 *                      We use it to check if the user exists in our
 *                      collection or not.
 * 
 * 
* @param {Map} curr -  This is the currently playing data, for more 
*                     details on it you can check `getCurrentlyPlaying()`
 * 
 * 
 * @param {Map} base_artists - This is the set of `base_artists`. These 
 *                             are simply the user's favorite artists,
 *                             perhaps I should even rename it to that
 *                             since it makes more sense...
 * 
 * @param {Map} similar_artists - These are simply the related artists
 *                              to the user's `base_artists` / fav artists.
 */
async function createOrUpdateUser(username, curr, base_artists, similar_artists) {
    try {
        const curr_user = await user.findOne({ username: username });
        console.log("CURR USER :", curr_user);
        
        // if curr.artist_name === "loading", curr will not be added to user in db
        const currUserData = {
            ...(ID && { ID }),
            ...((curr && curr.artist_name !== "loading") && { curr }),
            ...(base_artists && { base_artists }),
            ...(similar_artists && { similar_artists }),
        };
    
        // Update User
        if (curr_user) {
            console.log("Updating User");
            Object.assign(curr_user.spotify, currUserData);
    
            console.log(curr_user);
            curr_user.save();
        }

        //Create New User
        else {
            console.log("Creating User")
            const newUser = new user();
    
            newUser.spotify = currUserData
            console.log(newUser);
            newUser.save();
        }
        return currUserData;
    } catch (e) {
        console.log({
            message: 'Something went wrong with DB',
            error: e
        });
    }
}

module.exports = {
    createOrUpdateUser
}