import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import "../style/index.css";
import metamaskIcon from "../../../images/metamask.png";
import walletconnectIcon from "../../../images/walletconnect.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMoralis } from "react-moralis";
import { getAuthToken } from "../../../APIS/apis";
import Snackbar from "@mui/material/Snackbar";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import MuiAlert from "@mui/material/Alert";
import { useEventCallback } from "@mui/material";
import SplashScreen from "../common/SplashScreen";
import openPrivacyPolicies from "../../PrivacyPolicies/common/openPrivacyPolicies";
import googleIcon from "../../../images/google_icon.webp";
import metaIcon from "../../../images/meta.png";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../../Redux/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";

function LoginLeft() {
  const magic = new Magic(process.env.REACT_APP_MAGIC_LINK_API_KEY, {
    extensions: [new OAuthExtension()],
  });
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const navigate = useNavigate();
  const {
    authenticate,
    authError,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
    isInitialized,
  } = useMoralis();
  console.log(isAuthenticated, isAuthenticating, user, account);
  const [policiesAccepted, setPoliciesAccepted] = useState(false);
  useEffect(() => {
    console.log("isauth", isAuthenticated, isInitialized);
    if (isAuthenticated && isInitialized) navigate("tournaments");
  }, []);

  const [email, setEmail] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  // For policy
  const loginWithMail = async () => {
    if (!policiesAccepted) {
      document
        .getElementsByClassName("policies-error")[0]
        .classList.remove("show");
      document
        .getElementsByClassName("policies-error")[0]
        .classList.add("show");
      setTimeout(() => {
        document
          .getElementsByClassName("policies-error")[0]
          .classList.remove("show");
      }, 2000);
      return;
    }
    const emailValue = document.getElementById("email-field").value;
    console.log(emailValue);
    console.log(magicEmail);
    const user = await authenticate({
      provider: "magicLink",
      email: emailValue,
      apiKey: process.env.REACT_APP_MAGIC_LINK_API_KEY,
      network: "mainnet",
    })
      .then(async (user) => {
        console.log("user", user);
        await getAuthTokenFunctionEmail(user, emailValue);
        console.log(user);
      })
      .then(function () {
        localStorage.setItem("walletType", "magicLink");
        navigate("tournaments");
      });
  };

  const walletConnectLogin = async () => {
    if (!isAuthenticated) {
      if (!policiesAccepted) {
        document
          .getElementsByClassName("policies-error")[0]
          .classList.remove("show");
        document
          .getElementsByClassName("policies-error")[0]
          .classList.add("show");
        setTimeout(() => {
          document
            .getElementsByClassName("policies-error")[0]
            .classList.remove("show");
        }, 2000);
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
          navigate("tournaments");
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
    if (reason === "clickaway") {
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
    if (reason === "clickaway") {
      return;
    }
    setOpenChain(false);
  };

  const metamaskLogin = async () => {
    if (!isAuthenticated) {
      if (!policiesAccepted) {
        document
          .getElementsByClassName("policies-error")[0]
          .classList.remove("show");
        document
          .getElementsByClassName("policies-error")[0]
          .classList.add("show");
        setTimeout(() => {
          document
            .getElementsByClassName("policies-error")[0]
            .classList.remove("show");
        }, 2000);
        return;
      }
      if (
        window.ethereum.networkVersion === "137" &&
        window.ethereum.isMetaMask
      ) {
        await authenticate()
          .then(async (user) => {
            await getAuthTokenFunction(user);
          })
          .then((user) => {
            localStorage.setItem("walletType", "metamask");
            navigate("tournaments");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        if (!window.ethereum.isMetaMask) handleWalletClick();
        else {
          if (window.ethereum.networkVersion !== "137") handleChainClick();
        }
      }
    }
  };

  const snackBarChangeWalletComponent = () => {
    return (
      <Snackbar
        open={openWallet}
        autoHideDuration={6000}
        onClose={handleWalletClose}
      >
        <Alert
          onClose={handleWalletClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Metamask is not your default wallet. Please change your default wallet
          to metamask.
        </Alert>
      </Snackbar>
    );
  };

  const snackBarChangeChainComponent = () => {
    return (
      <Snackbar
        open={openChain}
        autoHideDuration={6000}
        onClose={handleChainClose}
      >
        <Alert
          onClose={handleChainClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Connect your wallet to Matic mainnet. And refresh page.
          <a
            target="_blank"
            href="https://decentralizedcreator.com/add-polygon-matic-network-to-metamask/#:~:text=To%20add%20manually%2C%20open%20your,and%20block%20explorer%20URL%20manually."
          >
            Find more details on this link.
          </a>
        </Alert>
      </Snackbar>
    );
  };

  const googleOAuthLogin = async () => {
    const test = await magic.oauth.loginWithRedirect({
      provider: "google",
      redirectURI:
        "https://auth.magic.link/v1/oauth2/lY3H4aMq_4Rt1Tk1f-kSPekWRGNsPoxe9JZUdk7Y9WI=/callback",
    });
    // const result = await magic.oauth.getRedirectResult();
    // console.log(result);
    console.log(test);
  };
  const metaOAuthLogin = () => {};

  const logOut = async () => {
    localStorage.setItem("authtoken", null);
    localStorage.removeItem("walletconnect");
    await logout();
    navigate("/");
  };

  const [magicEmail, setMagicEmail] = useState("");
  const setMagicEmailFunc = (e) => {
    e.preventDefault();
    const emailtest = document.getElementById("email-field").value;
    setMagicEmail(emailtest);
  };

  // const dispatch = useDispatch();
  // const getUserDetailsGlobal = useSelector(state => state.AuthSlice.user);
  // console.log(getUserDetailsGlobal);

  const getAuthTokenFunction = async (user) => {
    const walletAddress = user.get("ethAddress");
    const walletSignature = user["attributes"].authData.moralisEth.signature;
    try {
      const fetchUserDetails = await getAuthToken(
        walletAddress,
        walletSignature,
        email
      );
      console.log(fetchUserDetails);
      localStorage.setItem("folioplay_new_user", fetchUserDetails.new_user);
      // dispatch(userDetails(fetchUserDetails));
    } catch (e) {
      await logOut();
    }
  };

  const getAuthTokenFunctionEmail = async (user, emailVal) => {
    const walletAddress = user.get("ethAddress");
    const walletSignature = user["attributes"].authData.moralisEth.signature;
    try {
      const fetchUserDetails = await getAuthToken(
        walletAddress,
        walletSignature,
        emailVal
      );
      console.log(fetchUserDetails);
      localStorage.setItem("folioplay_new_user", fetchUserDetails.new_user);
      // dispatch(userDetails(fetchUserDetails));
    } catch (e) {
      await logOut();
    }
  };

  const [isVisible, setIsVisible] = useState(true);
  setTimeout(() => {
    setIsVisible(false);
  }, 3500);

  const handlePolicyChange = (e) => {
    // e.preventDefault();
    setPoliciesAccepted(!policiesAccepted);
  };
  return (
    <div id="folioplay-login-wrapper">
      <SplashScreen isVisible={isVisible} />
      <span
        className="font-size-30 font-weight-700 mr-auto ml-auto"
        style={{
          lineHeight: "40px",
          textAlign: "center",
          transform: "translateY(-50px)",
        }}
      >
        Continue using
      </span>
      <div className="folioplay-connect">
        <Button
          style={{
            width: "min(320px,100%)",
            height: "45px",
          }}
          className="folioplay-login-google-button"
          variant="contained"
          onClick={googleOAuthLogin}
        >
          <img
            className="mr-8"
            alt="metamask-icon"
            src={googleIcon}
            width={"24px"}
            height={"24px"}
          />{" "}
          Google
        </Button>
        <Button
          style={{
            width: "min(320px,100%)",
            height: "45px",
          }}
          className="folioplay-login-google-button"
          variant="contained"
          onClick={metaOAuthLogin}
        >
          <img
            className="mr-8"
            alt="metamask-icon"
            src={metaIcon}
            width={"24px"}
            height={"24px"}
          />{" "}
          Meta
        </Button>
      </div>
      <h4 className="folioplay-text-separator-wrapper">
        <span>Or</span>
      </h4>
      <div style={{ width: "100%", height: "30px" }}></div>
      {/*<h3 style={{ textAlign: "center" }} className="font-weight-500">*/}
      {/*  Connect your web3 wallet*/}
      {/*</h3>*/}
      <div className="folioplay-connect">
        <Button
          style={{
            width: "min(320px,100%)",
            height: "45px",
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
          />{" "}
          MetaMask
        </Button>
        <Button
          style={{
            width: "min(320px,100%)",
            height: "45px",
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
          />{" "}
          Wallet Connect
        </Button>
      </div>
      <div style={{ width: "100%", height: "20px" }}></div>
      <h4 className="folioplay-text-separator-wrapper">
        <span>Or</span>
      </h4>
      <div style={{ width: "100%", height: "30px" }}></div>
      <label
        style={{ width: "min(320px,100%)" }}
        className="font-size-12 ml-auto mr-auto"
        htmlFor="email-field"
      >
        Email ID
      </label>
      <input
        type="email"
        placeholder="Mention your Email ID here"
        required
        // autoFocus
        value={email}
        name="email-field"
        id="email-field"
        onChange={(e) => handleChange(e)}
      />
      <Button
        id="folioplay-login-mail-button"
        onClick={loginWithMail}
        variant="filled"
        size="medium"
      >
        Continue
        <ArrowForwardIcon className="ml-10" style={{ fontSize: "16px" }} />
      </Button>
      {snackBarChangeWalletComponent()}
      {snackBarChangeChainComponent()}
      <span className="mt-20">
        <input
          type="checkbox"
          required
          name="privacy-policies"
          id="privacy-policies"
          style={{ width: "30px" }}
          checked={policiesAccepted}
          onClick={handlePolicyChange}
        />
        <label
          className="font-size-15 ml-auto mr-auto"
          htmlFor="privacy-policies"
        >
          Agree to Folioplay
          <span
            className="login-privacy-policies ml-20"
            onClick={openPrivacyPolicies}
          >
            <u>Privacy Policies</u>
          </span>
        </label>
      </span>
      <div className="policies-error">
        <ErrorOutlineOutlinedIcon />
        <span className="ml-10">Accept Privacy Policies !!</span>
      </div>

      {/*<button onClick={logout}>logout</button>*/}
    </div>
  );
}

export default LoginLeft;
