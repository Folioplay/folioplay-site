import React, { useEffect, useState } from 'react';
import FolioplayBar from "../../FolioplayBar/src";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getTransactionHistory } from "../../../APIS/apis";
import { getGlobalLeaderBoardData } from "../../../APIS/apis";
import moment from "moment";
import AccordionComponent from "../../../Common/Accordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import winnerGif from "../../../images/cups-winner.png"
import SingleTrophy from "../../../images/single_trophy_cup.png"

const LeftTournamentView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {

    async function setTransactionHistoryFunction() {
      const data = await getGlobalLeaderBoardData();
      setUserData(data);
      console.log(data);
    }
    setTransactionHistoryFunction();
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
          {"Global Leader Board"}
        </span>
      </div>
      <div className="globalLeaderBoard__body">
        <div className="globalLeaderBoard-entry ml-auto mr-auto mb-20" style={{ display: "flex", maxWidth: "100%", width: "100%", textAlign: "start" }}>
          <div style={{ maxWidth: "15%", width: "100%" }}>Rank</div>
          <div style={{ maxWidth: "35%", width: "100%", textAlign: "start" }}>User</div>
          <div style={{ maxWidth: "25%", width: "100%" }}></div>
          <div style={{ maxWidth: "25%", width: "100%", textAlign: "end" }}>Points</div>
          {/* <span className='ml-auto'>Team</span> */}

        </div>
        {/* {userData?.map((user, index) => (
                user.data.walletAddress===currentUser? (<div className={"globalLeaderBoard-Main-Controller"} key={index} style={{fontWeight:"bold"}} >
                <div className={"globalLeaderBoard-Main-Controller-Rank"}  style={{fontWeight:"bold"}}>
                  {user.rank}
                </div>
                <div className={"globalLeaderBoard-Main-Controller-UserName"} style={{fontWeight:"bold"}}>
                 {user.data.username}
                </div>
                <div className={"globalLeaderBoard-Main-Controller-Winner-Trophy"}  style={{fontWeight:"bold"}}>
               { user.rank===1 &&  <img src={winnerGif} alt="winnerGif" style={{width:"58%",height:"46px"}} />}
               
                  
                </div>
                <div className={"globalLeaderBoard-Main-Controller-Porfolio"} style={{fontWeight:"bold"}}>
                {user.points}
                </div>
              </div>):(null)
              
                    
                    ))} */}
        {userData?.map((user, index) => (
          user.data.walletAddress === currentUser ? (<div className={"globalLeaderBoard-Main-Controller"} key={index} style={{ fontWeight: "bold" }} >
            <div className={"globalLeaderBoard-Main-Controller-Rank"} style={{ fontWeight: "bold" }}>
              {/* {entry.rank} */}{user.rank}
            </div>
            <div className={"globalLeaderBoard-Main-Controller-UserName"} style={{ fontWeight: "bold" }}>
              {/* {entry.user.username}{" "} */} {user.data.username}
            </div>
            <div className={"globalLeaderBoard-Main-Controller-Winner-Trophy"} style={{ fontWeight: "bold" }}>
              {user.rank === 1 && <img src={winnerGif} alt="winnerGif" style={{ width: "58%", height: "46px" }} />}


            </div>
            <div className={"globalLeaderBoard-Main-Controller-Porfolio"} style={{ fontWeight: "bold" }}>
              {/* {entry.portfolio} */}{user.points}
            </div>
          </div>) : (<div className={"globalLeaderBoard-Main-Controller"} key={index} >
            <div className={"globalLeaderBoard-Main-Controller-Rank"} >
              {/* {entry.rank} */}{user.rank}
            </div>
            <div className={"globalLeaderBoard-Main-Controller-UserName"}>
              {/* {entry.user.username}{" "} */} {user.data.username}
            </div>
            <div className={"globalLeaderBoard-Main-Controller-Winner-Trophy"} >
              {user.rank === 1 && <img src={SingleTrophy} alt="winnerGif" style={{ width: "58%", height: "52px" }} />}


            </div>
            <div className={"globalLeaderBoard-Main-Controller-Porfolio"} >
              {/* {entry.portfolio} */}{user.points}
            </div>
          </div>)
        ))}


      </div>
    </div>
  );
};

export default LeftTournamentView;