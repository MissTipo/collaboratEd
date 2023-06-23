import React from 'react';
import { Box, Typography, List, ListItem, Button, Avatar, Tooltip } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import MicIcon from '@mui/icons-material/Mic';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ScreenShareForm from './screenShareForm';

const VoiceCallPage = () => {
  const participants = [
    { name: 'User 1', avatar: 'https://example.com/avatar1.png' },
    { name: 'User 2', avatar: 'https://example.com/avatar2.png' },
    { name: 'User 3', avatar: 'https://example.com/avatar3.png' },
  ];

  const [isCameraOpen, setIsCameraOpen] = React.useState(false);
  const [isScreenShared, setIsScreenShared] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showScreenShareForm, setShowScreenShareForm] = React.useState(false);

  const handleCameraOpen = () => {
    setIsCameraOpen(!isCameraOpen);
  };

  const handleScreenShare = () => {
    setShowScreenShareForm(true);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleDisconnect = () => {
    // Disconnect from the voice call
    // Redirect to the channel page
    window.location.href = '/groupDashboard';
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f0f2f5',
      }}
    >
      <Box
        sx={{
          p: 2,
          width: '1200px', // Adjust the width as desired
          height: '700px', // Adjust the height as desired
          bgcolor: '#fff',
          borderRadius: 4,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="h3" mb={2}>
            Participants:
          </Typography>
          <List>
            {participants.map((participant) => (
              <ListItem
                key={participant.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#fff',
                  borderRadius: 4,
                  p: 1,
                  mb: 1,
                }}
              >
                <Avatar
                  src={participant.avatar}
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Tooltip title={participant.name} placement="right">
                  <Typography variant="body1">{participant.name}</Typography>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Tooltip title="Open Camera">
            <Button variant="contained" sx={{ mr: 2 }}>
              <VideocamIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Share Screen">
            {/**<Button variant="contained" sx={{ mr: 2 }}>**/}
            <Button variant="contained" sx={{ mr: 2 }} onClick={handleScreenShare}>
              <ScreenShareIcon />
            </Button>
            {/**{showScreenShareForm && <ScreenShareForm />}*/}
          </Tooltip>
          <Tooltip title="Mute">
            <Button variant="contained" sx={{ mr: 2 }}>
              <MicIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Disconnect">
            <Button variant="contained" color="error" onClick={handleDisconnect}>
              <CallEndIcon />
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default VoiceCallPage;

