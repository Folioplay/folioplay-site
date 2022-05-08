import React, {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import { withStyles } from '@material-ui/core/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TextField from '@mui/material/TextField';
import FolioPlayLayout from '../../../layout/FolioPlayLayout'
import '../style/index.css';
import { ethers } from "ethers";
import CommonModal from "../../../Common/Modal/Modal";
import Link from '@mui/material/Link';
import {AuthContext} from "../../../Context/AuthContext";

export default function LoginPage() {



    const {loginWalletConnect, logout, userWalletAddress, loginMetamask}= useContext(AuthContext);

    useEffect(()=>{
        if(userWalletAddress!==null){
            window.location.pathname="/tournaments";
        }
    });

    const connectWalletConnect = async () => {
        async function setProviderValue(){
            await loginWalletConnect();
        }
        await setProviderValue();
    }

    // const signOutWalletConnect = async () =>{
    //     await logout();
    // }

    const MetamaskModal = () =>{
        return (
            <CommonModal open={open} handleClose={handleClose}>
                <div className="modalText">
                    Install <Link className="innerModalContent" href="https://metamask.io/" target="_blank" onClick={handleClose}>  Metamask </Link> to Login
                </div>
            </CommonModal>
        )
    }
    console.log(userWalletAddress);


    const checkMetamask = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (!provider) {
            handleOpen();
        }
        else{
            loginMetamask();
            // TODO: Call api to check account present in database
        }
    }
    //Modal Section
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const CssTextField = withStyles({
        root: {
            '& label.Mui-focused': {
                color: 'var(--white)',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'var(--white)',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'var(--white)',
                },
                '&:hover fieldset': {
                    borderColor: 'var(--white)',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'var(--white)',
                },
            },
        },
    })(TextField);
    const LeftComponent = () => {
        return (
            <div id="folioplay-login-wrapper">
                {MetamaskModal()}
                <Button id="folioplay-login-google-button" variant="contained">
                    <img alt="google-icon" src={require('../../../images/google_icon.webp')} width={"20px"} height={"20px"} style={{ marginRight: "3px" }} />
                    Continue With Google</Button>
                <Button id="folioplay-login-meta-button" variant="contained">
                    <FacebookIcon style={{ color: "var(--violet-blue)", marginRight: "3px" }} />
                    Continue With Meta</Button>
                <h4 id="folioplay-text-separator-wrapper"><span >Or</span></h4>
                <h3>Connect your web3 wallet</h3>
                <div id="folioplay-connect-metamask" onClick={checkMetamask}>
                    <img alt="metamask-icon" src={require('../../../images/metamask.png')} width={"60px"} height={"60px"} style={{ marginRight: "3px" }} />
                    <h4 style={{ marginTop: "0px", marginBottom: "10px" }}>MetaMask</h4>
                </div>
                <div id="folioplay-connect-metamask" onClick={connectWalletConnect}>
                    <img alt="metamask-icon" src={require('../../../images/metamask.png')} width={"60px"} height={"60px"} style={{ marginRight: "3px" }} />
                    <h4 style={{ marginTop: "0px", marginBottom: "10px" }}>WalletConnect</h4>
                </div>
                <h4 id="folioplay-text-separator-wrapper"><span>Or</span></h4>
                <CssTextField type="email" sx={{ input: { color: "var(--white)" }, "label": { color: "var(--white)" } }} id="email-field" label="Email address" variant="standard" style={{ marginBottom: "20px" }} required />
                <Button id="folioplay-login-mail-button" variant="filled">Sign in via mail</Button>
            </div>
        );
    }
    const RightComponent = () => {
        return (
            <div id='login-page-image'>
                <img alt="folioplay-logo" src={require('../../../images/folioplayLogo.png')} />
                <h1 style={{ letterSpacing: "2px", fontSize: "2.7rem", fontWeight: "900" }}>FOLIOPLAY</h1>
                <h3 style={{ letterSpacing: "2px" }}>Decentralized fantasy gaming platform</h3>
            </div>
        );
    }
    return (
        <FolioPlayLayout LeftComponent={LeftComponent} RightComponent={RightComponent} />
    );
}