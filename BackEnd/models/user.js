const mongoose = require("mongoose");
const spotifySchema = require('./spotify')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,


    spotify : spotifySchema,

    /**
     * This is all the GeoJSON stuff. I decided
     * to copy it here instead of importing it
     * like I did with the spotifySchema so that it 
     * can be easier to manage when acquiring data.
     * 
     * so i wouldnt have to do user.pins.location.coordinates 
     * and instead do user.location.coordinates ... big difference :)
     */
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;