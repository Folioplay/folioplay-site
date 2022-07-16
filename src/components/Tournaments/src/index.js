import React, { useEffect, useState } from "react";
import FolioplayBar from "../../FolioplayBar/src";
import { Button, LinearProgress } from "@mui/material";
import ReactLoading from "react-loading";
import {
  getAllUserTeams,
  deleteTeam,
  joinTournamentAPI, getAuthToken,
} from "../../../APIS/apis";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { useNavigate } from "react-router-dom";
import "../style/index.css";
import { motion } from "framer-motion/dist/framer-motion";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { getAllTournaments } from "../../../APIS/apis";
import PreviewIcon from "@mui/icons-material/Preview";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Modal from '@mui/material/Modal';
import { Box } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import joinTournament from "../common/joinTournament";
import deleteClickedTeam from "../common/deleteClickedTeam";
import selectTeam from "../common/selectTeam";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useMoralis } from "react-moralis";
import JoinTournamentDrawer from "../../JoinTournamentDrawer/src";
import { chooseTeamClose, chooseTeamOpen } from "../common/chooseTeamAnimations";
import ImageSlider from "../../ImageSlider/src";
import { isSwipeable, useSwipeable } from 'react-swipeable';
import introJs from "intro.js";
import { Steps, Hints } from "intro.js-react";
import "intro.js/introjs.css";
import Joyride from 'react-joyride';


