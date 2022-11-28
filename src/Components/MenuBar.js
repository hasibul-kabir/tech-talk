import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dmode } from '../Redux/dmodeSlice';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Badge from '@mui/material/Badge';

import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const MenuBar = ({ active, userName }) => {
    const [change, setChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [cropper, setCropper] = useState();
    //modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //
    const navigate = useNavigate();
    const auth = getAuth();
    const storage = getStorage();
    const dispatch = useDispatch();
    const dMode = useSelector((state) => state.dmode.value);
    const notificationLength = useSelector((state) => state.notification.value);

    //get current user data
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
            }
        });
    }, [change])
    //logout
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    //image
    const onChange = (e) => {
        // console.log(e.target.files[0]);
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    }


    const uploadImg = () => {
        const storageRef = ref(storage, auth.currentUser.uid);
        const croppedImgData = cropper.getCroppedCanvas().toDataURL();

        //firebase storage
        setLoading(true)
        uploadString(storageRef, croppedImgData, 'data_url').then((snapshot) => {
            getDownloadURL(storageRef)
                .then((url) => {
                    //firebase update profile (auth)
                    updateProfile(auth.currentUser, {
                        photoURL: url
                    }).then(() => { setChange(!change) })
                    //
                })
            //
            setLoading(false)
            setOpen(false)
            setImage(null)
            //
        });

    };


    //DARK MODE STATE CHANGE
    const handleDarkMode = () => {
        dispatch(dmode())
    }

    return (
        <>
            <div className='menu'>

                {
                    dMode ? <WbSunnyIcon style={{ 'color': 'white' }} className='mode' onClick={handleDarkMode} /> : <DarkModeIcon className='mode' onClick={handleDarkMode} />
                }
                <div className='overlay' onClick={handleOpen}><CameraAltOutlinedIcon className='upload-image' /></div>
                {
                    !auth.currentUser.photoURL ?
                        <img className='profile-pic' src="./assets/images/avatar.jpg" />
                        :
                        <img className='profile-pic' src={auth.currentUser.photoURL} />
                }
                <h6 className='userName' style={{ cursor: 'pointer' }}>{userName}</h6>
                <div className='icons'>
                    <ul>
                        <li className={active === "home" ? "active" : undefined} >
                            <Link to='/home'><HomeOutlinedIcon className='icon' /></Link>
                        </li>
                        <li className={active === "message" ? "active" : undefined}>
                            <Link to='/message'><SmsOutlinedIcon className='icon' /></Link>
                        </li>
                        <li className={active === "notification" ? "active" : undefined}>
                            <Link to='/notification'>
                                <Badge badgeContent={notificationLength} color="primary">
                                    <NotificationsOutlinedIcon className='icon' />
                                </Badge>
                            </Link>
                        </li>
                        <li className={active === "settigns" ? "active" : undefined}>
                            <Link to='/settings'><SettingsOutlinedIcon className='icon' /></Link>
                        </li>
                        <li className='logout' onClick={handleLogout}>
                            <ExitToAppOutlinedIcon className='icon' />
                        </li>
                    </ul>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-style">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Profile Picture
                    </Typography>
                    <Typography id="modal-modal-description" className='elements'>
                        {/* <img className='profile-pic img-preview' src={image} /> */}
                        {
                            !auth.currentUser.photoURL ?
                                image ?
                                    <div className="img-preview" />
                                    :
                                    <img className='profile-pic img-preview' src='./assets/images/avatar.jpg' alt='profile-pic' />

                                :

                                image ?
                                    <div className="img-preview" />
                                    :
                                    <img className='profile-pic img-preview' src={auth.currentUser.photoURL} alt='profile-pic' />

                        }

                        <div className='input'>
                            <input type="file" onChange={onChange} />
                        </div>
                        <Cropper
                            style={{ height: 300, width: 400, margin: '0 50%', transform: 'translatex(-50%)' }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            guides={true}
                        />
                        {
                            image ?

                                loading ?
                                    <button className='uploadImg'>Loading...</button>
                                    :
                                    <button className='uploadImg' onClick={uploadImg} >Upload Photo</button>

                                :

                                null
                        }
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default MenuBar