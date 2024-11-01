const mongoose = require('mongoose');

const ChargingStationSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   location: {
      type: {
         type: String,
         enum: ['Point'],
         required: true,
      },
      coordinates: {
         type: [Number],  // [longitude, latitude]
         required: true,
      },
   },
   chargerType: {
      type: String,
      enum: ['fast', 'standard', 'slow'],
      required: true,
   },
   availability: {
      type: Boolean,
      default: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

ChargingStationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('ChargingStation', ChargingStationSchema);
