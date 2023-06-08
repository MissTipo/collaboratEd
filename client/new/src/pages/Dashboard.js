import React from 'react'
import Sidebar from "../components/dashboard/Sidebar";
import Feed from "../components/dashboard/Feed";
import Rightbar from "../components/dashboard/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
// import Navbar from "./components/Navbar";
import GNavBar from "../components/GNavBar";
import Login from "../components/user/Login";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import Add from "../components/dashboard/Add";
import { useState } from "react";
import Footer from '../components/Footer/Footer';


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
          {/* <Navbar /> */}
          <Loading />
          <Login />
          <Notification />
          <GNavBar />
          <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode}/>
            <Feed />
            <Rightbar />
          </Stack>
          <Add />
          <Footer/>
        </Box>
      </ThemeProvider>
    );
}

export default Dashboard