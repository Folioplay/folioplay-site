import React, { useEffect, useState } from "react";
import FolioplayBar from "../../FolioplayBar/src";
import ImageSlider from "../../ImageSlider/src";
import ReactLoading from "react-loading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import selectTeam from "../common/selectTeam";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteClickedTeam from "../common/deleteClickedTeam";
import JoinTournamentDrawer from "../../JoinTournamentDrawer/src";
import {
  deleteTeam,
  getAllTournaments,
  getAllUserTeams,
  getAuthToken,
  joinTournamentAPI,
} from "../../../APIS/apis";
import { Button, LinearProgress, Snackbar } from "@mui/material";
import joinTournament from "../common/joinTournament";
import { useMoralis } from "react-moralis";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import {
  chooseTeamClose,
  chooseTeamOpen,
} from "../common/chooseTeamAnimations";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { motion } from "framer-motion/dist/framer-motion";
import Countdown from "react-countdown";

const LeftComponent = () => {
  const { user, isAuthenticated, logout } = useMoralis();
  const [loaded, setLoaded] = useState(false);
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
    await logout();
  };

  const status = {
    3: { value: "Completed", color: "#ff000096" },
    1: { value: "Closed", color: "#FFCC00" },
    0: { value: "Open", color: "#00ff00d6" },
    2: { value: "Running", color: "#FFCC00" },
  };
  const [tournaments, setTournaments] = useState(undefined);
  const [teams, setTeams] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    variant: "",
  });
  const [errorMessageSnackOpen, setErrorMessageSnackOpen] = useState(false);
  const pad = (num) => ("0" + num).slice(-2);
  const navigate = new useNavigate();
  const [tournamentId,setTournamentId] = useState(null);
  var currImage = 1;
  var allImages;
  var len;
  const [paused, setPaused] = useState(false);
  const [l, setL] = useState(0);

  const [intervalId, setIntervalId] = useState(undefined);
  const [referral, setReferral] = useState("");

  useEffect(() => {
    async function authTokenGet() {
      if (isAuthenticated && localStorage.getItem("authtoken") == null) {
        await getAuthToken(user);
      }
    }
    authTokenGet();
  }, []);
  useEffect(() => {
    document
      .getElementsByClassName("overlay-div")[0]
      .addEventListener("mouseup", function (event) {
        var pol = document.getElementById("choose-team-div");
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
    setIntervalId(setInterval(nextImage, 2000));
    console.log(allImages);
    setL(len);
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
      if (!paused) currImage++;
    } else {
      allImages[0].style = `margin-left:0px`;
      currImage = 1;
    }
  }

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

  //   const [difference, setDifference] = useState(null);
  //   const currDate = new Date();
  //   const [timeLeft, setTimeLeft] = useState({});
  //   useEffect(() => {
  //     if (difference <= 0) {
  //       return;
  //     }

  //     setTimeout(() => {
  //       // setTimeLeft(calculateTimeLeft(difference));
  //       console.log("hello");
  //     }, 1000);
  //   }, []);
  const [expire, setExpire] = useState(false);
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <span>
        Time Remaining: {days} days {hours} hours {minutes} minutes {seconds}{" "}
        seconds
      </span>
    );
  };
  const tournamentsList = tournaments ? (
    tournaments.map((tournament, index) => {
      // console.log("tournament Page", tournament);
      const seatsFilled =
        (100 * tournament.filled_spots) / tournament.total_spots;
      const startDate = new Date(tournament.start_time);
      const finishDate = new Date(tournament.end_time);

      const disabledClass =
        tournament.status !== 0 ? " disable-join-button" : "";
      const disabledTournament = tournament.status !== 0;

      //   // new Date(tournament.start_time) - new Date();
      //   let currentDate = new Date();
      //
      //   const timer = setTimeout(() => {
      //     const difference = startDate - currentDate;
      //
      //     let timeLeft = {};
      //
      //     if (difference > 0) {
      //       timeLeft = {
      //         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      //         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      //         minutes: Math.floor((difference / 1000 / 60) % 60),
      //         seconds: Math.floor((difference / 1000) % 60)
      //       };
      //     }}, 1000);
      //
      //   const timerComponents = [];
      //
      //   Object.keys(timeLeft).forEach((interval) => {
      //     if (!timeLeft[interval]) {
      //       return;
      //     }
      //
      //     timerComponents.push(
      //         <span>
      //   {timeLeft[interval]} {interval}{" "}
      // </span>
      //     );
      //   });
      //

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
              <img
                style={{ borderRadius: "100%" }}
                src={tournament.imageURL}
                width="50px"
                height={"50px"}
              />
            </span>
            <span
              style={{ textAlign: "left" }}
              onClick={() => {
                console.log("intervalId is here", intervalId);
                clearInterval(intervalId);
                navigate(`/tournaments/${tournament._id}`, {
                  state: {
                    transactionId: tournament.transaction_hash,
                  },
                });
              }}
            >
              <span style={{ color: "#071F36", fontWeight: "700" }}>
                {tournament.name}
              </span>
              {/*<span style={{ color: "#071F36", fontWeight: "700" }}>*/}
              {/*  {tournament.name}*/}
              {/*</span>*/}
              <br />
              <span className="tournaments-spots">
                <div className="tournamentPage__startTime">
                  Start Time
                  <div>
                    <span className="font-size-12">
                      {startDate.getDate()} {monthNames[startDate.getMonth()]}'
                      {startDate.getFullYear() % 100},
                      {startDate.getHours() / 10 < 1
                        ? "0" + startDate.getHours()
                        : startDate.getHours()}
                      :
                      {startDate.getMinutes() / 10 < 1
                        ? "0" + startDate.getMinutes()
                        : startDate.getMinutes()}
                      hrs
                    </span>
                  </div>
                </div>
                <div>
                  End Time
                  <div>
                    <span className="font-size-12">
                      {startDate.getDate()} {monthNames[startDate.getMonth()]}'
                      {startDate.getFullYear() % 100},
                      {finishDate.getHours() / 10 < 1
                        ? "0" + finishDate.getHours()
                        : finishDate.getHours()}
                      :
                      {finishDate.getMinutes() / 10 < 1
                        ? "0" + finishDate.getMinutes()
                        : finishDate.getMinutes()}
                      hrs
                    </span>
                  </div>
                </div>
              </span>
            </span>
            <Button
              className={disabledClass + " tournament-fee"}
              size="small"
              style={
                disabledTournament ? {} : { backgroundColor: "var(--golden)" }
              }
              onClick={(event) => {
                var tmp = event.target.parentNode.parentNode.getAttribute("id");
                setTournamentId(tmp.split("-")[1]);
                // tournamentId = tournamentId.split("-")[1];
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
              <span
                className="font-size-12 font-weight-500 mt-5"
                style={{ color: "var(--golden)" }}
              >
                {tournament.available_spots} spots left
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
            <div className="tournamentPage__countdown">
              <span id="timeRemaining" className="font-size-12">
                {startDate > Date.now() ? (
                  <Countdown date={startDate - 300000} renderer={renderer} />
                ) : null}
              </span>
            </div>
          </div>
          <div className="tournament-reward">
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
            <span className="font-size-12">
              <EmojiEventsOutlinedIcon />
              <span>{tournament.rewards.prize_pool} MGT</span>
            </span>
          </div>
        </motion.div>
      );
    })
  ) : (
    <></>
  );
  const steps = [
    {
      target: "#folioplay-hamburger",
      disableBeacon: true,
      content: "Explore here",
    },
    {
      target: "#folioplay-wallet",
      disableBeacon: true,
      content: "World step",
    },
    {
      target: "#image-slider-wrapper",
      disableBeacon: true,
      content: "Hello step 1",
    },
  ];

  return (
    <div className="fullpage">
      <FolioplayBar intervalId={intervalId} />
      {/* <PrivacyPolicies /> */}
      <ImageSlider setPaused={setPaused} />
      <div className="tournaments-wrapper">
        <span
          className="font-size-15 font-weight-500 mr-auto ml-20 mb-20"
          style={{ marginTop: "-30px", color: "var(--dark-dim-white)" }}
        >
          Trending
        </span>
        {tournaments === undefined ||
        tournaments.length === 0 ||
        teams === undefined ? (
          <div className="loading-component">
            <ReactLoading type={"spin"} color="var(--violet-blue)" />{" "}
          </div>
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
            />
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
  );
};

export default LeftComponent;
