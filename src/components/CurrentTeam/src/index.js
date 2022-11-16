import React, { useEffect, useState } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { Button, Grid } from "@mui/material";
import { motion } from "framer-motion/dist/framer-motion";
import "../style/index.css";
import { useLocation, useNavigate } from "react-router";
import { getTeamByid } from "../../../APIS/apis";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams } from "react-router";
import { S3_URL } from "../../../APIS/apis";
import { TableRowsOutlined } from "@mui/icons-material";
export default function CurrentTeamPreview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { leaderBoardData } = state;
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
            {leaderBoardData.team !== undefined ? (
              <>{leaderBoardData.team.name}</>
            ) : (
              <>Loading</>
            )}
          </span>
        </div>
        <br />
        <div className="totalPoints">
          Total Points:&nbsp;<b>{leaderBoardData.portfolio.toFixed(2)}</b>
          <TableRowsOutlined
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={() =>
              navigate("/activity/team/currentStatus/currentCoinTable", {
                state: {
                  leaderBoardData: leaderBoardData,
                  tournament_id: state.tournament_id,
                },
              })
            }
          />
        </div>
        <div className="team-preview-wrapper mt-20">
          {leaderBoardData !== undefined ? (
            <>
              <Grid
                style={{ color: "var(--black)" }}
                container
                rowSpacing={"1em"}
              >
                {leaderBoardData.team.selectedCoins.map((coin, index) => {
                  const coin_card =
                    coin.category === "Superstar"
                      ? "coin-card-superstar"
                      : coin.category === "Defi"
                      ? "coin-card-rekt"
                      : "coin-card-mooning";
                  return (
                    <Grid className="coin-card-wrapper" item xs={6}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.07 * index }}
                        className={"coin-card-current-team " + coin_card}
                      >
                        <div className="coinCategory">
                          {coin.category === "Defi" ? "Rekt" : coin.category}
                        </div>

                        <span className="coin-image-wrapper">
                          {coin.rank !== -1 && (
                            <div className="ribbon">
                              <span className="ribbon2">{coin.rank}</span>
                            </div>
                          )}
                          <img
                            src={S3_URL + coin.symbol + ".png"}
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
                          Points {coin.current_points.toFixed(2)}
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
