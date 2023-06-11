// schema definition for group text channels
const mongoose = require('mongoose');
const textChannelSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Group',
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

module.exports = mongoose.model('TextChannel', textChannelSchema);
