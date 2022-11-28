import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { getAuth } from 'firebase/auth'
import ChangeName from './ChangeName';
import ChangePass from './ChangePass';

const ProfileSettigns = () => {
    const [openRename, setOpenRename] = useState(false);
    const [openResetPass, setOpenResetPass] = useState(false);
    const handleRenameOpen = () => setOpenRename(true);
    const handleRsetPassOpen = () => setOpenResetPass(true);
    const handleCloseRename = () => setOpenRename(false);
    const handleCloseResetPass = () => setOpenResetPass(false);

    const auth = getAuth();

    return (
        <div className='profile-settigns'>
            <h5>Profile Settings</h5>
            <div className='profile-title'>
                <img className='profile-image' src={auth.currentUser.photoURL} />
                <div className='profile-name'>
                    <h3 title={auth.currentUser.displayName}>
                        {auth.currentUser.displayName.length > 20 ? auth.currentUser.displayName.slice(0, 20) + '...' : auth.currentUser.displayName}
                    </h3>
                    <p>Designation</p>
                </div>
            </div>
            <div className='psettigns-list'>
                <ul>
                    <li onClick={handleRenameOpen}>
                        <EditIcon className='icon' />
                        <p>Edit Profile Name.</p>
                    </li>
                    <li onClick={handleRsetPassOpen}>
                        <KeyIcon className='icon' />
                        <p>Reset Password.</p>
                    </li>
                    <li>
                        <ContactSupportIcon className='icon' />
                        <p>Help</p>
                    </li>
                </ul>
            </div>
            <ChangeName openRename={openRename} handleClose={handleCloseRename} />
            <ChangePass openRename={openResetPass} handleClose={handleCloseResetPass} />
        </div>
    )
}

export default ProfileSettigns