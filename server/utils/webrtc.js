// Handle webRTC connections using simple-peer library
const wrtc = require('wrtc')
const SimplePeer = require('simple-peer')

// store all active connections
const connections = {}

// Initiate a call
function initiateCall(stream) {
  // create a new peer instance
  const peer = new SimplePeer({
    initiator: false,
    stream: stream,
    trickle: false,
    wrtc: wrtc
  })

  /*
  // listen for signal
  peer.on('signal', (signal) => {
    // Broadcast the offer signal to all connected participants
    Object.values(connections).forEach((connection) => {
      connection.send(JSON.stringify(signal));
    });
  });*/

  // Add the new connetion to the active connections
  connections[peer._id] = peer;

  // listen for data messages from other participants
  peer.on('data', (data) => {
    const message = JSON.parse(data);

    // Extract the necessary information from the message
    const { type, payload } = message;

    // Handle the message based on the type
    switch (type) {
      case 'chat':
        // Handle chat message
        const { sender, text } = payload;
        console.log(`${sender}: ${text}`);
        break;
      case 'command':
        // Handle command message
        const { command } = payload;
        console.log(`Command: ${command}`);
        break;
      default:
        // Handle unknown message
        console.log('Unknown message type: ', type);
    }
    console.log('Received data: ', data);
  });

  // listen for stream from other participants
  peer.on('stream', (stream) => {
    console.log('Received stream: ', stream);
  });

  // Remove the connection when it's closed
  peer.on('close', () => {
    delete connections[peer._id];
  });

  // Return the peer instance
  return peer;
}

module.exports = { initiateCall };
