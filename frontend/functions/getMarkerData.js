const axios = require('axios').default;


async function getMarkerData() {
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