const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
   },
   price: {
      type: Number,
      required: true,
   },
   duration: {
      type: String,  // e.g., "30 minutes", "1 hour"
      required: true,
   },
   category: {
      type: String,
      enum: ['repair', 'maintenance', 'cleaning'],
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('Service', ServiceSchema);
