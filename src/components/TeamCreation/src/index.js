import React, { useState, useEffect } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import OpenChart from "../../Charts/src";
import { motion } from 'framer-motion/dist/framer-motion'
import '../style/index.css'


export function TeamCreation() {
    const navigate = useNavigate();
    const [wasActiveTab, setWasActiveTab] = useState("");
    const [graphCoin, setGraphCoin] = useState("");
    const superstars = ['Bitcoin', 'Ethereum', 'Tether', 'Matic'];
    const mooning = ['Cardano', 'Litecoin', 'ADA', 'PolkaDot', 'Chainlink', 'Stellar', '1inch', 'Monero', 'AAVE', 'Uniswap', 'NEO', 'Solana', 'XRP', 'Enjin'];
    const rekt = ['Maker', 'Litecoin', 'Zcash', 'IOTA', 'DogeCoin', '1inch', 'Compound', 'Monero', 'Enjin', 'ADA', 'Stellar', 'Uniswap', 'Solana', 'XRP'];
    const selectedSuperstars = [];
    const selectedMooning = [];
    const selectedRekt = [];
    const [open, setOpen] = React.useState(false);
    const preservedView = () => {
        if (wasActiveTab !== undefined && wasActiveTab.length > 0) {
            var allClasses = document.getElementsByClassName('coinClass');
            for (var i = 0; i < allClasses.length; i++) {
                allClasses[i].classList.remove('coin-class-selected');
            }
            if (wasActiveTab === "superstars") {
                document.getElementById('superstars').classList.remove('display-none');
                document.getElementById('mooning').classList.add('display-none');
                document.getElementById('rekt').classList.add('display-none');
            } else {
                if (wasActiveTab === "mooning") {
                    document.getElementById('mooning').classList.remove('display-none');
                    document.getElementById('superstars').classList.add('display-none');
                    document.getElementById('rekt').classList.add('display-none');
                } else {
                    document.getElementById('rekt').classList.remove('display-none');
                    document.getElementById('mooning').classList.add('display-none');
                    document.getElementById('superstars').classList.add('display-none');
                }
            }
            document.getElementById(wasActiveTab + '-tab').classList.add('coin-class-selected');
        } else {
            document.getElementById('mooning').classList.add('display-none');
            document.getElementById('rekt').classList.add('display-none');
            document.getElementById('superstars-tab').classList.add('coin-class-selected');
        }
    }
    const handleOpen = (event) => {
        setGraphCoin(event.target.innerText.toLowerCase());
        // preservedView();
        setOpen(true);
    }
    const handleClose = () => {
        setGraphCoin("");
        // preservedView();
        setOpen(false);
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "max(50%,300px)",
        bgcolor: '#E8EEF2',
        boxShadow: 24,
        borderRadius: "12px",
        p: 1,
    };
    useEffect(() => {
        preservedView();
    }, [wasActiveTab, graphCoin]);

    const Superstars = () => {
        return (
            <Grid style={{ color: "var(--black)" }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    superstars.map((coin, index) => {
                        // const coinlogo = ;
                        return (
                            <Grid className="coin-card-wrapper" item xs={6}>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.07 * index }} className="coin-card">
                                    <img src={require('../../../../public/coinLogos/' + coin.toLowerCase() + '.png').default} onerror="this.src = '../../../../public/coinLogos/bitcoin.jpg';" width="40px" height="40px" />
                                    <span onClick={handleOpen} className="graph font-size-15 font-weight-700 mt-5 mb-10">{coin}</span>
                                    <Button className="coin-add-button" style={{ borderRadius: "12px" }} variant="outlined" size="small" >Add</Button>
                                </motion.div>

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
                    mooning.map((coin, index) => {
                        return (
                            <Grid className="coin-card-wrapper" item xs={6}>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.07 * index }} className="coin-card">
                                    <img src={require('../../../../public/coinLogos/' + coin.toLowerCase() + '.png').default} width="40px" height="40px" />
                                    <span onClick={handleOpen} className="graph font-size-15 font-weight-700 mt-5 mb-10">{coin}</span>
                                    <Button className="coin-add-button" style={{ borderRadius: "12px" }} variant="outlined" size="small" >Add</Button>
                                </motion.div>
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
                    rekt.map((coin, index) => {
                        return (
                            <Grid className="coin-card-wrapper" item xs={6}>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.07 * index }} className="coin-card">
                                    <img src={require('../../../../public/coinLogos/' + coin.toLowerCase() + '.png').default} width="40px" height="40px" />
                                    <span onClick={handleOpen} className="graph font-size-15 font-weight-700 mt-5 mb-10">{coin}</span>
                                    <Button className="coin-add-button" style={{ borderRadius: "12px" }} variant="outlined" size="small" >Add</Button>
                                </motion.div>

                            </Grid>
                        );
                    })
                }
            </Grid>);
    }
    const changeTabs = event => setWasActiveTab(event.target.innerText.toLowerCase());
    const LeftComponent = () => {
        return (
            <div className="fullpage">
                <div className="teamcreate-bar pl-20 pt-10 mb-20">
                    <ArrowBackIosIcon fontSize="medium" className="go-back-button" onClick={() => navigate(-1)} />
                    <span className="ml-20 font-size-25 font-weight-700" >Choose Coins</span>
                </div><br /><br />
                <div className="coin-classes mb-10">
                    <span id="superstars-tab" className="coinClass ml-20" onClick={changeTabs}>SuperStars</span>
                    <span id="mooning-tab" className="coinClass ml-20" onClick={changeTabs}>Mooning</span>
                    <span id="rekt-tab" className="coinClass ml-20" onClick={changeTabs}>Rekt</span>
                </div>
                <div className="coins">
                    <div id="superstars" className="coinClass-content"><Superstars /></div>
                    <div id="mooning" className="coinClass-content"><Mooning /></div>
                    <div id="rekt" className="coinClass-content"><Rekt /></div>
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
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <OpenChart coin={graphCoin} />
                    </Box>
                </Modal>
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