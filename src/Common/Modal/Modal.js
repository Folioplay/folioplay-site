import React from "react";
import Modal from '@mui/material/Modal';
import {modalStyle} from "./ModalStyle";
import {Box} from "@mui/material";

function CommonModal({children, open, handleClose}) {

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                {children}
            </Box>
        </Modal>
    )
}

export default CommonModal;