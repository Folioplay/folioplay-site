import React, {useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import OpenChart from "../../Charts/src";
import TeamPreview from "../common/TeamPreview";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@material-ui/core/styles";
import MuiAlert from "@mui/material/Alert";
import {getAllCoins} from "../../../APIS/apis";
import preservedView from "../common/preservedView";
import {Button, Grid} from "@mui/material";
import addCoin from "../common/addCoin";
import { motion } from "framer-motion/dist/framer-motion";

const RightTeamCreation = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const [wasActiveTab, setWasActiveTab] = useState("superstars");
    const [graphCoin, setGraphCoin] = useState("");
    const [open, setOpen] = useState(false);
    const [coins, setCoins] = useState([]);
    const [snackOpen, setSnackOpen] = useState(false);
    var superstars = [];
    var mooning = [];
    var rekt = [];
    var localSuperstars = JSON.parse(window.localStorage.getItem("superstars"));
    var localMooning = JSON.parse(window.localStorage.getItem("mooning"));
    var localRekt = JSON.parse(window.localStorage.getItem("rekt"));
    const style = {
        position: "absolute",
        transform: "translate(-30%, -50%)",
        width: "max(70%,300px)",
        bgcolor: "#E8EEF2",
        boxShadow: 24,
        borderRadius: "12px",
        p: 1,
        ['@media (max-width:1200px)']: {
            transform: "translate(-50%, -50%)",
        }
    };

    const handleClose = () => {
        document.getElementById("modal-view").classList.add("animate-modal");
        setTimeout(function () {
            setGraphCoin("");
            setOpen(false);
        }, 400);
    };

    async function fetchCoins() {
        setCoins(await getAllCoins());
    }
    useEffect(() => {
        localStorage.removeItem("superstars");
        localStorage.removeItem("mooning");
        localStorage.removeItem("rekt");
        fetchCoins();
    }, []);

    for (var i = 0; i < coins.length; i++) {
        if (
            window.localStorage.getItem("superstars") === null &&
            coins[i].category === "Superstar"
        ) {
            superstars.push(coins[i]);
            superstars[superstars.length - 1]["selected"] = false;
        }
        if (
            window.localStorage.getItem("mooning") === null &&
            coins[i].category === "Mooning"
        ) {
            mooning.push(coins[i]);
            mooning[mooning.length - 1]["selected"] = false;
        }
        if (
            window.localStorage.getItem("rekt") === null &&
            coins[i].category === "Defi"
        ) {
            rekt.push(coins[i]);
            rekt[rekt.length - 1]["selected"] = false;
        }
    }

    if (localMooning !== null) {
        mooning = localMooning;
        console.log("inlocal", mooning);
    }
    if (localSuperstars !== null) {
        superstars = localSuperstars;
        console.log("inlocal", superstars);
    }
    if (localRekt !== null) {
        rekt = localRekt;
    }


    return (
        <div id="team-create-page-image">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableAutoFocus={true}
            >
                <motion.div
                    id="modal-view"
                    initial={{ x: "50vw", y: "200vh" }}
                    animate={{ scale: 1, x: "50vw", y: "50vh" }}
                    transition={{ duration: 0.5 }}
                >
                    <Box sx={style}>
                        <OpenChart coin={graphCoin} />
                    </Box>
                    <motion.span onClick={handleClose}>
                        {/* <CancelIcon id="cross-modal" fontSize="large" /> */}
                    </motion.span>
                </motion.div>
            </Modal>
            <div>
                <span className="font-size-36 font-weight-700 mb-20 mt-20">Here is your team preview!</span>
                {/* <h3>Doesn't these big winnings look WOW? Ofcourse they do!</h3> */}
            </div>
            <TeamPreview superstars={superstars} mooning={mooning} rekt={rekt} />

            {/* <TickerWidget /> */}
        </div>
    );
};

export default RightTeamCreation;