const express = require('express');
require('dotenv').config();
const cors = require('cors');

//const mongoose = require('mongoose');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

// Connect the user routes
app.use('/', userRoutes);
// Routes
const groupRoutes = require('./routes/groupRoutes');

app.use('/api', groupRoutes);

// Connect to voice channel routes
const voice = require('./routes/voiceChannelRoutes');
app.use('/api', voice);

/*const uri = process.env.ATLAS_URI;
const uri = process.env.ATLAS_URI === 'true' ? process.env.ATLAS_URI : 'mongodb://localhost/mytest';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established")
})*/

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);

})

// Socket.io integration

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

  socket.on('joinVoiceChannel', (channelId) => {
    console.log(`User joined voice channel ${channelId}`);
    socket.join(channelId);
  });

  // Broadcast to all other clients that a user has joined a voice channel
  socket.to(channelId).emit('userJoined', socket.id);

  // Send the list of connected users to the newly connected user
  const connectedUsers = connectedUsers(channelId);
  socket.emit('connectedUsers', connectedUsers);

  socket.on('leaveVoiceChannel', (channelId) => {
    console.log(`User left voice channel ${channelId}`);
    socket.leave(channelId);

    // Broadcast to all other clients in the channel that a user has left a voice channel
    socket.to(channelId).emit('userLeft', socket.id);
  });
});
