import React from 'react'

import Rightbar from "../components/dashboard/Rightbar";
import { Box, Stack } from "@mui/material";
import MiddleBar from '../components/dashboard/middlebar';


const Dashboard = () => {

    return ( 
        <Box>
          <Stack direction="row" spacing={2} p={5} justifyContent="space-between">
            <MiddleBar />
            <Rightbar />
          </Stack>
        </Box>
    );
}

export default Dashboard