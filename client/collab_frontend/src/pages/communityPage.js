import React from 'react'
import { Box, Button, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ForumIcon from '@mui/icons-material/Forum';
import Dimg1 from '../assets/DataScienceImg.png'
import Dimg2 from '../assets/DigitalMktImg.png'
import Dimg3 from '../assets/SE_Img.png'

const communityPage = () => {
  return (
    <Box p={5} >
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Typography><h1 style={{borderBottom:'2px solid'}}>Welcome To CollaboratEd Community!</h1></Typography>
        </Box>
        
        <Stack style={{justifyContent:'center', alignItems:'center'}}>

        
            <List sx={{ width:'100%'}}>
                <Typography variant='h5'>Departments</Typography>
                <Stack sx={{display:'flex', borderBottom:'2px solid', justifyContent:'space-evenly'}} direction='row'>
                    <List>
                        <ListItem sx={{display:'flex', flexDirection:'column'}}>
                            <img src={Dimg3} alt="SE "></img>
                            <ListItemText primary="Software Engineering" />
                        </ListItem>
                    </List>
                    <List >
                        <ListItem sx={{display:'flex', flexDirection:'column'}}>
                            <img src={Dimg1} alt="Computer Science"></img>
                            <ListItemText primary="Computer Science" />
                        </ListItem>
                    </List>
                    <List >
                        <ListItem sx={{display:'flex', flexDirection:'column'}}>
                            <img src={Dimg2} alt="Data Science"></img>
                            <ListItemText primary="Data Science" />
                        </ListItem>
                    </List>
                    
                    <ArrowForwardIosIcon sx={{fontSize:'large', alignSelf:'center'}}/>
                </Stack>
                <br/>
                <Divider/>
                <br/>
                <Typography variant='h5'>Peer Learning Groups</Typography>
                <Stack sx={{display:'flex', borderBottom:'2px solid', justifyContent:'space-evenly'}} direction='row'> 
                    <List >
                        <ListItem sx={{display:'flex', flexDirection:'column'}}>
                            <img src={Dimg1} alt="Computer Science"></img>
                            <ListItemText primary="Computer Science" />
                            <Button variant='contained' color='primary'>Join</Button>
                        </ListItem>
                    </List>
                    <List >
                        <ListItem sx={{display:'flex', flexDirection:'column'}}>
                            <img src={Dimg2} alt="Data Science"></img>
                            <ListItemText primary="Data Science" />
                            <Button variant='contained' color='primary'>Join</Button>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem sx={{display:'flex', flexDirection:'column'}}>
                            <img src={Dimg3} alt="Digital "></img>
                            <ListItemText primary="Digital Marketing" />
                            <Button variant='contained' color='primary'>Join</Button>
                        </ListItem>
                    </List>
                    <ArrowForwardIosIcon sx={{fontSize:'large', alignSelf:'center'}}/>
                </Stack>
                <Typography variant='h5'>Community Forum</Typography>
                <ForumIcon sx={{fontSize:'large'}}/><span>Ask questions, get answers, and engage with our large network of users.</span>
                
            </List>
        </Stack>
    </Box>
  )
}

export default communityPage