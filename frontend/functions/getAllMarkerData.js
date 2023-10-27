const axios = require('axios').default;


async function getAllMarkerData() {
    return axios.get(`http://192.168.1.5:5000/maps/allMarkers`)
        .then(response => {
            console.log("inside allMarkerData",response.data);
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports = getAllMarkerData