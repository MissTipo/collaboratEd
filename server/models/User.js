// Creating the basic User schema

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true, // this will make sure that the email is unique
  },

  phone: {
    type: Number,
    required: false,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      validate: {
        validator(groups) {
          return groups.length === new Set(groups).size;
        },
        message: 'A user cannot be in the same group twice',
      },
    },
  ],
  // this will be used to store the group ids of the groups the user belongs to

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
