import React from 'react';
import { joinVoiceChannel } from '../../../actions/channel';

const ChannelList = ({ channels }) => {
  if (!channels || channels.length === 0) return null;

  // handle join channel
  const handleJoinChannel = async (channelId) => {
    try {
      // Make API call to join channel
      const response = await joinVoiceChannel(channelId);
      // Handle success
      console.log('Joined channel successfully', response);
    } catch (error) {
      // Handle error
      console.log('Error joining channel', error);
    }
  };

  return (
    <div>
      {channels.map((channel) => (
        <div key={channel._id}>
          <h3>{channel.name}</h3>
          {/* Render other channel details as needed */}
          <button onClick={() => handleJoinChannel(channel._id)}>Join Voice</button>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;

