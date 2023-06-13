import React from 'react'
import Sidebar from "../components/dashboard/Sidebar";
// import Feed from "../components/dashboard/Feed";
import Rightbar from "../components/dashboard/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
// import Add from "../components/dashboard/Add";
import { useState } from "react";
// import Footer from '../components/Footer/Footer';
import MiddleBar from '../components/dashboard/middlebar';


const Dashboard = () => {
    const [mode, setMode] = useState("light");

    const darkTheme = createTheme({
      palette: {
        mode: mode,
      },
    });
    return (
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode}/>
            <MiddleBar />
            <Rightbar />
          </Stack>
          {/* <Add /> */}
          {/* <Footer/> */}
        </Box>
      </ThemeProvider>
    );
}

export default Dashboard