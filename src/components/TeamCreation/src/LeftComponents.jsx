import React, { useState, useEffect } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { json, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ReactLoading from "react-loading";
import Modal from "@mui/material/Modal";
import OpenChart from "../../Charts/src";
import { motion } from "framer-motion/dist/framer-motion";
import Snackbar from "@mui/material/Snackbar";
import { getAllCoins } from "../../../APIS/apis";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import MuiAlert from "@mui/material/Alert";
// import preservedView from "../common/preservedView";
import assignRoles from "../common/assignRole";
import addCoin from "../common/addCoin";
import TeamPreview from "../common/TeamPreview";
import Superstars from "../common/Superstars";
import "../style/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getCoinsAsync, toggleSelected } from "../../../Redux/Coins/CoinsSlice";
import { Mooningg } from "../common/Mooningg";
import Rektt from "../common/Rektt";
import SelectedTopCoins from "../common/SelectedTopCoins";


function LeftComponent() {
    const [snackOpen, setSnackOpen] = useState({ isOpen: false, message: '' });
   const [wasActiveTab, setWasActiveTab] = useState(localStorage.getItem("wasActiveTabeState") || "superstars");
   const { state } = useLocation();
//    const [coins, setCoins] = useState([]);
 const navigate = useNavigate();
  const dispatch = useDispatch();
  const coinsRedux = useSelector((state) => state.coinsSlice.coins);
  const coins =  coinsRedux.length;
const mooningfilter = coinsRedux.filter((coinn) => coinn.category === "Mooning");
const rektfilter = coinsRedux.filter((coinn) => coinn.category === "Defi");
const superstarfilterr = coinsRedux.filter((coinn) => coinn.category === "Superstar");
const superstartSelectedCoins = superstarfilterr?.filter(coin => coin.selected).length;
const mooningSelectedCoins = mooningfilter.filter(coin => coin.selected).length;
const rektSelectedCoins = rektfilter.filter(coin => coin.selected).length;
 var prevRoute = state && state.comingFrom ? state.comingFrom : "/activity";

 const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen({ isOpen: false, message: '' });
  };
 const changeTabs = (e) => {
    console.log(e);
    setSnackOpen(false);
    localStorage.setItem("wasActiveTabeState", e)
    setWasActiveTab(e);
  };

  async function assignRoless() {

    
    if (superstartSelectedCoins+mooningSelectedCoins+rektSelectedCoins === 11) {
      
      navigate("/teams/createteam/assignrole", { state: state });
      console.log("ready for selection");
     
    } else {
      setSnackOpen({ isOpen: true, message: "Total selected coins must be 11." });
    }
  }
  return (
    <>
    <div className="sticky-top1">
          <div className="teamcreate-bar pl-20 pt-10 mb-20">
            <ArrowBackIosIcon
              fontSize="medium"
              className="go-back-button"
              onClick={() => navigate(prevRoute)}
            />
            <span className="ml-20 font-size-20 font-weight-700">
              Choose 11 Coins
            </span>
          </div>
          <Container sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", width: "100%", height: "26px" }}>
            <SelectedTopCoins />
          </Container>
          <br />
          <div className="coin-classes mb-10">
            <span
              id="superstars"
              className={wasActiveTab === "superstars" ? "coinClass coin-class-selected ml-20" : "coinClass ml-20"}
              onClick={(e) => { changeTabs(e.target.id) }}
            >
              SuperStars
            </span>
            <span className="font-size-12">
              {superstartSelectedCoins}
            </span>
            <span
              id="mooning"
              className={wasActiveTab === "mooning" ? "coinClass coin-class-selected ml-20" : "coinClass ml-20"}
              onClick={(e) => { changeTabs(e.target.id) }}
            >
              Mooning
            </span>
            <span className="font-size-12">
              {mooningSelectedCoins}
            </span>
            <span
              id="rekt"
              className={wasActiveTab === "rekt" ? "coinClass coin-class-selected ml-20" : "coinClass ml-20"}
              onClick={(e) => { changeTabs(e.target.id) }}
            >
              Rekt
            </span>
            <span className="font-size-12">
              {rektSelectedCoins}
            </span>
          </div>
        </div>
        <div className="coins">
          <div className="tip-div">
            <WbSunnyOutlinedIcon />
            <span className="font-size-12 ml-8">
              TIP: {wasActiveTab === "superstars" ? (
                <>We are Bullish on these superstars in all tournaments.</>
              ) : (
                <>{wasActiveTab === "mooning" ? <>Select coins which you are Bullish upon in the tournament.</> : <>Select coins which you are Bearish upon in the tournament.</>}</>
              )} <br />
              <span className="font-weight-600">
                Select{" "}

                {wasActiveTab === "superstars" ? (
                  <>1-2</>
                ) : (
                  <>{wasActiveTab === "mooning" ? <>3-6</> : <>3-6</>}</>
                )}{" "} coins from this bucket
              </span>
            </span>
          </div>
          {coins.length === 0 ? (
            <div className="loading-component">
              <ReactLoading type={"spin"} color="var(--violet-blue)" />
            </div>
          ) : (
            <></>
          )}

          {wasActiveTab === "superstars" ? (<>
            <div id="superstars" className="coinClass-content">
              <div className="superstars_Height_Controll">
                <Superstars />
                <div className="assign-roles-div mt-20">
                  <Button
                    id="assign-role-button2"
                    variant="contained"
                    // className="role-button1 ml-auto"
                    className="role-button2 ml-auto"
                    onClick={() =>
                      navigate("selectedCoins")
                    }>
                    Preview Team
                  </Button>

                  <Button
                    id="assign-role-button"
                    variant="contained"
                    className="role-button ml-auto"
                    onClick={() =>
                      assignRoless()
                    }

                  >
                    Select top 3 Coins
                  </Button>
                </div>
              </div>
            </div>
          </>) : (null)}
          {wasActiveTab === "mooning" ? (<>
            <div id="mooning" className="coinClass-content" >
              <div className="mooning_Height_Controll">
                <Mooningg />
                <div className="assign-roles-div mt-20">
                  <Button
                    id="assign-role-button2"
                    variant="contained"
                    className="role-button2 ml-auto"
                    onClick={() =>
                      navigate("selectedCoins")

                    }

                  >
                    Preview Team
                  </Button>
                  <Button
                    id="assign-role-button"
                    variant="contained"
                    className=""
                    onClick={() =>
                      assignRoless()
                    }

                  >
                    Select top 3 Coins
                  </Button>
                  <Button
                    id="assign-role-button"
                    variant="contained"
                    className="role-button ml-auto"
                    onClick={() =>
                      assignRoless()
                    }
                  >
                    Select top 3 Coins
                  </Button>
                </div>
                <br />
                <br />
              </div>
              <br />
              <br />
            </div> </>) : (null)}
          {wasActiveTab === "rekt" ? (<>
            <div id="rekt" className="coinClass-content">
              <div className="rekt_Height_Controll">
                <Rektt />
                <div className="assign-roles-div mt-20">
                  <Button
                    id="assign-role-button2"
                    variant="contained"
                    className="role-button2 ml-auto"
                    onClick={() =>
                      navigate("selectedCoins")

                    }
                  >
                    Preview Team
                  </Button>
                  <Button
                    id="assign-role-button"
                    variant="contained"
                    className="role-button ml-auto"
                    onClick={() =>
                      assignRoless()
                    }
                  >
                    Select top 3 Coins
                  </Button>
                </div>
                <div className="assign-roles-div mt-20">

                  <Button
                    id="assign-role-button"
                    variant="contained"
                    className="role-button ml-auto"
                    onClick={() =>
                      assignRoless()
                    }
                  >
                    Select top 3 Coins
                  </Button>
                </div>
                <br />
                <br />
              </div>
              <br />
              <br />
            </div>    </>) : (null)}


          <div className="error-cannot-add-coin">
            <ErrorOutlineOutlinedIcon />{" "}
            <span className="ml-10">
              Cannot add more coin to this basket !!
            </span>
          </div>
          <Snackbar
            open={snackOpen.isOpen}
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
                {snackOpen.message}
              </Alert>
            </motion.div>
          </Snackbar>


        </div>
    </>
  )
}

export default LeftComponent