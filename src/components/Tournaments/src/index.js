import React, { useEffect, useState } from "react";
import FolioplayBar from "../../FolioplayBar/src";
import { Button, LinearProgress } from "@mui/material";
import ReactLoading from "react-loading";
import {
  getTournamentById,
  getAllUserTeams,
  deleteTeam,
} from "../../../APIS/apis";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { useNavigate } from "react-router-dom";
import "../style/index.css";
import { motion } from "framer-motion/dist/framer-motion";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { getAllTournaments } from "../../../APIS/apis";
import PreviewIcon from "@mui/icons-material/Preview";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { CleaningServices } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const pad = (num) => ("0" + num).slice(-2);
  const navigate = new useNavigate();
  const getTimeFromDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
    return pad(hours) + ":" + pad(minutes);
  };
  useEffect(() => {
    fetchTournaments();
    fetchTeams();
  }, []);
  async function fetchTournaments() {
    setTournaments(await getAllTournaments());
  }
  async function fetchTeams() {
    setTeams(await getAllUserTeams());
  }
  var tournamentId;
  function selectTeam(clickedId) {
    var allTeams = document.getElementsByClassName("team");
    var selectedTeam = document.getElementById(clickedId);
    for (var i = 0; i < teams.length; i++) {
      document
        .getElementById("team-" + i)
        .classList.remove("selected-background");
    }
    if ([...selectedTeam.classList].includes("selected-background") === false) {
      document.getElementById("jointournament-button").style.display = "block";
      selectedTeam.classList.add("selected-background");
    }
  }
  var tournamentId;
  function joinTournament() {
    // var allTeams = document.getElementsByClassName("team");
    var teamId = "";
    for (var i = 0; i < teams.length; i++) {
      if (
        [...document.getElementById("team-" + i).classList].includes(
          "selected-background"
        ) === true
      ) {
        teamId = teams[parseInt(i)].id;
        break;
      }
    }
    console.log(teamId, tournamentId);
  }
  function deleteClickedTeam(event) {
    var teamId =
      event.target.parentNode.parentNode.parentNode.getAttribute("id");
    var teamIndex = teamId.split("-")[1];
    teamId = teams[parseInt(teamIndex)].id;
    deleteTeam({ teamId, teamIndex });
  }
  const tournamentsList = tournaments.map((tournament, index) => {
    const seatsFilled =
      (100 * tournament.filled_spots) / tournament.total_spots;
    const startDate = new Date(tournament.start_time);
    const finishDate = new Date(tournament.end_time);
    const currDate = new Date();
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
          <span className="tournament-image"></span>
          <span
            style={{ textAlign: "left" }}
            onClick={() => navigate(`/tournaments/${tournament._id}`)}
          >
            {tournament.name}
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
                  {getTimeFromDate(startDate.getTime())} hrs -{" "}
                  {getTimeFromDate(finishDate.getTime())} hrs
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
              document
                .getElementById("choose-team-div")
                .classList.remove("animation-move-down");
              setTimeout(() => {
                document
                  .getElementById("choose-team-div")
                  .classList.add("animation-move-up");
              }, 100);
              setTimeout(() => {
                document
                  .getElementById("choose-team-div")
                  .classList.remove("display-none");
              }, 400);
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
          <span style={{ minWidth: "100px", color: "var(--dark-dim-white)" }}>
            {tournament.filled_spots}/{tournament.total_spots} Spots Filled
          </span>
        </div>
        <div className="tournament-reward">
          <EmojiEventsOutlinedIcon />
          {tournament.reward} MGT
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
          <span className="font-weight-800 font-size-30">Welcome</span>
          <br />
          <span style={{ letterSpacing: "1px" }}>
            Time to turn the tables with your skills
          </span>
        </div>
        <div className="tournaments-wrapper">
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
            <CancelIcon
              onClick={() => {
                document
                  .getElementById("choose-team-div")
                  .classList.remove("animation-move-up");
                setTimeout(() => {
                  document
                    .getElementById("choose-team-div")
                    .classList.add("animation-move-down");
                }, 100);

                setTimeout(() => {
                  document
                    .getElementById("choose-team-div")
                    .classList.add("display-none");
                }, 700);
              }}
              style={{ color: "var(--grey-shade)" }}
              fontSize="large"
              id="cross-choose-team"
            />
            <div id="all-teams-info">
              <div>
                <span
                  className="font-size-25 font-weight-800 mb-10"
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
                <div>
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
                            className="font-size-20 font-weight-600"
                            style={{ color: "var(--grey-shade)" }}
                          >
                            {team.name}
                          </span>
                          <span
                            id="visible-coins"
                            style={{ marginLeft: "auto" }}
                          >
                            {/* <span style={{ display: 'inline-block', backgroundColor: "var(--white)", width: "40px", height: "40px", borderRadius: "100%" }}><img src={require('../../../images/coinLogos/' + team.selectedCoins[0].symbol.toLowerCase() + '.png').default} width={40} height={40} style={{ borderRadius: "100%", border: "1px solid var(--dim-white)" }} /></span>
                                                         <span className="moved-coin-image-1" style={{ display: 'inline-block', backgroundColor: "var(--white)", width: "40px", height: "40px", borderRadius: "100%" }} ><img src={require('../../../images/coinLogos/' + team.selectedCoins[1].symbol.toLowerCase() + '.png').default} width={40} height={40} style={{ borderRadius: "100%", border: "1px solid var(--dim-white)" }} /></span>
                                                    <span className="moved-coin-image-2" style={{ display: 'inline-block', backgroundColor: "var(--white)", width: "40px", height: "40px", borderRadius: "100%" }} ><img src={require('../../../images/coinLogos/' + team.selectedCoins[2].symbol.toLowerCase() + '.png').default} width={40} height={40} style={{ borderRadius: "100%", border: "1px solid var(--dim-white)" }} /></span> */}
                            <CheckCircleIcon
                              className="select-team-button team-buttons"
                              onClick={() => selectTeam(clickedId)}
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
                              onClick={(event) => deleteClickedTeam(event)}
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
                  onClick={() => joinTournament()}
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
                    // document.querySelector' .preview-team-button').classList.add('display-none');
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
                <Button
                  style={{
                    color: "var(--golden)",
                    fontWeight: "600",
                    fontSize: "17px",
                  }}
                  onClick={() => navigate("/teams/createteam")}
                >
                  Create New
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const RightComponent = () => {
    return (
      <div id="tournament-page-image">
        <h1
          style={{
            letterSpacing: "2px",
            fontSize: "2.7rem",
            fontWeight: "900",
          }}
        >
          Let the game begin!
        </h1>
        <h3 style={{ letterSpacing: "2px" }}>
          Choose a contest to start playing...
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
