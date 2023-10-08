import React, { useContext, useEffect, useRef, useState } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import FolioplayBar from "../../FolioplayBar/src";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import "../style/index.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
// import { useMoralis } from "react-moralis";
import InlineEdit from "../common/InlineEditComponent";
import { LinearProgress, TextField } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ReactSpeedometer from "react-d3-speedometer";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {
  changeProfilePicture,
  changeUserName,
  checkAvailableUsername,
  getWinRateAPI,
  SERVER,
} from "../../../APIS/apis";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { AuthContext } from "../../../Context/AuthContext";
import Snackbar from "../../../Common/Snackbar";
function UserProfileLeft() {
  const [errorInputForm, setErrorInputForm] = useState(false);
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState("");

  const localStoritems = async () => {
    const userr = await localStorage.getItem("user");
    await setUser(userr);
    const isLoggedIn = await localStorage.getItem("isLoggedIn");
    await setIsAuthenticated(isLoggedIn);
  }
  // const { user } = useMoralis();
  const walletAdd = localStorage.getItem("walletAddress");
  const [snackMessage, setSnackMessage] = useState("");
  const [snackMessageFail, setSnackMessageFail] = useState("");
  const referralCode = localStorage.getItem("folioReferralCode");
  const referralCodeLink = `${window.location.origin}/?code=${localStorage.getItem("folioReferralCode")}`;
  function copytoClipboard() {
    navigator.clipboard.writeText(walletAdd);
    setSnackMessage("Wallet Address Copied!");
    handleClick();
  }
  function copytoClipboardReferral() {
    navigator.clipboard.writeText(referralCode);
    setSnackMessage("Referral Code Copied!!");
    handleClick();
  }
  function copytoClipboardReferralLink() {
    navigator.clipboard.writeText(referralCodeLink);
    setSnackMessage("Referral Link Code Copied!!");
    handleClick();
  }
  const [disabledNameField, setDisabledNameField] = useState(true);
  const [errorNameField, setErrorNameField] = useState(false);
  const [helperTextNameField, setHelperTextNameField] = useState("");
  const [tapToOpenDisabled, setTapToOpenDisabled] = useState(true);
  const [winRate, setWinRate] = useState(0);
  const [contestPlayed, setContestPlayed] = useState(0);

  const setProgressBarValueAPI = async () => {
    const winRateLocal = await getWinRateAPI();
    setWinRate(Math.round(winRateLocal["winRate"] * 100));
    setContestPlayed(winRateLocal["tournamentsPlayed"]);
  };

  const [presentUser, setPresentUser] = useState("");

  const getPresentUser = async () => {
    const authToken = localStorage.getItem("authtoken");
    const res = await fetch(`${SERVER}/user`, {
      method: "GET",
      headers: {
        "x-access-token": authToken,
      },
    }).then((res) => res.json());
    setPresentUser(res);
    console.log(res);
    setCurrentUserName(res.username);
    if (res.imageURL) setPresentProfileImage(res.imageURL);
    else setPresentProfileImage(defaultImage);
  };
  useEffect(() => {
    setProgressBarValueAPI();
    getPresentUser();
  }, []);
  const setValueNameField = async () => {
    if (!errorNameField) {
      const response = await changeUserName(currentUserName);
      console.log(response);
      if (!response) {
        setHelperTextNameField("Input must be a non-empty string");
      } else {
        setHelperTextNameField("Username Changed");
        setDisabledNameField(true);
      }
      if (response === true) {     
        getPresentUser();
        setSnackMessage("Username Updated");
        setOpen(true)
        
      }
      if (response === false) {
        setSnackMessageFail("Username Can't be changed!");
        setUsernameSnackOpen(true);
      }

    } else {
      setHelperTextNameField("Username Can't be changed!");
      setSnackMessageFail("Username Can't be changed!");
      setUsernameSnackOpen(true);
    }
    setTimeout(() => {
      setOpen(false);
      setUsernameSnackOpen(false);
    }, 4000);
  };

  const checkAvailable = async (data) => {
    const currentName = await localStorage.getItem("folioUsername");
    if (currentName !== data) {
      const availableName = await checkAvailableUsername(data);
      if (!availableName) {
        setErrorNameField(availableName);
        setHelperTextNameField("Username already taken");
        setErrorInputForm(true);

      } else {

        setHelperTextNameField("Username is available!");
        setErrorInputForm(false);

      }
    }
    if (currentName === data) {
      setHelperTextNameField("Its your current user name!");
      setErrorInputForm(false);
    }

  };
  const [currentUserName, setCurrentUserName] = useState("");

  const [usernameSnackOpen, setUsernameSnackOpen] = useState(false);

  const handleUsernameSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUsernameSnackOpen(false);
  };
  const handleChange = (e) => {
    setCurrentUserName(e.target.value);
    checkAvailable(e.target.value);
    console.log(checkAvailable(e.target.value));
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const changeDisabledButton = () => {
    if (presentUser.usernameChanged) {
      setUsernameSnackOpen(true);
      setSnackMessageFail("Username can be changed only once")
    } else {
      setDisabledNameField(!disabledNameField);
    }
    setTimeout(() => {
      setOpen(false);
      setUsernameSnackOpen(false);
    }, 4000);
  };
  const inputFile = useRef(null);
  const handleInputClick = () => {
    inputFile.current.click();
  };
  const [file, setFile] = useState(null);

  const changeProfilePic = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) return;

    setFile(event.target.files[0]);
  };

  useEffect(() => {

    localStoritems();
    if (file) {
      handleSubmit();
      return;
    }
  }, [file]);

  const handleSubmit = async () => {
    const fileToUpload = file;
    const data = new FormData();
    for (var pair of data.entries()) {
    }
    data.append("image", fileToUpload);
    let res = await changeProfilePicture(data);
    setPresentProfileImage(res.path);
  };
  const defaultImage = require("../../../images/profilepic.jpeg").default;
  const [presentProfileImage, setPresentProfileImage] = useState(null);

  return (
    <div className="fullpage">
      <FolioplayBar />
      <div className="wallet-add-space">
        <div className="profileHeader">
          <div className="profilePicture">
            <img
              src={presentProfileImage}
              alt="profilePic"
              height="64px"
              width=" 64px"
              style={{ borderRadius: "100%" }}
              className="profilepic__image"
            />
            <div className="profilepic__content" onClick={handleInputClick}>
              <span className="profilepic__icon">
                <CameraAltIcon size={5} />
              </span>
              {/* <span className="profilepic__text">Edit Profile</span> */}
            </div>
            <input
              type="file"
              id="file"
              accept=".jpg,.png,.jpeg"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={changeProfilePic}
            />
          </div>
          <div className="userDetails">
            <div className="userName">{presentUser.username}</div>
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
        <div className="headingPersonalInfo">Journey Stats</div>
        <div className="personalDetails" >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
            <div style={{ width: "200px", height: "111px" }}>
              <ReactSpeedometer
                ringWidth={20}
                needleHeightRatio={0.6}
                needleTransition="easeQuadInOut"
                // width={"100px"}
                // height={""}
                fluidWidth={true}
                minValue={"0"}
                maxValue={"100"}
                needleColor={"#453df1"}
                value={winRate}
                maxSegmentLabels={5}
                segments={1000}
              // height={"180px"}
              />
            </div>
            <span>Win Rate {winRate} %</span>
          </div>

          {/* <div className="journeyStats__Contests">
              <div className="journeyStats__heading">Contests</div>
              <div className="journeyStats__data">
                <b>{contestPlayed}</b>
              </div>
            </div> */}
        </div>
        <div className="headingPersonalInfo">Personal Information</div>
        <div className="personalDetails">
          <div className="section">
            <div className="sectionHeading">User Name</div>
            <div className="sectionDetails">
              <input
                id="nameField"
                value={currentUserName}
                disabled={disabledNameField}
                onChange={handleChange}
                maxLength={20}
                className={errorInputForm ? "errorNameTextField" : "nameTextField"}
              />
              {disabledNameField ? (
                !presentUser.usernameChanged ? (<EditIcon
                  onClick={changeDisabledButton}
                  fontSize="1.15rem"
                  className="editIcon"
                />):(null)
                
              ) : (

                errorInputForm ? (<ErrorOutlineOutlinedIcon
                  color="red"
                  fontSize="medium"
                  className="editIcon"
                  style={{ color: "red" }}
                />) : (<CheckCircleOutlineOutlinedIcon
                  onClick={setValueNameField}
                  fontSize="medium"
                  className="editIcon"
                  style={{ color: "green" }}
                />)

              )}
            </div>
            {errorInputForm ? (<div className="errorText" style={{ color: "red" }}>{helperTextNameField}</div>)
              : (<div className="errorText" style={{ color: "green" }}>{helperTextNameField}</div>)}

            <div className="sectionHeading">Wallet Address</div>
            <div className="sectionDetails">
              {tapToOpenDisabled ? (
                <span>
                  {localStorage.getItem("folioWalletAddress").substring(0, 8)}
                  XXXXXX
                  {localStorage.getItem("folioWalletAddress").slice(-8)}
                </span>
              ) : (
                <span>{localStorage.getItem("folioWalletAddress")}</span>
              )}
              <ContentCopyIcon
                id="copy-to-clipboard"
                className="ml-10"
                fontSize="medium"
                style={{ color: "var(--black)" }}
                onClick={copytoClipboard}
              />
            </div>
            <div className="tapToOpenButton">
              {tapToOpenDisabled ? (
                <Button
                  onClick={() => setTapToOpenDisabled(!tapToOpenDisabled)}
                >
                  Tap to see full Wallet Address
                </Button>
              ) : (
                <Button
                  onClick={() => setTapToOpenDisabled(!tapToOpenDisabled)}
                >
                  Tap to shorten Wallet Address
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="headingPersonalInfo">Referral Information</div>
        <div className="personalDetails">
          <div className="section">
            <div className="sectionHeading">Referral Code</div>
            <div className="sectionDetails">
              Your referral code is &nbsp;
              <span className="profilePage__referralCode">
                {localStorage.getItem("folioReferralCode")}
              </span>{" "}
              &nbsp;
              <ContentCopyIcon
                id="copy-to-clipboard"
                className="ml-10"
                fontSize="medium"
                style={{ color: "var(--black)" }}
                onClick={copytoClipboardReferral}
              />
            </div>
            <div className="sectionDetails">
              Share this referral code and earn rewards &nbsp;
              <span className="profilePage__referralCode">
                {`${window.location.origin}/?code=${localStorage.getItem("folioReferralCode")}`}
              </span>{" "}
              &nbsp;
              <ContentCopyIcon
                id="copy-to-clipboard"
                className="ml-10"
                fontSize="medium"
                style={{ color: "var(--black)" }}
                onClick={copytoClipboardReferralLink}
              />
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        handleClose={handleClose}
        message={snackMessage}
        severityType="success"
      />
      <Snackbar
        open={usernameSnackOpen}
        handleClose={handleUsernameSnack}
        message={snackMessageFail}
        severityType="error"
      />
      {/*<div className="copied">*/}
      {/*  /!*<DoneIcon /> <span className="ml-10">Copied to clipboard</span>*!/*/}
      {/*</div>*/}
    </div>
  );
}

export default UserProfileLeft;
