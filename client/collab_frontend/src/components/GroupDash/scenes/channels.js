import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import photo from '../../../assets/dasboardImg.png';

const Channel = () => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateGroup = () => {
    // Perform actions with groupName value
    console.log('Group Name:', groupName);
    setOpen(false);
  };

  return (
    <Box>
      <div>
        <button
          style={{
            backgroundColor: 'rgba(125, 89, 87, 1)',
            color: 'white',
            borderRadius: '20px',
            padding: '10px',
            marginTop: '90px',
            marginLeft: '20px',
            position: 'absolute',
            cursor: 'pointer'
          }}
          onClick={handleOpen}
        >
          Create Channel
        </button>
        <button
          style={{
            backgroundColor: 'rgba(125, 89, 87, 1)',
            color: 'white',
            borderRadius: '25px',
            padding: '10px',
            marginTop: '90px',
            marginLeft: '160px',
            position: 'absolute',
            cursor: 'pointer',
            height: '45px',
            width: '120px'
          }}
        >
          Join Existing
        </button>
        <img src={photo} alt="" style={{ width: '50%', height: '50%' }} />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a Group</DialogTitle>
        <DialogContent>
          <TextField
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" color="primary" onClick={handleCreateGroup}>
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Channel;
