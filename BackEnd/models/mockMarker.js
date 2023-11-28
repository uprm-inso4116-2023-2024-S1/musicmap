const mongoose = require("mongoose");

const MockMarkerSchema = new mongoose.Schema({
    username: String,

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
      },

      curr: {
        artist_name: String,
        artist_ID: String,

        track_name: String,
        album_name: String,

        cover_art: String,
        track_url : String
    }

});
MockMarkerSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('MockMarker', MockMarkerSchema);