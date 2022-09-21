import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { TextField } from '@mui/material'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const GroupList = () => {
    const [groupName, setGroupName] = useState('');
    const [groupTagline, setGroupTagline] = useState('');
    const [open, setOpen] = useState();
    const [loading, setLoading] = useState(false);
    const [groupData, setGroupData] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const auth = getAuth();
    const db = getDatabase();


    console.log(auth.currentUser);
    //fetch groups
    useEffect(() => {
        onValue(ref(db, 'groups/'), (snapshot) => {
            const arr = []
            // const data = snapshot.val();
            snapshot.forEach(element => {
                element.val().adminId != auth.currentUser.uid &&
                    arr.push({
                        groupName: element.val().groupName,
                        groupId: element.key,
                        groupTagline: element.val().groupTagline,
                        adminName: element.val().adminName,
                        adminId: element.val().adminId
                    })
            });
            setGroupData(arr)
        });
    }, [])

    //create group
    const handleCreateGroup = (e) => {
        e.preventDefault();

        setLoading(true)
        set(push(ref(db, 'groups/')), {
            groupName: groupName,
            groupTagline: groupTagline,
            adminId: auth.currentUser.uid,
            adminName: auth.currentUser.displayName
        }).then(() => {
            setGroupName('')
            setGroupTagline('')
            setOpen(false)
            setLoading(false)
        })
    }

    //Join group
    const handleGroupReq = (groupId, adminId) => {
        set(push(ref(db, 'groupRequest/')), {
            groupId: groupId,
            adminId: adminId,
            senderId: auth.currentUser.uid,
            senderName: auth.currentUser.displayName,
            senderPhoto: auth.currentUser.photoURL
        })
    }


    return (
        <>
            {/* MODAL */}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className='modal-style'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create Group
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <form className='create-group-form' onSubmit={handleCreateGroup} >
                                <TextField
                                    required
                                    id="demo-helper-text-misaligned"
                                    label="Group Name"
                                    type="text"
                                    onChange={(e) => setGroupName(e.target.value)}
                                    value={groupName}
                                />
                                <br />
                                <TextField
                                    required
                                    id="demo-helper-text-misaligned"
                                    label="Group Tagline"
                                    type="text"
                                    onChange={(e) => setGroupTagline(e.target.value)}
                                    value={groupTagline}
                                />
                                <br />
                                {
                                    loading ?
                                        <button className='create-btn'>Loading...</button>
                                        :
                                        <button className='create-btn'>Create Group</button>
                                }

                            </form>
                        </Typography>
                    </Box>
                </Modal>
            </div>
            {/* -x- */}

            <div className='group-list'>
                <div className='heading'>
                    <h2>Groups List</h2>
                    <button className='create-group-btn' onClick={handleOpen} >Create</button>
                </div>
                {
                    groupData.map((group) => (
                        <div className='box' >
                            <div className='group-img'>
                                <img src="./assets/images/Ellipse 2.png" alt=""></img>
                            </div>
                            <div className='group-name'>
                                <h3>{group.groupName}</h3>
                                <h4>{group.groupTagline}</h4>
                            </div>
                            <div className='button'>
                                <button onClick={() => handleGroupReq(group.groupId, group.adminId)} >Join</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default GroupList