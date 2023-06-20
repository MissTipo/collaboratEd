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

      case 'file':
        // Handle file message
        const { file } = payload;
        console.log('Received file: ', file);
        break;

      case 'screen-share':
        // Handle screen share message
        const { screenShare } = payload;
        console.log('Screen share: ', screenShare);
        break;

      case 'system':
        // Handle system message
        const { system } = payload;
        console.log('System: ', system);
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

// Initiate screen sharing
function initiateScreenShare(channel) {
  // create a new peer instance
  const screenSharingPeer = new SimplePeer({
    initiator: true,
    stream: stream,
    trickle: false,
    wrtc: wrtc
  })

  // Get the screen sharing stream using navigator.mediaDevices.getDisplayMedia
  navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then((stream) => {
    // Assign the screen sharing stream to the peer instance
    // This will trigger the 'stream' event on the other peer instance
    // which will allow the other participant to access the screen sharing stream
    // and display it in a video element
    // Note: This will not replace the camera stream
    // It will only add a new stream to the peer instance
    screenSharingPeer.addStream(stream);

    //Emit a socket event to notify the other participants that the screen sharing has started
    socket.emit('screen-sharing-started', {
      channelId: channel.channelId,
      initiator: channel.initiatorId,
      offerSignal: screenSharingPeer.signal()
    });
    /**
        // Send the screen sharing stream to each participant
        channel.participants.forEach((participantId) => {
          const ParticipantConnection = connections[participantId];
    
          // Create an offer signal using Simple Peer
          screenSharingPeer.on('signal', (offerSignal) => {
            // Send the offer signal to the participant
            ParticipantConnection.send(JSON.stringify(offerSignal));
          });
        });
    */
    // Event listener for when the screen sharing is established
    screenSharingPeer.on('connect', () => {
      console.log('scree sharing connection established');
    });

    // Event listener for when the screen sharing is closed 
    screenSharingPeer.on('close', () => {
      console.log('screen sharing connection closed');
    });
  });
}


module.exports = { initiateCall, initiateScreenShare };
