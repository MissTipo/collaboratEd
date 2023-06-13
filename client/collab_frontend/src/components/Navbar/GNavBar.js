import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import { Lock } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom';
import { useValue } from '../../context/contextProvider'
import UserIcons from '../user/UserIcons'
import './Header.css';

const NavBar = () => {

    const {state:{currentUser}, dispatch} = useValue();

  return (
    <AppBar position='sticky'>
        <Container maxWidth='lg'>
            <Toolbar disableGutters>
                <Box sx={{mr:1}}>
                    <IconButton size='large' color='inherit'>
                        {/* <Menu /> */}
                    </IconButton>
                </Box>
                <Typography
                variant='h6'
                component='h1'
                noWrap
                sx={{flexGrow:1, display:{xs:'none', md:'flex'}}}
                >
                    Collaborative Education
                </Typography>
                <Typography
                variant='h6'
                component='h1'
                noWrap
                sx={{flexGrow:1, display:{xs:'flex', md:'none'}}}
                >
                    CollaboratEd
                </Typography>
                <div className="center">
                <nav>
                    <ul>
                        <li><Link to='/how' style={{ textDecoration: 'none', color: 'white' }}>How it works</Link></li>
                        <li><Link to='/community'style={{ textDecoration: 'none', color: 'white' }}>Community</Link></li>
                        <li><Link to='/dashboard' style={{ textDecoration: 'none', color: 'white' }}>Dashboard</Link></li>
                    </ul>
                </nav>
                </div>
             
                <Box sx={{flexGrow:1}} />
                
                {!currentUser ? (<Button color="inherit" startIcon={<Lock />} onClick={()=> dispatch({type:'OPEN_LOGIN',})}>
                    Login
                </Button>) :  (
                    <UserIcons />
                )}
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default NavBar