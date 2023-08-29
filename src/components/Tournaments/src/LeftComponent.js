import React, { useContext, useEffect, useState } from "react";
import FolioplayBar from "../../FolioplayBar/src";
import ImageSlider from "../../ImageSlider/src";
import ReactLoading from "react-loading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import selectTeam from "../common/selectTeam";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteClickedTeam from "../common/deleteClickedTeam";
import JoinTournamentDrawer from "../../JoinTournamentDrawer/src";
import { scrollTo } from "../../../CommonFunctions/functions.js";
import { Chip } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import {
  deleteTeam,
  getAllTournaments,
  getAllUserTeams,
  getAuthToken,
  joinTournamentAPI,
} from "../../../APIS/apis";
import { Button, LinearProgress, Snackbar } from "@mui/material";
import joinTournament from "../common/joinTournament";
// import { useMoralis } from "react-moralis";
import MuiAlert from "@mui/material/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import {
  chooseTeamClose,
  chooseTeamOpen,
} from "../common/chooseTeamAnimations";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { motion } from "framer-motion/dist/framer-motion";
import Countdown from "react-countdown";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import "shepherd.js/dist/css/shepherd.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getTournamentAsync } from "../../../Redux/Tournaments/TournamentSlice";
import { FilterAltOutlined } from "@mui/icons-material";


