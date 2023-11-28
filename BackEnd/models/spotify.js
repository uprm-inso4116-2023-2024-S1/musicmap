const mongoose = require("mongoose")


const spotifySchema = new mongoose.Schema({
    /**
     * The two elements below are simply dictionaries, or JavaScript Maps.
     * These will follow the format : `{artist_name: artist_id}`.
     * 
     * Reference : https://mongoosejs.com/docs/schematypes.html#maps
     */
    base_artists: {
        type: Map,
        of: String,
        default: {}
    },
    similar_artists: {
        type: Map,
        of: String,
        default: {}
    },

    /**
     * This contains all of the relevant information for the 
     * currently playing track.
     * 
     * It is important to consider that this information could be 
     * constantly changing, which is why we've nested it apart.
     */
    curr: {
        artist_name: String,
        artist_ID: String,

        track_name: String,
        album_name: String,

        cover_art: String,
        track_url : String
    }

})


// Model Reference : https://mongoosejs.com/docs/models.html
module.exports = spotifySchema