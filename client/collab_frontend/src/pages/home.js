import React from 'react'

import { Box } from "@mui/material";
import GNavBar from "../components/Navbar/GNavBar";
import Login from "../components/user/Login";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import Footer from '../components/Footer/Footer';
import Body from '../components/Body/Body';
import { Faq } from '../components/Faq/Faq';


const Home = () => {
    return (
        <Box sx={{bgcolor:'#c4d8f59f'}}>
        
          <Loading />
          <Login />
          <Notification />
          <GNavBar />
          <Body/>
          <Faq/>
          <Footer/>
        </Box>
    );
}

export default Home