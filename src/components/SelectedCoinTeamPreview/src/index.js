import React, { useEffect, useState } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import FolioplayBar from "../../FolioplayBar/src";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Button, Grid } from "@mui/material";
import { motion } from "framer-motion/dist/framer-motion";
import "../style/index.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router";
import { getTeamByid } from "../../../APIS/apis";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams } from "react-router";
import { S3_URL } from "../../../APIS/apis";
import { useDispatch, useSelector } from "react-redux";
import { getCoinsAsync, toggleSelected } from "../../../Redux/Coins/CoinsSlice";


export default function SelectedCoinTeamPreview() {  
  const coinsRedux = useSelector((state) => state.coinsSlice.coins);
  const selectedAllCoins = coinsRedux.filter((coinn) =>  coinn.selected === true);
  const navigate = useNavigate();

  const LeftComponent = () => {
    return (
    selectedAllCoins ? (<><div className="fullpage">
      <div className="tournament-view-bar">
        <ArrowBackIosIcon
          fontSize="medium"
          className="go-back-button"
          onClick={() => navigate(-1)}
        />
        <span className="ml-20 font-size-20 font-weight-700">
          {selectedAllCoins !== undefined ? <>Team Preview</> : <>Loading ...</>}
        </span>
      </div>
      <br />
      <br />
      <div className="team-preview-wrapper mt-20">
        {selectedAllCoins !== undefined ? (
          <>
            <Grid
              style={{ color: "var(--black)" }}
              container
              rowSpacing={"1em"}
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {selectedAllCoins
                ?.filter((coin) => coin.selected)
                .map((coin, index) => {
                  const coin_card =
                    coin.category === "Superstar"
                      ? "coin-card-superstar"
                      : coin.category === "Defi"
                        ? "coin-card-rekt"
                        : "coin-card-mooning";

                  let pointNumber;
                  if (coin.rank === 1) {
                    pointNumber = 20000;
                  }
                  if (coin.rank === 2) {
                    pointNumber = 17500;
                  }
                  if (coin.rank === 3) {
                    pointNumber = 15000;
                  }
                  return (<>

                    <Grid className="coin-card-wrapper" item xs={6}>
                      {coin.selected === true ? (<>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.07 * index }}
                          className={"coin-card-current-team-team-preview " + coin_card}
                        >
                          <div className="coinCategory">{coin.category === 'Defi' ? "Rekt" : coin.category}</div>

                          <span className="coin-image-wrapper">
                            <img
                              src={
                                S3_URL +
                                coin.symbol +
                                ".png"
                              }
                              width="40px"
                              height="40px"
                            />
                          </span>
                          <span className="graph font-size-15 font-weight-500 mt-5 mb-10">
                            {coin.name}
                          </span>
                  
                        </motion.div>
                      </>) : ("")
                      }
                    </Grid></>
                  );
                })}

<div style={{width:"100%",display:"flex",justifyContent:"center"}}>
<Button
            id="team-preview-button"
            variant="contained"
            className="role-button2 ml-auto"
            onClick={() =>
              navigate(-1)
              
            }
            // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
          >
          Back To Team Selection
          </Button>
          </div>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </div>
    </div> </>) : (<><h3>Loading...</h3></>)
      
    );
  };
  const RightComponent = () => {
    return (
      <div id="login-page-image">
        <img
          alt="folioplay-logo"
          src={require("../../../images/folioplayLogo.png").default}
        />
        <img src={require("../../../images/white_folioplay.svg").default} />
        <h3 style={{ letterSpacing: "2px" }}>
          Decentralized fantasy gaming platform
        </h3>
      </div>
    );
  };

  return (
    <FolioPlayLayout
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
}
