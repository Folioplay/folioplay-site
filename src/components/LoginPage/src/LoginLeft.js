import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import "../style/index.css";
import metamaskIcon from "../../../images/metamask.png";
import walletconnectIcon from "../../../images/walletconnect.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useMoralis } from "react-moralis";
import { getAuthToken, referralCodePost } from "../../../APIS/apis";
import Snackbar from "@mui/material/Snackbar";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import MuiAlert from "@mui/material/Alert";
import { useEventCallback } from "@mui/material";
import SplashScreen from "../common/SplashScreen";
import openPrivacyPolicies from "../../PrivacyPolicies/common/openPrivacyPolicies";
import web4authLogo from "../../../images/web3authlogo.jpg";
import { getMagicAuthToken } from "../../../APIS/apis";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../../Redux/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import emailIcon from "../../../images/emailIcon.png"

// Naman dependency
import { FcGoogle } from "react-icons/fc";
import { Magic, } from 'magic-sdk/';
import { OAuthExtension } from "@magic-ext/oauth";






function LoginLeft() {

  const magic = new Magic(process.env.REACT_APP_MAGIC_LINK_API_KEY, {
    extensions: [new OAuthExtension()],
  });
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const navigate = useNavigate();


  const [authenticate, setAuthenticate] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState("");

  const localStoritems = async () => {

    const isLoggedIn = await localStorage.getItem("isLoggedIn");
    await setIsAuthenticated(isLoggedIn);
    await setAuthenticate(isLoggedIn);



  }

  const logout = async () => {
    try {
      localStorage.setItem("authtoken", null);
      localStorage.removeItem("walletconnect");
      await magic.user.logout();

    } catch (err) {
      console.error(err);
    }
  };

  const search = useLocation().search;
  const [referralParam, setReferralParam] = useState("");
  const [policiesAccepted, setPoliciesAccepted] = useState(false);
  const [email, setEmail] = useState("");
  const [openWallet, setOpenWallet] = useState(false);
  const [openChain, setOpenChain] = useState(false);
  // useEffect(() => {
  //   console.log("isauth", isAuthenticated, isInitialized);
  //   if (isAuthenticated && isInitialized)
  //     navigate("tournaments");
  // }, []);

  useEffect(() => {
    localStoritems();
    const code = new URLSearchParams(search).get("code");
    setReferralParam(code);
    localStorage.setItem("user_referral", code);
  }, []);

  // const name = new URLSearchParams(search).get('code');

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
    const user = await authenticate({
      provider: "magicLink",
      email: emailValue,
      apiKey: "pk_live_3CE84BD39270E181",
      network: "mainnet",
    })
      .then(async (user) => {
        // setLoadingTrue();
        await getAuthTokenFunctionEmail(user, emailValue);
      })
      .then(function () {
        localStorage.setItem("walletType", "magicLink");
        // setLoadingFalse();
        window.location.pathname = "tournaments";
      });
  };

  const walletConnectLogin = async () => {
    localStorage.removeItem("authtoken");
    await logout();
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
        })
        .then(async function () {
          localStorage.setItem("walletType", "walletConnect");
          window.location.pathname = "tournaments";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  //Snackbar Wallet component
  const handleWalletClick = () => {
    setOpenWallet(true);
  };
  const handleWalletClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWallet(false);
  };

  //Metamask not installed
  const [presentMetamask, setPresentMetamask] = useState(false);
  const handlePresentMetamaskClick = () => {
    setPresentMetamask(true);
  };
  const handlePresentMetamaskClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPresentMetamask(false);
  };

  //Snackbar Chain component
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
    localStorage.removeItem("authtoken");
    await logout();
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
      // console.log("metamask", window.ethereum);
      if (
        typeof window.ethereum !== 'undefined' &&
        window.ethereum.isMetaMask &&
        window.ethereum.networkVersion === "137"
      ) {
        await authenticate()
          .then(async (user) => {
            // debugger
            await getAuthTokenFunction(user);
          })
          .then(async (user) => {
            localStorage.setItem("walletType", "metamask");
            window.location.pathname = "tournaments";
            // navigate("/tournaments");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        if (typeof window.ethereum === 'undefined') {
          handlePresentMetamaskClick();
        }
        else {
          if (!window.ethereum.isMetaMask) handleWalletClick();
          else {
            if (window.ethereum.networkVersion !== "137") handleChainClick();
          }
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
          Metamask is not your default wallet. Please set up Metamask as your default wallet.
        </Alert>
      </Snackbar>
    );
  };

  const snackBarNoMetamaskComponent = () => {
    return (
      <Snackbar
        open={presentMetamask}
        autoHideDuration={6000}
        onClose={handlePresentMetamaskClose}
      >
        <Alert
          onClose={handlePresentMetamaskClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Metamask is not installed. <a href={"https://metamask.io/download/"} target="_blank">You can install metamask extension from here </a>.
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
          Connect your wallet to Matic Mainnet and refresh page.&nbsp;
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

  const web3Login = async () => {
    localStorage.removeItem("authtoken");
    await logout();
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
      document
        .getElementsByClassName("overlay-div")[0]
        .classList.add("overlay-login");
      await authenticate({
        provider: "web3Auth",
        clientId: `${process.env.REACT_APP_WEB3AUTH_KEY}`,
        loginMethodsOrder: ["google", "facebook"]
      })     //ye ho
        .then(async (user) => {
          if (user === undefined) {
            document
              .getElementsByClassName("overlay-div")[0]
              .classList.remove("overlay-login");
            throw new Error("User Not Found");
          }
          await getAuthTokenFunction(user);
        })
        .then(async function () {
          localStorage.setItem("walletType", "web3Auth");
          window.location.pathname = "tournaments";
          // navigate("tournaments");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  // NAMAN CODES
  //  Google login data sending to google analytics
  // function GoogleAnalyticsLoginData(){
  //   ReactGA.event({
  //     category: "Google Login Event",
  //     action: "Google Login Event",
  //     label: "Google Login Event", // optional   
  //     nonInteraction: false, // optional, true/false

  //   });

  //   ReactGA.send({ hitType: "GoogleLogin", page: "GoogleLogin", title: "GoogleLogin" });
  // }
  // Magic Login By Naman
  const magicGoogleLogin = async () => {
    localStorage.clear();
    await logout();

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
      document
        .getElementsByClassName("overlay-div")[0]
        .classList.add("overlay-login");
      const magic = new Magic("pk_live_3CE84BD39270E181", {
        extensions: [new OAuthExtension()],
      });
      await localStorage.setItem("loginInitiated", true);
      try {
        await magic.oauth.loginWithRedirect({
          provider: "google",
          redirectURI: new URL("/loginverify", window.location.origin).href,

        });


      } catch (err) {
        console.error(err);
      }
    }

  }
  const [account, setAccount] = useState(null);
  const [idToken, setIdToken] = useState();


  const magicEmailLogin = async () => {
    localStorage.clear();
    await logout();

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
      document
        .getElementsByClassName("overlay-div")[0]
        .classList.add("overlay-login");
      const magic = new Magic("pk_live_3CE84BD39270E181");

      await localStorage.setItem("loginInitiated", true);
      try {
        const accounts = await magic.wallet
          .connectWithUI()
          // .on("id-token-created", async(params) => {
          //   await setIdToken(params.idToken);
          //   await localStorage.setItem("didToken", params.idToken);
          //   await console.log("line 15 se " + params.idToken);
          // });

        // const meta = await magic.user.getMetadata();
        // console.log("meta data");
        // console.log(meta);
        // // const accounts = await magic.wallet.connectWithUI();
        // // magic.wallet.connectWithUI().on("id-token-created", (params) => {
        // //   const { idToken } = params;
        // //   console.log(idToken);
        // setAccount(accounts[0]);
        // console.log(accounts[0]);
        // // });

        // const isLoggedIn = await magic.user.isLoggedIn();
        // localStorage.setItem("isLoggedIn", isLoggedIn);
        // console.log("is login" + isLoggedIn);

        // await localStorage.setItem("didToken", idToken);

        // //  await  localStorage.setItem("didToken", didToken);
        // const userEmail = await meta.email;
        // console.log(userEmail);
        // await localStorage.setItem("user", userEmail);
        // const walletAddress = await meta.publicAddress;
        // console.log(walletAddress);
        // await localStorage.setItem("walletAddress", walletAddress);
        // const didToken = await magic.auth.loginWithMagicLink({
        //   email: userEmail
        // });
        // await localStorage.setItem("diiiddddtoken", didToken);
        // console.log("token from 474"+didToken);

        const meta = await magic.user.getMetadata();
        console.log("meta data");
        const userEmail = await meta.email;
        await localStorage.setItem("user", userEmail);
        const didToken = await magic.auth.loginWithMagicLink({
          email: userEmail
        });
       
        await localStorage.setItem("didToken", didToken)
      
        const isLoggedIn = await magic.user.isLoggedIn();
        localStorage.setItem("isLoggedIn", isLoggedIn);
       
        const walletAddress = await meta.publicAddress;
        await localStorage.setItem("walletAddress", walletAddress);
        await getMagicAuthToken(didToken, walletAddress);

        if (didToken) {
          navigate('/loginverify')
        }


        
      } catch (err) {
        console.error(err);
      }
    }

  }




  // const magicEmailLoginMyNew = async (e) => {
  //   localStorage.clear();
  //   await logout();

  //   if (!isAuthenticated) {
  //     if (!policiesAccepted) {
  //       document
  //         .getElementsByClassName("policies-error")[0]
  //         .classList.remove("show");
  //       document
  //         .getElementsByClassName("policies-error")[0]
  //         .classList.add("show");
  //       setTimeout(() => {
  //         document
  //           .getElementsByClassName("policies-error")[0]
  //           .classList.remove("show");
  //       }, 2000);
  //       return;
  //     }
  //     document
  //       .getElementsByClassName("overlay-div")[0]
  //       .classList.add("overlay-login");
  //     const magic = new Magic("pk_live_3CE84BD39270E181");

  //     await localStorage.setItem("loginInitiated", true);
  //     try {
  //       // e.preventDefault();
  //       const didToken = await magic.auth.loginWithMagicLink({
  //         email: email
  //       });
  //       await console.log("didToken: ", didToken);
  //       await localStorage.setItem("didToken", didToken)
  //       await localStorage.setItem("didToken", didToken)
  //       const meta = await magic.user.getMetadata();
  //       console.log("meta data");
  //       console.log(meta);
  //       const isLoggedIn = await magic.user.isLoggedIn();
  //       localStorage.setItem("isLoggedIn", isLoggedIn);
  //       const userEmail = await meta.email;
  //       await localStorage.setItem("user", userEmail);
  //       const walletAddress = await meta.publicAddress;
  //       await localStorage.setItem("walletAddress", walletAddress);
  //       await getMagicAuthToken(didToken, walletAddress);

  //       if (didToken) {
  //         navigate('/loginverify')
  //       }

  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  // }





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
      localStorage.setItem(
        "folioplay_new_user",
        fetchUserDetails.new_user === true
      );
      // dispatch(userDetails(fetchUserDetails));
    } catch (e) {
      await logout();
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
      localStorage.setItem(
        "folioplay_new_user",
        fetchUserDetails.newUser === "true"
      );
      // dispatch(userDetails(fetchUserDetails));
    } catch (e) {
      await logout();
    }
  };

  const [isVisible, setIsVisible] = useState(true);
  setTimeout(() => {
    setIsVisible(false);
  }, 2500);

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
      <div style={{ width: "100%", height: "30px" }}></div>
      {/*<h3 style={{ textAlign: "center" }} className="font-weight-500">*/}
      {/*  Connect your web3 wallet*/}
      {/*</h3>*/}
      {/* <div className="folioplay-connect">
        <Button
          style={{
            width: "min(320px,100%)",
            height: "45px",
          }}
          className="folioplay-login-google-button mb-15"
          variant="contained"
          onClick={() => {
            metamaskLogin();
          }}
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
          onClick={() => {
            walletConnectLogin();
          }}
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
      </div> */}

      {/* <div style={{ width: "100%", height: "20px" }}></div> */}
      {/* <h4 className="folioplay-text-separator-wrapper">
        <span>Or</span>
      </h4> */}



      <div style={{ width: "100%", height: "30px" }}></div>
      {/* <label
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
        onClick={() => magicEmailLoginMyNew()}
        variant="filled"
        size="medium"
      >
        Continue
        <ArrowForwardIcon className="ml-10" style={{ fontSize: "16px" }} />
      </Button> */}
      <div className="folioplay-connect">
        <Button
          style={{
            width: "min(320px,100%)",
            height: "45px",
            display:"flex",
            
          }}
          className="folioplay-login-google-button"
          variant="contained"
          onClick={() => {
            magicEmailLogin();
          }}
        >
          <img src={emailIcon} alt="email"  style={{width:'8%',padding:"0 5px 0 0"}}/> {"    "} 
          {/* <FcGoogle size={"1.5rem"} /> &nbsp; */}
          {/* <img
            className="mr-8"
            alt="metamask-icon"
            src={web4authLogo}
            width={"24px"}
            height={"24px"}
        />{" "} */}
          Login/Register with Email
        </Button>
      </div>


      <div className="folioplay-connect">
        <Button
          style={{
            width: "min(320px,100%)",
            height: "45px"
            ,padding:"0 5px 0 0"
          }}
          className="folioplay-login-google-button"
          variant="contained"
          onClick={() => {
            magicGoogleLogin();
          }}
        >
          <FcGoogle size={"1.5rem"} /> &nbsp;
          {/* <img
            className="mr-8"
            alt="metamask-icon"
            src={web4authLogo}
            width={"24px"}
            height={"24px"}
          />{" "} */}
         Login/Register with Google
        </Button>
      </div>
      {snackBarChangeWalletComponent()}
      {snackBarChangeChainComponent()}
      {snackBarNoMetamaskComponent()}
      <span className="mt-20" style={{ marginLeft: "26px" }}>
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
          className="font-size-15 mr-auto"
          htmlFor="privacy-policies"
        >
          I agree to T&C &
          <span
            className="login-privacy-policies ml-10"
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
