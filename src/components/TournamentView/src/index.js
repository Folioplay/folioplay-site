import {
  getTournamentById,
  getAllUserTeams,
  getRank,
} from "../../../APIS/apis";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { Button, LinearProgress } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { motion } from "framer-motion/dist/framer-motion";
import LeaderBoardTabs from "../../LeaderboardTabs/src";
import { useMoralis } from "react-moralis";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import JoinTournamentDrawer from "../../JoinTournamentDrawer/src";
import { chooseTeamClose, chooseTeamOpen } from "../common/chooseTeamAnimations";
import '../style/index.css'
export default function TournamentView() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  var navigate = useNavigate();
  const { user } = useMoralis();
  let account  = user.get("ethAddress");
  const [balance, setBalance] = useState("");
  const [balanceSnackOpen, setBalanceSnackOpen] = useState(false);
  const [errorMessageSnackOpen, setErrorMessageSnackOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ message: "", variant: "error" });
  const [tournament, setTournament] = useState(undefined);
  const [rank, setRank] = useState(undefined);
  const params = useParams();
  const _id = params.tournamentId;
  const [teams, setTeams] = useState(undefined);
  var seatsFilled = 0;

  async function fetchTournament() {
    setTournament(await getTournamentById({ _id: _id }));
  }
  async function fetchTeams() {
    setTeams(await getAllUserTeams());
  }
  async function fetchRank() {
    const data = await getRank({ tournamentId: _id });
    console.log(data);
    setRank(data);
  }

  useEffect(() => {
    if ("superstars" in window.localStorage)
      window.localStorage.removeItem("superstars");
    if ("mooning" in window.localStorage)
      window.localStorage.removeItem("mooning");
    if ("rekt" in window.localStorage) window.localStorage.removeItem("rekt");
    fetchTournament();
    fetchTeams();
    fetchRank();
  }, []);

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
  const LeftComponent = () => {
    var disabledClass = tournament && tournament.status === 3 ? " disable-join-button" : "";
    var disabledTournament = tournament && tournament.status === 3 ? true : false;
    disabledTournament = false;
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
                onClick={() => navigate(-1)}
              />
              <span className="ml-20 font-size-20 font-weight-700">
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
                      1000 MGT
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
                    <Button
                      className={disabledClass + " tournament-fee"}
                      size="small"
                      style={disabledTournament ? {} : { backgroundColor: "var(--golden)" }}
                      onClick={() => {
                        chooseTeamOpen();
                      }}
                      disabled={disabledTournament}
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
                  <div className="spots-wrapper">
                    <span className="font-size-12 font-weight-500 mt-5" style={{ color: "var(--golden)" }}>
                      <span id={tournament.id + "-left-spots"}>{tournament.total_spots - tournament.filled_spots}</span> spots left
                    </span>
                    <span className="font-size-12 font-weight-500 mt-5" style={{ color: "var(--dark-dim-white)" }}>
                      {tournament.total_spots} spots
                    </span>
                  </div>
                </div>
              </motion.div>
              {rank !== undefined && rank !== null && rank.length > 0 ?
                <motion.div initial={{ x: -500, y: -70 }} animate={{ x: 0 }} transition={{ duration: 0.4 }} className="user-rank-div">
                  <span>
                    Your rank is<b>&ensp;#{rank[0].rank}&ensp;</b> with Team<b>&ensp;{rank[0].team.name}&ensp;</b> and points <b>&ensp;{rank[0].portfolio}</b>
                  </span>
                </motion.div> :
                <></>}

              <div className="folioplay-tabs">
                <LeaderBoardTabs tournamentId={tournament.id} />
              </div>
              <JoinTournamentDrawer teams={teams} tournamentId={tournament.id} tournament={tournament} tournaments={[]} user={user} setErrorMessage={setErrorMessage} setErrorMessageSnackOpen={setErrorMessageSnackOpen} navigate={navigate} changeTournament={true} account={account} />
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

  const RightComponent = () => {
    return (
      <div id="tournament-view-page-image">
        <span className="font-size-36 font-weight-700 mb-5">Here's what you can win!</span>
        <span className="font-size-20 font-weight-500">Doesn't these big winnings look WOW? Ofcourse they do!</span>
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
