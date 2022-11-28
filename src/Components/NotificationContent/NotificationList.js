import React from 'react';
import { useDispatch } from 'react-redux';
import { notification } from '../../Redux/notificationBadgeSlice';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const NotificationList = ({ notifications }) => {
    const dispatch = useDispatch();
    const notificationLength = notifications.length;
    dispatch(notification(notificationLength));

    return (
        <div className='notification-contents'>
            {
                notifications.map(element => <>
                    {element.groupReqName &&
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <NotificationsIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText><b>{element.groupReqName}</b> wants to join your group.</ListItemText>
                        </ListItem>}

                    {element.friendReqName &&
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <NotificationsIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText><b>{element.friendReqName}</b> sent you a friend request</ListItemText>
                        </ListItem>}
                </>
                )

            }
        </div>
    )
}

export default NotificationList