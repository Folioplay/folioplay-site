import React, { useContext, useEffect, useState } from "react";
import { getAuthToken, referralCodePost } from "../../../APIS/apis";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import "../style/index.css";
// import { useMoralis } from "react-moralis";
import {chooseTeamOpen} from "../common/chooseTeamAnimations";
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
import ReactGA from "react-ga4";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};



export default function Tournaments() {
  ReactGA.initialize(process.env.REACT_APP_GA_ID);
  const [user, setUser] =useState("");
  const [isAuthenticated, setIsAuthenticated] =useState("");

  const localStoritems = async () => {
    const userr = await localStorage.getItem("user");
    await setUser(userr);
    const isLoggedIn = await localStorage.getItem("isLoggedIn");
    await setIsAuthenticated(isLoggedIn);
  }

  // const { user, isAuthenticated, logout } = useMoralis();
  useEffect(() => {
    localStoritems();
    async function authTokenGet() {
      const isAuthenticated = localStorage.getItem("isLoggedIn")
      if (isAuthenticated && localStorage.getItem("authtoken") == null) {
        await getAuthToken(user);
      
      }
    }
    authTokenGet();
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: window.location.pathname
    });
    localStorage.removeItem("user_referral");
  }, []);

  return (
    <FolioPlayLayout
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
}
