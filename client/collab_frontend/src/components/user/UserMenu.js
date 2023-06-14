


import { Menu } from '@mui/base'
import { ListItemIcon, MenuItem } from '@mui/material'
import { Logout, Settings } from '@mui/icons-material'
import { useValue } from '../../context/contextProvider'
import React from 'react'

const UserMenu = ({anchorUserMenu, setAnchorUserMenu}) => {
    const{dispatch} = useValue() 
    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null)
    }

  return (
    <Menu
    anchorEl={anchorUserMenu}
    open={Boolean(anchorUserMenu)}
    onClose={()=> setAnchorUserMenu(null)}
    onClick= {handleCloseUserMenu}
    >
        <MenuItem>
            <ListItemIcon>
                <Settings fontSize='small' />
            </ListItemIcon>
            Profile
        </MenuItem>
        <MenuItem onClick={()=>dispatch({type:'UPDATE_USER', payload:null})}>
            <ListItemIcon>
                <Logout fontSize='small' />
            </ListItemIcon>
            Logout
        </MenuItem>

    </Menu>
  )
}

export default UserMenu