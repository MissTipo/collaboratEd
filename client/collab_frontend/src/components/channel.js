import React, { useState } from 'react';

const CreateChannel = () => {
  const [channelName, setChaneelName] = useState('');
  const [channelType, setChannelType] = useState(''); // public or private
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    // Use fetch() to make API request
    // Include channelName and channelType in request body
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>+</button>
      {open && (
        <form onSubmit={handleSubmit}>
          <label>
            Channel Name:
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChaneelName(e.target.value)}
            />
          </label>
          <label>
            Channel Type:
            <select
              value={channelType}
              onChange={(e) => setChannelType(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="voice">Voice</option>
            </select>
          </label>
          <button type="submit">Create Channel</button>
        </form>
      )}
    </div>
  );
};

export default CreateChannel;
