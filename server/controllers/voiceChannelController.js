// voice channel api logic

const voiceChannel = require('../models/voiceChannel');
const VoiceChannel = require('../models/voiceChannel');
const { initiateCall } = require('../utils/webrtc');

// create voice channel
const createVoiceChannel = async (req, res) => {
  try {
    const voiceChannel = await VoiceChannel.create(req.body);
    res.status(201).json(voiceChannel);
    voiceChannel.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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
}

// get all voice channels
const getAllVoiceChannels = async (_, res) => {
  try {
    const voiceChannels = await VoiceChannel.find();
    res.status(200).json(voiceChannels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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
}

module.exports = { createVoiceChannel, getAllVoiceChannels, getVoiceChannelById, joinVoiceChannel };
