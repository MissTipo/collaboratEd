import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useValue } from '../../../context/contextProvider';
import { deleteChannel } from '../../../actions/channel';

const DeleteChannelForm = ({ channelId, channelName }) => {
  console.log('channelid', channelId);
  const { dispatch } = useValue()
  const [inviteInput, setInviteInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleInviteChange = (e) => {
    setInviteInput(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleDeleteConfirmation = () => {
    setDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
  };

  const handleDeleteChannel = () => {
    dispatch(deleteChannel(dispatch, channelId));
    // Logic to delete the channel
    // This could involve making an API call or triggering an action
    // to delete the channel from the server
    console.log('Deleting channel...');

    // Refresh the page after deleting the channel
    window.location.reload();
  };

  return (
    <Box sx={{ border: '1px solid black', padding: '1rem', maxWidth: '400px' }}>
      <h2>Channel Options: {channelName}</h2>
      <form>
        <Box sx={{ mb: '1rem' }}>
          <TextField
            label="Invite People"
            value={inviteInput}
            onChange={handleInviteChange}
            fullWidth
          />
          <Button variant="contained" color="primary" type="button">
            Invite
          </Button>
        </Box>
        <Box sx={{ mb: '1rem' }}>
          <TextField
            label="Edit Channel"
            value={editInput}
            onChange={handleEditChange}
            fullWidth
          />
          <Button variant="contained" color="primary" type="button">
            Save
          </Button>
        </Box>
        <Box sx={{ mb: '1rem' }}>
          <label>Delete Channel:</label>
          {!deleteConfirmation ? (
            <>
              <Button variant="contained" color="secondary" onClick={handleDeleteConfirmation}>
                Delete
              </Button>
              <Button variant="outlined" onClick={handleCancelDelete}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <span>Are you sure you want to delete this channel?</span>
              <Button variant="contained" color="secondary" onClick={handleDeleteChannel}>
                Confirm
              </Button>
              <Button variant="outlined" onClick={handleCancelDelete}>
                Cancel
              </Button>
            </>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default DeleteChannelForm;

