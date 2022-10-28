import React, { useContext, useEffect, useRef, useState } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import FolioplayBar from "../../FolioplayBar/src";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import "../style/index.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useMoralis } from "react-moralis";
import InlineEdit from "../common/InlineEditComponent";
import { LinearProgress, TextField } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
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
import UserProfileLeft from "./UserProfileLeft";
import UserProfileRight from "./UserProfileRight";
export default function UserProfile() {
  // const { user } = useMoralis();
  // const walletAdd = user.attributes.ethAddress;
  // const [snackMessage, setSnackMessage] = useState("");
  // const referralCode = localStorage.getItem("folioReferralCode")
  // function copytoClipboard() {
  //   navigator.clipboard.writeText(walletAdd);
  //     setSnackMessage("Wallet Address Copied!")
  //   handleClick();
  // }
  //   function copytoClipboardReferral() {
  //       navigator.clipboard.writeText(referralCode);
  //       setSnackMessage("Referral Code Copied!!")
  //       handleClick();
  //   }
  // const [disabledNameField, setDisabledNameField] = useState(true);
  // const [errorNameField, setErrorNameField] = useState(false);
  // const [helperTextNameField, setHelperTextNameField] = useState("");
  // const [tapToOpenDisabled, setTapToOpenDisabled] = useState(true);
  // const [winRate, setWinRate] = useState(0);
  // const [contestPlayed, setContestPlayed] = useState(0);
  // console.log("winrate", winRate);

  // const setProgressBarValueAPI = async () => {
  //   const winRateLocal = await getWinRateAPI();
  //   console.log("winrate", winRateLocal);
  //   setWinRate(Math.round(winRateLocal["winRate"] * 100));
  //   setContestPlayed(winRateLocal["tournamentsPlayed"]);
  // };

  // const [presentUser, setPresentUser] = useState("");

  // const getPresentUser = async () => {
  //   const authToken = localStorage.getItem("authtoken");
  //   const res = await fetch(`${SERVER}/user`, {
  //     method: "GET",
  //     headers: {
  //       "x-access-token": authToken,
  //     },
  //   }).then((res) => res.json());
  //   setPresentUser(res);
  // };
  // useEffect(() => {
  //   setProgressBarValueAPI();
  //   getPresentUser();
  // }, []);
  // console.log("PRESENT", presentUser);
  // const setValueNameField = async () => {
  //   const nameField = document.getElementById("nameField").value;
  //   const availableName = await checkAvailableUsername(nameField);
  //   if (!availableName) {
  //     setErrorNameField(availableName);
  //     setHelperTextNameField("Username already taken");
  //   } else {
  //     const response = await changeUserName(nameField);
  //     if (!response) {
  //       setHelperTextNameField("Input must be a non-empty string");
  //     } else {
  //       setHelperTextNameField("");
  //     }
  //   }
  // };

  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // const changeDisabledButton = () => {
  //   setDisabledNameField(!disabledNameField);
  // };

  // const LeftComponent = () => {
  //   /// Change profile picture
  //   const inputFile = useRef(null);
  //   const handleInputClick = () => {
  //     inputFile.current.click();
  //   };
  //   const [file, setFile] = useState(null);

  //   const changeProfilePic = (event) => {
  //     const fileObj = event.target.files && event.target.files[0];
  //     if (!fileObj) return;
  //     console.log("File Obj", event.target.files[0]);

  //     setFile(event.target.files[0]);
  //   };

  //   useEffect(() => {
  //     if (file) {
  //       handleSubmit();
  //       return;
  //     }
  //   }, [file]);

  //   const handleSubmit = async () => {
  //     console.log("FILE", file);
  //     const fileToUpload = file;
  //     const data = new FormData();
  //     for (var pair of data.entries()) {
  //       console.log(pair[0] + ", " + pair[1]);
  //     }
  //     data.append("image", fileToUpload);
  //     let res = await changeProfilePicture(data);
  //     console.log(res);
  //     setPresentProfileImage(res.path);
  //   };
  //   const defaultImage = require("../../../images/profilepic.jpeg").default;
  //   const [presentProfileImage, setPresentProfileImage] = useState(
  //     presentUser.imageURL === "" ? defaultImage : presentUser.imageURL
  //   );
  //   ////
  //   return (
  //     <div className="fullpage">
  //       <FolioplayBar />
  //       <div className="wallet-add-space">
  //         <div className="profileHeader">
  //           <div className="profilePicture">
  //             <img
  //               src={presentProfileImage}
  //               alt="profilePic"
  //               height="64px"
  //               width=" 64px"
  //               style={{ borderRadius: "100%" }}
  //               className="profilepic__image"
  //             />
  //             <div className="profilepic__content" onClick={handleInputClick}>
  //               <span className="profilepic__icon">
  //                 <CameraAltIcon size={5} />
  //               </span>
  //               {/* <span className="profilepic__text">Edit Profile</span> */}
  //             </div>
  //             <input
  //               type="file"
  //               id="file"
  //               ref={inputFile}
  //               style={{ display: "none" }}
  //               onChange={changeProfilePic}
  //             />
  //           </div>
  //           <div className="userDetails">
  //             <div className="userName">{presentUser.username}</div>
  //           </div>
  //         </div>
  //         {/*<span className="wallet-info font-size-25 font-weight-800">*/}
  //         {/*<AccountBalanceWalletIcon*/}
  //         {/*  fontSize="large"*/}
  //         {/*  style={{ color: "var(--white)" }}*/}
  //         {/*/>*/}
  //         {/*<span className="wallet-address ml-20">*/}
  //         {/*  {walletAdd.substring(0, 6) +*/}
  //         {/*    "...." +*/}
  //         {/*    walletAdd.substring(walletAdd.length - 4)}*/}
  //         {/*</span>*/}
  //         {/*<ContentCopyIcon*/}
  //         {/*  id="copy-to-clipboard"*/}
  //         {/*  className="ml-20"*/}
  //         {/*  fontSize="medium"*/}
  //         {/*  style={{ color: "var(--white)" }}*/}
  //         {/*  onClick={copytoClipboard}*/}
  //         {/*/>*/}
  //         {/*</span>*/}
  //       </div>
  //       <div className="profile-info-wrapper">
  //         <div className="headingPersonalInfo">Journey Stats</div>
  //         <div className="personalDetails">
  //           <div className="section__journeyStats">
  //             <div className="journeyStats__winRate">
  //               <div className="journeyStats__heading">Win Rate</div>
  //               <div className="journeyStats__data">
  //                 <span>
  //                   <b>{winRate}%</b>
  //                 </span>
  //                 <span className={"journeyStats__linearProgress"}>
  //                   <LinearProgress
  //                     variant="determinate"
  //                     style={{ backgroundColor: "var(--dim-white)" }}
  //                     value={winRate}
  //                   />
  //                 </span>
  //               </div>
  //             </div>
  //             <div className="journeyStats__Contests">
  //               <div className="journeyStats__heading">Contests</div>
  //               <div className="journeyStats__data">
  //                 <b>{contestPlayed}</b>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="headingPersonalInfo">Personal Information</div>
  //         <div className="personalDetails">
  //           <div className="section">
  //             <div className="sectionHeading">User Name</div>
  //             <div className="sectionDetails">
  //               <input
  //                 id="nameField"
  //                 defaultValue={localStorage.getItem("folioUsername")}
  //                 disabled={disabledNameField}
  //                 className="nameTextField"
  //               />
  //               {disabledNameField ? (
  //                 <EditIcon
  //                   onClick={changeDisabledButton}
  //                   fontSize="1.15rem"
  //                   className="editIcon"
  //                 />
  //               ) : (
  //                 <DoneIcon
  //                   onClick={setValueNameField}
  //                   fontSize="1.15rem"
  //                   className="editIcon"
  //                 />
  //               )}
  //             </div>
  //             <div className="errorText">{helperTextNameField}</div>
  //             <div className="sectionHeading">Wallet Address</div>
  //             <div className="sectionDetails">
  //               {tapToOpenDisabled ? (
  //                 <span>
  //                   {localStorage.getItem("folioWalletAddress").substring(0, 8)}
  //                   XXXXXX
  //                   {localStorage.getItem("folioWalletAddress").slice(-8)}
  //                 </span>
  //               ) : (
  //                 <span>{localStorage.getItem("folioWalletAddress")}</span>
  //               )}
  //               <ContentCopyIcon
  //                 id="copy-to-clipboard"
  //                 className=""
  //                 fontSize="medium"
  //                 style={{ color: "var(--black)" }}
  //                 onClick={copytoClipboard}
  //               />
  //             </div>
  //             <div className="tapToOpenButton">
  //               {tapToOpenDisabled ? (
  //                 <Button
  //                   onClick={() => setTapToOpenDisabled(!tapToOpenDisabled)}
  //                 >
  //                   Tap to see full Wallet Address
  //                 </Button>
  //               ) : (
  //                 <Button
  //                   onClick={() => setTapToOpenDisabled(!tapToOpenDisabled)}
  //                 >
  //                   Tap to shorten Wallet Address
  //                 </Button>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //           <div className="headingPersonalInfo">
  //               Referral Information
  //           </div>
  //           <div className="personalDetails">
  //               <div className="section">
  //                   <div className="sectionHeading">
  //                       Referral Code
  //                   </div>
  //                   <div className="sectionDetails">
  //                       Your referral code is &nbsp;<span className="profilePage__referralCode">{localStorage.getItem("folioReferralCode")}</span> &nbsp;
  //                       <ContentCopyIcon
  //                           id="copy-to-clipboard"
  //                           className=""
  //                           fontSize="medium"
  //                           style={{ color: "var(--black)" }}
  //                           onClick={copytoClipboardReferral}
  //                       />
  //                   </div>
  //               </div>
  //           </div>
  //       </div>
  //         <Snackbar open={open} handleClose={handleClose} message={snackMessage} severityType="success"/>
  //       {/*<div className="copied">*/}
  //       {/*  /!*<DoneIcon /> <span className="ml-10">Copied to clipboard</span>*!/*/}
  //       {/*</div>*/}
  //     </div>
  //   );
  // };
  // const RightComponent = () => {
  //   return (
  //     <div id="login-page-image">
  //       <img
  //         alt="folioplay-logo"
  //         src={require("../../../images/folioplayLogo.png").default}
  //       />
  //       <img src={require("../../../images/white_folioplay.svg").default} />
  //       <h3 style={{ letterSpacing: "2px" }}>
  //         Decentralized fantasy gaming platform
  //       </h3>
  //     </div>
  //   );
  // };

  return (
    <FolioPlayLayout
      LeftComponent={UserProfileLeft}
      RightComponent={UserProfileRight}
    />
  );
}
