import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useMoralis } from "react-moralis";
import { scrollTo } from "../../../CommonFunctions/functions.js";
import {
  getAllUserTeams,
  getAmountWon,
  getRank,
  getTournamentById,
} from "../../../APIS/apis";
import ReactLoading from "react-loading";
import TimerIcon from "@mui/icons-material/Timer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, LinearProgress } from "@mui/material";
import { chooseTeamOpen } from "../common/chooseTeamAnimations";
import LeaderBoardTabs from "../../LeaderboardTabs/src";
import Countdown from "react-countdown";
import JoinTournamentDrawer from "../../JoinTournamentDrawer/src";
import Snackbar from "@mui/material/Snackbar";
import { motion } from "framer-motion/dist/framer-motion";
import { SERVER } from "../../../APIS/apis";
import selectTeam from "../common/selectTeam";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeaderboardAsync,
  getWinnersAsync,
} from "../../../Redux/LeaderBoard/LeaderBoardSlice";
const LeftTournamentView = () => {
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
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {

      return (
     <></>
      )
  
    }
    return (
      <>
        <span style={{ color: "var(--dark-dim-white" }}>Registration closing in </span>
        <TimerIcon style={{ color: "var(--golden)" }} fontSize="small" />
        <span className={"tournamentCard__countdownTimer"}>
          {days < 10 ? "0" + days : days} : {hours < 10 ? "0" + hours : hours} :{" "}
          {minutes < 10 ? "0" + minutes : minutes} :{" "}
          {seconds < 10 ? "0" + seconds : seconds}
        </span>
      </>
    );
  };

  const rendererBuffer = ({ days, hours, minutes, seconds, completed }) => {
    if(completed) {
      
      // dispatch(getTournamentAsync());
      return <></>}
    return (
      <>
       <span className="font-weight-500" style={{color:"var(--grey-shade)",fontFamily:"poppins",letterSpacing:"0.5px"}}>Starting in
      
        <TimerIcon style={{ color: "var(--golden)" }} />
        <span className={"tournamentCard__countdownTimer"}>
          {days < 10 ? "0" + days : days} : {hours < 10 ? "0" + hours : hours} :{" "}
          {minutes < 10 ? "0" + minutes : minutes} :{" "}
          {seconds < 10 ? "0" + seconds : seconds}
        </span></span>
      </>
    );
  };
  const rendererEnd = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {

      return <></>
    }
    return (
      <>
        <span className="font-weight-500" style={{ color: "var(--grey-shade)", fontFamily: "poppins", letterSpacing: "0.5px" }}>Ends in{" "}</span>
        <TimerIcon style={{ color: "red" }} fontSize="small" />
        <span className={"tournamentCard__countdownTimer"} style={{ color: "red" }}>

          {days < 10 ? "0" + days : days} : {hours < 10 ? "0" + hours : hours} :{" "}
          {minutes < 10 ? "0" + minutes : minutes} :{" "}
          {seconds < 10 ? "0" + seconds : seconds}
        </span>
      </>
    );
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const dispatch = useDispatch();
  var navigate = useNavigate();

  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState("");

  const localStoritems = async () => {
    const userr = await localStorage.getItem("user");
    await setUser(userr);
    const isLoggedIn = await localStorage.getItem("isLoggedIn");
    await setIsAuthenticated(isLoggedIn);
  }
  // const { user } = useMoralis();
  const { state } = useLocation();
  // let account = user.get("ethAddress");
  const [balance, setBalance] = useState("");
  const [balanceSnackOpen, setBalanceSnackOpen] = useState(false);
  const [errorMessageSnackOpen, setErrorMessageSnackOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    variant: "error",
  });
  const [tournament, setTournament] = useState(undefined);
  // const tournament = useSelector((state)=>state.LeaderBoardSlice.leaderBoard);
  const [amountWon, setAmountWon] = useState(0);
  const [rank, setRank] = useState(undefined);
  const params = useParams();
  const _id = params.tournamentId;
  const [teams, setTeams] = useState(undefined);
  const [userImg, setUserImg] = useState(null);
  const defaultImage = require("../../../images/profilepic.jpeg").default;
  var seatsFilled = 0;
  const getPresentUser = async () => {
    const authToken = localStorage.getItem("authtoken");
    const res = await fetch(`${SERVER}/user`, {
      method: "GET",
      headers: {
        "x-access-token": authToken,
      },
    }).then((res) => res.json());
    // setPresentUser(res);
    if (res.imageURL) setUserImg(res.imageURL);
    else setUserImg(defaultImage);
  };
  async function fetchTournament() {
    setTournament(await getTournamentById({ _id: _id }));
    console.log(await getTournamentById({ _id: _id }));
  }
  async function fetchAmountWon() {
    setAmountWon(await getAmountWon({ _id: _id }));
    await console.log("ammounttt from line 118");
   await console.log(await getAmountWon({ _id: _id }));
  }

  async function fetchTeams() {
    setTeams(await getAllUserTeams());

  }
  async function fetchRank() {
    const data = await getRank({ tournamentId: _id });
    setRank(data);
    await console.log("rank data")
    await console.log(data)
  }
  useEffect(() => {

    localStoritems();
    if (document.getElementById("choose-team-div")) {
      if (state && state.openDrawer) {
        delete state.openDrawer;
        window.history.replaceState(null, "");
        chooseTeamOpen().then(() => {
          setTimeout(() => {
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
  }, [tournament, teams]);
  useEffect(() => {
    if ("superstars" in window.localStorage)
      window.localStorage.removeItem("superstars");
    if ("mooning" in window.localStorage)
      window.localStorage.removeItem("mooning");
    if ("rekt" in window.localStorage) window.localStorage.removeItem("rekt");
    dispatch(getLeaderboardAsync(_id));
    dispatch(getWinnersAsync(_id));

    fetchTournament();
    fetchTeams();
    fetchRank();
    fetchAmountWon();
    getPresentUser();
  }, []);

  const leaderBoardRedux = useSelector(
    (state) => state.LeaderBoardSlice.leaderBoard
  );
  const winnersRedux = useSelector((state) => state.LeaderBoardSlice.winners);

  if (tournament !== undefined) {
    seatsFilled = (100 * tournament.filled_spots) / tournament.total_spots;
  }
  const [snackOpen, setSnackOpen] = useState(false);
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setBalanceSnackOpen(false);
  };
  const handleErrorMessageSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorMessageSnackOpen(false);
  };
  var disabledClass =
    tournament && tournament.status !== 0 ? " disable-join-button" : "";
  var disabledTournament = tournament && tournament.status !== 0 ? true : false;
  // disabledTournament = false;
  // let tournament_info_contain  er_completed = (tournament && tournament.status === 3) ? "tournament-info-container-completed-bgc" : "";
  let empty_header =
    tournament && tournament.status === 3 ? "empty-area-completed" : "";
  const startTime = tournament ? new Date(tournament.start_time) : undefined;
  const endTime = tournament ? new Date(tournament.end_time) : undefined;
  return (
    <div className="fullpage">
      {tournament === undefined || teams === undefined ? (
        <div className="loading-component">
          <ReactLoading type={"spin"} color="var(--white)" />{" "}
        </div>
      ) : (
        <>
          <div className="tournament-view-bar">
            <ArrowBackIosIcon
              fontSize="medium"
              className="go-back-button"
              onClick={() => navigate("/tournaments", {})}
            />
            <span className="ml-20 font-size-20 font-weight-700">
              {tournament.name}
            </span>

          </div>
          <div className="tournaments-spots_White">
            <div>    Date : {startTime.getDate()} {monthNames[startTime.getMonth()]}'
              {startTime.getFullYear() % 100}</div>

            <div>
              Time :  {startTime.getHours() / 10 < 1
                ? "0" + startTime.getHours()
                : startTime.getHours()}
              :
              {startTime.getMinutes() / 10 < 1
                ? "0" + startTime.getMinutes()
                : startTime.getMinutes()}{" "}
              GMT
            </div>
          </div>





          {tournament.status === 3 ? (
            <>
              <div className={"empty-area-completed "}>
                <div className={"empity-area-text"} style={{ maxWidth: "100%", display: "flex", justifyContent: "space-evenly", width: "100%", textAlign: "center" }}>
                  <div style={{ maxWidth: "50%", width: "100%" }}>  Prize Pool - <b>{tournament.rewards.prize_pool} FPC </b></div>
                  <div style={{ maxWidth: "50%", width: "100%" }}> Spots - <b>{tournament.total_spots}</b></div>
                </div>
                <div className="" style={{ maxWidth: "100%", display: "flex", justifyContent: "center", marginTop: "20px" }}> <span
                  style={{
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    window.open(
                      `https://mumbai.polygonscan.com/tx/${tournament.transaction_hash}`
                    );
                  }}
                >
                  {/*<u>Click here to view on Polygon.</u>*/}
                  <span className="tournamentView__transactionId">
                    <u>Tournament ID: {tournament.transaction_hash.slice(-5)}</u>
                    <img
                      className="ml-5"
                      src={require("../../../images/polygon_logo.png").default}
                      height={"20"}
                      width={"20"}
                      alt={"polygon"}
                    />
                  </span>
                </span></div>
              </div>
            </>
          ) : (
            <>
              <div className={"empty-area-incompleted "}>
                <span
                  style={{
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    window.open(
                      `https://mumbai.polygonscan.com/tx/${tournament.transaction_hash}`
                    );
                  }}
                >
                  {/*<u>Click here to view on Polygon.</u>*/}
                  <span className="tournamentView__transactionId">
                    <u>Tournament ID: {tournament.transaction_hash.slice(-5)}</u>
                    <img
                      className="ml-5"
                      src={require("../../../images/polygon_logo.png").default}
                      height={"20"}
                      width={"20"}
                      alt={"polygon"}
                    />
                  </span>
                </span>
              </div>
            </>
          )}


          <div className={"tournament-info-container "}>
            {tournament.status !== 3 ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: -90 }}
                transition={{ duration: 0.3 }}
                className="tournament-view-card"
              >
                <div className="tournament-view-info">
                  <span style={{ textAlign: "left" }}>
                    <span
                      className="font-size-12 font-weight-500"
                      style={{ color: "var(--grey-shade)" }}
                    >
                      Prize Pool
                    </span>
                    <br />
                    <span className="font-size-20 font-weight-500">
                      {/* {tournament.total_reward} MGT */}
                      {tournament.rewards.prize_pool} FPC
                    </span>
                  </span>
                  <span className="ml-auto" style={{ textAlign: "right" }}>
                    <span
                      className="font-size-12 font-weight-500"
                      style={{ color: "var(--grey-shade)" }}
                    >
                      Entry Fee
                    </span>
                    <br />

                    {startTime - 300000 > Date.now() ? (
                      <Button
                        className={disabledClass + " tournament-fee"}
                        size="small"
                        style={
                          disabledTournament
                            ? {}
                            : { backgroundColor: "var(--golden)" }
                        }
                        onClick={() => {
                          chooseTeamOpen();
                          fetchTournament();
                        }}
                        disabled={disabledTournament}
                      >
                        {tournament.entryFee} FPC
                      </Button>) : (<Button
                        className={disabledClass + " tournament-fee"}
                        size="small"
                        style={
                          disabledTournament
                            ? {}
                            : { backgroundColor: "var(--golden)" }
                        }
                        onClick={() => {
                          chooseTeamOpen();
                         
                        }}
                        disabled={disabledTournament}
                      >
                        {/* {tournament.entryFee} FPC */}
                        {tournament.entryFee} FPC
                      </Button>
                      )}
                  </span>
                </div>
                {tournament.status === -2 &&
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
                      >Cancelled
                      </span>
                    </div>
                  </div>}
                {tournament.status !== -2 &&
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
                        <span id={tournament.id + "-left-spots"}>
                          {tournament.total_spots - tournament.filled_spots}
                        </span>{" "}
                        spots left
                      </span>
                      <span
                        className="font-size-12 font-weight-500 mt-5"
                        style={{ color: "var(--dark-dim-white)" }}
                      >
                        {tournament.total_spots} spots
                      </span>
                    </div>
                  </div>}
                <div
                  className="tournamentPage__countdown"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    padding:"5px 0 0 0"
                  }}
                >
                  <span
                    id="timeRemaining"
                    className="font-size-12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      transform: "translateY(-10px)",
                    }}
                  >

{tournament.status === 1 ? ( <Countdown
                       date={startTime}
                        renderer={rendererBuffer}
                      />
):(null) }

                   
                    {startTime > Date.now() ? (
                      <Countdown
                        date={startTime - 60000}
                        renderer={renderer}
                      />
                    ) : (
                      <>
                        {tournament.status !== -2 && endTime > Date.now() ? (
                          <Countdown
                            date={endTime}
                            renderer={rendererEnd}
                          />
                        ) : null}
                      </>
                    )}
                  </span>
                  {/* const startDate = new Date(tournament.start_time); */}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: -90 }}
                transition={{ duration: 0.3 }}
                className={
                  tournament.status === 0
                    ? "tournament-view-card-completed"
                    : "tournament-view-card-completed-red"
                }
              >
                {amountWon !== -2 ? (
                  <>
                    <div className="profileHeaderTP">
                      <div className="profilePicture">
                        <img
                          src={userImg}
                          alt="profilePic"
                          height="64px"
                          width=" 64px"
                          className="profilepic__image"
                        />
                      </div>

                      <div className="userDetails">
                        <div className="userNameTP">
                          {localStorage.getItem("folioUsername")}
                        </div>
                        <div className="tview__rewardDisplay">
                          <span>You won {amountWon} FPC</span>
                        </div>
                      </div>
                    </div>
                    <img
                      className="winner-cups-img"
                      src={require("../../../images/cups-winner.png").default}
                      width="200px"
                      style={{ transform: "translate(115%,-5%)" }}
                    />
                  </>
                ) : (
                  <div className="profileHeaderNP">
                    <img
                      className="winner-cups-img"
                      src={require("../../../images/cups-winner.png").default}
                      width="200px"
                    />
                    {winnersRedux.length > 0 && (
                      <span className="winner-span font-weight-500" style={{}}>
                        <b>{winnersRedux[0].user.username}</b>&nbsp; won &nbsp;
                        <b>{winnersRedux[0].amount_won} FPC</b>&nbsp; in this
                        tournament
                      </span>
                    )}
                    <span
                      className="font-size-12"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      You didn't participated in this tournament.
                    </span>
                    <span
                      className="font-size-12 join-tourna-span"
                      onClick={() => {
                        navigate("/tournaments");
                      }}
                    >
                      Join new tournaments
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            <div className="folioplay-tabs">
              <LeaderBoardTabs
                tournamentId={tournament.id}
                tournamentStatus={tournament.status}
                tournamentPrizes={tournament.rewards.distribution}
                rewardSize={tournament.rewards.places_paid}
                tournament={tournament}
              />
            </div>
            <JoinTournamentDrawer
              teams={teams}
              tournamentId={tournament.id}
              tournaments={[]}
              setErrorMessage={setErrorMessage}
              setErrorMessageSnackOpen={setErrorMessageSnackOpen}
              navigate={navigate}
              changeTournament={true}
            />
          </div>
        </>
      )}
      <Snackbar
        open={balanceSnackOpen}
        autoHideDuration={3500}
        onClose={handleSnackClose}
      >
        <motion.div
          id="snack-bar-div"
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert
            id="team-creation-message"
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%", fontFamily: "poppins" }}
          >
            Not sufficient balance
          </Alert>
        </motion.div>
      </Snackbar>
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

export default LeftTournamentView;
