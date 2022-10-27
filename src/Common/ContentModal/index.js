import React from 'react';
import Modal from "@mui/material/Modal";

const ContentModal = ({open, handleOpen, handleClose, children}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className="modal"
            style={{whiteSpace: 'pre-line'}}
        >
            {children}
        </Modal>
    );
};

export default ContentModal;