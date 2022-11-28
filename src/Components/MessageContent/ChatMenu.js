import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import GroupsIcon from '@mui/icons-material/Groups';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EditIcon from '@mui/icons-material/Edit';

import { useSelector } from 'react-redux';

const ChatMenu = ({ handleOpenMenuModal }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const activeChat = useSelector((state) => state.activeChat.value);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <MoreVertIcon
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            />
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                {
                    activeChat.status === 'groupChat' ?
                        <div>
                            <MenuItem onClick={handleOpenMenuModal}>
                                <ListItemIcon>
                                    <GroupsIcon fontSize="small" />
                                </ListItemIcon>
                                See members
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <InsertPhotoIcon fontSize="small" />
                                </ListItemIcon>
                                Change group image
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <EditIcon fontSize="small" />
                                </ListItemIcon>
                                Change group name
                            </MenuItem>
                        </div>

                        :
                        null
                }
            </Menu>


        </>
    )
}

export default ChatMenu