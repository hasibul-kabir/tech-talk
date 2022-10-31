import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { Box, Modal, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};
const MyGroups = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [groupData, setGroupData] = useState([]);
    const [requests, setRequests] = useState([]);
    const db = getDatabase();
    const auth = getAuth();

    //Fetch my created groups
    useEffect(() => {
        onValue(ref(db, 'groups/'), (snapshot) => {
            const arr = []
            // const data = snapshot.val();
            snapshot.forEach(element => {
                element.val().adminId == auth.currentUser.uid &&
                    arr.push({
                        groupName: element.val().groupName,
                        groupTagline: element.val().groupTagline,
                        adminName: element.val().adminName,
                        groupId: element.key
                    })
                setGroupData(arr)
            });
        });

    }, [])

    //Fetch group requests
    // useEffect(() => {
    //     onValue(ref(db, 'groupRequest/'), (snapshot) => {
    //         const arr = []
    //         snapshot.forEach((request) => {
    //             arr.push({
    //                 groupId: request.val().groupId,
    //                 adminId: request.val().adminId,
    //                 senderId: request.val().senderId,
    //                 senderName: request.val().senderName,
    //                 senderPhoto: request.val().senderPhoto,
    //                 key: request.key
    //             })
    //         })
    //         setRequests(arr)
    //     });
    // }, [])

    const handleOpen = (props) => {
        setOpen(true);
        onValue(ref(db, 'groupRequest/'), (snapshot) => {
            const arr = []
            snapshot.forEach((request) => {
                if (props.groupId === request.val().groupId) {
                    arr.push({
                        groupId: request.val().groupId,
                        adminId: request.val().adminId,
                        senderId: request.val().senderId,
                        senderName: request.val().senderName,
                        senderPhoto: request.val().senderPhoto,
                        key: request.key
                    })
                }
            })
            setRequests(arr)
        });
    };


    // Accept Join Request
    const handleAcceptGroupMem = (groupMember) => {
        set(push(ref(db, 'groupMember/')), { ...groupMember })
            .then(remove(ref(db, 'groupRequest/' + groupMember.key)))
    }
    //Delete group Request
    const rejectJoinReq = (reqKey) => {
        remove(ref(db, 'groupRequest/' + reqKey))
    }


    return (
        <>
            <div className='my-groups'>
                <h2>My Groups</h2>
                {
                    groupData.map((element) => (
                        <div className='box' >
                            <div className='group-img'>
                                <img src="./assets/images/Ellipse 2.png" alt=""></img>
                            </div>
                            <div className='group-name'>
                                <h3>{element.groupName}</h3>
                                <h4>{element.groupTagline}</h4>
                            </div>
                            <div className='info' >
                                <button onClick={() => handleOpen(element)}>Info</button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h4>Requests</h4>
                    <List sx={{ width: '100%', maxHeight: 200, maxWidth: 360, bgcolor: 'background.paper', overflowX: 'hidden' }}>
                        {
                            requests.length !== 0 ?
                                requests.map((request) => (
                                    <div
                                        className='item'
                                        style={{ borderBottom: '2px solid #c5c5c5', paddingBottom: '5px' }}
                                        key={Math.round(Math.random() * 10000)}
                                    >
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={request.senderPhoto} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={request.senderName}
                                                secondary={
                                                    <React.Fragment>

                                                        {" — I want to be in your group"}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <div className='btn-group' style={{ marginLeft: '15px' }}>
                                            <button onClick={() => handleAcceptGroupMem(request)}>Accept</button>
                                            <button
                                                style={{ marginLeft: '15px', background: '#ED1B24' }}
                                                onClick={() => rejectJoinReq(request.key)}
                                            >Reject</button>
                                        </div>
                                    </div>
                                ))
                                :
                                <p>No Available Request</p>
                        }
                    </List>
                </Box>
            </Modal>
        </>
    )
}

export default MyGroups