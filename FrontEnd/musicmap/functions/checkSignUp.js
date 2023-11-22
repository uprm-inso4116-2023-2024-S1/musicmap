const axios = require('axios').default;


async function checkSignUp(username, email, password) {
    // Using Axios for making a POST request. We're just
    // sending the location from the Front End to Back End.
    
    // Put your development server (expo server) IP Address here
    // alongside the port you're using e.g. 192.0.0.0:5000
    const response = await axios.post(`http://192.168.0.6:9000/signUp`, {
        "username": username,
        "email": email,
        "password": password
    })
    
    console.log(response.data)
    return response.data
}


module.exports = checkSignUp