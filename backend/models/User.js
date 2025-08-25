const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    // password is not required for Google users
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    default: 'student'
  },
  googleId: {
    type: String,
    // Not required for non-Google users
  },
  avatar: {
    type: String,
    // Optional: store Google profile picture
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);