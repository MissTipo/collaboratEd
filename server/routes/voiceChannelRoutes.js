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

module.exports = router;
