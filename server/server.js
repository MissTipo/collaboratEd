const express = require('express');
require('dotenv').config();
const cors = require('cors');

// const mongoose = require('mongoose');
// const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());

// Handle preflight requests
app.options('*', cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

// Connect the user routes
app.use('/api', userRoutes);
// Routes
const groupRoutes = require('./routes/groupRoutes');

app.use('/api', groupRoutes);

// Channel routes
const channel = require('./routes/voiceChannelRoutes');

app.use('/api', channel);

// const uri = process.env.ATLAS_URI;

// mongoose.connect(uri);
// const connection = mongoose.connection;
// connection.once('open', () => {
// console.log("MongoDB database connection established")
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Socket.io integration

/**
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('forum message', (message) => {
    console.log(`Recieved message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit('forum message', message)
  });
});

*/
