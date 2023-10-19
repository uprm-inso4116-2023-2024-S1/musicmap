
/**
 * This function is meant for manually testing the distances between the
 * user and markers nearby. It gives us an approximation of distance which
 * is quite fair that we can use to check if the `$near` query is working
 * correctly when rendering nearby markers.
 * 
 * We can see it being called for some markers on their `onPress` property.
 * What this will do is simply log the distance to your console in ft whenever
 * you click on another Pin/Maker in the Map
 * 
 * 
 * @param {Number} lat1 - User Latitude
 * @param {Number} lon1 - User Longitude
 * 
 * 
 * @param {Number} lat2 - Marker Latitude
 * @param {Number} lon2 - Marker Longitude
 * 
 * 
 * @returns - Returns the distance between the User and a Marker
 *            by using the haversine Formula.
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
    // Radius of the Earth in feet (mean value)
    const earthRadiusFeet = 20925524.9;  // feet

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    // Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance in feet
    const distanceFeet = earthRadiusFeet * c;

    console.log(distanceFeet)
    return distanceFeet;
}

module.exports = haversineDistance