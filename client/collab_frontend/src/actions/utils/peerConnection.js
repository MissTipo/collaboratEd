import SimplePeer from 'simple-peer';

export const initiateCall = (channel) => {
  const { channelId, userId } = channel;

  // Create a new SimplePeer instance
  const peer = new SimplePeer({ initiator: true });

  // Listen for the 'signal' event to get the offer
  peer.on('signal', (offer) => {
    // Send the offer to the server
    sendOfferToServer(offer, channelId, userId);
  });

  // Listen for the 'connect' event to handle successful connection
  peer.on('connect', () => {
    console.log('Peer connection established');
  });

  // Listen for the 'data' event to handle incoming data
  peer.on('data', (data) => {
    console.log('Received data:', data);
    // Handle incoming data as needed
  });

  // Function to handle ICE candidates
  function handleICECandidate(candidate) {
    // Send the ICE candidate to the server
    sendICECandidateToServer(candidate, channelId, userId);
  }

  // Listen for the 'iceCandidate' event to handle ICE candidates
  peer.on('iceCandidate', handleICECandidate);

  // Function to send the offer to the server
  function sendOfferToServer(offer, channelId, userId) {
    // Send the offer to the server using an API request
    // You will need to implement this function based on your server-side logic
    // Example: axios.post(`${url}/send-offer`, { offer, channelId, userId });
  }

  // Function to send ICE candidates to the server
  function sendICECandidateToServer(candidate, channelId, userId) {
    // Send the ICE candidate to the server using an API request
    // You will need to implement this function based on your server-side logic
    // Example: axios.post(`${url}/send-ice-candidate`, { candidate, channelId, userId });
  }
};

