import React from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { useMoralis } from "react-moralis";
import {Button, LinearProgress} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {chooseTeamOpen} from "../../TournamentView/common/chooseTeamAnimations";
import { motion } from "framer-motion/dist/framer-motion";
import {useNavigate} from "react-router-dom";
import "../style/index.css";
import LeaderBoardTabs from "../../LeaderboardTabs/src";
import BalanceTable from "../common/BalanceTable";

export default function AddMoney() {
    var navigate = useNavigate();

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
                  </span>
                </div>
            <div className="empty-area"></div>
                <div className="tournament-info-container">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, y: -90 }}
                        transition={{ duration: 0.3 }}
                        className="tournament-view-card"
                    >
                    <div className="tournament-view-info">
                        <div className="wallet_info">
                            <div className="total_balance">
                                Total Balance
                            </div>
                            <div className="balance_display">
                                100USD
                            </div>
                            <div className="deposit_withdraw_option">
                                <span className="withdraw_button">
                                    <Button
                                        variant="outlined"
                                        className="withdraw_coin_button"
                                        style={{
                                            // backgroundColor: "var(--golden)",
                                            borderColor: "var(--golden)",
                                            fontWeight: "600",
                                            fontSize: "13px",
                                            color: "var(--golden)",
                                        }}
                                    >
                                        Withdraw Coins
                                    </Button>
                                    <Button
                                        variant="filled"
                                        style={{
                                            backgroundColor: "var(--golden)",
                                            fontWeight: "600",
                                            fontSize: "13px",
                                            color: "white",
                                        }}
                                        className="submit_coin_button">
                                        Receive Coins
                                    </Button>
                                </span>
                            </div>
                        </div>

                        </div>
                    </motion.div>
                    <div>

                        <div className="folioplay-tabs">
                            <BalanceTable />
                            {/*<LeaderBoardTabs tournamentId={tournament.id} />*/}
                        </div>
                    </div>
                </div>
            </div>
        )};
    const RightComponent = () => {
        return (
            <div id="login-page-image">
                <img
                    alt="folioplay-logo"
                    src={require("../../../images/folioplayLogo.png").default}
                />
                <img src={require('../../../images/white_folioplay.svg').default} />
                <h3 style={{ letterSpacing: "2px" }}>
                    Decentralized fantasy gaming platform
                </h3>
            </div>
        );
    }

    return (
        <FolioPlayLayout LeftComponent={LeftComponent} RightComponent={RightComponent} />
    );

}