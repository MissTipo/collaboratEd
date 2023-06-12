// Creating the basic User schema

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
    required: [true, 'Please provide an email'],
    unique: true, // this will make sure that the email is unique
  },

  phone: {
    type: Number,
    required: false,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    select: false, // this will make sure that the password is not sent in the response
  },

  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
  // this will be used to store the group ids of the groups the user belongs to

  cohorts: {
    type: String,
    required: false,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
