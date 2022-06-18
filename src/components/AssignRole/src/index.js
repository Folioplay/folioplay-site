import React, { useEffect, useState } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Grid } from "@mui/material";
import { motion } from 'framer-motion/dist/framer-motion'
import { coinTosymbol } from "../../../CoinAndSymbols/symbols";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTeam } from "../../../APIS/apis";
import '../style/index.css';
export function AssignRole() {
    const teamCoins = ['Cardano', 'Litecoin', 'PolkaDot', 'Chainlink', 'Stellar', '1inch', 'Monero', 'AAVE', 'Uniswap', 'NEO'];
    const navigate = new useNavigate();
    const [nameSnackOpen, setNameSnackOpen] = useState(false);
    const [successSnackOpen, setSuccessSnackOpen] = useState(false);
    const [error, setError] = useState("");
    var superstars = [];
    var mooning = [];
    var rekt = [];
    var coins = [];
    var finalRanks = new Map();
    const handleNameSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNameSnackOpen(false);

    };
    const handleSuccessSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessSnackOpen(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    superstars = JSON.parse(window.localStorage.getItem('superstars'));
    mooning = JSON.parse(window.localStorage.getItem('mooning'));
    rekt = JSON.parse(window.localStorage.getItem('rekt'));
    for (var i = 0; i < superstars.length; i++) {
        if (superstars[i].selected) coins.push(superstars[i]);
    }
    for (var i = 0; i < mooning.length; i++) {
        if (mooning[i].selected) coins.push(mooning[i]);
    }
    for (var i = 0; i < rekt.length; i++) {
        if (rekt[i].selected) coins.push(rekt[i]);
    }
    for (var i = 0; i < coins.length; i++) {
        finalRanks.set("" + coins[i].name.toLowerCase(), -1);
    }
    // if (superstars.length < 1 || superstars.length > 2 || mooning.length < 4 || mooning.length > 8 || rekt.length < 3 || rekt.length > 6) {
    //     return (
    //         <div>
    //             Select coins First.
    //         </div>
    //     );
    // }
    const selectRank = event => {
        const rank = event.target.innerText;
        var coinClicked = event.target.parentElement.id;
        var coinClickedName = coinClicked.split('-')[1];
        var allChoicesClickedCoin = document.querySelectorAll("#" + coinClicked + " .rank-choices");
        var allChoices = document.getElementsByClassName('rank-choices');
        for (var i = 0; i < allChoices.length; i++) {
            if (allChoices[i].innerText === rank) {
                allChoices[i].classList.remove("isselected");
            }
        }
        for (var i = 0; i < allChoicesClickedCoin.length; i++) {
            if ([...allChoicesClickedCoin[i].classList].includes("isselected")) {
                document.getElementById('coin-rank-' + allChoicesClickedCoin[i].innerText).src = require('../../../images/default.png').default;
                allChoicesClickedCoin[i].classList.remove('isselected');
            }
        }

        finalRanks[coinClickedName] = parseInt(rank);

        event.target.classList.toggle("isselected");
        for (var i = 0; i < coins.length; i++) {
            if (coinClickedName !== coins[i].name.toLowerCase() && finalRanks[coins[i].name.toLowerCase()] === parseInt(rank)) {
                finalRanks[coins[i].name.toLowerCase()] = -1;
                document.getElementById('coin-' + coins[i].name.toLowerCase()).childNodes[1].childNodes[2].innerText = '10000';
            }
            if (finalRanks[coins[i].name.toLowerCase()] === 1) {
                document.getElementById('coin-rank-1').src = require('../../../images/coinLogos/' + coinTosymbol[coins[i].name.toLowerCase()].toLowerCase() + ".png").default;
                document.getElementById('coin-' + coins[i].name.toLowerCase()).childNodes[1].childNodes[2].innerText = '20000';
            }
            if (finalRanks[coins[i].name.toLowerCase()] === 2) {
                document.getElementById('coin-rank-2').src = require('../../../images/coinLogos/' + coinTosymbol[coins[i].name.toLowerCase()].toLowerCase() + ".png").default;
                document.getElementById('coin-' + coins[i].name.toLowerCase()).childNodes[1].childNodes[2].innerText = '17500';

            }
            if (finalRanks[coins[i].name.toLowerCase()] === 3) {
                document.getElementById('coin-rank-3').src = require('../../../images/coinLogos/' + coinTosymbol[coins[i].name.toLowerCase()].toLowerCase() + ".png").default;
                document.getElementById('coin-' + coins[i].name.toLowerCase()).childNodes[1].childNodes[2].innerText = '15000';
            }
        }
    }
    function saveTeam(event) {
        event.preventDefault();
        var rankAssigned = 0;
        var selectedCoins = [];
        for (var i = 0; i < coins.length; i++) {
            coins[i]['rank'] = finalRanks[coins[i].name.toLowerCase() + ""] === undefined ? -1 : finalRanks[coins[i].name.toLowerCase() + ""];
            selectedCoins.push({ "name": coins[i].name, "rank": coins[i]['rank'], "symbol": coins[i].symbol });
            if (coins[i]['rank'] !== -1) {
                rankAssigned++;
            }
        }
        console.log(rankAssigned)
        if (rankAssigned !== 3) {
            setError("Assign all three roles to coins.")
            setNameSnackOpen(true);
            return;
        }
        // api
        var name = document.getElementById("team-name").value;
        if (name !== null && name !== undefined && name.length > 0) {
            createTeam({ selectedCoins: selectedCoins, name: name });
            setSuccessSnackOpen(true);
            setTimeout(() => {
                if ('superstars' in window.localStorage) window.localStorage.removeItem('superstars');
                if ('mooning' in window.localStorage) window.localStorage.removeItem('mooning');
                if ('rekt' in window.localStorage) window.localStorage.removeItem('rekt');
                navigate(-2);
            }, 2000);
        }
        else {
            setError("Team name can't be empty.")
            setNameSnackOpen(true);
        }
    }
    const LeftComponent = () => {
        return (
            <div className="fullpage">
                <div className="upper-half">
                    <input id="team-name" className="mb-5 pl-5 pr-5" placeholder="Enter Team Name" required></input>
                    <div id="save-team-button">
                        <Button variant="contained" style={{ backgroundColor: "var(--golden)", borderRadius: "8px" }} onClick={(event) => { saveTeam(event) }}>Save Team</Button>
                    </div>
                    <img id="crown" src={require('../../../images/crown1.png').default} />
                    <div>
                        <img id="coin-rank-2" src={require('../../../images/default.png').default} width="60px" height="60px" />
                        <img id="coin-rank-1" src={require('../../../images/default.png').default} width="60px" height="60px" />
                        <img id="coin-rank-3" src={require('../../../images/default.png').default} width="60px" height="60px" />
                    </div>
                    <img id="rank-image" src={require('../../../images/ranks.png').default} width="250px" height="196.9px" />
                </div>

                <div className="lower-half pt-20">

                    <span id="rank-info" className="pl-10 pt-20 pr-10 pb-20 mb-5 mt-5 font-weight-500">Rank 1 gets 2x points, 2 gets 1.75x, 3 gets 1.5x</span>
                    {
                        coins.length === 0 ? <>empty coins</> :
                            coins.map((coin, index) => {
                                return (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 * index }} id={"coin-" + coin.name.toLowerCase()} className="rank-coin-card pl-10 pt-20 pr-10 pb-20 mt-5 mb-5">
                                        <img src={require('../../../images/coinLogos/' + coin.symbol.toLowerCase() + '.png').default} width="40px" height="40px" />
                                        <span className="ml-15">
                                            {coin.name}<br />
                                            <span className="allocation font-size-12">10000</span>
                                        </span>
                                        <span className="rank-choices mr-5 ml-auto" onClick={selectRank}>
                                            1
                                        </span>
                                        <span className="rank-choices mr-5" onClick={selectRank}>
                                            2
                                        </span>
                                        <span className="rank-choices" onClick={selectRank}>
                                            3
                                        </span>

                                    </motion.div>
                                );
                            })
                    }
                    <Snackbar open={nameSnackOpen} autoHideDuration={3500} onClose={handleNameSnackClose}>
                        <motion.div id="name-snack-bar-div" initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
                            <Alert id="team-creation-message" onClose={handleNameSnackClose} severity="error" sx={{ width: '100%' }}>
                                {error}
                            </Alert>
                        </motion.div>
                    </Snackbar>
                    <Snackbar open={successSnackOpen} autoHideDuration={2000} onClose={handleSuccessSnackClose}>
                        <motion.div id="name-snack-bar-div" initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
                            <Alert id="team-creation-message" onClose={handleSuccessSnackClose} severity="success" sx={{ width: '100%' }}>
                                Team Created Successfully.
                            </Alert>
                        </motion.div>
                    </Snackbar>
                    <span style={{ width: "100%", height: "60px" }}></span>
                </div>

            </div >
        );
    }
    const RightComponent = () => {
        return (
            <div id='team-create-page-image'>
                <h1>Here's what you can win!</h1>
                <h3>Doesn't these big winnings look WOW?
                    Ofcourse they do!</h3>
            </div>
        );
    }
    return (
        <FolioPlayLayout LeftComponent={LeftComponent} RightComponent={RightComponent} />
    );
}
