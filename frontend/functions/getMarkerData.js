const axios = require('axios').default;


async function getMarkerData() {
    return axios.get(`http://{url}:5000/maps/nearbyMarkers`)
        .then(response => {
            console.log("inside getMarkerData",response.data);
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports = getMarkerData