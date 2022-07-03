import React, { useState, useEffect } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ReactLoading from "react-loading";
import Modal from "@mui/material/Modal";
import OpenChart from "../../Charts/src";
import { motion } from "framer-motion/dist/framer-motion";
import Snackbar from "@mui/material/Snackbar";
import { getAllCoins } from "../../../APIS/apis";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CancelIcon from "@mui/icons-material/Cancel";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useTheme } from '@material-ui/core/styles';
import MuiAlert from "@mui/material/Alert";
import preservedView from "../common/preservedView";
import assignRoles from "../common/assignRole";
import addCoin from "../common/addCoin";
import TeamPreview from "../common/TeamPreview";
import "../style/index.css";
export function TeamCreation() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [wasActiveTab, setWasActiveTab] = useState("superstars");
  const [graphCoin, setGraphCoin] = useState("");
  const [open, setOpen] = useState(false);
  const [coins, setCoins] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  var superstars = [];
  var mooning = [];
  var rekt = [];
  var localSuperstars = JSON.parse(window.localStorage.getItem("superstars"));
  var localMooning = JSON.parse(window.localStorage.getItem("mooning"));
  var localRekt = JSON.parse(window.localStorage.getItem("rekt"));
  const style = {
    position: "absolute",
    transform: "translate(-30%, -50%)",
    width: "max(70%,300px)",
    bgcolor: "#E8EEF2",
    boxShadow: 24,
    borderRadius: "12px",
    p: 1,
    ['@media (max-width:1200px)']: {
      transform: "translate(-50%, -50%)",
    }
  };
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleOpen = (event) => {
    setGraphCoin(event.target.innerText.toLowerCase());
    setSnackOpen(false);
    setOpen(true);
  };
  const handleClose = () => {
    document.getElementById("modal-view").classList.add("animate-modal");
    setTimeout(function () {
      setGraphCoin("");
      setOpen(false);
    }, 400);
  };

  async function fetchCoins() {
    setCoins(await getAllCoins());
  }
  useEffect(() => {
    console.log("fetching coins......");
    localStorage.removeItem("superstars");
    localStorage.removeItem("mooning");
    localStorage.removeItem("rekt");
    fetchCoins();
  }, []);

  for (var i = 0; i < coins.length; i++) {
    if (
      window.localStorage.getItem("superstars") === null &&
      coins[i].category === "Superstar"
    ) {
      superstars.push(coins[i]);
      superstars[superstars.length - 1]["selected"] = false;
    }
    if (
      window.localStorage.getItem("mooning") === null &&
      coins[i].category === "Mooning"
    ) {
      mooning.push(coins[i]);
      mooning[mooning.length - 1]["selected"] = false;
    }
    if (
      window.localStorage.getItem("rekt") === null &&
      coins[i].category === "Defi"
    ) {
      rekt.push(coins[i]);
      rekt[rekt.length - 1]["selected"] = false;
    }
  }

  if (localMooning !== null) {
    mooning = localMooning;
    console.log("inlocal", mooning);
  }
  if (localSuperstars !== null) {
    superstars = localSuperstars;
    console.log("inlocal", superstars);
  }
  if (localRekt !== null) {
    rekt = localRekt;
  }

  useEffect(() => {
    console.log("preserved view");
    preservedView(wasActiveTab, superstars, mooning, rekt);
    var coinsLimit = wasActiveTab === "superstars" ? 2 : wasActiveTab === "mooning" ? 8 : 5;
    var allButtons = document.querySelectorAll("#" + wasActiveTab + " .coin-add-button");
    console.log(document.querySelectorAll("#" + wasActiveTab + " .coin-added-button").length, coinsLimit);
    console.log(allButtons[0]);
    if (document.querySelectorAll("#" + wasActiveTab + " .coin-added-button").length >= coinsLimit) {
      console.log("if condition");
      for (var i = 0; i < allButtons.length; i++) {
        if (allButtons[i].innerText === "ADD") {
          console.log("add button");
          console.log(allButtons[i].classList)
          allButtons[i].classList.add("disabled-button");
          console.log(allButtons[i].classList)
        }
      }
    }
  }, [wasActiveTab, graphCoin, snackOpen]);

  const Superstars = () => {
    return (
      <Grid
        style={{ color: "var(--black)" }}
        container
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {superstars.map((coin, index) => {
          return (
            <Grid className="coin-card-wrapper" item xs={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.07 * index }}
                className="coin-card"
              >
                <img
                  src={
                    require("../../../images/coinLogos/" +
                      coin.symbol.toLowerCase() +
                      ".png").default
                  }
                  onerror="this.src = '../../../images/coinLogos/bitcoin.jpg';"
                  width="40px"
                  height="40px"
                />
                <span
                  onClick={handleOpen}
                  className="graph font-size-15 font-weight-700 mt-5 mb-10"
                >
                  {coin.name}
                </span>
                {coin.selected ? (
                  <Button
                    className="coin-added-button"
                    style={{ borderRadius: "12px" }}
                    variant="outlined"
                    size="small"
                    onClick={(event) =>
                      addCoin(event, wasActiveTab, superstars, mooning, rekt)
                    }
                  >
                    Added
                  </Button>
                ) : (
                  <Button
                    className="coin-add-button"
                    style={{ borderRadius: "12px" }}
                    variant="outlined"
                    size="small"
                    onClick={(event) =>
                      addCoin(event, wasActiveTab, superstars, mooning, rekt)
                    }
                  >
                    Add
                  </Button>
                )}
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  const Mooning = () => {
    return (
      <Grid
        style={{ color: "var(--black)" }}
        container
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {mooning.map((coin, index) => {
          return (
            <Grid className="coin-card-wrapper" item xs={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.07 * index }}
                className="coin-card"
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
                <span
                  onClick={handleOpen}
                  className="graph font-size-15 font-weight-700 mt-5 mb-10"
                >
                  {coin.name}
                </span>
                {coin.selected ? (
                  <Button
                    className="coin-added-button"
                    style={{ borderRadius: "12px" }}
                    variant="outlined"
                    size="small"
                    onClick={(event) =>
                      addCoin(event, wasActiveTab, superstars, mooning, rekt)
                    }
                  >
                    Added
                  </Button>
                ) : (
                  <Button
                    className="coin-add-button"
                    style={{ borderRadius: "12px" }}
                    variant="outlined"
                    size="small"
                    onClick={(event) =>
                      addCoin(event, wasActiveTab, superstars, mooning, rekt)
                    }
                  >
                    Add
                  </Button>
                )}
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  const Rekt = () => {
    return (
      <Grid
        style={{ color: "var(--black)" }}
        container
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {rekt.map((coin, index) => {
          return (
            <Grid className="coin-card-wrapper" item xs={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.07 * index }}
                className="coin-card"
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
                <span
                  onClick={handleOpen}
                  className="graph font-size-15 font-weight-700 mt-5 mb-10"
                >
                  {coin.name}
                </span>
                {coin.selected ? (
                  <Button
                    className="coin-added-button"
                    style={{ borderRadius: "12px" }}
                    variant="outlined"
                    size="small"
                    onClick={(event) =>
                      addCoin(event, wasActiveTab, superstars, mooning, rekt)
                    }
                  >
                    Added
                  </Button>
                ) : (
                  <Button
                    className="coin-add-button"
                    style={{ borderRadius: "12px" }}
                    variant="outlined"
                    size="small"
                    onClick={(event) =>
                      addCoin(event, wasActiveTab, superstars, mooning, rekt)
                    }
                  >
                    Add
                  </Button>
                )}
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  const changeTabs = (event) => {
    setSnackOpen(false);
    setWasActiveTab(event.target.innerText.toLowerCase());
  };
  const LeftComponent = () => {
    return (
      <div className="fullpage">
        <div className="teamcreate-bar pl-20 pt-10 mb-20">
          <ArrowBackIosIcon
            fontSize="medium"
            className="go-back-button"
            onClick={() => navigate(-1)}
          />
          <span className="ml-20 font-size-25 font-weight-700">
            Choose Coins
          </span>
        </div>
        <br />
        <br />
        <div className="coin-classes mb-10">
          <span
            id="superstars-tab"
            className="coinClass coin-class-selected ml-20"
            onClick={changeTabs}
          >
            SuperStars
          </span>
          <span
            id="mooning-tab"
            className="coinClass ml-20"
            onClick={changeTabs}
          >
            Mooning
          </span>
          <span id="rekt-tab" className="coinClass ml-20" onClick={changeTabs}>
            Rekt
          </span>
        </div>
        <div className="coins">
          <div className="tip-div">
            <WbSunnyOutlinedIcon />
            <span className="font-size-15 ml-8">
              TIP: Below players might show a steep increase <br />
              Select{" "}
              {wasActiveTab === "superstars" ? (
                <>1 - 2</>
              ) : (
                <>{wasActiveTab === "mooning" ? <>4-8</> : <>3-6</>}</>
              )}{" "}
              from this bucket
            </span>
          </div>
          {coins.length === 0 ? (
            <div className="loading-component">
              <ReactLoading type={"spin"} color="var(--violet-blue)" />
            </div>
          ) : (
            <></>
          )}
          <div id="superstars" className="coinClass-content">
            <Superstars />
          </div>
          <div id="mooning" className="coinClass-content display-none">
            <Mooning />
          </div>
          <div id="rekt" className="coinClass-content display-none">
            <Rekt />
          </div>
          <div className="assign-roles-div mt-20">
            <Button
              style={{ borderRadius: "8px", backgroundColor: "var(--golden)" }}
              variant="contained"
              className="role-button ml-auto"
              onClick={() =>
                assignRoles(superstars, mooning, rekt, setSnackOpen, navigate)
              }
            >
              Assign Roles
            </Button>
          </div>
          <div className="error-cannot-add-coin">
            <ErrorOutlineOutlinedIcon />  <span className="ml-10">Cannot add more coin to this basket !!</span>
          </div>
          <Snackbar
            open={snackOpen}
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
                Please read the tips given above.
                <br />
                Total selected coins must be 11.
              </Alert>
            </motion.div>
          </Snackbar>
        </div>
      </div>
    );
  };

  const RightComponent = () => {
    return (
      <div id="team-create-page-image">
        <Modal
          open={open}
          onClose={handleClose}
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
            <Box sx={style}>
              <OpenChart coin={graphCoin} />
            </Box>
            <motion.span onClick={handleClose}>
              {/* <CancelIcon id="cross-modal" fontSize="large" /> */}
            </motion.span>
          </motion.div>
        </Modal>
        <div>
          <h1>Team Preview</h1>
          {/* <h3>Doesn't these big winnings look WOW? Ofcourse they do!</h3> */}
        </div>
        <TeamPreview superstars={superstars} mooning={mooning} rekt={rekt} />

        {/* <TickerWidget /> */}
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
