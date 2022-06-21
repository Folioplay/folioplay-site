import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { LinearProgress } from "@mui/material";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import "../style/index.css";
import { Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import LeaderBoardTabs from "../../LeaderboardTabs/src";
import CancelIcon from '@mui/icons-material/Cancel';
import {getTournamentById, getAllUserTeams, joinTournamentAPI} from "../../../APIS/apis";
import {useMoralis} from "react-moralis";
import {ethers, providers} from "ethers";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import WalletConnectProvider from "@walletconnect/web3-provider";
export default function TournamentView() {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const provider = new ethers.providers.JsonRpcProvider(`https://polygon-rpc.com/`);
    const {user} = useMoralis();
    // var navigate = useNavigate();
    const [balance, setBalance] = useState("");
    // const params = useParams();
    // const [chooseTeamBool, setChooseTeamBool] = useState(false);
    // const _id = params.tournamentId;
    // const [teams, setTeams] = useState([]);
    // async function fetchTournament() {
    //     setTournament(await getTournamentById({ _id: _id }));
  var navigate = useNavigate();
  const [tournament, setTournament] = useState(undefined);
  const [teamViewOpen, setTeamViewOpen] = useState(false);
  const params = useParams();
  // const [chooseTeamBool, setChooseTeamBool] = useState(false);
  // const [viewTeamId, setViewTeamId] = useState(0);
  const _id = params.tournamentId;
  const [teams, setTeams] = useState([]);
  const style = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: "max(70%,300px)",
    bgcolor: "#E8EEF2",
    boxShadow: 24,
    borderRadius: "12px",
    p: 1,
  };
  function handleTeamViewClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setTeamViewOpen(false);
  }
  async function fetchTournament() {
    setTournament(await getTournamentById({ _id: _id }));
  }
  async function fetchTeams() {
    setTeams(await getAllUserTeams());
  }
  useEffect(() => {
    if ("superstars" in window.localStorage)
      window.localStorage.removeItem("superstars");
    if ("mooning" in window.localStorage)
      window.localStorage.removeItem("mooning");
    if ("rekt" in window.localStorage) window.localStorage.removeItem("rekt");
    fetchTournament();
    fetchTeams();
  }, []);
  const pad = (num) => ("0" + num).slice(-2);
  const getTimeFromDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
    return pad(hours) + ":" + pad(minutes);
  };
  var seatsFilled = 0;
  if (tournament !== undefined) {
    seatsFilled = (100 * tournament.filled_spots) / tournament.total_spots;
  }
  console.log(teams);
  function selectTeam(clickedId) {
    // var allTeams = document.getElementsByClassName("team");
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
    var seatsFilled = 0;
    if (tournament !== undefined) {
        seatsFilled = 100 * tournament.filled_spots / tournament.total_spots;
    }
    console.log(teams);
    function selectTeam(clickedId) {
        var allTeams = document.getElementsByClassName('team');
        var selectedTeam = document.getElementById(clickedId);
        for (var i = 0; i < allTeams.length; i++) {
            allTeams[i].classList.remove('selected-background');
        }
        if ([...selectedTeam.classList].includes('selected-background') === false) {
            document.getElementById('jointournament-button').style.display = 'block';
            selectedTeam.classList.add('selected-background');
        }
    }
    const joinTournament = async() => {
        const allTeams = document.getElementsByClassName('team');
        let teamId = "";
        const tournamentId = tournament.id;
        for (let i = 0; i < allTeams.length; i++) {
            console.log(i);
            if ([...allTeams[i].classList].includes('selected-background') === true) {
                const id = allTeams[i].getAttribute('id');
                teamId = teams[parseInt(id.split('-')[1])].id;
                console.log(teams[parseInt(id.split('-')[1])]);
                break;
            }
        }

        joinTournamentAPI(tournamentId, teamId)
            .then(()=>window.location.pathname=`/tournaments/${tournamentId}`)
            .catch(err=> console.log(err))
    }
    //Snackbar Component
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [snackOpen, setSnackOpen] = useState(false);
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };
  function joinTournament() {
    // var allTeams = document.getElementsByClassName("team");
    var teamId = "";
    const tournamentId = tournament.id;
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
  const LeftComponent = () => {
    return (
      <div className="fullpage">
        {tournament === undefined ? (
          <div className="loading-component">
            <ReactLoading type={"spin"} color="var(--white)" />{" "}
          </div>
        ) : (
          <>
            <div className="tournament-view-bar">
              <ArrowBackIosIcon
                fontSize="medium"
                className="go-back-button"
                onClick={() => navigate(-1)}
              />
              <span className="ml-20 font-size-25 font-weight-700">
                {tournament.name}
              </span>
            </div>
            <div className="empty-area"></div>
            <div className="tournament-info-container">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: -90 }}
                transition={{ duration: 0.3 }}
                className="tournament-view-card"
              >
                <div className="tournament-info">
                  <span style={{ textAlign: "left" }}>
                    <span
                      className="font-size-15"
                      style={{ color: "var(--grey-shade)" }}
                    >
                      Prize Pool
                    </span>
                    <br />
                    <span className="font-size-20 font-weight-700">
                      {tournament.total_reward} MGT
                    </span>
                  </span>
                  <span className="ml-auto">
                    <span
                      style={{ color: "var(--grey-shade)", fontSize: "15px" }}
                    >
                      Entry Fee
                    </span>
                    <br />
                    <Button
                      className="tournament-fee"
                      size="small"
                      onClick={() => {
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
                  </span>
                </div>
                <div>
                  <LinearProgress
                    variant="determinate"
                    style={{ backgroundColor: "var(--dim-white)" }}
                    value={seatsFilled}
                  />
                  <span
                    className="font-size-15"
                    style={{
                      minWidth: "100px",
                      color: "var(--dark-dim-white)",
                    }}
                  >
                    {tournament.filled_spots}/{tournament.total_spots} Spots
                    Filled
                  </span>
                </div>
              </motion.div>
              <div className="folioplay-tabs">
                <LeaderBoardTabs />
              </div>
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
                                        allTeams[i].classList.add(
                                          "display-none"
                                        );
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
                    <Snackbar open={snackOpen} autoHideDuration={3500} onClose={handleSnackClose}>
                                    <motion.div id="snack-bar-div" initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
                                        <Alert id="team-creation-message" onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
                                            Not sufficient balance
                                        </Alert>
                                    </motion.div>
                                </Snackbar>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <Modal
          open={teamViewOpen}
          onClose={handleTeamViewClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableAutoFocus={true}
        >
          <motion.div
            id="modal-view"
            initial={{ x: "50vw", y: "200vh" }}
            animate={{ scale: 1, x: "50vw", y: "50vh" }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={style}></Box>
          </motion.div>
        </Modal>
      </div>
    );
}
  };
  const RightComponent = () => {
    return (
      <div id="tournament-view-page-image">
        <h1>Here's what you can win!</h1>
        <h3>Doesn't these big winnings look WOW? Ofcourse they do!</h3>
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
