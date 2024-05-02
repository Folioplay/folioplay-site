import React, { useContext, useEffect, useState } from "react";

import FolioPlayLayout from "../../../layout/FolioPlayLayout";

import { getAuthToken, referralCodePost } from "../../../APIS/apis";
import "../style/index.css";
import LeftTournamentView from "./LeftTournamentView";
import RightTournamentView from "./RightTournamentView";
export default function TournamentView() {

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
   
    localStorage.removeItem("user_referral");
  }, []);
  return (
    <FolioPlayLayout
      LeftComponent={LeftTournamentView}
      RightComponent={RightTournamentView}
    />
  );
}
