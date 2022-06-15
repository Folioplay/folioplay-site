import React from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Grid } from "@mui/material";
import { motion } from 'framer-motion/dist/framer-motion'
import { coinTosymbol } from "../../../CoinAndSymbols/symbols";
import '../style/index.css';
export function AssignRole() {
    const teamCoins = ['Cardano', 'Litecoin', 'PolkaDot', 'Chainlink', 'Stellar', '1inch', 'Monero', 'AAVE', 'Uniswap', 'NEO'];
    var finalRanks = new Map();
    for (var i = 0; i < teamCoins.length; i++) {
        finalRanks.set("" + teamCoins[i].toLowerCase(), -1);
    }
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
        for (var i = 0; i < teamCoins.length; i++) {
            if (coinClickedName !== teamCoins[i].toLowerCase() && finalRanks[teamCoins[i].toLowerCase()] === parseInt(rank)) {
                finalRanks[teamCoins[i].toLowerCase()] = -1;
            }
            if (finalRanks[teamCoins[i].toLowerCase()] === 1) {
                document.getElementById('coin-rank-1').src = require('../../../images/coinLogos/' + coinTosymbol[teamCoins[i].toLowerCase()].toLowerCase() + ".png").default;
            }
            if (finalRanks[teamCoins[i].toLowerCase()] === 2) {
                document.getElementById('coin-rank-2').src = require('../../../images/coinLogos/' + coinTosymbol[teamCoins[i].toLowerCase()].toLowerCase() + ".png").default;
            }
            if (finalRanks[teamCoins[i].toLowerCase()] === 3) {
                document.getElementById('coin-rank-3').src = require('../../../images/coinLogos/' + coinTosymbol[teamCoins[i].toLowerCase()].toLowerCase() + ".png").default;
            }
        }
        console.log(finalRanks);
    }
    const LeftComponent = () => {
        return (
            <div className="fullpage">


                <div className="upper-half">
                    <input id="team-name" className="mb-5 pl-5 pr-5" placeholder="Enter Team Name"></input>
                    <img id="crown" src={require('../../../images/crown1.png').default} />
                    <div>
                        <img id="coin-rank-2" src={require('../../../images/default.png').default} width="60px" height="60px" />
                        <img id="coin-rank-1" src={require('../../../images/default.png').default} width="60px" height="60px" />
                        <img id="coin-rank-3" src={require('../../../images/default.png').default} width="60px" height="60px" />
                    </div>
                    {/* <img id="rank-image" src={require('../../../images/ranks.png').default} width="317.5px" height="250px" /> */}
                    <img id="rank-image" src={require('../../../images/ranks.png').default} width="250px" height="196.9px" />
                </div>
                {/* <div id="save-team-button">
                    <Button variant="contained" >Save Team</Button>
                </div> */}
                <div className="lower-half pt-20">

                    <span id="rank-info" className="pl-10 pt-20 pr-10 pb-20 mb-5 mt-5 font-weight-500">Rank 1 gets 2x points, 2 gets 1.75x, 3 gets 1.5x</span>

                    {
                        teamCoins.map((coin, index) => {
                            return (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 * index }} id={"coin-" + coin.toLowerCase()} className="rank-coin-card pl-10 pt-20 pr-10 pb-20 mt-5 mb-5">
                                    <img src={require('../../../../public/coinLogos/' + coin.toLowerCase() + '.png').default} width="40px" height="40px" />
                                    <span className="ml-15">
                                        {coin}<br />
                                        <span className="font-size-12">10000</span>
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