export default function Tournaments() {
  const { user, isAuthenticated, logout } = useMoralis();
  const [loaded, setLoaded] = useState(false);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const logOut = async () => {
    localStorage.setItem("authtoken", null);
    localStorage.removeItem("walletconnect");
    await logout();
    window.location.pathname = "/";
  };

  window.ethereum.on("chainChanged", async ([networkId]) => {
    if (networkId !== '137' && localStorage.getItem("walletType") === "metamask") {
      await logOut();
      alert("Network ID change detected. Connect to Polygon Mainnet.")
    }
  });

  window.ethereum.on("accountsChanged", async ([newAddress]) => {
    if (localStorage.getItem("walletType") === "metamask") {
      await logOut();
      alert("Account change detected. Please Sign-in Again.")
    }
  });
  const status = { 3: { "value": "Completed", "color": "#ff000096" }, 1: { "value": "Closed", "color": "#ff000096" }, 0: { "value": "Open", "color": "#00ff00d6" }, 2: { "value": "Running", "color": "#00ff00d6" } }
  const [tournaments, setTournaments] = useState(undefined);
  const [teams, setTeams] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState({ message: "", variant: "" });
  const [errorMessageSnackOpen, setErrorMessageSnackOpen] = useState(false);
  const pad = (num) => ("0" + num).slice(-2);
  const navigate = new useNavigate();
  var tournamentId;
  var currImage = 1;
  var allImages;
  var len;
  const [paused, setPaused] = useState(false);
  const [l, setL] = useState(0);
  const style = {
    width: "max(300px,60%)",
    height: "70%",
    borderRadius: "12px",
    position: "absolute",
    top: "10%",
    left: "20%",
    boxShadow: 24,
    p: 4,
    backgroundColor: "var(--dim-white)",
    color: "var(--grey-shade)",
    overflowY: "scroll",
    scrollbarWidth: "none",
    ['@media (max-width:600px)']: {
      left: "8%",
      width: "70%"
    }
  };
  const [openPolicies, setOpenPolicies] = useState(false);
  const handleOpenPolicies = () => setOpenPolicies(true);
  const handleClosePolicies = () => setOpenPolicies(false);
  const [intervalId, setIntervalId] = useState(undefined);
  useEffect(() => {
    async function authTokenGet() {
      if (isAuthenticated && localStorage.getItem("authtoken") == null) {
        await getAuthToken(user)
      }
    }
    authTokenGet();
  }, [])
  useEffect(() => {
    document.getElementsByClassName('overlay-div')[0].addEventListener('mouseup', function (event) {
      var pol = document.getElementById('choose-team-div');
      if (event.target != pol && event.target.parentNode != pol) {
        chooseTeamClose();
        return;
      }
    });
    fetchTournaments();
    fetchTeams();
  }, []);
  useEffect(() => {
    allImages = document.getElementsByClassName("image-div");
    len = allImages.length;
    setIntervalId(setInterval(nextImage, 2000))
    console.log(allImages);
    setL(len)
  }, []);
  async function fetchTournaments() {
    setTournaments(await getAllTournaments());
  }
  async function fetchTeams() {
    setTeams(await getAllUserTeams());
  }

  const handleErrorMessageSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessageSnackOpen(false);
  };


  function nextImage() {
    var leftMargin = -1 * currImage * 100;
    var buffer = -1 * currImage * 20;
    if (currImage !== len) {
      allImages[0].style = `margin-left:calc( ${leftMargin}% + ${buffer}px )`;
      if (!paused)
        currImage++;
    } else {
      allImages[0].style = `margin-left:0px`;
      currImage = 1;
    }
  }
  const tournamentsList = tournaments ? tournaments.map((tournament, index) => {
    const seatsFilled =
      (100 * tournament.filled_spots) / tournament.total_spots;
    const startDate = new Date(tournament.start_time);
    const finishDate = new Date(tournament.end_time);
    const currDate = new Date();
    const disabledClass = tournament.status === 3 ? " disable-join-button" : "";
    const disabledTournament = tournament.status === 3 ? true : false;
    return (
      <motion.div
        id={"tournament-" + tournament._id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 * (index + 1) }}
        key={"tournament__" + index}
        className="tournament"
      >
        <div className="tournament-info">
          <span className="tournament-image" style={{ borderRadius: "100%" }}>
            {tournament.id === "62c45a6ddfe60c1bada234a8" ?
              <img style={{ borderRadius: "100%" }} src={require("../../../images/bulls.png").default} width="50px" height={"50px"} />
              : <> {tournament.id === "62c45abedfe60c1bada2355f" ?
                <img style={{ borderRadius: "100%" }} src={require("../../../images/justice.png").default} width="50px" height={"50px"} />
                : <></>}</>}</span>
          <span
            style={{ textAlign: "left" }}
            onClick={() => { console.log("intervalId is here", intervalId); clearInterval(intervalId); navigate(`/tournaments/${tournament._id}`); }}
          >
            <span style={{ color: "#071F36", fontWeight: "700" }}>{tournament.name}</span>
            <br />
            <span className="tournaments-spots">
              <span className="font-size-12">
                {startDate.getDate()} {monthNames[startDate.getMonth()]}'{startDate.getFullYear() % 100},&ensp;{startDate.getHours() / 10 < 1 ? "0" + startDate.getHours() : startDate.getHours()} : {startDate.getMinutes() / 10 < 1 ? "0" + startDate.getMinutes() : startDate.getMinutes()} hrs -{" "}
                {finishDate.getHours() / 10 < 1 ? "0" + finishDate.getHours() : finishDate.getHours()} : {finishDate.getMinutes() / 10 < 1 ? "0" + finishDate.getMinutes() : finishDate.getMinutes()} hrs
              </span>
            </span>
          </span>
          <Button
            className={disabledClass + " tournament-fee"}
            size="small"
            style={disabledTournament ? {} : { backgroundColor: "var(--golden)" }}
            onClick={(event) => {
              tournamentId =
                event.target.parentNode.parentNode.getAttribute("id");
              tournamentId = tournamentId.split("-")[1];
              console.log(tournamentId);
              chooseTeamOpen();
            }}
            disabled={disabledTournament}
          >
            {tournament.entryFee} MGT
          </Button>
        </div>
        <div>
          <LinearProgress
            variant="determinate"
            style={{ backgroundColor: "var(--dim-white)" }}
            value={seatsFilled}
          />
          <div className="spots-wrapper">
            <span className="font-size-12 font-weight-500 mt-5" style={{ color: "var(--golden)" }}>
              {tournament.total_spots - tournament.filled_spots} spots left
            </span>
            <span className="font-size-12 font-weight-500 mt-5" style={{ color: "var(--dark-dim-white)" }}>
              {tournament.total_spots} spots
            </span>
          </div>
        </div>
        <div className="tournament-reward">
          <span className="font-size-12" style={{ color: status[tournament.status].color, padding: "0 10px", border: "1px solid " + status[tournament.status].color, borderRadius: "30px" }}>{status[tournament.status].value}</span>
          <span className="font-size-12">
            <EmojiEventsOutlinedIcon />
            {/* {tournament.reward} MGT */}
            <span>1000 MGT</span>
          </span>
        </div>
      </motion.div>
    );
  }) : <></>;
  const steps = [
    {
      target: "#folioplay-hamburger",
      disableBeacon: true,
      content: "Explore here"
    },
    {
      target: "#folioplay-wallet",
      disableBeacon: true,
      content: "World step"
    },
    {
      target: "#image-slider-wrapper",
      disableBeacon: true,
      content: "Hello step 1"
    }
  ];
  const LeftComponent = () => {
    return (
      <div className="fullpage">
        <FolioplayBar handleOpenPolicies={handleOpenPolicies} intervalId={intervalId} />
        <div>

        </div>
        <ImageSlider setPaused={setPaused} />
        <div className="tournaments-wrapper">
          <span className="font-size-15 font-weight-500 mr-auto ml-20 mb-20" style={{ marginTop: "-30px", color: "var(--dark-dim-white)" }}>Trendings</span>
          {tournaments === undefined || tournaments.length === 0 || teams === undefined ? (
            <div className="loading-component">
              <ReactLoading type={"spin"} color="var(--violet-blue)" />{" "}
            </div>
          ) : (
            <>{tournamentsList}
              {/* <JoinTournamentDrawer user={user} teams={teams} tournamentId={tournamentId} joinTournamentAPI={joinTournamentAPI} setErrorMessage={setErrorMessage} setErrorMessageSnackOpen={setErrorMessageSnackOpen} tournament={{}} tournaments={tournaments} changeTournament={true} navigate={navigate} /> */}
              <div
                key={"enter-tournament"}
                id="choose-team-div"
                className="display-none"
              >
                <div className="choose-team-bar"></div>
                <div id="all-teams-info">
                  <div>
                    <span
                      className="font-size-25 font-weight-700 mb-10"
                      style={{ color: "var(--black)" }}
                    >
                      Choose Team
                    </span>
                    <br />
                    <span
                      className="font-size-15 font-weight-500"
                      style={{ color: "var(--grey-shade)" }}
                    >
                      Select a team that you think should represent you in this
                      contest.
                    </span>
                  </div>

                  <div className="all-teams">
                    <div style={{ padding: "0" }}>
                      {teams.map((team, index) => {
                        var clickedId = "team-" + index;
                        return (
                          <div
                            id={"team-" + index}
                            className="mb-15"
                            style={{ padding: "0", borderRadius: "12px" }}
                          >
                            <div className="team">
                              <span
                                className="font-size-18 font-weight-600"
                                style={{ color: "var(--grey-shade)" }}
                              >
                                {team.name}
                              </span>
                              <span
                                id="visible-coins"
                                style={{ marginLeft: "auto" }}
                              >
                                <CheckCircleIcon
                                  className="select-team-button team-buttons"
                                  onClick={() => selectTeam(clickedId, teams)}
                                  fontSize="large"
                                />
                                <PreviewIcon
                                  className="preview-team-button team-buttons ml-5"
                                  fontSize="large"
                                  onClick={() => {
                                    console.log(
                                      "#" + clickedId + " .select-team-button"
                                    );
                                    document.querySelector(
                                      "#" + clickedId + " .select-team-button"
                                    ).style.display = "none";
                                    var allTeams =
                                      document.getElementsByClassName("team");
                                    for (var i = 0; i < allTeams.length; i++) {
                                      if (clickedId !== "team-" + i)
                                        allTeams[i].classList.add("display-none");
                                    }
                                    document
                                      .getElementById(clickedId)
                                      .classList.remove("display-none");
                                    document
                                      .getElementById(
                                        "team-coins-" + clickedId.split("-")[1]
                                      )
                                      .classList.remove("display-none");
                                    document.getElementById(
                                      "back-from-teamview-button"
                                    ).style.display = "block";
                                  }}
                                />
                                <DeleteIcon
                                  className="delete-team-button team-buttons ml-5"
                                  onClick={(event) => deleteClickedTeam(event, teams, deleteTeam)}
                                  fontSize="large"
                                />
                                {/* <div className="moved-coin-image-3" style={{ borderRadius: "100%", color: "black" }} >+ {team.selectedCoins.length - 3}</div> */}
                              </span>
                            </div>
                            <div
                              id={"team-coins-" + index}
                              className="team-coins display-none"
                            >
                              {team.selectedCoins.map((coin, index) => {
                                return (
                                  <div className="teamview-coin-card mr-10 ">
                                    <img
                                      src={
                                        require("../../../images/coinLogos/" +
                                          coin.symbol.toLowerCase() +
                                          ".png").default
                                      }
                                      width="40"
                                      height="40"
                                    />
                                    <span className="font-size-12 font-weight-500">
                                      {coin.name}
                                    </span>
                                    <span className="font-size-12 font-weight-500">
                                      {coin.category}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-10" id="create-new-button-div">
                    <Button
                      variant="filled"
                      id="jointournament-button"
                      style={{
                        backgroundColor: "var(--golden)",
                        fontWeight: "600",
                        fontSize: "17px",
                      }}
                      onClick={() => { joinTournament(teams, tournamentId, joinTournamentAPI, setErrorMessage, setErrorMessageSnackOpen, tournaments) }}
                    >
                      Continue T
                    </Button>
                    <Button
                      variant="filled"
                      id="back-from-teamview-button"
                      style={{
                        backgroundColor: "var(--golden)",
                        fontWeight: "600",
                        fontSize: "17px",
                      }}
                      onClick={(event) => {
                        var allSelectButtons =
                          document.getElementsByClassName("select-team-button");
                        var allTeams = document.getElementsByClassName("team");
                        for (var i = 0; i < allSelectButtons.length; i++) {
                          allSelectButtons[i].style.display = "inline-block";
                        }
                        console.log(allTeams);
                        for (var i = 0; i < allTeams.length; i++) {
                          allTeams[i].classList.remove("display-none");
                          console.log("team-coins-" + i);
                          document
                            .getElementById("team-coins-" + i)
                            .classList.add("display-none");
                        }
                        event.target.style.display = "none";
                      }}
                    >
                      Back
                    </Button>
                    {teams.length === 0 ?
                      <Button
                        variant="contained"
                        id="new-team-type1"
                        style={{

                        }}
                        onClick={() => { console.log(intervalId); clearInterval(intervalId); navigate("/teams/createteam") }}
                      >
                        Create New Team
                      </Button>
                      :
                      <Button
                        style={{
                          color: "var(--golden)",
                          fontWeight: "600",
                          fontSize: "15px",
                          textTransform: "capitalize"
                        }}
                        onClick={() => { clearInterval(intervalId); navigate("/teams/createteam") }}
                      >
                        Create New Team
                      </Button>
                    }
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <Snackbar
          open={errorMessageSnackOpen}
          autoHideDuration={3000}
          onClose={handleErrorMessageSnackClose}
        >
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              onClose={handleErrorMessageSnackClose}
              severity={errorMessage.variant}
              sx={{ width: "100%", fontFamily: "poppins" }}
            >
              {errorMessage.message}
            </Alert>
          </motion.div>
        </Snackbar>
        <Modal
          open={openPolicies}
          onClose={handleClosePolicies}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Slide direction="up" in={openPolicies} mountOnEnter unmountOnExit>
            <Box sx={style}
            // style={{ width: "100%" }}
            >
              <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontFamily: "poppins" }}>
                <h1 id="privacy-policy">FOLIOPLAY</h1>
                <h2 id="privacy-policy">Privacy Policy</h2>
                <p>Last revised on [DATE]</p>
                <h3 id="the-gist">The Gist</h3>
                <p>[COMPANY] will collect certain non-personally identify information about you as you use our sites. We may use this data to better understand our users. We can also publish this data, but the data will be about a large group of users, not individuals.</p>
                <p>We will also ask you to provide personal information, but you&#39;ll always be able to opt out. If you give us personal information, we won&#39;t do anything evil with it.</p>
                <p>We can also use cookies, but you can choose not to store these.</p>
                <p>That&#39;s the basic idea, but you must read through the entire Privacy Policy below and agree with all the details before you use any of our sites.</p>
                <h3 id="reuse">Reuse</h3>
                <p>This document is based upon the <a href="http://automattic.com/privacy/">Automattic Privacy Policy</a> and is licensed under <a href="http://creativecommons.org/licenses/by-sa/2.5/">Creative Commons Attribution Share-Alike License 2.5</a>. Basically, this means you can use it verbatim or edited, but you must release new versions under the same license and you have to credit Automattic somewhere (like this!). Automattic is not connected with and does not sponsor or endorse [COMPANY] or its use of the work.</p>
                <p>[COMPANY], Inc. (&quot;[COMPANY]&quot;) makes available services include our web sites ([URL] and [URL]), our blog, our API, and any other software, sites, and services offered by [COMPANY] in connection to any of those (taken together, the &quot;Service&quot;). It is [COMPANY]&#39;s policy to respect your privacy regarding any information we may collect while operating our websites.</p>
                <h3 id="questions">Questions</h3>
                <p>If you have question about this Privacy Policy, please contact us at [CONTACT EMAIL]</p>
                <h3 id="visitors">Visitors</h3>
                <p>Like most website operators, [COMPANY] collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. [COMPANY]&#39;s purpose in collecting non-personally identifying information is to better understand how [COMPANY]&#39;s visitors use its website. From time to time, [COMPANY] may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.</p>
                <p>[COMPANY] also collects potentially personally-identifying information like Internet Protocol (IP) addresses. [COMPANY] does not use such information to identify its visitors, however, and does not disclose such information, other than under the same circumstances that it uses and discloses personally-identifying information, as described below. We may also collect and use IP addresses to block users who violated our Terms of Service.</p>
                <h3 id="gathering-of-personally-identifying-information">Gathering of Personally-Identifying Information</h3>
                <p>Certain visitors to [COMPANY]&#39;s websites choose to interact with [COMPANY] in ways that require [COMPANY] to gather personally-identifying information. The amount and type of information that [COMPANY] gathers depends on the nature of the interaction. [COMPANY] collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor&#39;s interaction with [COMPANY]. [COMPANY] does not disclose personally-identifying information other than as described below. And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain Service-related activities.</p>
                <p>Additionally, some interactions, such as posting a comment, may ask for optional personal information. For instance, when posting a comment, may provide a website that will be displayed along with a user&#39;s name when the comment is displayed. Supplying such personal information is completely optional and is only displayed for the benefit and the convenience of the user.</p>
                <h3 id="aggregated-statistics">Aggregated Statistics</h3>
                <p>[COMPANY] may collect statistics about the behavior of visitors to the Service. For instance, [COMPANY] may monitor the most popular parts of the [URL]. [COMPANY] may display this information publicly or provide it to others. However, [COMPANY] does not disclose personally-identifying information other than as described below.</p>
                <h3 id="protection-of-certain-personally-identifying-information">Protection of Certain Personally-Identifying Information</h3>
                <p>[COMPANY] discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on [COMPANY]&#39;s behalf or to provide services available at [COMPANY]&#39;s websites, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using the Service, you consent to the transfer of such information to them. [COMPANY] will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, [COMPANY] discloses potentially personally-identifying and personally-identifying information only when required to do so by law, or when [COMPANY] believes in good faith that disclosure is reasonably necessary to protect the property or rights of [COMPANY], third parties or the public at large. If you are a registered user of the Service and have supplied your email address, [COMPANY] may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what&#39;s going on with [COMPANY] and our products. We primarily use our website and blog to communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. [COMPANY] takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.</p>
                <h3 id="cookies">Cookies</h3>
                <p>A cookie is a string of information that a website stores on a visitor&#39;s computer, and that the visitor&#39;s browser provides to the Service each time the visitor returns. [COMPANY] uses cookies to help [COMPANY] identify and track visitors, their usage of [COMPANY] Service, and their Service access preferences. [COMPANY] visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using [COMPANY]&#39;s websites, with the drawback that certain features of [COMPANY]&#39;s websites may not function properly without the aid of cookies.</p>
                <h3 id="data-storage">Data Storage</h3>
                <p>[COMPANY] uses third party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service. You understand that although you retain full rights to your data, it may be stored on third party storage and transmitted through third party networks.</p>
                <h3 id="privacy-policy-changes">Privacy Policy Changes</h3>
                <p>Although most changes are likely to be minor, [COMPANY] may change its Privacy Policy from time to time, and in [COMPANY]&#39;s sole discretion. [COMPANY] encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change. </p>

              </Typography>
            </Box>
          </Slide>
        </Modal>
      </div>
    );
  };
  const RightComponent = () => {
    return (
      <div id="tournament-page-image">
        <span className="font-size-36 font-weight-700 mb-0">
          Let the game begin!
        </span>
        <span className="font-size-20 font-weight-500 mt-0" style={{ letterSpacing: "1px" }}>
          Choose a contest to start playing...
        </span>
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
