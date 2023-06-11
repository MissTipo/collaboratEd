const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  cohort: {
    type: String,
    required: true,
  },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Group', groupSchema);
