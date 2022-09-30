import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { getStorage, ref as sref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import moment from 'moment/moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgressWithLabel from '../ProgressSpinner'


let receive = {
    background: '#f1f1f1',
    color: '#464545;'
}
let send = {
    background: '#3d4aff',
    color: '#fff'
}
let alignLeft = {
    justifyContent: 'flex-start'
}
let alignRight = {
    justifyContent: 'flex-end'

}
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};
const modalButton = {
    marginTop: '10px',
    padding: '5px',
    border: ' none',
    borderRadius: '5px',
    background: '#5F35F5',
    fontWeight: '600',
    color: 'aliceblue',

};


const Chat = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [message, setMessage] = useState('');
    const [img, setImg] = useState();
    const [progress, setProgress] = useState();
    const [msgInfo, setMsgInfo] = useState([]);
    const user = useSelector((state) => state.activeChat.value);
    const auth = getAuth();
    const storage = getStorage();

    //SEND IMAGE
    const handleSendImg = () => {
        const storageRef = sref(storage, 'singleChatImg/' + img.name);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + Math.round(progress) + '% done');
                setProgress(Math.round(progress))

            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const db = getDatabase();
                    const date = new Date();
                    if (img != "") {
                        set(push(ref(db, 'singleMessage/')), {
                            senderId: auth.currentUser.uid,
                            senderName: auth.currentUser.displayName,
                            receiverId: user.id,
                            receiverName: user.name,
                            image: downloadURL,
                            time: new Date().toLocaleString()
                        })
                    }
                }).then(() => setOpen(false));
            }
        );
    };



    //SEND MESSAGE
    const handleSendMessage = () => {
        const db = getDatabase();
        if (message != "") {
            set(push(ref(db, 'singleMessage/')), {
                senderId: auth.currentUser.uid,
                senderName: auth.currentUser.displayName,
                receiverId: user.id,
                receiverName: user.name,
                message: message,
                time: new Date().toLocaleString()
            }).then(() => {
                setMessage('')
            })
        }
    }
    // const date = new Date();
    //  let d = date.getHours();
    // let mmnt = moment().startOf(`${date.getHours()}`).fromNow();
    // console.log(mmnt);
    //SHOW MESSAGE
    useEffect(() => {
        const db = getDatabase();
        const messageRef = ref(db, 'singleMessage/');

        onValue(messageRef, (snapshot) => {
            let msgInfo = [];
            snapshot.forEach((element) => {
                if (element.val().senderId === auth.currentUser.uid && element.val().receiverId === user.id
                    ||
                    element.val().senderId === user.id && element.val().receiverId === auth.currentUser.uid) {
                    msgInfo.push(element.val())
                }
            })
            setMsgInfo(msgInfo);
        });
    }, [user])


    return (
        <>
            {user ? (
                <div className='chat'>
                    <div className='top-part'>
                        <div className='identity'>
                            <div className='identity-img'>
                                <img src='./assets/images/profile_image.jpg' />
                                <div className='status'></div>
                            </div>
                            <div className='identity-txt'>
                                <h3>{user.name}</h3>
                                <p>Online</p>
                            </div>
                        </div>
                        <div className='sign'><MoreVertIcon /></div>
                    </div>
                    <div className='conversations'>
                        {
                            msgInfo.map((element) => (
                                element.senderId === auth.currentUser.uid ? (
                                    <div className='message' style={alignRight}>
                                        {element.message ?
                                            <p style={send} >{element.message}</p>
                                            :
                                            <img src={element.image} />
                                        }
                                        <span>{moment(element.time).fromNow()}</span>
                                    </div>
                                )
                                    :
                                    (
                                        <div className='message' style={alignLeft}>
                                            {element.message ?
                                                <p style={receive}>{element.message}</p>
                                                :
                                                <img src={element.image} />
                                            }
                                            <span>{moment(element.time).fromNow()}</span>
                                        </div>
                                    )
                            ))
                        }

                    </div>
                    <div className='bottom'>
                        <div className='msg-input'>
                            <input
                                placeholder='Send Message'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <div className='icons'>
                                <AttachFileIcon className='fileIcon' onClick={handleOpen} />
                                <EmojiEmotionsIcon className='emojiIcon' />
                            </div>
                        </div>
                        <div className='msg-btn'>
                            <button onClick={handleSendMessage} ><SendIcon className='btnIcon' /></button>
                        </div>
                    </div>
                </div>)
                :
                <div className='nochat' style={{ "height": "660px", "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                    <img style={{ "height": "400px", "width": "auto" }} src="./assets/images/noMessage.jpg" />
                </div>
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <input type='file' onChange={(e) => setImg(e.target.files[0])} />
                    <br />
                    {
                        progress < 100 &&
                        <CircularProgressWithLabel value={progress} />
                    }
                    <br />
                    <button style={modalButton} onClick={handleSendImg} >SEND</button>
                </Box>
            </Modal>
        </>
    )
}

export default Chat