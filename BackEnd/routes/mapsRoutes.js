var express = require('express');
var router = express.Router();
const {getMarkers, getAllMarkers} = require('../functions/mapsFunctions')
// need to find a better way to store this, usage of Express
// sessions would be suitable



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
 * rendering work...
 */
router.post('/location', function (req, res) {
    const locationData = req.body;


    /**
     * By grabbing only the coords, we disregard the timestamp,
     * just something to consider.
     */
    req.session.currLocation = locationData.coords
    console.log("POST Curr:", req.session.currLocation)
    res.json({ message: 'Location data received and processed' });
});


router.get('/location', function (req, res) {
    console.log("GET Curr", req.session.currLocation)
    res.json(req.session.currLocation);
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
    var currLocation = req.session.currLocation
    
    if (currLocation) {

        let latitude = currLocation.latitude;
        let longitude = currLocation.longitude;


        var coordinates = [latitude, longitude]
        var markers = await getMarkers(coordinates)

        

        console.log("markers",markers)
        var pins = markers.map((pin)=>{
            var artist_name = pin.curr.artist_name;
            var track_name = pin.curr.track_name;
            var cover = pin.curr.cover_art;
            var track_url = pin.curr.track_url;
            var [latitude, longitude] = pin.location.coordinates;

            return {artist_name, track_name, cover, track_url,latitude, longitude}
        })
        res.json(pins)

    }
    else {
        res.json({ message: 'User Location has not been provided' });
    }
});


router.get('/allMarkers', async function(req,res){
    var markers = await getAllMarkers()
    
    var pins = markers.map((pin)=>{
        var artist_name = pin.curr.artist_name;
        var track_name = pin.curr.track_name;
        var cover = pin.curr.cover_art;
        var track_url = pin.curr.track_url;
        var [latitude, longitude] = pin.location.coordinates;
        return {artist_name, track_name, cover, track_url,latitude, longitude}
    })

    res.json(pins)
});


module.exports = router