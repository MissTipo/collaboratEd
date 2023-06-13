import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import photo from '../../assets/dasboardImg.png'
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MiddleBar = () => {
  return (
    <Box sx={{height:'100%', paddingTop:'30px'}}>
        <Typography sx={{justifyContent:'center', paddingBottom:'20px'}}>
            <h2>Welcome back,Alan!</h2>
        </Typography>
        <div>
            <button style={{backgroundColor:'rgba(125, 89, 87, 1)', color:'white', borderRadius:'20px', padding:'10px', marginTop:'90px', marginLeft:'20px', position:'absolute', cursor:'pointer'}}>Create group <AddIcon sx={{height:'16px', width:'17px'}}/></button>
            <button style={{backgroundColor:'rgba(125, 89, 87, 1)', color:'white', borderRadius:'25px', padding:'10px', marginTop:'90px', marginLeft:'160px', position:'absolute', cursor:'pointer', height:'45px', width:'120px'}}>Join Existing</button>
            <img src={photo} alt="" style={{width:'100%', height:'100%'}}/>
        </div>
        <br></br>
        <br></br>
        <Typography>
            <h3>Recommended for you</h3>
        </Typography>
        <List sx={{bgcolor:'gray', borderRadius:'20px'}}>
            <ListItem >
                <ListItemText >
                    <Typography sx={{bgcolor:'D9D9D9', borderRadius:'20px', marginTop:'5px', paddingLeft:'10px'}}>
                    <h4 style={{marginBottom:'1px'}}>Mechanics - backend </h4>Cohort 7 
                    </Typography>
                </ListItemText>
                <ChevronRightIcon sx={{ padding:'10px', marginTop:'10px'}}/>
            </ListItem>
            <ListItem >
                <ListItemText >
                    <Typography sx={{bgcolor:'D9D9D9', borderRadius:'20px', marginTop:'5px', paddingLeft:'10px'}}>
                    <h4 style={{marginBottom:'1px'}}>Coder Slang</h4>Cohort 10
                    </Typography>
                </ListItemText>
                <ChevronRightIcon sx={{ padding:'10px', marginTop:'10px'}}/>
            </ListItem>
            <ListItem >
                <ListItemText >
                    <Typography sx={{bgcolor:'D9D9D9', borderRadius:'20px', marginTop:'5px', paddingLeft:'10px'}}>
                    <h4 style={{marginBottom:'1px'}}>Neet Coders </h4>Cohort 15
                    </Typography>
                </ListItemText>
                <ChevronRightIcon sx={{ padding:'10px', marginTop:'10px'}}/>
            </ListItem>
            <ListItem >
                <ListItemText >
                    <Typography sx={{bgcolor:'D9D9D9', borderRadius:'20px', marginTop:'5px', paddingLeft:'10px'}}>
                    <h4 style={{marginBottom:'1px'}}>Bug Busters</h4>Cohort 9
                    </Typography>
                </ListItemText>
                <ChevronRightIcon sx={{ padding:'10px', marginTop:'10px'}}/>
            </ListItem>
            <ListItem >
                <ListItemText >
                    <Typography sx={{bgcolor:'D9D9D9', borderRadius:'20px', marginTop:'5px', paddingLeft:'10px'}}>
                        <h4 style={{marginBottom:'1px'}}>Tech Paddies</h4>All Cohorts
                    </Typography>
                </ListItemText>
                <ChevronRightIcon sx={{ padding:'10px', marginTop:'10px'}}/>
            </ListItem>
        </List>        
    </Box>
  )
}

export default MiddleBar