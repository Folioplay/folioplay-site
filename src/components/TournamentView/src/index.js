import {
  getTournamentById,
  getAllUserTeams,
  joinTournamentAPI,
  deleteTeam,
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
import CancelIcon from "@mui/icons-material/Cancel";
<<<<<<< HEAD
import {
    getTournamentById,
    getAllUserTeams,
    joinTournamentAPI,
    deleteTeam, joinValidTournamentAPI,
} from "../../../APIS/apis";
=======
>>>>>>> cb22905 (Restructured, leaderboard api,status api,rank api connected.)
import { useMoralis } from "react-moralis";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteClickedTeam from "../common/deleteClickedTeam";
import joinTournament from "../common/joinTournament";
import selectTeam from "../common/selectTeam";
import "../style/index.css";
export default function TournamentView() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  var navigate = useNavigate();
  const { user } = useMoralis();
  const [balance, setBalance] = useState("");
  const [balanceSnackOpen, setBalanceSnackOpen] = useState(false);
  const [errorMessageSnackOpen, setErrorMessageSnackOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ message: "", variant: "error" });
  const [tournament, setTournament] = useState(undefined);
  const [rank, setRank] = useState(undefined);
  const params = useParams();
  const _id = params.tournamentId;
  const [teams, setTeams] = useState([]);
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
<<<<<<< HEAD
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
      seatsFilled = (100 * tournament.filled_spots) / tournament.total_spots;
    }
    console.log(teams);
    function selectTeam(clickedId) {
      var allTeams = document.getElementsByClassName("team");
      var selectedTeam = document.getElementById(clickedId);
      for (var i = 0; i < allTeams.length; i++) {
        allTeams[i].classList.remove("selected-background");
      }
      if (
        [...selectedTeam.classList].includes("selected-background") === false
      ) {
        document.getElementById("jointournament-button").style.display =
          "block";
        selectedTeam.classList.add("selected-background");
      }
    }
  }
    const checkNFTHolder = async () => {
      let providerWallet = await getCurrentWalletProvider();
      console.log(providerWallet)
      const signer = providerWallet.getSigner()
      console.log(signer)
      const contract = new ethers.Contract("0x99Dc6574e41B4c76e747BaDfe61aDec906e92624", NFTMarketPlace.abi, signer);

      return await contract.checkNFTowner("0xead495ad5324219A0a6384E6a0924335baE8cfFf", "0x79650abEA193B0a6b8Ae25e2b95ee880C6Ba5b9e");
  }

  const getCurrentWalletProvider = async () => {
      let providerWallet;
      // eslint-disable-next-line default-case
      switch (localStorage.getItem("walletType")) {
          case "metamask":
              providerWallet = new ethers.providers.Web3Provider(window.ethereum);
              break;
          case "walletConnect":
              const providerWC = new WalletConnectProvider({
                  rpc: {
                      137: "https://polygon-rpc.com/"
                  },
              });
              await providerWC.enable();
              providerWallet = new providers.Web3Provider(providerWC);
              break;
      }
      return providerWallet;
  }

  const paymentTournament = async () => {

      const bal = await provider.getBalance(user.get("ethAddress"));
      console.log(Number(tournament.entryFee) <= Number(ethers.utils.formatEther(bal)))
      if (Number(tournament.entryFee) > Number(ethers.utils.formatEther(bal))) {

          let providerWallet = await getCurrentWalletProvider();
          const signer = providerWallet.getSigner()
          const gas = await providerWallet.getGasPrice();

          const tx = {
              from: signer._address,
              to: `0xD5f3758458b985106A6AaDB0F5595f4deB7242Db`,
              value: ethers.utils.parseEther(`0.001`),
              maxFeePerGas: gas,
              maxPriorityFeePerGas: gas
          };
          const txn = await signer.sendTransaction(tx)
          await txn.wait();
      }
  }

  const joinTournament = async () => {
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

      await joinValidTournamentAPI(tournamentId, teamId)
          .then(async () => {
              const NFTHolder = await checkNFTHolder();
              if (!NFTHolder) {
                  await paymentTournament();
              }

              await joinTournamentAPI(tournamentId, teamId)
                  .then(() => window.location.pathname = `/tournaments/${tournamentId}`)
                  .catch((err) => console.log(err));
          })
          .catch((err) => {
              console.log(err)
          })
  }

  //Snackbar Component
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [snackOpen, setSnackOpen] = useState(false);
=======

>>>>>>> cb22905 (Restructured, leaderboard api,status api,rank api connected.)
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
  console.log(rank, "rank is here");
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
              {rank !== undefined && rank !== null && rank.length > 0 ?
                <motion.div initial={{ x: -500, y: -70 }} animate={{ x: 0 }} transition={{ duration: 0.4 }} className="user-rank-div">
                  <span>
                    Your rank is<b>&ensp;#{rank[0].rank}&ensp;</b> with Team<b>&ensp;{rank[0].team.name}&ensp;</b> and points <b>&ensp;{rank[0].portfolio}</b>
                  </span>
                </motion.div> :
                // <div className="user-rank-div">
                //   <span>
                //     Participate in tournament
                //   </span>
                // </div>
                <></>}

              <div className="folioplay-tabs">
<<<<<<< HEAD
                <LeaderBoardTabs tournamentId={tournament.id}/>
=======
                <LeaderBoardTabs tournamentId={tournament.id} />
>>>>>>> cb22905 (Restructured, leaderboard api,status api,rank api connected.)
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
                                  onClick={() =>
                                    selectTeam(clickedId, teams, tournament)
                                  }
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
                                  onClick={(event) =>
                                    deleteClickedTeam(event, teams, deleteTeam)
                                  }
                                  fontSize="large"
                                />
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
                      onClick={() =>
                        joinTournament(
                          user,
                          tournament,
                          teams,
                          joinTournamentAPI,
                          setErrorMessage,
                          setErrorMessageSnackOpen
                        )
                      }
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
              sx={{ width: "100%" }}
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
