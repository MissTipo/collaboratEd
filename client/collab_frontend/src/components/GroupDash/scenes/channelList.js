import React from 'react';

const ChannelList = ({ channels }) => {
  if (!channels || channels.length === 0) return null;
  return (
    <div>
      {channels.map((channel) => (
        <div key={channel._id}>
          <h3>{channel.name}</h3>
          {/* Render other channel details as needed */}
        </div>
      ))}
    </div>
  );
};

export default ChannelList;

