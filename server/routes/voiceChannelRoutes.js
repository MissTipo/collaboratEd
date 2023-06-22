// Contains the routes for the voice channel endpoints
const express = require('express');

const router = express.Router();
const voiceChannelController = require('../controllers/voiceChannelController');

// Create a new voice channel
router.post('/create-channel', voiceChannelController.createVoiceChannel);

// Join a voice channel
router.post('/voice-channel/join', voiceChannelController.joinVoiceChannel);

// Get all voice channels
router.get('/get-channels', voiceChannelController.getAllVoiceChannels);

// Delete a voice channel
router.delete('/delete-channel/:channelName', voiceChannelController.deleteVoiceChannelByName);

// get channel id based on channel name
router.get('/get-channel-id/:channelName', voiceChannelController.getChannelIdByName);

module.exports = router;
