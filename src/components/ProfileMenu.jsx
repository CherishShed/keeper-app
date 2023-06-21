import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function ProfileMenu(props) {
    const [anchorEl, setAnchorEl] = useState(props.anchorEl);
    const open = Boolean(props.anchorEl);
    useEffect(() => {
        setAnchorEl(props.anchorEl)
    }, [props.anchorEl])
    return (
        <Menu
            anchorEl={props.anchorEl}
            id="account-menu"
            open={open}
            onClose={props.handleClose}
            onClick={props.handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={props.handleClose}>
                {props.username}
            </MenuItem>
            <MenuItem onClick={props.handleClose}>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={(e) => {
                localStorage.setItem("token", "")
                window.location.pathname = "/login"
            }}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>

    )
}

export default ProfileMenu;