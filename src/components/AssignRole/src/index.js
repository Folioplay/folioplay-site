import React, { useEffect, useState } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { motion } from "framer-motion/dist/framer-motion";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import saveTeam from "../common/saveTeam";
import selectRank from "../common/selectRank";
import { createTeam } from "../../../APIS/apis";
import TeamPreview from "../../TeamCreation/common/TeamPreview";
import { coinTosymbol } from "../../../CoinAndSymbols/symbols";
import "../style/index.css";
export function AssignRole({teams}) {
  const navigate = new useNavigate();
  const [nameSnackOpen, setNameSnackOpen] = useState(false);
  const [successSnackOpen, setSuccessSnackOpen] = useState(false);
  const [error, setError] = useState("");
  var superstars = [];
  var mooning = [];
  var rekt = [];
  var coins = [];
  var finalRanks = new Map();
  const handleNameSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    console.log("name snack")
    setNameSnackOpen(false);
  };
  const handleSuccessSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  superstars = JSON.parse(window.localStorage.getItem("superstars"));
  mooning = JSON.parse(window.localStorage.getItem("mooning"));
  rekt = JSON.parse(window.localStorage.getItem("rekt"));

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
  useEffect(() => {
    for (var j = 0; j < superstars.length; j++) {
      var bucketPreview = document.getElementsByClassName("superstars-preview");
      if (superstars[j].selected) {
        for (var i = 0; i < bucketPreview.length; i++) {
          if (bucketPreview[i].childElementCount === 0) {
            var coinImage = document.createElement('img');
            coinImage.src = require('../../../images/coinLogos/' + coinTosymbol[superstars[j].name.toLowerCase()].toLowerCase() + ".png").default;
            coinImage.width = "80";
            coinImage.height = "80";
            coinImage.id = superstars[j].name + "-preview";
            bucketPreview[i].appendChild(coinImage);
            break;
          }
        }
      }
    }
    for (var j = 0; j < mooning.length; j++) {
      var bucketPreview = document.getElementsByClassName("mooning-preview");
      if (mooning[j].selected) {
        for (var i = 0; i < bucketPreview.length; i++) {
          if (bucketPreview[i].childElementCount === 0) {
            var coinImage = document.createElement('img');
            coinImage.src = require('../../../images/coinLogos/' + coinTosymbol[mooning[j].name.toLowerCase()].toLowerCase() + ".png").default;
            coinImage.width = "80";
            coinImage.height = "80";
            coinImage.id = mooning[j].name + "-preview";
            bucketPreview[i].appendChild(coinImage);
            break;
          }
        }
      }
    }
    for (var j = 0; j < rekt.length; j++) {
      var bucketPreview = document.getElementsByClassName("rekt-preview");
      if (rekt[j].selected) {
        for (var i = 0; i < bucketPreview.length; i++) {
          if (bucketPreview[i].childElementCount === 0) {
            var coinImage = document.createElement('img');
            coinImage.src = require('../../../images/coinLogos/' + coinTosymbol[rekt[j].name.toLowerCase()].toLowerCase() + ".png").default;
            coinImage.width = "80";
            coinImage.height = "80";
            coinImage.id = rekt[j].name + "-preview";
            bucketPreview[i].appendChild(coinImage);
            break;
          }
        }
      }
    }
  }, []);
  const LeftComponent = () => {
    return (
      <div className="fullpage">
        <div className="upper-half">
          <input
            id="team-name"
            className="mb-5 pl-5 pr-5"
            placeholder="Enter Team Name"
            required
            maxlength="15"
          ></input>
          <div id="save-team-button">
            <Button
              variant="contained"
              style={{ backgroundColor: "var(--golden)", borderRadius: "8px" }}
              onClick={(event) => {
                saveTeam(
                  event,
                  coins,
                  finalRanks,
                  setError,
                  setNameSnackOpen,
                  setSuccessSnackOpen,
                  createTeam,
                  navigate
                );
              }}
            >
              Save Team
            </Button>
          </div>
          <img id="crown" src={require("../../../images/crown1.png").default} />
          <div>
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
            width="250px"
            height="196.9px"
          />
        </div>

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
                  id={"coin-" + coin.name.toLowerCase()}
                  className="rank-coin-card pl-10 pt-20 pr-10 pb-20 mt-5 mb-5"
                >
                  <img
                    src={
                      require("../../../images/coinLogos/" +
                        coin.symbol.toLowerCase() +
                        ".png").default
                    }
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
                    onClick={(event) => selectRank(event, coins, finalRanks)}
                  >
                    1
                  </span>
                  <span className="rank-choices mr-5" onClick={(event) => selectRank(event, coins, finalRanks)}>
                    2
                  </span>
                  <span className="rank-choices" onClick={(event) => selectRank(event, coins, finalRanks)}>
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
                Team Created Successfully.
              </Alert>
            </motion.div>
          </Snackbar>
          <span style={{ width: "100%", height: "60px" }}></span>
        </div>
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
        <TeamPreview superstars={superstars} mooning={mooning} rekt={rekt} />
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
