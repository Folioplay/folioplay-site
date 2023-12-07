import React, { useEffect, useState } from 'react';
import FolioplayBar from "../../FolioplayBar/src";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {  Box } from "@mui/material";
import folioplay_intro from "../../../images/Folioplay_Intro.mp4"

const LeftTournamentView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
 

  useEffect(() => {

   
  }, [])

  async function checkState() {
    if (state && state.comingFrom == "/tournament") {
      navigate("/tournaments", { state: { comingFrom: "" } });
    } else {
      navigate(-1);
    }
  }
  const currentUser = localStorage.getItem("walletAddress");

  return (
    <div className="globalLeaderBoard__fullPage">
      <div className="globalLeaderBoard__header">
        <ArrowBackIosIcon
          fontSize="medium"
          className="go-back-button"
          onClick={() => checkState()}
        />
        <span className="ml-20 font-size-20 font-weight-700">
          {"How To Play"}
        </span>
      </div>
      <div className="globalLeaderBoard__body">
        
        <Box sx={{maxWidth:"100%", marginTop:"1vh"}}>
<video src={folioplay_intro} alt="howtoplay" style={{width:"100%"}} autoPlay controls />
        </Box>
   
        


      </div>
    </div>
  );
};

export default LeftTournamentView;