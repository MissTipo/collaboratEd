import { Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Calendar from '../components/GroupPage/Calendar'
import Chat from '../components/GroupPage/Chat'
import Projects from '../components/GroupPage/Projects'
import Recordings from '../components/GroupPage/Recordings'
import ResourceLibrary from '../components/GroupPage/ResourceLibrary'


const GroupPage = () => {
  return (
    <Box>
        <Box sx={{display:'flex',  justifyContent:'center', alignItems:'center', bgcolor:'skyblue', height:'15%'}}> GroupPage NavBar</Box>
        <Stack direction='rows'>
            <Stack sx={{bgcolor:'skyblue', height:'100vh'}} spacing={5}>
                <Projects/>
                <ResourceLibrary/>
                <Calendar/>
                <Recordings/>
                <Chat/>
            </Stack>
        </Stack>
        
    </Box>
  )
}

export default GroupPage