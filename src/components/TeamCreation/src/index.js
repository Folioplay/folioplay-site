import React from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Grid } from "@mui/material";
import '../style/index.css'

export function TeamCreation() {
    const navigate = useNavigate();
    const superstars = ['Bitcoin', 'Ethereum', 'Tether', 'Matic'];
    const mooning = ['Cardano', 'Litecoin', 'ADA', 'PolkaDot', 'Chainlink', 'Stellar', '1inch', 'Monero', 'AAVE', 'Uniswap', 'NEO', 'Solana', 'XRP', 'Enjin'];
    const rekt = ['Maker', 'Litecoin', 'Zcash', 'IOTA', 'DogeCoin', '1inch', 'Compound', 'Monero', 'Enjin', 'ADA', 'Stellar', 'Uniswap', 'Solana', 'XRP'];
    const selectedSuperstars = [];
    const selectedMooning = [];
    const selectedRekt = [];
    const Superstars = () => {
        return (
            <Grid style={{ color: "var(--black)" }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    superstars.map((coin) => {
                        // const coinlogo = ;
                        return (
                            <Grid className="coin-card-wrapper" item xs={6}>
                                <div className="coin-card">
                                    <img src={require('../../../../public/coinLogos/' + coin.toLowerCase() + '.png').default} onerror="this.src = '../../../../public/coinLogos/bitcoin.jpg';" width="40px" height="40px" />
                                    <span className="font-size-15 font-weight-700 mt-5 mb-10">{coin}</span>
                                    <Button className="coin-add-button" style={{ borderRadius: "12px" }} variant="outlined" size="small" >Add</Button>
                                </div>

                            </Grid>
                        );
                    })
                }
            </Grid>);
    }
    const Mooning = () => {
        return (
            <Grid style={{ color: "var(--black)" }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    mooning.map((coin) => {
                        // const coinlogo = ;
                        return (
                            <Grid className="coin-card-wrapper" item xs={6}>
                                <div className="coin-card">
                                    <img src={require('../../../../public/coinLogos/' + coin.toLowerCase() + '.png').default} width="40px" height="40px" />
                                    <span className="font-size-15 font-weight-700 mt-5 mb-10">{coin}</span>
                                    <Button className="coin-add-button" style={{ borderRadius: "12px" }} variant="outlined" size="small" >Add</Button>
                                </div>
                            </Grid>
                        );
                    })
                }
            </Grid>);
    }
    const Rekt = () => {
        return (
            <Grid style={{ color: "var(--black)" }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    rekt.map((coin) => {
                        // const coinlogo = ;
                        return (
                            <Grid className="coin-card-wrapper" item xs={6}>
                                <div className="coin-card">
                                    <img src={require('../../../../public/coinLogos/' + coin.toLowerCase() + '.png').default} width="40px" height="40px" />
                                    <span className="font-size-15 font-weight-700 mt-5 mb-10">{coin}</span>
                                    <Button className="coin-add-button" style={{ borderRadius: "12px" }} variant="outlined" size="small" >Add</Button>
                                </div>

                            </Grid>
                        );
                    })
                }
            </Grid>);
    }
    const changeTabs = event => {
        var currCoin = event.target;
        var allClasses = document.getElementsByClassName('coinClass');
        var allClassesContents = document.getElementsByClassName('coinClass-content');
        for (var i = 0; i < allClasses.length; i++) {
            allClasses[i].classList.remove('coin-class-selected');
        }
        console.log(allClassesContents)

        if (currCoin.firstChild.nodeValue.toLowerCase() === "superstars") {
            document.getElementById('superstars').classList.remove('display-none');
            document.getElementById('mooning').classList.add('display-none');
            document.getElementById('rekt').classList.add('display-none');
        } else {
            if (currCoin.firstChild.nodeValue.toLowerCase() === "mooning") {
                document.getElementById('mooning').classList.remove('display-none');
                document.getElementById('superstars').classList.add('display-none');
                document.getElementById('rekt').classList.add('display-none');
            } else {
                document.getElementById('rekt').classList.remove('display-none');
                document.getElementById('mooning').classList.add('display-none');
                document.getElementById('superstars').classList.add('display-none');
            }
        }
        currCoin.classList.add('coin-class-selected');
    }
    const LeftComponent = () => {
        return (
            <div className="fullpage">
                <div className="teamcreate-bar pl-20 pt-10 mb-20">
                    <ArrowBackIosIcon fontSize="medium" className="go-back-button" onClick={() => navigate(-1)} />
                    <span className="ml-20 font-size-25 font-weight-700" >Choose Coins</span>
                </div><br /><br />
                <div className="coin-classes mb-10">
                    <span className="coinClass ml-20 coin-class-selected" onClick={changeTabs}>SuperStars</span>
                    <span className="coinClass ml-20" onClick={changeTabs}>Mooning</span>
                    <span className="coinClass ml-20" onClick={changeTabs}>Rekt</span>
                </div>
                <div className="coins">
                    <div id="superstars" className="coinClass-content"><Superstars /></div>
                    <div id="mooning" className="coinClass-content display-none"><Mooning /></div>
                    <div id="rekt" className="coinClass-content display-none"><Rekt /></div>
                    <div className="assign-roles-div mt-20">
                        <Button style={{ borderRadius: "12px", backgroundColor: "var(--golden)" }} variant="contained" className="role-button ml-auto">Assign Roles</Button>
                    </div>

                </div>
            </div>
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