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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import joinTournament from "../common/joinTournament";
import deleteClickedTeam from "../common/deleteClickedTeam";
import selectTeam from "../common/selectTeam";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useMoralis } from "react-moralis";
import { chooseTeamClose, chooseTeamOpen } from "../common/chooseTeamAnimations";


export default function Tournaments() {

  const { user, isAuthenticated } = useMoralis();

  useEffect(() => {
    async function authTokenGet() {
      console.log("==========-------------authtoken get")
      if (isAuthenticated && localStorage.getItem("authtoken") == null) {
        console.log("----------------------------sadasdasdasd")
        await getAuthToken(user)
      }
    }
    authTokenGet();
  }, [])



  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const status = { 3: { "value": "Completed", "color": "#ff000096" }, 1: { "value": "Closed", "color": "#ff000096" }, 0: { "value": "Open", "color": "#00ff00d6" }, 2: { "value": "Running", "color": "#00ff00d6" } }
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [errorMessage, setErrorMessage] = useState({ message: "", variant: "" });
  const [errorMessageSnackOpen, setErrorMessageSnackOpen] = useState(false);
  const pad = (num) => ("0" + num).slice(-2);
  const navigate = new useNavigate();
  var tournamentId;
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
  const tournamentsList = tournaments.map((tournament, index) => {
    const seatsFilled =
      (100 * tournament.filled_spots) / tournament.total_spots;
    const startDate = new Date(tournament.start_time);
    const finishDate = new Date(tournament.end_time);
    const currDate = new Date();
    if (tournament.id === "62c45abedfe60c1bada2355f") {
      tournament.imageURL = "../../../images/bulls.png";
    }
    if (tournament.id === "62c45a6ddfe60c1bada234a8") {
      tournament.imageURL = "../../../images/justice.png";
    }
    // console.log(startDate);
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
            onClick={() => navigate(`/tournaments/${tournament._id}`)}
          >
            <span style={{ color: "#071F36", fontWeight: "700" }}>{tournament.name}</span>
            <br />
            <span className="tournaments-spots">
              {tournament.live ? (
                <>
                  <FiberManualRecordIcon
                    fontSize="small"
                    style={{ fontSize: "12px", color: "var(--green)" }}
                  />{" "}
                  Live
                </>
              ) : (
                <>
                  <span className="font-size-12">
                    {startDate.getDate()} {monthNames[startDate.getMonth()]}'{startDate.getFullYear() % 100},&ensp;{startDate.getHours() / 10 < 1 ? "0" + startDate.getHours() : startDate.getHours()} : {startDate.getMinutes() / 10 < 1 ? "0" + startDate.getMinutes() : startDate.getMinutes()} hrs -{" "}
                    {finishDate.getHours() / 10 < 1 ? "0" + finishDate.getHours() : finishDate.getHours()} : {finishDate.getMinutes() / 10 < 1 ? "0" + finishDate.getMinutes() : finishDate.getMinutes()} hrs
                  </span>
                </>
              )}
            </span>
          </span>
          <Button
            className="tournament-fee"
            size="small"
            onClick={(event) => {
              tournamentId =
                event.target.parentNode.parentNode.getAttribute("id");
              tournamentId = tournamentId.split("-")[1];
              console.log(tournamentId);
              chooseTeamOpen();
            }}
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
  });
  const LeftComponent = () => {
    return (
      <div className="fullpage">
        <FolioplayBar />
        <div
          style={{
            marginTop: "40px",
            textAlign: "left",
            marginLeft: "3.75%",
            marginBottom: "40px",
          }}
        >
          <span className="font-weight-700 font-size-30">Welcome</span>
          <br />
          <span style={{ letterSpacing: "1px" }}>
            Time to turn the tables with your skills
          </span>
        </div>
        <div className="tournaments-wrapper">
          <span className="font-size-15 font-weight-500 mr-auto ml-20 mb-20" style={{ marginTop: "-30px", color: "var(--dark-dim-white)" }}>Trendings</span>
          {tournaments.length === 0 ? (
            <div className="loading-component">
              <ReactLoading type={"spin"} color="var(--violet-blue)" />{" "}
            </div>
          ) : (
            <>{tournamentsList}</>
          )}
          <div
            key={"enter-tournament"}
            id="choose-team-div"
            className="display-none"
          >
            {/* <CancelIcon
              onClick={() => {
                chooseTeamClose();
              }}
              style={{ color: "var(--grey-shade)" }}
              fontSize="large"
              id="cross-choose-team"
            /> */}
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
                  onClick={() => joinTournament(teams, tournamentId, joinTournamentAPI, setErrorMessage, setErrorMessageSnackOpen)}
                >
                  Continue
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
                    onClick={() => navigate("/teams/createteam")}
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
                    onClick={() => navigate("/teams/createteam")}
                  >
                    Create New Team
                  </Button>
                }
              </div>
            </div>
          </div>
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
              sx={{ width: "100%" }}
            >
              {errorMessage.message}
            </Alert>
          </motion.div>
        </Snackbar>
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
