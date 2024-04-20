import React, { useEffect, useState } from "react";
import FolioplayBar from "../../FolioplayBar/src";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Button } from "@mui/material";
import folioplay_intro from "../../../images/Folioplay_Intro.mp4";

const LeftTournamentView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setFeedback(event.target.value);
  };
  useEffect(() => {
    const localemail = localStorage.getItem("user");
    setEmail(localemail);
  }, []);

  async function checkState() {
    if (state && state.comingFrom == "/tournament") {
      navigate("/tournaments", { state: { comingFrom: "" } });
    } else {
      navigate(-1);
    }
  }

  async function submitFeedback() {
    setFeedback("");
  }

  return (
    <div className="globalLeaderBoard__fullPage">
      <div className="globalLeaderBoard__header">
        <ArrowBackIosIcon
          fontSize="medium"
          className="go-back-button"
          onClick={() => checkState()}
        />
        <span className="ml-20 font-size-20 font-weight-700">{"Feedback"}</span>
      </div>
      <div className="globalLeaderBoard__body">
        <Box
          sx={{
            maxWidth: "100%",
            marginTop: "1vh",

            paddingY: "20px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >

<Box
              sx={{
                width: "100%",
                height: "fit-content",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
<h1 className="c12">Feedback</h1>
          
              </Box>

            <Box
              sx={{
                width: "100%",
                height: "fit-content",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="email"
                placeholder="Mention your Email ID here"
                required
                // autoFocus
                disabled
                value={email}
                name="email-field"
                id="email-field"
                style={{ width: "90%" }}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                height: "fit-content",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <textarea
                type="email"
                placeholder="Please add feedback here"
                required
                // autoFocus
                value={feedback}
                name="email-field"
                id="email-field"
                style={{ width: "90%", height: "20vh" }}
                onChange={(e) => handleChange(e)}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                height: "fit-content",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingY: "4px",
              }}
            >
              <Button
                style={{
                  width: "40%",
                  height: "45px",
                  display: "flex",
                }}
                className="folioplay-login-google-button"
                variant="contained"
                onClick={() => {
                  submitFeedback();
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default LeftTournamentView;
