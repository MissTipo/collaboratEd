// schema definition for voiceChannel
const mongoose = require('mongoose');
const voiceChannelSchema = mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  name: {
    type: String,
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  /*inviteCode: {
    type: String,
    required: true,
  },*/
  scheduledTime: {
    type: Date,
    required: false,
  },
  screenShare: {
    type: Boolean,
    default: false,
  },
  inCallMessages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    /*message: {
      type: String,
      required: true,
    },*/
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
});

module.exports = mongoose.model('VoiceChannel', voiceChannelSchema);
