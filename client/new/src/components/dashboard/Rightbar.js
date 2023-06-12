import {
    Box,
    Typography,
  } from "@mui/material";

import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

  
  const Rightbar = () => {
    return (
      <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed" width={300}>
          <Typography variant="h7" fontWeight={"Bold"}>
            Achievements
          </Typography>
          
          <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
            Latest Projects
          </Typography>

          <Typography variant="h6" fontWeight={100} mt={2}>
            Upcoming meetings
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
      
        </Box>
      </Box>
    );
  };
  
  export default Rightbar;