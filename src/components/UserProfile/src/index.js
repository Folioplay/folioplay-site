import React from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import FolioplayBar from "../../FolioplayBar/src";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import "../style/index.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { useMoralis } from "react-moralis";
export default function UserProfile() {
  const { user } = useMoralis();
  const walletAdd = user.attributes.ethAddress;
  function copytoClipboard() {
    navigator.clipboard.writeText(walletAdd);
    document.getElementsByClassName("copied")[0].classList.remove("show");
    document.getElementsByClassName("copied")[0].classList.add("show");
    setTimeout(() => {
      var selectedClass = document.getElementsByClassName("copied");
      if (selectedClass.length > 0) selectedClass[0].classList.remove("show");
    }, 2000);
  }
  const LeftComponent = () => {
    return (
      <div className="fullpage">
        <FolioplayBar />
        <div className="wallet-add-space">
          <span className="wallet-info font-size-25 font-weight-800">
            <AccountBalanceWalletIcon
              fontSize="large"
              style={{ color: "var(--white)" }}
            />
            <span className="wallet-address ml-20">
              {walletAdd.substring(0, 6) +
                "...." +
                walletAdd.substring(walletAdd.length - 4)}
            </span>
            <ContentCopyIcon
              id="copy-to-clipboard"
              className="ml-20"
              fontSize="medium"
              style={{ color: "var(--white)" }}
              onClick={copytoClipboard}
            />
          </span>
        </div>
        <div className="profile-info-wrapper"></div>
        <div className="copied">
          <DoneIcon /> <span className="ml-10">Copied to clipboard</span>
        </div>
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
        <img src={require("../../../images/white_folioplay.svg").default} />
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
