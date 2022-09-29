import React, {useContext, useEffect, useState} from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import FolioplayBar from "../../FolioplayBar/src";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import "../style/index.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from "@mui/icons-material/Done";
import { useMoralis } from "react-moralis";
import InlineEdit from "../common/InlineEditComponent";
import {TextField} from "@mui/material";
import {changeUserName, checkAvailableUsername} from "../../../APIS/apis";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {AuthContext} from "../../../Context/AuthContext";
export default function UserProfile() {

  // const { user } = useMoralis();
  // const walletAdd = user.attributes.ethAddress;
  // function copytoClipboard() {
  //   navigator.clipboard.writeText(walletAdd);
  //   document.getElementsByClassName("copied")[0].classList.remove("show");
  //   document.getElementsByClassName("copied")[0].classList.add("show");
  //   setTimeout(() => {
  //     var selectedClass = document.getElementsByClassName("copied");
  //     if (selectedClass.length > 0) selectedClass[0].classList.remove("show");
  //   }, 2000);
  // }
    const {user} = useContext(AuthContext);
    console.log(user);
  const [disabledNameField, setDisabledNameField] = useState(true);
  const [errorNameField, setErrorNameField] = useState(false);
  const [helperTextNameField, setHelperTextNameField] = useState("");
  // const [nameField, setNameField] = useState(localStorage.getItem("folioUsername"));
  const [tickDisabled, setTickDisabled]= useState();
    // console.log(nameField);

  // const setValueName = (event) => {
  //     console.log(nameField);
  //     // event.preventDefault();
  //     setNameField(event.target.value);
  // }

  const setValueNameField = async () => {
      const nameField = document.getElementById("nameField").value;
      const availableName = await checkAvailableUsername(nameField);
      if(!availableName){
          setErrorNameField(availableName);
          setHelperTextNameField("Username already taken");
      }
      else{
          console.log(nameField)
          const response = await changeUserName(nameField);
          console.log("response",response);
          if(!response){
              setHelperTextNameField("Input must be a non-empty string");
          }
          else{
              setHelperTextNameField("");
          }
      }
  }

  const changeDisabledButton = () => {
      setDisabledNameField(!disabledNameField);
  }

    const LeftComponent = () => {
      return (
      <div className="fullpage">
        <FolioplayBar />
        <div className="wallet-add-space">
            <div className="profileHeader">
                <img src={require("../../../images/profilepic.jpeg").default} alt="profilePic" className="profilePicture"/>
                <div className="userDetails">
                    <div className="userName">
                        {localStorage.getItem("folioUsername")}
                    </div>
                    <div className="userWalletAddress">
                        {localStorage.getItem("folioWalletAddress")}
                    </div>
                </div>
            </div>
          {/*<span className="wallet-info font-size-25 font-weight-800">*/}
            {/*<AccountBalanceWalletIcon*/}
            {/*  fontSize="large"*/}
            {/*  style={{ color: "var(--white)" }}*/}
            {/*/>*/}
            {/*<span className="wallet-address ml-20">*/}
            {/*  {walletAdd.substring(0, 6) +*/}
            {/*    "...." +*/}
            {/*    walletAdd.substring(walletAdd.length - 4)}*/}
            {/*</span>*/}
            {/*<ContentCopyIcon*/}
            {/*  id="copy-to-clipboard"*/}
            {/*  className="ml-20"*/}
            {/*  fontSize="medium"*/}
            {/*  style={{ color: "var(--white)" }}*/}
            {/*  onClick={copytoClipboard}*/}
            {/*/>*/}
          {/*</span>*/}
        </div>
        <div className="profile-info-wrapper">
            <div className="headingPersonalInfo">
                Personal Information
            </div>
            <div className="personalDetawait checkAvailableUsername(event.target.value)ails">
                <div className="section">
                    <div className="sectionHeading">
                        Name
                    </div>
                    <div className="sectionDetails">
                        <input
                            id="nameField"
                            defaultValue={localStorage.getItem("folioUsername")}
                            disabled={disabledNameField}
                            className="nameTextField"
                        />
                        {disabledNameField ? <EditIcon onClick={changeDisabledButton} fontSize="1.15rem" className="editIcon" />: <DoneIcon onClick={setValueNameField} fontSize="1.15rem" className="editIcon"/>}
                    </div>
                    <div className="errorText">
                        {helperTextNameField}
                    </div>
                </div>
            </div>
        </div>
        {/*<div className="copied">*/}
        {/*  /!*<DoneIcon /> <span className="ml-10">Copied to clipboard</span>*!/*/}
        {/*</div>*/}
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
