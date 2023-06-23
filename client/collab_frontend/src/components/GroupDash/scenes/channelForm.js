import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/system';
import { createChannel } from '../../../actions/channel';
import { fetchChannels } from '../../../actions/channel';
import { useValue } from '../../../context/contextProvider';
//import ChannelList from './channelList';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
  margin: '0 auto',
  border: '1px solid #ccc',
  padding: '1rem',
  borderRadius: '5px',
});

const ChannelForm = () => {
  const {
    dispatch,
  } = useValue();
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState('text');
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetchChannels(dispatch).then((data) => {
      if (data) {
        setChannels(data);
      }
    });
  }, [dispatch]);

  const handleChannelNameChange = (event) => {
    setChannelName(event.target.value);
  };

  const handleChannelTypeChange = (event) => {
    setChannelType(event.target.value);
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const channel = {
        name: channelName,
        channelType: channelType,
      }
      await createChannel(dispatch, channel);
      const updatedChannels = await fetchChannels(dispatch);
      setChannels(updatedChannels);

      // Reset form values
      setChannelName('');
      setChannelType('text');
      navigate('/groupdashboard')
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Reset form values
    setChannelName('');
    setChannelType('text');
  };

  return (
    <>
      <FormContainer onSubmit={handleFormSubmit}>
        <TextField
          label="Channel Name"
          value={channelName}
          onChange={handleChannelNameChange}
          variant="outlined"
        />
        <FormControl variant="outlined">
          <InputLabel id="channel-type-label">Channel Type</InputLabel>
          <Select
            labelId="channel-type-label"
            value={channelType}
            onChange={handleChannelTypeChange}
            label="Channel Type"
          >
            <MenuItem value="text">Text Channel</MenuItem>
            <MenuItem value="voice">Voice Channel</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" type="submit" sx={{ minWidth: '120px' }}>
            Create Channel
          </Button>
          <Button variant="outlined" onClick={handleCancel} sx={{ minWidth: '80px' }}>
            Cancel
          </Button>
        </Box>
      </FormContainer>
      {/*<ChannelList channels={channels} />*/}
    </>
  );
};

export default ChannelForm;

