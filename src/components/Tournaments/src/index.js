import React, { useContext, useEffect, useState } from "react";
import { getAuthToken, referralCodePost } from "../../../APIS/apis";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import "../style/index.css";
import { useMoralis } from "react-moralis";

import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";

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
  const { user, isAuthenticated, logout } = useMoralis();
  useEffect(() => {
    async function authTokenGet() {
      if (isAuthenticated && localStorage.getItem("authtoken") == null) {
        await getAuthToken(user);
      }
    }
    authTokenGet();
    localStorage.removeItem("user_referral");
  }, []);

  return (
    <FolioPlayLayout
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
}
