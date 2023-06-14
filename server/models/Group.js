const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  cohort: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  schedules: {
    type: Date,
    required: true,
  },
  /*location: {
    type: String,
    required: true,
  },*/
  resourceLibrary: [{
=======

  department: {
    type: String,
    required: true,
  },

  // Owner of the group
  ownerId: {
>>>>>>> c7595248997f2f23db2d0904a3a5cba60516faff
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  schedules: {
    type: Date,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  resourceLibrary: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Group', groupSchema);
