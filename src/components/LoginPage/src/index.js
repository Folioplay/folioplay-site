import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import "../style/index.css";
import metamaskIcon from "../../../images/metamask.png";
import walletconnectIcon from "../../../images/walletconnect.png";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useMoralis } from "react-moralis";
import { getAuthToken } from "../../../APIS/apis";
import Snackbar from "@mui/material/Snackbar";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import MuiAlert from "@mui/material/Alert";
import { useEventCallback } from "@mui/material";
import SplashScreen from "../common/SplashScreen";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginPage() {
  const { authenticate, authError, isAuthenticated, isAuthenticating, user, account, logout, isInitialized } = useMoralis();
  console.log(isAuthenticated, isAuthenticating, user, account);
  const [policiesAccepted, setPoliciesAccepted] = useState(false);
  useEffect(() => {
    console.log("isauyth", isAuthenticated, isInitialized)
    if (isAuthenticated && isInitialized)
      window.location.pathname = "/tournaments";
  }, [])

  const [email, setEmail] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  }
  const loginWithMail = async () => {
    if (!policiesAccepted) {
      document.getElementsByClassName('policies-error')[0].classList.remove("show");
      document.getElementsByClassName('policies-error')[0].classList.add("show");
      setTimeout(() => {
        document.getElementsByClassName('policies-error')[0].classList.remove("show");
      }, 2000)
      return;
    }
    // const email = document.getElementById("email-field").value;
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
      if (!policiesAccepted) {
        document.getElementsByClassName('policies-error')[0].classList.remove("show");
        document.getElementsByClassName('policies-error')[0].classList.add("show");
        setTimeout(() => {
          document.getElementsByClassName('policies-error')[0].classList.remove("show");
        }, 2000)
        return;
      }
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
      if (!policiesAccepted) {
        document.getElementsByClassName('policies-error')[0].classList.remove("show");
        document.getElementsByClassName('policies-error')[0].classList.add("show");
        setTimeout(() => {
          document.getElementsByClassName('policies-error')[0].classList.remove("show");
        }, 2000)
        return;
      }
      if (window.ethereum.networkVersion === "137" && window.ethereum.isMetaMask) {
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
      else {
        if (!window.ethereum.isMetaMask)
          handleWalletClick();
        else {
          if (window.ethereum.networkVersion !== "137")
            handleChainClick()
        }
      }
    }
  };

  const snackBarChangeWalletComponent = () => {
    return (
      <Snackbar open={openWallet} autoHideDuration={6000} onClose={handleWalletClose}>
        <Alert onClose={handleWalletClose} severity="error" sx={{ width: '100%' }}>
          Metamask is not your default wallet. Please change your default wallet to metamask.
        </Alert>
      </Snackbar>
    )
  }

  const snackBarChangeChainComponent = () => {
    return (
      <Snackbar open={openChain} autoHideDuration={6000} onClose={handleChainClose}>
        <Alert onClose={handleChainClose} severity="error" sx={{ width: '100%' }}>
          Connect your wallet to Matic mainnet. And refresh page.
          <a target="_blank" href="https://decentralizedcreator.com/add-polygon-matic-network-to-metamask/#:~:text=To%20add%20manually%2C%20open%20your,and%20block%20explorer%20URL%20manually.">
            Find more details on this link.
          </a>
        </Alert>
      </Snackbar>
    )
  }


  const web3AuthLogin = async () => {

    if (!isAuthenticated) {
      if (!policiesAccepted) {
        document.getElementsByClassName('policies-error')[0].classList.remove("show");
        document.getElementsByClassName('policies-error')[0].classList.add("show");
        setTimeout(() => {
          document.getElementsByClassName('policies-error')[0].classList.remove("show");
        }, 2000)
        return;
      }
      console.log("not auth and i am in web3 auth");
      await authenticate({
        provider: "web3Auth",
        clientId: process.env.REACT_APP_WEB3AUTH_KEY,
        chainId: 137
      }).then((user) => {
        console.log(user);
        localStorage.setItem("walletType", "web3Auth");
        // window.location.pathname = "/tournaments";
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
  const [isVisible, setIsVisible] = useState(true);
  setTimeout(() => {
    setIsVisible(false);
  }, 2500)
  const LeftComponent = () => {
    return (
      <div id="folioplay-login-wrapper">
        <SplashScreen isVisible={isVisible} />
        <span className="font-size-30 font-weight-700 mr-auto ml-auto" style={{ lineHeight: "40px", textAlign: "center", transform: "translateY(-50px)" }}>Continue using</span>
        <Button
          style={{
            marginLeft: "auto", marginRight: "auto",
            width: "min(320px,100%)",
            height: "45px"
          }}
          className="folioplay-login-google-button"
          variant="contained"
          onClick={web3AuthLogin}
        >
          Continue With Web3Auth
        </Button>
        <h4 className="folioplay-text-separator-wrapper">
          <span>Or</span>
        </h4>
        <div style={{ width: "100%", height: "30px" }}></div>
        <h3 style={{ textAlign: "center" }} className="font-weight-500">Connect your web3 wallet</h3>
        <div className="folioplay-connect">
          <Button
            style={{
              width: "min(320px,100%)",
              height: "45px"
            }}
            className="folioplay-login-google-button mb-15"
            variant="contained"
            onClick={metamaskLogin}
          >
            <img
              className="mr-8"
              alt="metamask-icon"
              src={metamaskIcon}
              width={"24px"}
              height={"22px"}
            /> MetaMask
          </Button>
          <Button
            style={{
              width: "min(320px,100%)",
              height: "45px"
            }}
            className="folioplay-login-google-button"
            variant="contained"
            onClick={walletConnectLogin}
          >
            <img
              className="mr-8"
              alt="metamask-icon"
              src={walletconnectIcon}
              width={"24px"}
              height={"24px"}
            /> Wallet Connect
          </Button>
        </div>
        <div style={{ width: "100%", height: "20px" }}></div>
        <h4 className="folioplay-text-separator-wrapper">
          <span>Or</span>
        </h4>
        <div style={{ width: "100%", height: "30px" }}></div>
        <label style={{ width: "min(320px,100%)" }} className="font-size-12 ml-auto mr-auto" htmlFor="email-field">Email ID</label>
        <input autoFocus key="email-id" type={"email"} placeholder="Mention your Email ID here" required name="email-field" id="email-field" value={email} onChange={(event) => handleChange(event)} />
        <Button
          id="folioplay-login-mail-button"
          onClick={loginWithMail}
          variant="filled"
          size="medium"
        >
          Continue <ArrowForwardIcon className="ml-10" style={{ fontSize: "16px" }} />
        </Button>
        {snackBarChangeWalletComponent()}
        {snackBarChangeChainComponent()}
        <span className="mt-20">
          <input type="checkbox" required name="privacy-policies" id="privacy-policies" style={{ width: "30px" }} checked={policiesAccepted} onChange={() => { setPoliciesAccepted(!policiesAccepted) }} />
          <label className="font-size-15 ml-auto mr-auto" htmlFor="privacy-policies">Agree to Folioplay <u>Privacy Policies</u></label>
        </span>
        <div className="policies-error">
          <ErrorOutlineOutlinedIcon />  <span className="ml-10">Accept Privacy Policies !!</span>
        </div>
        {/*<button onClick={logout}>logout</button>*/}
      </div >
    );
  };

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
  };
  return (
    <FolioPlayLayout
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
}
