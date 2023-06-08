import { AppBar, Box, Button, Container, IconButton, InputBase, Toolbar, Typography } from '@mui/material'
import { Lock, Menu, Search } from '@mui/icons-material'
import React from 'react'
// import photoURL from '../mypic.jpeg'
import { useValue } from '../context/contextProvider'
import UserIcons from './user/UserIcons'

// const user = {name:'test', photoURL}

const NavBar = () => {

    const {state:{currentUser}, dispatch} = useValue();

  return (
    <AppBar position='sticky'>
        <Container maxWidth='lg'>
            <Toolbar disableGutters>
                <Box sx={{mr:1}}>
                    <IconButton size='large' color='inherit'>
                        <Menu />
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
                <Search sx={{width: '30%', backgroundColor: 'white', borderRadius: '2rem'}}><InputBase placeholder='search...'></InputBase> </Search>
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