const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
   },
   loyaltyPoints: {
      type: Number,
      default: 0,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      return next();
   }
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
