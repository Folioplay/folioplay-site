import React, { useState } from "react";
import ContentModal from "../../../Common/ContentModal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { referralCodePost } from "../../../APIS/apis";
import SnackbarComponent from "../../../Common/Snackbar";
import { useEffect } from "react";

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

const RightComponent = () => {
  const [snackOpen, setSnackOpen] = React.useState(false);

  const snackHandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverityType, setSnackSeverityType] = useState("");

  const [open, setOpen] = useState(
    localStorage.getItem("user_referral") === "null"
  );
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => setOpen(true);
  const referralExists = localStorage.getItem("user_referral");
  console.log(referralExists);

  const ReferralModal = () => {
    const [referral, setReferral] = useState("");
    useEffect(() => {
      if (referralExists !== "null") {
        setReferral(localStorage.getItem("user_referral"));
      }
    },[]);

    return (
      <ContentModal
        open={open}
        handleClose={handleClose}
        children={ReferralModal}
        handleOpen={handleOpen}
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
                  if (referralResponse.statusCode === 200) {
                    setSnackMessage("Referral successful");
                    setSnackSeverityType("success");
                  } else {
                    if (referralResponse.statusCode === 400) {
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
      </ContentModal>
    );
  };

  return (
    <div id="tournament-page-image">
      {/* {referralExists !== "null" ? null : <ReferralModal />} */}
      <SnackbarComponent
        open={snackOpen}
        handleClose={snackHandleClose}
        message={snackMessage}
        severityType={snackSeverityType}
      />
      <span className="font-size-36 font-weight-700 mb-0">
        Let the game begin!
      </span>
      <span
        className="font-size-20 font-weight-500 mt-0"
        style={{ letterSpacing: "1px" }}
      >
        Choose a contest to start playing...
      </span>
    </div>
  );
};

export default RightComponent;