const LeftComponent = () => {
  // const { user, isAuthenticated,  } = useMoralis();

  const [user, setUser] =useState("");
  const [isAuthenticated, setIsAuthenticated] =useState("");

  const localStoritems = async () => {
    const userr = await localStorage.getItem("user");
    await setUser(userr);
    const isLoggedIn = await localStorage.getItem("isLoggedIn");
    await setIsAuthenticated(isLoggedIn);
  }

  const { state } = useLocation();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("all");
  const filterToFunctionMap = {
    all: filterAll,
    live: filterLive,
    upcoming: filterUpcoming,
    joined: filterJoined,
    cancelled: filterCancelled,
  };
  function filterAll(tournament) {
    return tournament.status === 3;
  }
  function filterLive(tournament) {
    return tournament.status === 2;
  }
  function filterUpcoming(tournament) {
    return tournament.status === 0;
  }
  function filterCancelled(tournament) {
    return tournament.status === -2;
  }
  function filterJoined(tournament) {
    return tournament.user_joined;
  }
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const logOut = async () => {
    localStorage.setItem("authtoken", null);
    localStorage.removeItem("walletconnect");
    // await logOut();
  };

  const status = {
    3: { value: "Completed", color: "#ff000096" },
    1: { value: "Closed", color: "#FFCC00" },
    0: { value: "Open", color: "#00ff00d6" },
    2: { value: "Running", color: "#FFCC00" },
    "-2": { value: "Cancelled", color: "#FFCC00" },
  };
  // const [tournaments, setTournaments] = useState(undefined);
  const tournaments = useSelector((state) => state.tournamentSlice.tournament);
  const [teams, setTeams] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    variant: "",
  });
  const [errorMessageSnackOpen, setErrorMessageSnackOpen] = useState(false);
  const pad = (num) => ("0" + num).slice(-2);
  const navigate = new useNavigate();
  const [tournamentId, setTournamentId] = useState(null);
  var currImage = 1;
  var allImages;
  var len;
  const [paused, setPaused] = useState(false);
  const [l, setL] = useState(0);

  const [intervalId, setIntervalId] = useState(undefined);
  const [referral, setReferral] = useState("");
  useEffect(() => {
   
  localStoritems();
    async function authTokenGet() {
      if (isAuthenticated && localStorage.getItem("authtoken") == null) {
        await getAuthToken(user);
      }
    }
    authTokenGet();
    console.log()
  }, []);
  useEffect(() => {
    if (state && state.openDrawer) {
      setTournamentId(state.tournamentId);
    }
  }, []);
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  useEffect(() => {
    if (document.getElementById("choose-team-div")) {
      if (state && state.openDrawer) {
        delete state.openDrawer;
        window.history.replaceState(null, "");
        chooseTeamOpen().then(() => {
          setTimeout(() => {
            // console.log("i am in the scoll part ..............")
            var objDiv = document.getElementsByClassName("all-teams")[0];
            // console.log(objDiv.scrollHeight , objDiv.scrollTop);
            // objDiv.scrollTop = objDiv.scrollHeight;
            // console.log(objDiv.scrollHeight , objDiv.scrollTop);
            // const element = $(`.all-teams`)[0];
            // element.animate({
            //     scrollTop: element.prop("scrollHeight")
            // }, 500);
            scrollTo(objDiv, objDiv.scrollHeight, 400);

            selectTeam("team-" + (teams.length - 1), teams);
          }, 600);
        });
      }
    }
  }, [tournaments, tournamentId, teams]);
  useEffect(() => {
    allImages = document.getElementsByClassName("image-div");
    len = allImages.length;
    document
      .getElementsByClassName("overlay-div")[0]
      .addEventListener("mouseup", function (event) {
        var pol = document.getElementById("choose-team-div");
        if (event.target != pol && event.target.parentNode != pol) {
          chooseTeamClose();
          return;
        }
      });
    // fetchTournaments();
    dispatch(getTournamentAsync());
    console.log( dispatch(getTournamentAsync()));
    fetchTeams();
    setIntervalId(setInterval(nextImage, 2000));
    setL(len);
    // chooseTeamOpen();
  }, []);
  // async function fetchTournaments() {
  //   setTournaments(await getAllTournaments());
  // }
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
      if (!paused) currImage++;
    } else {
      allImages[0].style = `margin-left:0px`;
      currImage = 1;
    }
  }

  const tourOptions = {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
    },
    useModalOverlay: true,
  };

  const tourModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "520px",
    bgcolor: "background.paper",
    border: "2px solid grey",
    boxShadow: 24,
    borderRadius: "12px",
    minHeight: "510px",
    padding: "20px",
    ["@media (max-width:600px)"]: {
      width: 300,
      height: 420,
      minHeight: 420,
    },
  };

  function TourModal() {
    const [open1, setOpen1] = useState(
      localStorage.getItem("folioplay_new_user") === "true"
    );
    const handleClose = () => {
      setOpen1(false);
      localStorage.setItem("folioplay_new_user", false);
    };
    const tour = useContext(ShepherdTourContext);
    const handleClick = () => {
      setOpen1(false);
      localStorage.setItem("folioplay_new_user", false);
    };
    return (
      <div>
        <Modal
          open={open1}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableAutoFocus
        >
          <Box sx={tourModalStyle}>
            <img
              src={require("../../../images/howtoplay.jpg").default}
              width="100%"
              style={{ borderRadius: "12px" }}
            />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h1"
              style={{ fontFamily: "poppins" }}
            >
              Welcome to Folioplay!
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              style={{ fontFamily: "poppins" }}
            >
              Click start tour to get a short tour to the game. Good Luck !!
            </Typography>
            <div
              style={{
                widows: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <button
                className="button dark tour-button"
                onClick={() => {
                  setOpen1(false);
                  localStorage.setItem("folioplay_new_user", false);
                  tour.start();
                }}
              >
                {/* <button onClick={handleClick}> */}
                Start Tour
                {/* </button> */}
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
  const newsteps = [
    {
      id: "intro",
      attachTo: { element: ".tournament-info", on: "bottom" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Next",
          type: "next",
        },
      ],
      classes: "custom-class-name-1 custom-class-name-2",
      highlightClass: "highlight",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Welcome to FolioPlay!",
      text: ["Here you can view the tournament info"],
      when: {
        show: () => {},
        hide: () => {},
      },
    },
    {
      id: "intro-1",
      attachTo: { element: ".tournament-fee", on: "bottom" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Next",
          type: "next",
        },
      ],
      classes: "custom-class-name-1 custom-class-name-2",
      highlightClass: "highlight",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Welcome to FolioPlay!",
      text: ["By Clicking on this you can play the game"],
      when: {
        show: () => {},
        hide: () => {},
      },
    },
    {
      id: "intro-2",
      attachTo: { element: ".tournament-reward", on: "bottom" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Next",
          type: "next",
        },
      ],
      classes: "custom-class-name-1 custom-class-name-2",
      highlightClass: "highlight",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Welcome to FolioPlay!",
      text: ["Here you can see the reward of the tournament"],
      when: {
        show: () => {},
        hide: () => {},
      },
    },
    {
      id: "intro-3",
      attachTo: { element: "#folioplay-hamburger", on: "bottom" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Next",
          type: "next",
        },
      ],
      classes: "custom-class-name-1 custom-class-name-2",
      highlightClass: "highlight",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Welcome to FolioPlay!",
      text: ["Here you can access the sidebar"],
      when: {
        show: () => {},
        hide: () => {},
      },
    },
    {
      id: "intro-4",
      attachTo: { element: "#profile-icon", on: "bottom" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: "shepherd-button-secondary",
          text: "Exit",
          type: "cancel",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Next",
          type: "next",
        },
      ],
      classes: "custom-class-name-1 custom-class-name-2",
      highlightClass: "highlight",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Welcome to FolioPlay!",
      text: ["Here you can access your profile."],
      when: {
        show: () => {},
        hide: () => {},
      },
    },
    {
      id: "intro-5",
      attachTo: { element: "#folioplay-wallet", on: "bottom" },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: "shepherd-button-secondary",
          text: "Finish",
          type: "cancel",
        },
      ],
      classes: "custom-class-name-1 custom-class-name-2",
      highlightClass: "highlight",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Welcome to FolioPlay!",
      text: ["Here you can access your total coins and transaction history."],
      when: {
        show: () => {},
        hide: () => {},
      },
    },
    // ...
  ];

  const calculateTimeLeft = (difference) => {
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [expire, setExpire] = useState(false);
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <>
        <span>Starting in </span>
        <TimerIcon style={{ color: "var(--golden)" }} />
        <span className={"tournamentCard__countdownTimer"}>
          {days < 10 ? "0" + days : days} : {hours < 10 ? "0" + hours : hours} :{" "}
          {minutes < 10 ? "0" + minutes : minutes} :{" "}
          {seconds < 10 ? "0" + seconds : seconds}
        </span>
      </>
    );
  };
  const tournamentsList = tournaments ? (
    tournaments.filter((tournament) => filterToFunctionMap[filter](tournament))
      .length === 0 ? (
      <span className={"no-tournamnet-text"} style={{color:"black", fontWeight:"700"}}>No Tournaments...</span>
    ) : (
      tournaments
        .filter((tournament) => filterToFunctionMap[filter](tournament))
        .map((tournament, index) => {
          const seatsFilled =
            (100 * tournament.filled_spots) / tournament.total_spots;
          const startDate = new Date(tournament.start_time);
          const finishDate = new Date(tournament.end_time);
          const disabledClass =
            tournament.status !== 0 ? " disable-join-button" : "";
          const disabledTournament = tournament.status !== 0;

          return (
            <motion.div
              id={"tournament-" + tournament._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 * (index + 1) }}
              key={"tournament__" + index}
              className="tournament"
              onClick={() => {
                clearInterval(intervalId);
                navigate(`/tournament/${tournament._id}`, {
                  state: {
                    transactionId: tournament.transaction_hash,
                  },
                });
              }}
            >
              {tournament.user_joined ? (
                <div style={{ position: "relative" }}>
                  <div className="ribbon1 ribbon1-top-left">
                    <span>Joined</span>
                  </div>
                </div>
              ) : null}
              {/* <div className="ribbon1">  
              <span className="ribbon12">Joined</span>
            </div> */}
              <div className="tournament-info">
                <span
                  className="tournament-image"
                  style={{ borderRadius: "100%" }}
                >
                  <img
                    style={{ borderRadius: "100%" }}
                    src={tournament.imageURL}
                    loading={"lazy"}
                    width="60px"
                    height={"60px"}
                  />
                </span>
                <span style={{ textAlign: "left" }}>
                  <span style={{ color: "#071F36", fontWeight: "700" }}>
                    {tournament.name}
                  </span>
                  {/*<span style={{ color: "#071F36", fontWeight: "700" }}>*/}
                  {/*  {tournament.name}*/}
                  {/*</span>*/}
                  <br />
                  <span className="tournaments-spots">
                    <div className="tournamentPage__startTime">
                      {startDate.getDate()} {monthNames[startDate.getMonth()]}'
                      {startDate.getFullYear() % 100} |{" "}
                      {startDate.getHours() / 10 < 1
                        ? "0" + startDate.getHours()
                        : startDate.getHours()}
                      :
                      {startDate.getMinutes() / 10 < 1
                        ? "0" + startDate.getMinutes()
                        : startDate.getMinutes()}{" "}
                      GMT <br />
                      Duration : {(finishDate - startDate) / 60000} mins
                    </div>
                  </span>
                </span>
                {!disabledTournament && <Button
                  className={disabledClass + " tournament-fee"}
                  style={
                    disabledTournament
                      ? {}
                      : { backgroundColor: "var(--golden)" }
                  }
                  size="small"
                  onClick={(event) => {
                    event.cancelBubble = true;
                    if (event.stopPropagation) event.stopPropagation();
                    var tmp =
                      event.target.parentNode.parentNode.getAttribute("id");
                    setTournamentId(tmp.split("-")[1]);
                    // tournamentId = tournamentId.split("-")[1];
                    chooseTeamOpen();
                  }}
                  disabled={disabledTournament}
                >
                 JOIN&nbsp;@{tournament.entryFee} FPC
                </Button>}

                {disabledTournament && <Button
                  className={disabledClass + " tournament-fee"}
                  style={
                    disabledTournament
                      ? {}
                      : { backgroundColor: "var(--golden)" }
                  }
                  size="small"
                  onClick={(event) => {
                    event.cancelBubble = true;
                    if (event.stopPropagation) event.stopPropagation();
                    var tmp =
                      event.target.parentNode.parentNode.getAttribute("id");
                    setTournamentId(tmp.split("-")[1]);
                    // tournamentId = tournamentId.split("-")[1];
                    chooseTeamOpen();
                  }}
                  disabled={disabledTournament}
                >
                 {tournament.entryFee} FPC
                </Button> }
              </div>
              <div>
                <LinearProgress
                  variant="determinate"
                  style={{ backgroundColor: "var(--dim-white)" }}
                  value={seatsFilled}
                />
                <div className="spots-wrapper">
                  <span
                    className="font-size-12 font-weight-500 mt-5"
                    style={{ color: "var(--golden)" }}
                  >
                    {tournament.status === 0 ? (
                      <>{tournament.available_spots} spots left</>
                    ) : (
                      <>
                        {tournament.total_spots - tournament.available_spots}{" "}
                       
                        users joined
                      </>
                    )}
                  </span>

                 
                  <span
                    className="font-size-12 font-weight-500 mt-5"
                    style={{ color: "var(--dark-dim-white)" }}
                  >
                    {tournament.total_spots} spots
                  </span>
                </div>
                {/*<div className="tournamentPage__transactionHash">*/}
                {/*  {tournament.transaction_hash !== undefined && (*/}
                {/*    <span*/}
                {/*      className="font-size-12 tournamentPage__transactionHashLink"*/}
                {/*      onClick={() => {*/}
                {/*        window.location.href = `https://mumbai.polygonscan.com/tx/${tournament.transaction_hash}`;*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      Transaction Hash(Polygon):{" "}*/}
                {/*      {tournament.transaction_hash.substring(0, 10)}XXXX*/}
                {/*      {tournament.transaction_hash.slice(-10)}*/}
                {/*    </span>*/}
                {/*  )}*/}
                {/*</div>*/}
              </div>
              <div className="tournament-reward">
                {status[tournament.status].value !== "Open" ? (
                  <span
                    className="font-size-12"
                    style={{
                      color: status[tournament.status].color,
                      padding: "0 10px",
                      border: "1px solid " + status[tournament.status].color,
                      borderRadius: "30px",
                    }}
                  >
                    {status[tournament.status].value}
                  </span>
                ) : null}
                <div className="tournamentPage__countdown">
                  <span id="timeRemaining" className="font-size-12">
                    {startDate - 300000 > Date.now() ? (
                      <Countdown
                        date={startDate - 300000}
                        renderer={renderer}
                      />
                    ) : null}
                  </span>
                </div>
                <span className="font-size-12">
                  <EmojiEventsOutlinedIcon />
                  <span>{tournament.rewards.prize_pool} FPC</span>
                </span>
                {/* {tournament.user_joined ?  */}

                {/* : null} */}
              </div>
            </motion.div>
          );
        })
    )
  ) : (
    <></>
  );
  return (
    <ShepherdTour tourOptions={tourOptions} steps={newsteps}>
      <TourModal />
      <div className="fullpage">
        <FolioplayBar intervalId={intervalId} />
        {/* <PrivacyPolicies /> */}
        <ImageSlider setPaused={setPaused} />
        <div className="tournaments-wrapper">
          <span
            className="font-size-15 font-weight-500 mr-auto ml-20 mb-20"
            style={{ marginTop: "-30px", color: "var(--dark-dim-white)" }}
          >
            {/* Filters */}
            <Chip
              className="active-chip"
              style={{ fontFamily: "poppins" }}
              label="All"
              variant="outlined"
              onClick={() => {
                document
                  .getElementsByClassName("MuiChip-root")[0]
                  .classList.add("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[1]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[2]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[3]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[4]
                  .classList.remove("active-chip");
                  
                setFilter("all");
              }}
            />
            <Chip
              className="ml-10"
              style={{ marginLeft: "10px", fontFamily: "poppins" }}
              label="Live"
              variant="outlined"
              onClick={() => {
                document
                  .getElementsByClassName("MuiChip-root")[0]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[1]
                  .classList.add("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[2]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[3]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[4]
                  .classList.remove("active-chip");
                  
                setFilter("live");
              }}
            />
            <Chip
              className="ml-10"
              style={{ marginLeft: "10px", fontFamily: "poppins" }}
              label="Joined"
              variant="outlined"
              onClick={() => {
                document
                  .getElementsByClassName("MuiChip-root")[0]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[1]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[2]
                  .classList.add("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[3]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[4]
                  .classList.remove("active-chip");                  
                setFilter("joined");
              }}
            />
            <Chip
              className="ml-10"
              style={{ marginLeft: "10px", fontFamily: "poppins" }}
              label="Upcoming"
              variant="outlined"
              onClick={() => {
                document
                  .getElementsByClassName("MuiChip-root")[0]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[1]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[2]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[3]
                  .classList.add("active-chip");
                document
                .getElementsByClassName("MuiChip-root")[4]
                .classList.remove("active-chip");
                setFilter("upcoming");
              }}
            />
             <Chip
              className="ml-10"
              style={{ marginLeft: "10px", fontFamily: "poppins" }}
              label="Cancelled"
              variant="outlined"
              onClick={() => {
                document
                  .getElementsByClassName("MuiChip-root")[0]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[1]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[2]
                  .classList.remove("active-chip");
                document
                  .getElementsByClassName("MuiChip-root")[3]
                  .classList.remove("active-chip");
                  document
                  .getElementsByClassName("MuiChip-root")[4]
                  .classList.add("active-chip");
                setFilter("cancelled");
              }}
            />
          </span>
          {tournaments === undefined ||
          tournaments === null ||
          teams === undefined ||
          teams === null ? (
            <div className="loading-component">
              <ReactLoading type={"spin"} color="var(--violet-blue)" />{" "}
            </div>
          ) : (
            <>
              {tournaments.length === 0 ? (
                <span>No Tournaments</span>
              ) : (
                <>
                  {tournamentsList}
                  <JoinTournamentDrawer
                    teams={teams}
                    tournamentId={tournamentId}
                    joinTournamentAPI={joinTournamentAPI}
                    setErrorMessage={setErrorMessage}
                    setErrorMessageSnackOpen={setErrorMessageSnackOpen}
                    tournaments={tournaments}
                    changeTournament={true}
                    navigate={navigate}
                    intervalId={intervalId}
                  />
                </>
              )}
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
      </div>
    </ShepherdTour>
  );
};

export default LeftComponent;
