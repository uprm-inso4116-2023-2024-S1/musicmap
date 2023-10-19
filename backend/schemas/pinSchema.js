const mongoose = require("mongoose")

const pinSchema = new mongoose.Schema({
    name: String,
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

pinSchema.index({ location: '2dsphere' });
module.exports = mongoose.model("Pin", pinSchema)