const mongoose = require('mongoose');
const Pin = require('../schemas/pinSchema');
mongoose.connect("mongodb://localhost:27017/mongooseTest")


async function getAllMarkers(){
    var pins = Pin.find({})
    return pins
}

module.exports = getAllMarkers