import React, { useEffect, useState } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { motion } from "framer-motion/dist/framer-motion";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import saveTeam from "../common/saveTeam";
import selectRank from "../common/selectRank";
import { createTeam } from "../../../APIS/apis";
import TeamPreview from "../../TeamCreation/common/TeamPreview";
import teamPreview from "../common/teamPreview";
import { getAllUserTeams } from "../../../APIS/apis";
import { useMoralis } from "react-moralis";
import { S3_URL } from "../../../APIS/apis";
import { ArrowBackIosNewSharp } from "@mui/icons-material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import "../style/index.css";
export function AssignRole() {
  const navigate = new useNavigate();
  const [nameSnackOpen, setNameSnackOpen] = useState(false);
  const [successSnackOpen, setSuccessSnackOpen] = useState(false);
  const [error, setError] = useState("");
  const [teams, setTeams] = useState([]);
  const { user } = useMoralis();
  const { state } = useLocation();
  var superstars = [];
  var mooning = [];
  var rekt = [];
  var coins = [];
  var finalRanks = new Map();
  var selectedSuperstars = [];
  var selectedMooning = [];
  var selectedRekt = [];
  
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  async function fetchTeams() {
    setTeams(await getAllUserTeams());
  }
  const handleNameSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNameSnackOpen(false);
  };
  const handleSuccessSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackOpen(false);
  };
  
  superstars = JSON.parse(window.localStorage.getItem("superstars")) ? JSON.parse(window.localStorage.getItem("superstars")) : [];
  mooning = JSON.parse(window.localStorage.getItem("mooning")) ? JSON.parse(window.localStorage.getItem("mooning")) : [];
  rekt = JSON.parse(window.localStorage.getItem("rekt")) ? JSON.parse(window.localStorage.getItem("rekt")) : [];
  for (var i = 0; i < superstars.length; i++) {
    if (superstars[i].selected) coins.push(superstars[i]);
  }
  for (var i = 0; i < mooning.length; i++) {
    if (mooning[i].selected) coins.push(mooning[i]);
  }
  for (var i = 0; i < rekt.length; i++) {
    if (rekt[i].selected) coins.push(rekt[i]);
  }
  for (var i = 0; i < coins.length; i++) {
    finalRanks.set("" + coins[i].name.toLowerCase(), -1);
  }
  for (var i = 0; i < superstars.length; i++) {
    if (superstars[i].selected === true) {
      selectedSuperstars.push(superstars[i]);
    }
  }
  for (var i = 0; i < mooning.length; i++) {
    if (mooning[i].selected === true) {
      selectedMooning.push(mooning[i]);
    }
  }
  for (var i = 0; i < rekt.length; i++) {
    if (rekt[i].selected === true) {
      selectedRekt.push(rekt[i]);
    }
  }
  if (
    selectedSuperstars.length < 1 ||
    selectedSuperstars.length > 2 ||
    selectedMooning.length < 3 ||
    selectedMooning.length > 6 ||
    selectedRekt.length < 3 ||
    selectedRekt.length > 6 || coins.length !== 11
  ) {
    // navigate('/teams/createteam');
    window.location.pathname = '/teams/createteam'
    // return ;
  }
  useEffect(() => {
    fetchTeams();
  }, []);
  useEffect(() => {
    if (teams !== undefined) teamPreview({ superstars, mooning, rekt });
  }, [teams, nameSnackOpen]);
  
  const LeftComponent = () => {
    return (
      <div className="fullpage">
        {teams === undefined ? (
          <></>
        ) : (
          <>
            <div className="upper-half">
              <div
                style={{
                  position: "fixed",
                  left: "20px",
                  top: "20px",
                  color: "var(--grey-shade)",display:"flex"
                }}
                className="go-back-button font-size-14"
                onClick={() => navigate(-1)}
              >
                <ArrowBackIos
                  fontSize="small"
                /> Edit
              </div>
              <input
                id="team-name"
                // className="mb-5 pl-5 pr-5"
                placeholder="Enter Team Name"
                required
                maxlength="15"
                defaultValue={"Team" + "-" + (teams.length + 1)}
              />
              <div id="save-team-button">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "var(--golden)",
                    borderRadius: "8px",
                  }}
                  onClick={(event) => {
                    saveTeam(
                      event,
                      coins,
                      finalRanks,
                      setError,
                      setNameSnackOpen,
                      setSuccessSnackOpen,
                      createTeam,
                      navigate,
                      state
                    );
                  }}
                >
                  Save Team
                </Button>
              </div>
              <img
                id="crown"
                src={require("../../../images/crown1.png").default}
              />
              <div className="ranks-img-wrapper">
                <img
                  id="coin-rank-2"
                  src={require("../../../images/default.png").default}
                  width="60px"
                  height="60px"
                />
                <img
                  id="coin-rank-1"
                  src={require("../../../images/default.png").default}
                  width="60px"
                  height="60px"
                />
                <img
                  id="coin-rank-3"
                  src={require("../../../images/default.png").default}
                  width="60px"
                  height="60px"
                />
              </div>
              <img
                id="rank-image"
                src={require("../../../images/ranks.png").default}
                width="280px"
                height="220.58px"
              />
            </div>
            {/* <div id="ramp-wrapper">
              <div id="ramp"></div>
            </div> */}

            <div className="lower-half pt-20">
              <span
                id="rank-info"
                className="pl-10 pt-20 pr-10 pb-20 mb-5 mt-5 font-weight-500"
              >
                Rank 1 gets 2x points, 2 gets 1.75x, 3 gets 1.5x
              </span>
              {coins.length === 0 ? (
                <>empty coins</>
              ) : (
                coins.map((coin, index) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 * index }}
                      id={"coin-" + coin.name.toLowerCase().replace(/ /g,'_')}
                      className={
                        "rank-coin-card pl-10 pt-20 pr-10 pb-20 mt-5 mb-5 " +
                        coin.category.toLowerCase() +
                        "-border"
                      }
                    >
                      <img
                        src={S3_URL + coin.symbol.toLowerCase() + ".png"}
                        width="40px"
                        height="40px"
                      />
                      <span className="ml-15">
                        {coin.name}
                        <br />
                        <span className="allocation font-size-12">10000</span> $
                      </span>
                      <span
                        className="rank-choices mr-5 ml-auto"
                        onClick={(event) =>
                          selectRank(event, coins, finalRanks)
                        }
                      >
                        1
                      </span>
                      <span
                        className="rank-choices mr-5"
                        onClick={(event) =>
                          selectRank(event, coins, finalRanks)
                        }
                      >
                        2
                      </span>
                      <span
                        className="rank-choices"
                        onClick={(event) =>
                          selectRank(event, coins, finalRanks)
                        }
                      >
                        3
                      </span>
                    </motion.div>
                  );
                })
              )}
              <Snackbar
                open={nameSnackOpen}
                autoHideDuration={3500}
                onClose={handleNameSnackClose}
              >
                <motion.div
                  id="name-snack-bar-div"
                  initial={{ y: 200 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert
                    id="team-creation-message"
                    onClose={handleNameSnackClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {error}
                  </Alert>
                </motion.div>
              </Snackbar>
              <Snackbar
                open={successSnackOpen}
                autoHideDuration={2000}
                onClose={handleSuccessSnackClose}
              >
                <motion.div
                  id="name-snack-bar-div"
                  initial={{ y: 200 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert
                    id="team-creation-message"
                    onClose={handleSuccessSnackClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Great. You have created your team successfully
                  </Alert>
                </motion.div>
              </Snackbar>
              <span style={{ width: "100%", height: "60px" }}></span>
            </div>
          </>
        )}
      </div>
    );
  };
  const RightComponent = () => {
    return (
      <div id="team-create-page-image">
        <div>
          <h1>Team Preview</h1>
          {/* <h3>Doesn't these big winnings look WOW? Ofcourse they do!</h3> */}
        </div>
        <TeamPreview />
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
