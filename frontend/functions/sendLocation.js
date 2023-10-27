const axios = require('axios').default;

/**
 * Very simple function, we're simply hitting the `.../maps/location` route
 * and posting our user location data so that it can be accessed from the 
 * backend. It will then log the response message or error if there's one.
 * 
 *  
 * @param {Number} location - User Location, this contains both the 
 *                            latitude and longitude of the user :)
 */
async function sendLocation(location) {
    // Using Axios for making a POST request. We're just
    // sending the location from the Front End to Back End.
    
    // Put your development server (expo server) IP Address here
    // alongside the port you're using e.g. 192.0.0.0:5000
    axios.post(`http://192.168.1.5:5000/maps/location`, location)
        .then(response => {
            console.log(response.data.message); // Message from the server
        })
        .catch(error => {
            console.error(error);
        });
}


module.exports = sendLocation