import React from 'react';
import Button from '@mui/material/Button';
import { withStyles } from '@material-ui/core/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TextField from '@mui/material/TextField';
import FolioPlayLayout from '../../../layout/FolioPlayLayout'
import '../style/index.css';

export default function LoginPage() {
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
                    <img alt="google-icon" src={require('../../../images/google_icon.webp')} width={"20px"} height={"20px"} style={{ marginRight: "3px" }} />
                    Continue With Google</Button>
                <Button id="folioplay-login-meta-button" variant="contained">
                    <FacebookIcon style={{ color: "var(--violet-blue)", marginRight: "3px" }} />
                    Continue With Meta</Button>
                <h4 id="folioplay-text-separator-wrapper"><span >Or</span></h4>
                <h3>Connect your web3 wallet</h3>
                <div id="folioplay-connect-metamask">
                    <img alt="metamask-icon" src={require('../../../images/metamask.png')} width={"60px"} height={"60px"} style={{ marginRight: "3px" }} />
                    <h4 style={{ marginTop: "0px", marginBottom: "10px" }}>MetaMask</h4>
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