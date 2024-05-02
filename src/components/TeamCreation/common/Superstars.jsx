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
import assignRoles from "./assignRole";
import addCoin from "./addCoin";
import TeamPreview from "./TeamPreview";

import { useDispatch, useSelector } from "react-redux";
import { getCoinsAsync,toggleSelected } from "../../../Redux/Coins/CoinsSlice";

import "../style/index.css";
// import { toggleSelectedCoins } from "../../../Redux/SelectedSlice/SelectedSlice";

export function Superstars() {
  const style = {
    position: "absolute",
    transform: "translate(-30%, -50%)",
    width: "max(70%,300px)",
    bgcolor: "#E8EEF2",
    boxShadow: 24,
    borderRadius: "12px",
    p: 1,
    ["@media (max-width:1200px)"]: {
      transform: "translate(-50%, -50%)",
    },
  };
  const [graphCoin, setGraphCoin] = useState("");
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState({ isOpen: false, message: '' });
  console.log("superrrstar");
  // const superstarfilterr = superstarfilterrr;
  const coinsRedux = useSelector((state) => state.coinsSlice.coins);
  const selectedItemscoins =useSelector((state) => state.getSelectedCoins.selectedItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log("superstar filter");
// console.log(coinsRedux);
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const superstarfilterr = coinsRedux.filter((coinn) => coinn.category === "Superstar");

const mooningfilter = coinsRedux.filter((coinn) => coinn.category === "Mooning");
const rektfilter = coinsRedux.filter((coinn) => coinn.category === "Defi");
const mooningSelectedCoins = mooningfilter.filter(coin => coin.selected).length;
const rektSelectedCoins = rektfilter.filter(coin => coin.selected).length;

  async function addCoinsFun(e,coinCategory,coinSelected,coinn){
    console.log("coin print data");
      console.log(coinn);
    if (coinCategory === "Superstar") {
      localStorage.removeItem("SuperStarSelected");
      const selectedCoins = superstarfilterr?.filter(coin => coin.selected).length;
      if (selectedCoins < 2 && mooningSelectedCoins+rektSelectedCoins < 10 ) {    
       await dispatch(toggleSelected(e));        
      } else if(coinSelected){
        await dispatch(toggleSelected(e));
      }
       else {
        if(mooningSelectedCoins+rektSelectedCoins===10){
          setSnackOpen({ isOpen: true, message: "You can't select more than 1 coin" });
        }else{
          setSnackOpen({ isOpen: true, message: "You can't select more than 2 coins" });
        }

       
      
      }   
      
      console.log("superstart filter data");
      console.log(superstarfilterr);
    
    }

    setTimeout(() => {
    
      const selectedSuperstar = superstarfilterr.filter(coin => coin.selected);
      console.log("superstart selected data");
      console.log(selectedSuperstar);
      localStorage.setItem("SuperStarSelected", JSON.stringify(selectedSuperstar));

    }, 4000);
   
  }

  const handleClose = () => {
    document.getElementById("modal-view").classList.add("animate-modal");
    setTimeout(function () {
      setGraphCoin("");
      setOpen(false);
    }, 400);
  };

   

  const handleOpen = (coin_name) => {
    setGraphCoin(coin_name.toLowerCase());
    setSnackOpen({ isOpen: false, message: '' });
    setOpen(true);
  };
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen({ isOpen: false, message: '' });
  };
  useEffect(() => {  
        // fetchCoins();
        // dispatch(getCoinsAsync());
      }, []);
  return (
  
  <>
  <Grid
        style={{ color: "var(--black)" }}
        container
        rowSpacing={"1em"}
      >
        {superstarfilterr?.map((coin, index) =>          (
   <Grid className="coin-card-wrapper" key={coin.id} item xs={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.07 * index }}
                className="coin-card"
              >
                <span className="coin-image-wrapper">
                  <img
                    src={coin.imageUrl}
                    alt="coin_image"
                    onerror="this.src = '../../../images/coinLogos/bitcoin.jpg';"
                    width="40px"
                    height="40px"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpen(coin.name)}
                  />
                </span>
                <span
                  onClick={() => handleOpen(coin.name)}
                  className="graph font-size-15 font-weight-500 mt-5 mb-10"
                >
                  {coin.name}
                </span>
                {coin.selected ? (
                  <Button
                    className="coin-added-button"
                    style={{ borderRadius: "12px" }}
                    variant="outlined"
                    size="small"
                    id= {coin.id}
                    // onClick={(event) => {
                    //   addCoin(event, wasActiveTab, superstars, mooning, rekt);
                    // }}
                    onClick={(e) => {
                      addCoinsFun(e.target.id, coin.category,coin.selected,coin);
                    }}
                  >
                    Added
                  </Button>
                ) : (
                  
                  <Button
                    className="coin-add-button"
                    style={{ borderRadius: "12px" }}
                    variant="outlined"
                    size="small"
                    id= {coin.id}
                    onClick={(e) => {
                      addCoinsFun(e.target.id, coin.category,coin.selected,coin);
                    }}
                  >
                    Add
                  </Button>
                )}
              </motion.div>
            </Grid>
          ))}
      
      </Grid>
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
                {/* Please read the tips given above.
                <br />
                Total selected coins must be 11. */}
                {snackOpen.message}
              </Alert>
            </motion.div>
          </Snackbar>

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
        </div>
  </>
  )
}

export default Superstars;