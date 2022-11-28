import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
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
};

const SettignsModal = (props) => {
    const { openRename, handleClose } = props.props;

    return (
        <div>
            <Modal
                keepMounted
                open={openRename}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {
                        props.children
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default SettignsModal