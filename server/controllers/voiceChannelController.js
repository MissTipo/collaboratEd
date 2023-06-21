// voice channel api logic

const voiceChannel = require('../models/voiceChannel');
const VoiceChannel = require('../models/voiceChannel');
const { initiateCall } = require('../utils/webrtc');

// create voice channel
const createVoiceChannel = async (req, res) => {
  try {
    const { name, channelType } = req.body;
    const voiceChannel = await VoiceChannel.create({
      name,
      channelType,
      group: req.params.groupId,
    });
    res.status(201).json(voiceChannel);
    voiceChannel.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Join voice channel
const joinVoiceChannel = async (req, res) => {
  try {
    const { channelId, userId } = req.body;
    const channel = await voiceChannel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found!' });
    }

    // Add user to channel
    channel.participants.push(userId);
    await channel.save();

    // initiate call for the joined channel
    initiateCall(channel);

    // Emit a socket event to notify other group members that a new call has been initiated
    io.emit('userJoinedChannel', { channelId, userId });

    // return the channel
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Share screen in voice channel
const shareScreen = async (req, res) => {
  try {
    const { channelId, userId } = req.body;
    const channel = await voiceChannel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found!' });
    }

    // Check if user is a participant of the channel
    if (!channel.participants.includes(userId)) {
      return res.status(401).json({ message: 'You are not a participant of this channel!' });
    }

    // Initiate screen sharing for the channel
    initiateScreenShare(channel);

    // Emit a socket event to notify other group members that a user has started screen sharing
    io.emit('userStartedScreenShare', { channelId, userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// leave voice channel
const leaveVoiceChannel = async (req, res) => {
  try {
    const { channelId, userId } = req.body;
    const channel = await voiceChannel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found!' });
    }

    // Remove user from channel
    channel.participants = channel.participants.filter((id) => id !== userId);
    await channel.save();

    // Emit a socket event to notify other group members that a user has left the channel
    io.emit('userLeftChannel', { channelId, userId });

    // return the channel
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all voice channels
const getAllVoiceChannels = async (_, res) => {
  try {
    const voiceChannels = await VoiceChannel.find();
    res.status(200).json(voiceChannels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get voice channel by id
const getVoiceChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const voiceChannel = await VoiceChannel.findById(id);
    if (voiceChannel) {
      return res.status(200).json(voiceChannel);
    }
    res.status(404).json({ message: 'Voice channel not found!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVoiceChannel, getAllVoiceChannels, getVoiceChannelById, joinVoiceChannel, leaveVoiceChannel, shareScreen,
};
