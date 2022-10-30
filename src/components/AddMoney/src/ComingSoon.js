import React from 'react';
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {Button} from "@mui/material";
import BalanceTable from "../common/BalanceTable";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";

const   ComingSoon = () => {

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
                <div className="empty-area">
                    <div className={"comingSoon__text"}>
                        Coming Soon!
                    </div>
                </div>
                <div className="tournament-info-container">

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
};

export default ComingSoon;