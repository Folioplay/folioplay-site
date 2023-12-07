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
import { getCoinsAsync, toggleSelected } from "../../../Redux/Coins/CoinsSlice";

import "../style/index.css";
// import { toggleSelectedCoins } from "../../../Redux/SelectedSlice/SelectedSlice";

export function Mooningg() {

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
  console.log("superrrstar");
  const [snackOpen, setSnackOpen] = useState({ isOpen: false, message: '' });
  const [graphCoin, setGraphCoin] = useState("");
  const [open, setOpen] = useState(false);
  // const superstarfilterr = superstarfilterrr;
  const coinsRedux = useSelector((state) => state.coinsSlice.coins);
  const selectedItemscoins = useSelector((state) => state.getSelectedCoins.selectedItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("superstar filter");
  // console.log(coinsRedux);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const mooningfilter = coinsRedux.filter((coinn) => coinn.category === "Mooning");
  const rektfilter = coinsRedux.filter((coinn) => coinn.category === "Defi");
  const superstarfilterr = coinsRedux.filter((coinn) => coinn.category === "Superstar");
  const superstartSelectedCoins = superstarfilterr?.filter(coin => coin.selected).length;
  const mooningSelectedCoins = mooningfilter.filter(coin => coin.selected).length;
  const rektSelectedCoins = rektfilter.filter(coin => coin.selected).length;

  async function addCoinsFun(e, coinCategory, coinSelected, coinn) {
    console.log("coin print data");
    console.log(coinn);


    if (coinCategory === "Mooning") {
      localStorage.removeItem("MooningSelected");
      if (mooningSelectedCoins < 6 && mooningSelectedCoins + rektSelectedCoins < 9 || superstartSelectedCoins === 1 && mooningSelectedCoins < 6 && mooningSelectedCoins + rektSelectedCoins < 10) {
        dispatch(toggleSelected(e));
      } else if (rektSelectedCoins === 1 && mooningSelectedCoins + rektSelectedCoins < 10) {
        dispatch(toggleSelected(e));
      } else if (coinSelected) {
        dispatch(toggleSelected(e));
      }
      else {
        setSnackOpen({ isOpen: true, message: "Cannot add more coin to this basket !!" });
      }
      const selectedMooning = await mooningfilter.filter(coin => coin.selected);
      localStorage.setItem("MooningSelected", JSON.stringify(selectedMooning));
    }
  }

  const handleOpen = (coin_name) => {
    setGraphCoin(coin_name.toLowerCase());
    setSnackOpen({ isOpen: false, message: '' });
    setOpen(true);
  };

  const handleClose = () => {
    document.getElementById("modal-view").classList.add("animate-modal");
    setTimeout(function () {
      setGraphCoin("");
      setOpen(false);
    }, 400);
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

      // onMouseLeave={() => updateTotalCoinCount()}
      // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {mooningfilter.map((coin, index) => (
          <Grid className="coin-card-wrapper" item xs={6}>
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
                  // onClick={(event) =>
                  //   addCoin(event, wasActiveTab, superstars, mooning, rekt)
                  // }
                  id={coin.id}
                  // onClick={(event) => {
                  //   addCoin(event, wasActiveTab, superstars, mooning, rekt);
                  // }}
                  onClick={(e) => {
                    addCoinsFun(e.target.id, coin.category, coin.selected, coin);
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
                  // onClick={(event) =>
                  //   addCoin(event, wasActiveTab, superstars, mooning, rekt)
                  // }
                  id={coin.id}
                  // onClick={(event) => {
                  //   addCoin(event, wasActiveTab, superstars, mooning, rekt);
                  // }}
                  onClick={(e) => {
                    addCoinsFun(e.target.id, coin.category, coin.selected, coin);
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

export default Mooningg;