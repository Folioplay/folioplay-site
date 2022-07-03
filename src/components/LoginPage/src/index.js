import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import "../style/index.css";
import metamaskIcon from "../../../images/metamask.png";
import walletconnectIcon from "../../../images/walletconnect.png";
import { useMoralis } from "react-moralis";
import { getAuthToken } from "../../../APIS/apis";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginPage() {
  const { authenticate, authError, isAuthenticated, isAuthenticating, user, account, logout, isInitialized } = useMoralis();
  console.log(isAuthenticated, isAuthenticating, user, account);

  const [email, setEmail] = useState("");

  const loginWithMail = async () => {
    const email = document.getElementById("email-field").value;
    const user = await authenticate({
      provider: "magicLink",
      email: email,
      apiKey: process.env.REACT_APP_MAGIC_LINK_API_KEY,
      network: "mainnet",
    })
        .then(async (user) => {
          await getAuthTokenFunction(user);
          console.log(user);
        })
        .then(function () {
          localStorage.setItem("walletType", "magicLink");
          window.location.pathname = "/tournaments";
        });
  };

  const walletConnectLogin = async () => {
    if (!isAuthenticated) {
      localStorage.clear();
      await authenticate({ provider: "walletconnect", chainId: 137 })
          .then(async (user) => {
            await getAuthTokenFunction(user);
            console.log(user);
          })
          .then(function () {
            localStorage.setItem("walletType", "walletConnect");
            window.location.pathname = "/tournaments";
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  };

  //Snackbar Wallet component
    const [openWallet, setOpenWallet] = useState(false);
    const handleWalletClick = () => {
        setOpenWallet(true);
    };
    const handleWalletClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenWallet(false);
    };

    //Snackbar Chain component
    const [openChain, setOpenChain] = useState(false);
    const handleChainClick = () => {
        setOpenChain(true);
    };
    const handleChainClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenChain(false);
    };



    const metamaskLogin = async () => {
    if (!isAuthenticated) {
        if(window.ethereum.networkVersion===137 && window.ethereum.isMetaMask) {
            await authenticate()
                .then(async (user) => {
                    await getAuthTokenFunction(user);
                })
                .then((user) => {
                    localStorage.setItem("walletType", "metamask");
                    window.location.pathname = "/tournaments";
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else{
            if(!window.ethereum.isMetaMask)
                handleWalletClick();
            else{
                if(window.ethereum.networkVersion!==137)
                    handleChainClick()
            }
        }
    }
  };

  const snackBarChangeWalletComponent = () => {
      return(
          <Snackbar open={openWallet} autoHideDuration={6000} onClose={handleWalletClose}>
              <Alert onClose={handleWalletClose} severity="error" sx={{ width: '100%' }}>
                  Metamask is not your default wallet. Please change your default wallet to metamask.
              </Alert>
          </Snackbar>
      )
  }

    const snackBarChangeChainComponent = () => {
        return(
            <Snackbar open={openChain} autoHideDuration={6000} onClose={handleChainClose}>
                <Alert onClose={handleChainClose} severity="error" sx={{ width: '100%' }}>
                    Connect your wallet to Matic mainnet.
                    <a target="_blank" href="https://decentralizedcreator.com/add-polygon-matic-network-to-metamask/#:~:text=To%20add%20manually%2C%20open%20your,and%20block%20explorer%20URL%20manually.">
                        Find more details on this link.
                    </a>
                </Alert>
            </Snackbar>
        )
    }


  const web3AuthLogin = async () => {
    if (!isAuthenticated) {
      await authenticate({
        provider: "web3Auth",
        clientId: process.env.REACT_APP_WEB3AUTH_KEY,
        chainId: 137,
        theme: "dark",
      })
          .then((user) => {
            localStorage.setItem("walletType", "web3Auth");
            window.location.pathname = "/tournaments";
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  };

  const logOut = async () => {
    localStorage.setItem("authtoken", null);
    localStorage.removeItem("walletconnect");
    await logout();
    window.location.pathname = "/";
  }

  const getAuthTokenFunction = async (user) => {
    const walletAddress = user.get("ethAddress");
    const walletSignature = user["attributes"].authData.moralisEth.signature;
    try {
      await getAuthToken(walletAddress, walletSignature, email);
    }
    catch (e) {
      await logOut();
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
      "&:hover fieldset": {
        borderColor: "var(--white)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--white)",
      },
    },
  })(TextField);

  const LeftComponent = () => {
    return (
      <div id="folioplay-login-wrapper">
        <Button
          id="folioplay-login-google-button"
          variant="contained"
          onClick={web3AuthLogin}
        >
          {/*<img className='mr-3' alt="google-icon" src={googleIcon} width={"20px"} height={"20px"} />*/}
          Continue With Web3Auth
        </Button>
        {/*<Button id="folioplay-login-meta-button" variant="contained">*/}
        {/*    <FacebookIcon className='mr-3' style={{ color: "var(--violet-blue)" }} />*/}
        {/*    Continue With Meta</Button>*/}
        <h4 id="folioplay-text-separator-wrapper">
          <span>Or</span>
        </h4>
        <h3 style={{ textAlign: "center" }}>Connect your web3 wallet</h3>
        <div className="folioplay-connect">
          <div className="wallets" onClick={metamaskLogin}>
            <img
              className="mr-3"
              alt="metamask-icon"
              src={metamaskIcon}
              width={"40px"}
              height={"40px"}
            />
            <h5 className="mt-0 mb-10">MetaMask</h5>
          </div>

          <div className="wallets" onClick={walletConnectLogin}>
            <img
              className="mr-3"
              alt="walletconnect-icon"
              src={walletconnectIcon}
              width={"40px"}
              height={"40px"}
            />
            <h5 className="mt-0 mb-10">WalletConnect</h5>
          </div>
          {/* <div className='wallets'>
                        <img className='mr-3' alt="terastation-icon" src={terastationIcon} width={"30px"} height={"30px"} />
                        <h5 className='mt-0 mb-10'>TeraStation</h5>
                    </div> */}
        </div>
        <h4 id="folioplay-text-separator-wrapper">
          <span>Or</span>
        </h4>
        <CssTextField
          type="email"
          sx={{
            input: { color: "var(--white)" },
            label: { color: "var(--white)" },
          }}
          id="email-field"
          label="Email address"
          variant="standard"
          style={{ marginBottom: "20px" }}
          required
        />
        <Button
          id="folioplay-login-mail-button"
          onClick={loginWithMail}
          variant="filled"
        >
          Sign in via mail
        </Button>
          {snackBarChangeWalletComponent()}
          {snackBarChangeChainComponent()}
        {/*<button onClick={logout}>logout</button>*/}
      </div>
    );
  };

  const RightComponent = () => {
    return (
      <div id="login-page-image">
        <img
          alt="folioplay-logo"
          src={require("../../../images/folioplayLogo.png").default}
        />
        {/* <h1
          style={{
            letterSpacing: "2px",
            fontSize: "2.7rem",
            fontWeight: "900",
          }}
        >
          FOLIOPLAY
        </h1> */}
        <img src={require('../../../images/white_folioplay.svg').default} />
        <h3 style={{ letterSpacing: "2px" }}>
          Decentralized fantasy gaming platform
        </h3>
      </div>
    );
  };
  return (
    <FolioPlayLayout
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
}
