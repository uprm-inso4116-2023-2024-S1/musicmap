/**
 * You'll only need to use a `next` option if you don't handle it 
 * with a response. For the most part, you're going to handle your
 * request with the response.
 * 
 * Nonetheless, it's important to remember that you can only send
 * one response regardless.
 */


/**
 * I guess that to get User Data we might want to use Route Parameters.
 * For example, something like:
 * 
 * app.get('/user/:id') - Would return the user with that id. 
 * 
 * The other possibility I thought of, was saving the `curr_user` in the
 * session and then using that when making such calls, so that the Front End
 * would only have to fetch('/user') instead of somehow getting their ID and
 * sending it to the Backend...
 * 
 * Have to think of this as I go I guess, neither of them make much sense
 * to me at the moment, since idk how the Front End would get the User ID,
 * I guess the Back End would already need to have that data and well, that
 * is the purpose of sessions. That's what we did for the Flask Project.
 */


/**
 * Tip to Self:
 * 
 *      Don't read ``` app.get() ``` as Express making a `GET` request,
 *      but instead read it as Express handling a `GET` request received
 *      from the client (dunno if this would be correct term) visiting the url.
 * 
 *      For example, if we had ```app.get() , app.post()``` for the same route,
 *      we could read this as ```if request.method == `GET` ```  or `POST`.
 *      
 *      That is, we're handling both types of requests with Express :)
 */
const { Router } = require('express')
const router = Router();
const getMarkers = require('../functions/getMarkers')
var currLocation = null;



/**
 * Here, we will be getting the user location from the Front End.
 * This location will later be used to determine which pins are nearby
 * 
 * I think in the future this will might be changed, since all the relevant
 * data MIGHT be stored in the User Profile, including the Spotify stuff.
 * 
 * {"coords": 
 *      {"accuracy": 35,
 *       "altitude": 67.09700012207031,
 *       "altitudeAccuracy": 28.053678512573242,
 *       "heading": -1,
 *       "latitude": 18.367655043433047, "longitude": -67.06515555975436,
 *       "speed": -1}, 
 * "timestamp": 1697732383452.882}
 * 
 * This is a sample of how the location looks when returned from `expo-location`.
 * What we will be using is only an array containing [lat,lon]. This is because
 * that's really all we need for the `getMarkers()` function and for all the
 * rendering work... the rest of the of the information, aside from `timestamp`
 * maybe, is mostly unimportant to us.
 * 
 * I guess this and other routes also lack error handling, I'll leave that as a 
 * task then. Reference : https://bluemoji.io/emoji/pointing-and-laughing-in-tears
 */
router.post('/location', function (req, res) {
    const locationData = req.body;


    /**
     * By grabbing only the coords, we disregard the timestamp,
     * just something to consider.
     */
    currLocation = locationData.coords
    console.log("POST Curr:", currLocation)
    res.json({ message: 'Location data received and processed' });
});


router.get('/location', function (req, res) {
    console.log("GET Curr", currLocation)
    res.json(currLocation);
});

/**
 * In this call, we will be returning a list of all the nearby markers.
 * For this we can use the `getMarker` function that we've imported.
 * 
 * Given that getMarkers is an async function (uses mongoose), 
 * we must make this an async function as well and await
 * when calling getMarkers.
 */
router.get('/nearbyMarkers', async function (req, res) {

    if (currLocation) {

        let latitude = currLocation.latitude;
        let longitude = currLocation.longitude;


        var coordinates = [latitude, longitude]
        var markers = await getMarkers(coordinates)

        

        console.log(markers)
        var pins = markers.map((pin)=>{
            var [latitude, longitude] = pin.location.coordinates;
            return {latitude, longitude}
        })
        res.json(pins)

    }
    else {
        res.json({ message: 'User Location has not been provided' });
    }
});


module.exports = router