//Might or might not have to replace the db config to specify the collection...
// so it needs testing :)
var db = require('../db/conn.js')
const MockMarker = require('../models/mockMarker')



async function getAllMarkers(){
    console.log("In getAllMarkers")
    var pins = MockMarker.find({})
    return pins
}


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
    console.log("In getMarkers")
    var pins = MockMarker.find(
        {
            location:
            {
                $near: {
                    $geometry: { type: 'Point', coordinates: coords },
                    $maxDistance: 400
                    /* As said above, this ends up being around 800 meters */
                }
            }
        })
    return pins
}

module.exports = {getAllMarkers,getMarkers}