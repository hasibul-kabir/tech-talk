import './menuModal.css'
import * as React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import useGroupMembers from './useGroupMembers';
import useAdmins from './useAdmins';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};


const MenuModal = ({ handleCloseMenuModal, openMenuModal }) => {
    const { members, activeGroup } = useGroupMembers();
    const { admins } = useAdmins();
    console.log("activeGroup", activeGroup);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openMenuModal}
                onClose={handleCloseMenuModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openMenuModal}>
                    <Box sx={style}>
                        <div className='contents'>
                            <div className='members-portion'>
                                <span>Members</span>
                                <div className='members'>

                                    {
                                        members.map((member) =>
                                            <div className='member' >
                                                <div className='member-img'>
                                                    <img src={member.senderPhoto} alt=""></img>
                                                </div>
                                                <div className='member-name'>
                                                    <h6>{member.senderName}</h6>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                            <div className='admin-portion'>
                                <span>Admin</span>
                                <div className='admins'>
                                    {
                                        admins.map((admin) =>
                                            <div className='member' >
                                                <div className='member-img'>
                                                    <img src="./assets/images/Ellipse 2.png" alt=""></img>
                                                </div>
                                                <div className='member-name'>
                                                    <h6>{admin.username}</h6>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default MenuModal