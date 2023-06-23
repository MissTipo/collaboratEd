import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const ScreenShareForm = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('window');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleGoLive = () => {
    // Implement the logic to start screen sharing
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Share Screen
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Screen Share</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Select screen or window to stream:
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="share-option"
              name="share-option"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <FormControlLabel
                value="window"
                control={<Radio />}
                label="Window"
              />
              <FormControlLabel
                value="screen"
                control={<Radio />}
                label="Screen"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {selectedOption === 'window' && (
            <Button>
              Go Live
            </Button>
          )}
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScreenShareForm;

