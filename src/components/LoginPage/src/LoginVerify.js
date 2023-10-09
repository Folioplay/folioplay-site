import { useEffect, useState } from "react";
// import { magic } from "../lib/magic";
import { json, useNavigate } from "react-router-dom";
import { Magic } from 'magic-sdk';
import { OAuthExtension } from "@magic-ext/oauth";
import { getMagicAuthToken } from "../../../APIS/apis";
import ReactLoading from "react-loading";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import folioPlayLogo from "../../../images/FPLogoManifest.png"

import folioPlayLogoText from "../../../images/white_folioplay.svg"
const LoginVerify = () => {
  const [res, setRes] = useState(' ');
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);



  // const magic = new Magic("pk_live_3CE84BD39270E181", {
  //   extensions: [new OAuthExtension()],
  // });
  // const finishSocialLogin = async () => {
  //   try {
  //     const result = await magic.oauth.getRedirectResult();

  //      setUser(result);
  //     console.log("result neeche hai");
  //     setRes(result);
  //     console.log("json uper hai");
  //     console.log(result);
  //     console.log("result uper hai");

  //     const meta  = await magic.user.getMetadata();
  //     console.log("meta data 31 line"+ JSON.stringify(meta))
  //     console.log("string resposnse  user data 32 line"+ JSON.stringify(user))
  //     console.log("user resposnse 33 line"+ user)

  //   } catch (err) {
  //     console.error(err);
  //   }

  //   console.log("res neche hai");
  //     console.log(res);
  //     console.log("res uper hai");
  // }

  const magic = new Magic("pk_live_3CE84BD39270E181", {
    extensions: [new OAuthExtension()],
  });
  const finishSocialLogin = async () => {
    setIsLoading(true);
    const Loggedinn = await localStorage.getItem("isLoggedIn");
    if (!Loggedinn) {
      setIsLoading(true);
      try {
        const result = await magic.oauth.getRedirectResult();

        await setUser(result);
        // await console.log("result neeche hai");
        //   // setRes(result);
        //   await console.log("json uper hai");
        //   await console.log(user);
        //   await console.log("result uper hai");

        const meta = await magic.user.getMetadata();
        // console.log("meta data 31 line"+ JSON.stringify(meta))
        //  console.log("string resposnse  user data 32 line"+" "+JSON.stringify(user))
        // console.log("user resposnse 33 line"+ user);
        const isLoggedIn = await magic.user.isLoggedIn();
        localStorage.setItem("isLoggedIn", isLoggedIn);
        const didToken = await result.magic.idToken;
        await localStorage.setItem("didToken", didToken);

        //  await  localStorage.setItem("didToken", didToken);
        const userEmail = await result.magic.userMetadata.email;
        await localStorage.setItem("user", userEmail);
        const walletAddress = await result.magic.userMetadata.publicAddress;
        await localStorage.setItem("walletAddress", walletAddress);
        await getMagicAuthToken(didToken, walletAddress);


        navigate("/tournaments");
        window.location.reload();

      } catch (err) {
        console.error(err);
      }

    } else {
      // navigate("/tournaments")
    }

  }



  useEffect(() => {
    setIsLoading(true);

    finishSocialLogin();
  }, []);

  const logout = async () => {
    try {
      localStorage.clear();
      await magic.user.logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const cons = async () => {
    try {
      console.log(user)

      // console.log(user.magic.userMetadata.email)
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ width: '100vw', height: "100vh", backgroundColor: "#453df1", position: "absolute" }}>

        <LinearProgress style={{ color: "blue", padding: "2px 0 0 0", backgroundColor: "white" }} />
        <Box sx={{ display: 'flex', justifyContent: "center", width: "100%", backgroundColor: "blue" }}>
          <div className="loginverfiyPageBlink">
            <div className="blinkData">
              <div>
                <img src={folioPlayLogo} alt="folioplayLogo" style={{ zIndex: "1", width: "40%" }} />
              </div>
              <div> <img src={folioPlayLogoText} alt="folioplayLogo" style={{ zIndex: "1", width: "50%" }} />
              </div>
            </div></div>
        </Box>

      </Box>
    )
  } else {
    return (
      <div className="container">
        {!user && <div className="loading">Loading...</div>}

        {user && (
          <div>
            <h1>Data returned:</h1>
            <pre className="user-info">{JSON.stringify(user, null, 3)}</pre>
          </div>
        )}
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
        <button className="logout-button" onClick={cons}>
          console
        </button>
      </div>
    );
  }


};

export default LoginVerify;

