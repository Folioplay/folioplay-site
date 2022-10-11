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
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router";
import { getTeamByid } from "../../../APIS/apis";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams } from "react-router";
export default function TeamPreview() {
  const teamId = useParams().teamId;
  const navigate = useNavigate();
  console.log(teamId);
  const [team, setTeam] = useState(undefined);
    console.log("team on team page", team);
  async function fetchTeam() {
    setTeam(await getTeamByid({ teamId }));
  }
  useEffect(() => {
    fetchTeam();
  }, []);
  console.log("team",team);
  const LeftComponent = () => {
    return (
      <div className="fullpage">
        <div className="tournament-view-bar">
          <ArrowBackIosIcon
            fontSize="medium"
            className="go-back-button"
            onClick={() => navigate(-1)}
          />
          <span className="ml-20 font-size-20 font-weight-700">
            {team !== undefined ? <>{team.name}</> : <>Loading</>}
          </span>
        </div>
        <br />
        <br />
        <div className="team-preview-wrapper mt-20">
          {team !== undefined ? (
            <>
              <Grid
                style={{ color: "var(--black)" }}
                container
                rowSpacing={"1em"}
                // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {team.selectedCoins.map((coin, index) => {
                    const coin_card = coin.category==="Superstar" ? "coin-card-superstar": coin.category==="Defi" ? "coin-card-rekt" :  "coin-card-mooning";

                    let pointNumber;
                    if(coin.rank===1){
                        pointNumber =  20000;
                    }
                    if(coin.rank===2){
                        pointNumber = 17500;
                    }
                    if(coin.rank ===3 ){
                        pointNumber = 15000;
                    }
                    console.log("points table", pointNumber);

                  return (
                    <Grid className="coin-card-wrapper" item xs={6}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.07 * index }}
                        className={"coin-card "+ coin_card}
                      >
                          {/*{*/}
                          {/*    coin.rank !== -1 &&*/}
                          {/*    <div className="ribbon">*/}
                          {/*        <span className="ribbon2">{coin.rank}</span>*/}
                          {/*    </div>*/}
                          {/*}*/}
                        <span className="coin-image-wrapper">
                            {
                              coin.rank !== -1 &&
                              <div className="ribbon">
                                  <span className="ribbon2">{coin.rank}</span>
                              </div>
                          }
                          <img
                            src={
                              process.env.REACT_APP_API_SERVER +
                              "/media/" +
                              coin.symbol +
                              ".png"
                            }
                            onerror="this.src = '../../../images/coinLogos/bitcoin.jpg';"
                            width="40px"
                            height="40px"
                          />
                        </span>
                        <span className="graph font-size-15 font-weight-500 mt-5 mb-10">
                          {coin.name}
                        </span>
                          <span
                              className="font-size-12"
                              style={{ color: "var(--dark-dim-white)" }}
                          >
                          Points {coin.rank==-1? <>10000</>: <>{pointNumber}</>}
                        </span>
                      </motion.div>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
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
