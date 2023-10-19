const mongoose = require('mongoose');
const Pin = require('../schemas/pinSchema');
mongoose.connect("mongodb://localhost:27017/mongooseTest")

/**
 * What we're doing here is searching for all the pins/markers that
 * are near our target location, which will be the `myLocation` const
 * seen right above this text.
 * 
 * After searching for that, we will make a `.then()` call which takes
 * the found `pins` and logs them to the console. Otherwise, we will 
 * catch an error if there happens to be one.
 * 
 * It is worth mentioning, that the distance is actually like twice
 * of what would be calculated in Google Maps with the `Measure Distance` 
 * tool. This is apparently because Google Maps accounts for a Spherical
 * Model while we are instead using a 2d-Sphere here. Just take it into
 * account I guess.
 * 
 * REFERENCE:
 *      General - https://www.mongodb.com/docs/manual/geospatial-queries/
 *      $near - https://www.mongodb.com/docs/manual/reference/operator/query/near/
 *      $geometry - https://www.mongodb.com/docs/manual/reference/operator/query/geometry/
 */
async function getMarkers(coords){
    var pins = Pin.find(
        {
            location:
            {
                $near: {
                    $geometry: { type: 'Point', coordinates: coords },
                    $maxDistance: 250
                    /* As said above, this ends up being around 500 meters */
                }
            }
        })
    return pins
}

module.exports = getMarkers