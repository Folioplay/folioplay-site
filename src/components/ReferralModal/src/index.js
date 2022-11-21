import React, {useEffect, useState} from 'react';
import ContentModal from "../../../Common/ContentModal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, TextField} from "@mui/material";
import {referralCodePost} from "../../../APIS/apis";
import {useDispatch, useSelector} from "react-redux";
import {closeReferralModal} from "../../../Redux/LeaderBoard/LeaderBoardSlice";
import Modal from "@mui/material/Modal";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ReferralModal = () => {

    const dispatch = useDispatch();
    const [snackOpen, setSnackOpen] = React.useState(false);
    const openReferralRedux = useSelector((state) => state.LeaderBoardSlice.referralModal)

    const snackHandleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackOpen(false);
    };

    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverityType, setSnackSeverityType] = useState("");

    // const [open, setOpen] = useState(
    //     localStorage.getItem("user_referral") === "null"
    // );
    const handleClose = () => {
        dispatch(closeReferralModal());
        // setOpen(false);
    };
    const handleOpen = () => {
        // setOpen(true);
        dispatch(openReferralRedux);
    }
    const referralExists = localStorage.getItem("user_referral");

    const [referral, setReferral] = useState("");
    useEffect(() => {
        if (referralExists !== "null") {
            setReferral(localStorage.getItem("user_referral"));
        }
    }, []);
    const referralModalOpen = useSelector(state => state.LeaderBoardSlice.referralModal);

    return (
        <div>
            <Modal
                open={referralModalOpen}
                onClose={handleClose}
                className="modal"
                style={{whiteSpace: 'pre-line'}}
            >
                <Box sx={style}>
                    <div className="referralModal__content">
                        <div className="referralModal__modalHeading">
                            <Typography
                                className="referralHeader"
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Enter the referral code below
                            </Typography>
                        </div>
                        <div className="referralModal__inputBox">
                            <TextField
                                className="referralModal__modalText"
                                id="outlined-basic"
                                label="Referral Code"
                                variant="outlined"
                                onChange={(e) => setReferral(e.target.value)}
                            />
                            <Button
                                className="referralModal__modalButton"
                                variant={"contained"}
                                onClick={async () => {
                                    const referralResponse = await referralCodePost(referral);
                                    console.log("referralResponse", referralResponse);
                                    if (referralResponse.statusCode === 200) {
                                        setSnackMessage("Referral successful");
                                        setSnackSeverityType("success");
                                    } else {
                                        if ((referralResponse.statusCode/10) === 40) {
                                            console.log(referralResponse.statusCode/10);
                                            setSnackMessage(referralResponse.message);
                                            setSnackSeverityType("error");
                                        }
                                    }
                                    setSnackOpen(true);
                                    handleClose();
                                }}
                            >
                                Let's Play
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={snackHandleClose} severity={snackSeverityType} sx={{ width: '100%' }}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </div>

    );
}

export default ReferralModal;