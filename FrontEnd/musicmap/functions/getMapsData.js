const axios = require('axios').default;

var url = "192.168.0.6"

async function getMarkerData() {
    return axios.get(`http://192.168.0.6:9000/maps/nearbyMarkers`)
        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}


async function getAllMarkerData() {
    return axios.get(`http://192.168.0.6:9000/maps/allMarkers`)
        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports ={ getMarkerData,getAllMarkerData}