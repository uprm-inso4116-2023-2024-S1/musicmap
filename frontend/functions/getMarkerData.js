const axios = require('axios').default;


async function getMarkerData() {
    // Using Axios for making a GET request. We're just
    // getting the location from the Back End to Front End.
    
    // Put your development server (expo server) IP Address here
    // alongside the port you're using e.g. 192.0.0.0:5000
    return axios.get(`http://192.168.1.5:5000/maps/nearbyMarkers`)
        .then(response => {
            console.log("inside getMarkerData",response.data);
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports = getMarkerData