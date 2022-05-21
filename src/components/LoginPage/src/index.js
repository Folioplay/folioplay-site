import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { withStyles } from '@material-ui/core/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TextField from '@mui/material/TextField';
import FolioPlayLayout from '../../../layout/FolioPlayLayout'
import '../style/index.css';
import googleIcon from '../../../images/google_icon.webp'
import metamaskIcon from '../../../images/metamask.png'
import { AuthContext } from "../../../Context/AuthContext";
import walletconnectIcon from '../../../images/walletconnect.png'
import terastationIcon from '../../../images/terastation.png'
import { useMoralis } from "react-moralis";
import Moralis from "moralis";



export default function LoginPage() {

    const { loginWalletConnect, loginMetamask } = useContext(AuthContext);

    const loginWithMail = async () => {
        let email_val = document.getElementById("folioplay-login-mail-button");
        console.log(process.env.REACT_APP_MAGIC_LINK_API_KEY);
        const user = await Moralis.authenticate({
            provider: "magicLink",
            email: {email_val},
            apiKey: process.env.REACT_APP_MAGIC_LINK_API_KEY,
            network: "mainnet"
        })
        console.log(user);
    }

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
    const walletConnectLogin = async () => {
        if (!isAuthenticated) {

            await authenticate({ provider: "walletconnect", chainId: 137 })
                .then(function (user) {
                    console.log(user);
                    window.location.pathname="/tournaments";
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const metamaskLogin = async () => {
        if (!isAuthenticated) {

            await authenticate()
                .then(function (user) {
                    window.location.pathname="/tournaments";
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    //Modal Section
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
                <Button id="folioplay-login-google-button" variant="contained">
                    <img className='mr-3' alt="google-icon" src={googleIcon} width={"20px"} height={"20px"} />
                    Continue With Google</Button>
                <Button id="folioplay-login-meta-button" variant="contained">
                    <FacebookIcon className='mr-3' style={{ color: "var(--violet-blue)" }} />
                    Continue With Meta</Button>
                <h4 id="folioplay-text-separator-wrapper"><span >Or</span></h4>
                <h3 style={{ textAlign: "center" }}>Connect your web3 wallet</h3>
                <div className="folioplay-connect" >
                    <div className='wallets' onClick={metamaskLogin}>
                        <img className='mr-3' alt="metamask-icon" src={metamaskIcon} width={"30px"} height={"30px"} />
                        <h5 className='mt-0 mb-10'>MetaMask</h5>
                    </div>

                    <div className='wallets' onClick={walletConnectLogin}>
                        <img className='mr-3' alt="walletconnect-icon" src={walletconnectIcon} width={"30px"} height={"30px"} />
                        <h5 className='mt-0 mb-10'>WalletConnect</h5>
                    </div>
                    {/* <div className='wallets'>
                        <img className='mr-3' alt="terastation-icon" src={terastationIcon} width={"30px"} height={"30px"} />
                        <h5 className='mt-0 mb-10'>TeraStation</h5>
                    </div> */}
                </div>
                <h4 id="folioplay-text-separator-wrapper"><span>Or</span></h4>
                <CssTextField type="email" sx={{ input: { color: "var(--white)" }, "label": { color: "var(--white)" } }} id="email-field" label="Email address" variant="standard" style={{ marginBottom: "20px" }} required />
                <Button id="folioplay-login-mail-button" onClick={loginWithMail} variant="filled">Sign in via mail</Button>
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