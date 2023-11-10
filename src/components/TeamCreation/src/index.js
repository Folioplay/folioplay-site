// import React, { useState, useEffect } from "react";
// import FolioPlayLayout from "../../../layout/FolioPlayLayout";
// import { useLocation, useNavigate } from "react-router-dom";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import { Button, Container, Grid } from "@mui/material";
// import Box from "@mui/material/Box";
// import ReactLoading from "react-loading";
// import Modal from "@mui/material/Modal";
// import OpenChart from "../../Charts/src";
// import { motion } from "framer-motion/dist/framer-motion";
// import Snackbar from "@mui/material/Snackbar";
// import { getAllCoins } from "../../../APIS/apis";
// import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
// import CancelIcon from "@mui/icons-material/Cancel";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
// import MuiAlert from "@mui/material/Alert";
// import preservedView from "../common/preservedView";
// import assignRoles from "../common/assignRole";
// import addCoin from "../common/addCoin";
// import TeamPreview from "../common/TeamPreview";
// import "../style/index.css";
// export function TeamCreation() {
//   const navigate = useNavigate();
//   const [wasActiveTab, setWasActiveTab] = useState(localStorage.getItem("wasActiveTabeState") || "superstars");
//   const [graphCoin, setGraphCoin] = useState("");
//   const [open, setOpen] = useState(false);
//   const [coins, setCoins] = useState([]);
//   const [snackOpen, setSnackOpen] = useState(false);
//   const {state} = useLocation();
//   const [temp, setTemp] = useState(0);
//   // const [selectedCoinCount, setSelectedCoinCount] =useState(localStorage.getItem("SelectedCoinCount") || 0);
 
//   var superstars = [];
//   var mooning = [];
//   var rekt = [];
//   var allCoins = [...rekt,...mooning,...superstars];
//   var localSuperstars = JSON.parse(window.localStorage.getItem("superstars"));
//   var localMooning = JSON.parse(window.localStorage.getItem("mooning"));
//   var localRekt = JSON.parse(window.localStorage.getItem("rekt"));
//   var localallCoins = JSON.parse(window.localStorage.getItem("allCoins"));
//   console.log(localMooning);
//   console.log("local mooning liene 41");
//   const style = {
//     position: "absolute",
//     transform: "translate(-30%, -50%)",
//     width: "max(70%,300px)",
//     bgcolor: "#E8EEF2",
//     boxShadow: 24,
//     borderRadius: "12px",
//     p: 1,
//     ["@media (max-width:1200px)"]: {
//       transform: "translate(-50%, -50%)",
//     },
//   };
//   const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });
//   const handleSnackClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackOpen(false);
//   };
  

//   const handleOpen = (coin_name) => {
//     setGraphCoin(coin_name.toLowerCase());
//     setSnackOpen(false);
//     setOpen(true);
//   };

//   // async function updateTotalCoinCount(){
//   //   if(localStorage.getItem("SelectedCoinCount") !== selectedCoinCount){

//   //     await setSelectedCoinCount(localStorage.getItem("SelectedCoinCount"));
//   //   }
//   // }
//   const handleClose = () => {
//     document.getElementById("modal-view").classList.add("animate-modal");
//     setTimeout(function () {
//       setGraphCoin("");
//       setOpen(false);
//     }, 400);
//   };

//   async function fetchCoins() {
//     setCoins(await getAllCoins());
//   }
//   useEffect(() => {  
//     fetchCoins();
   
//   }, []);
//   useEffect(() => {   
  
//     if(localSuperstars || localMooning || localRekt){
//       preservedView(wasActiveTab,localSuperstars,localMooning,localRekt);
//       var coinsLimit =
//       wasActiveTab === "superstars" ? 2 : wasActiveTab === "mooning" ? 6 : 6;
//     var allButtons = document.querySelectorAll(
//       "#" + wasActiveTab + " .coin-add-button"
//     );
//     var totalAddedCoins =
//       document.getElementsByClassName("coin-added-button").length;
//     if (
//       document.querySelectorAll("#" + wasActiveTab + " .coin-added-button")
//         .length >= coinsLimit ||
//       totalAddedCoins === 11
//     ) {
//       for (var i = 0; i < allButtons.length; i++) {
//         if (allButtons[i].innerText === "ADD") {
//           allButtons[i].classList.add("disabled-button");
//         }
//       }
//     } else {
//       document.getElementById("superstars" + "-selected-number").innerText =
//         document.querySelectorAll(
//           "#" + "superstars" + " .coin-added-button"
//         ).length;
//       document.getElementById("mooning" + "-selected-number").innerText =
//         document.querySelectorAll(
//           "#" + "mooning" + " .coin-added-button"
//         ).length;
//       document.getElementById("rekt" + "-selected-number").innerText =
//         document.querySelectorAll("#" + "rekt" + " .coin-added-button").length;
//       }
//     }

//     console.log((document.querySelectorAll(
//       "#" + "superstars" + " .coin-added-button"
//     ).length)+( document.querySelectorAll(
//       "#" + "mooning" + " .coin-added-button"
//     ).length)+( document.querySelectorAll(
//       "#" + "rekt" + " .coin-added-button"
//     ).length));
   
//   },[coins])
//   for (var i = 0; i < coins.length; i++) {
//     if (
//       window.localStorage.getItem("superstars") === null &&
//       coins[i].category === "Superstar"
//     ) {
//       superstars.push(coins[i]);
//       superstars[superstars.length - 1]["selected"] = false;
//     }
//     if (
//       window.localStorage.getItem("mooning") === null &&
//       coins[i].category === "Mooning"
//     ) {
//       mooning.push(coins[i]);
//       mooning[mooning.length - 1]["selected"] = false;
//     }
//     if (
//       window.localStorage.getItem("rekt") === null &&
//       coins[i].category === "Defi"
//     ) {
//       rekt.push(coins[i]);
//       rekt[rekt.length - 1]["selected"] = false;
//     }
//   }

//   if (localMooning !== null) {
//     mooning = localMooning;
//   }
//   if (localSuperstars !== null) {
//     superstars = localSuperstars;
//   }
//   if (localRekt !== null) {
//     rekt = localRekt;
//   }

//   useEffect(() => {
  
//     preservedView(wasActiveTab, superstars, mooning, rekt);
//     var coinsLimit =
//       wasActiveTab === "superstars" ? 2 : wasActiveTab === "mooning" ? 6 : 6;
//     var allButtons = document.querySelectorAll(
//       "#" + wasActiveTab + " .coin-add-button"
//     );
//     var totalAddedCoins =
//       document.getElementsByClassName("coin-added-button").length;
//     if (
//       document.querySelectorAll("#" + wasActiveTab + " .coin-added-button")
//         .length >= coinsLimit ||
//       totalAddedCoins === 11
//     ) {
//       for (var i = 0; i < allButtons.length; i++) {
//         if (allButtons[i].innerText === "ADD") {
//           allButtons[i].classList.add("disabled-button");
//         }
//       }
//     } else {
//       document.getElementById("superstars" + "-selected-number").innerText =
//         document.querySelectorAll(
//           "#" + "superstars" + " .coin-added-button"
//         ).length;
//       document.getElementById("mooning" + "-selected-number").innerText =
//         document.querySelectorAll(
//           "#" + "mooning" + " .coin-added-button"
//         ).length;
//       document.getElementById("rekt" + "-selected-number").innerText =
//         document.querySelectorAll("#" + "rekt" + " .coin-added-button").length;
//       }
//   }, [wasActiveTab, graphCoin, snackOpen]);
//   const cons = (document.querySelectorAll(
//     "#" + "superstars" + " .coin-added-button"
//   ).length)+( document.querySelectorAll(
//     "#" + "mooning" + " .coin-added-button"
//   ).length)+( document.querySelectorAll(
//     "#" + "rekt" + " .coin-added-button"
//   ).length);

//   const county = 11;
//   const selected = 6;
//     const CoinsCounterCircle = Array.from({ length: county }).map((_, index) => (
//       <div key={index}>
//         {/* <img src={coinRound} alt="Image" style={{ width: "50px" }} /> */}
//           {index+1 <= cons && cons !==undefined &&  cons >0 ? ( <div style={{width:"20px",height:"20px",backgroundColor:"#fea31b",borderRadius:"50%",color:"#fea31b",border:"2px solid #fea31b",textAlign:"center",fontSize:"0.9rem",alignItems:"center",fontWeight:"bold"}}>{`${index+1}`}</div>
//   ) : ( <div style={{width:"20px",height:"20px",backgroundColor:"white",borderRadius:"50%",color:"black",textAlign:"center",fontSize:"0.9rem",alignItems:"center"}}>{`${index+1}`}</div>
//   )
//         }
//       </div>
//     ));
//   const Superstars = () => {
//     return (
//       <Grid
//         style={{ color: "var(--black)" }}
//         container
//         rowSpacing={"1em"}
//         // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    
//         // onMouseLeave={() => updateTotalCoinCount()}
//       >
//         {superstars.map((coin, index) => {
//           return (
//             <Grid className="coin-card-wrapper" item xs={6}>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.07 * index }}
//                 className="coin-card"
//               >
//                 <span className="coin-image-wrapper">
//                   <img
//                     src={coin.imageUrl}
//                     alt="coin_image"
//                     onerror="this.src = '../../../images/coinLogos/bitcoin.jpg';"
//                     width="40px"
//                     height="40px"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => handleOpen(coin.name)}
//                   />
//                 </span>
//                 <span
//                   onClick={() => handleOpen(coin.name)}
//                   className="graph font-size-15 font-weight-500 mt-5 mb-10"
//                 >
//                   {coin.name}
//                 </span>
//                 {coin.selected ? (
//                   <Button
//                     className="coin-added-button"
//                     style={{ borderRadius: "12px" }}
//                     variant="outlined"
//                     size="small"
//                     onClick={(event) => {
//                       addCoin(event, wasActiveTab, superstars, mooning, rekt);
//                     }}
//                   >
//                     Added
//                   </Button>
//                 ) : (
//                   <Button
//                     className="coin-add-button"
//                     style={{ borderRadius: "12px" }}
//                     variant="outlined"
//                     size="small"
//                     onClick={(event) => {
//                       addCoin(event, wasActiveTab, superstars, mooning, rekt);
//                     }}
//                   >
//                     Add
//                   </Button>
//                 )}
//               </motion.div>
//             </Grid>
//           );
//         })}
//       </Grid>
//     );
//   };
//   const Mooning = () => {
//     return (
//       <Grid
//         style={{ color: "var(--black)" }}
//         container
//         rowSpacing={"1em"}
   
//         // onMouseLeave={() => updateTotalCoinCount()}
//         // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//       >
//         {mooning.map((coin, index) => {
//           return (
//             <Grid className="coin-card-wrapper" item xs={6}>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.07 * index }}
//                 className="coin-card"
//               >
//                 <span className="coin-image-wrapper">
//                   <img
//                     src={coin.imageUrl}
//                     alt="coin_image"
//                     width="40px"
//                     height="40px"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => handleOpen(coin.name)}
//                   />
//                 </span>
//                 <span
//                   onClick={() => handleOpen(coin.name)}
//                   className="graph font-size-15 font-weight-500 mt-5 mb-10"
//                 >
//                   {coin.name}
//                 </span>
//                 {coin.selected ? (
//                   <Button
//                     className="coin-added-button"
//                     style={{ borderRadius: "12px" }}
//                     variant="outlined"
//                     size="small"
//                     onClick={(event) =>
//                       addCoin(event, wasActiveTab, superstars, mooning, rekt)
//                     }
//                   >
//                     Added
//                   </Button>
//                 ) : (
//                   <Button
//                     className="coin-add-button"
//                     style={{ borderRadius: "12px" }}
//                     variant="outlined"
//                     size="small"
//                     onClick={(event) =>
//                       addCoin(event, wasActiveTab, superstars, mooning, rekt)
//                     }
//                   >
//                     Add
//                   </Button>
//                 )}
//               </motion.div>
//             </Grid>
//           );
//         })}
//       </Grid>
//     );
//   };
//   const Rekt = () => {
//     return (
//       <Grid
//         style={{ color: "var(--black)" }}
//         container
//         rowSpacing={"1em"}
//         // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//         // onMouseLeave={() => updateTotalCoinCount()}
//       >
//         {rekt.map((coin, index) => {
//           return (
//             <Grid className="coin-card-wrapper" item xs={6}>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.07 * index }}
//                 className="coin-card"
//               >
//                 <span className="coin-image-wrapper">
//                   <img
//                     src={coin.imageUrl}
//                     alt="coin_image"
//                     width="40px"
//                     style={{ cursor: "pointer" }}
//                     height="40px"
//                     onClick={() => handleOpen(coin.name)}
//                   />
//                 </span>
//                 <span
//                   onClick={() => handleOpen(coin.name)}
//                   className="graph font-size-15 font-weight-500 mt-5 mb-10"
//                 >
//                   {coin.name}
//                 </span>
//                 {coin.selected ? (
//                   <Button
//                     className="coin-added-button"
//                     style={{ borderRadius: "12px" }}
//                     variant="outlined"
//                     size="small"
//                     onClick={(event) =>
//                       addCoin(event, wasActiveTab, superstars, mooning, rekt)
//                     }
//                   >
//                     Added
//                   </Button>
//                 ) : (
//                   <Button
//                     className="coin-add-button"
//                     style={{ borderRadius: "12px" }}
//                     variant="outlined"
//                     size="small"
//                     onClick={(event) =>
//                       addCoin(event, wasActiveTab, superstars, mooning, rekt)
//                     }
//                   >
//                     Add
//                   </Button>
//                 )}
//               </motion.div>
//             </Grid>
//           );
//         })}
//       </Grid>
//     );
//   };
//   const changeTabs = (event) => {
//   // setSelectedCoinCount(localStorage.getItem("SelectedCoinCount") || 0); 
//   // localStorage.setItem("wasActiveTabeState")
//   event.stopPropagation();
//   // console.log(event);
//     setSnackOpen(false);
//     localStorage.setItem("wasActiveTabeState",event.target.firstChild.nodeValue.toLowerCase())
//     setWasActiveTab(event.target.firstChild.nodeValue.toLowerCase());
//   };
//   var prevRoute = state && state.comingFrom ? state.comingFrom : "/activity";
//   const LeftComponent = () => {
//     return (
//       <div className="fullpage">
//        {temp===0 && <>
//         <div className="sticky-top1">
//           <div className="teamcreate-bar pl-20 pt-10 mb-20">
//             <ArrowBackIosIcon
//               fontSize="medium"
//               className="go-back-button"
//               onClick={() => navigate(prevRoute)}
//             />
//             <span className="ml-20 font-size-20 font-weight-700">
//               Choose 11 Coins
//             </span>
//           </div>
          
//           <Container sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}> 
//         {CoinsCounterCircle}
//             </Container>
//           <br />
//           <div className="coin-classes mb-10">
//             <span
//               id="superstars-tab"
//               className="coinClass coin-class-selected ml-20"
//               onClick={changeTabs}
//             >
//               SuperStars
//             </span>
//             <span id="superstars-selected-number" className="font-size-12">
//               0
//             </span>
//             <span
//               id="mooning-tab"
//               className="coinClass ml-20"
//               onClick={changeTabs}
//             >
//               Mooning
//             </span>
//             <span id="mooning-selected-number" className="font-size-12">
//               0
//             </span>
//             <span
//               id="rekt-tab"
//               className="coinClass ml-20"
//               onClick={changeTabs}
//             >
//               Rekt
//             </span>
//             <span id="rekt-selected-number" className="font-size-12">
//               0
//             </span>
//           </div>
//         </div>
//        </>}
//        {temp===1 && <>
//         <div className="sticky-top">
//           <div className="teamcreate-bar pl-20 pt-10 mb-20">
//             <ArrowBackIosIcon
//               fontSize="medium"
//               className="go-back-button"
//               onClick={() => navigate(prevRoute)}
//             />
//             <span className="ml-20 font-size-20 font-weight-700">
//               Choose 11 Coins
//             </span>
//           </div>
//           <br />
        
//         </div>
//        </>}
       

//         <div className="coins">
//           <div className="tip-div">
//             <WbSunnyOutlinedIcon />
//             <span className="font-size-12 ml-8">
//               TIP: {wasActiveTab === "superstars" ? (
//                 <>We are Bullish on these superstars in all tournaments.</>
//               ) : (
//                 <>{wasActiveTab === "mooning" ? <>Select coins which you are Bullish upon in the tournament.</> : <>Select coins which you are Bearish upon in the tournament.</>}</>
//               )} <br />
//               <span className="font-weight-600">
//               Select{" "}
              
//               {wasActiveTab === "superstars" ? (
//                 <>1-2</>
//               ) : (
//                 <>{wasActiveTab === "mooning" ? <>3-6</> : <>3-6</>}</>
//               )}{" "} coins from this bucket
//               </span>
//             </span>
//           </div>
//           {coins.length === 0 ? (
//             <div className="loading-component">
//               <ReactLoading type={"spin"} color="var(--violet-blue)" />
//             </div>
//           ) : (
//             <></>
//           )}
//           <div id="superstars" className="coinClass-content">
//           <div className="superstars_Height_Controll">
//             <Superstars />  
//             <div className="assign-roles-div mt-20">
//             <Button
//               id="assign-role-button2"
//               variant="contained"
//               // className="role-button1 ml-auto"
//               className="role-button2 ml-auto"
//               onClick={() =>
//                navigate("selectedCoins")
                
//               }
//               // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
//             >
//              Preview Team
//             </Button>

//             <Button
//               id="assign-role-button"
//               variant="contained"
//               className="role-button ml-auto"
//               onClick={() =>
//                  assignRoless()
                
//               }
//               // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
//             >
//               Select top 3 Coins
//             </Button>
//           </div>          
//           </div>
//           </div>
//           <div id="mooning" className="coinClass-content display-none" >
//          <div className="mooning_Height_Controll">
//             <Mooning />
//             <div className="assign-roles-div mt-20">
//             <Button
//               id="assign-role-button2"
//               variant="contained"
//               className="role-button2 ml-auto"
//               onClick={() =>
//                navigate("selectedCoins")
                
//               }
//               // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
//             >
//              Preview Team
//             </Button>
//             <Button
//               id="assign-role-button"
//               variant="contained"
//               className=""
//               onClick={() =>
//                  assignRoless()
//               }
//               // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
//             >
//               Select top 3 Coins
//             </Button>
//             <Button
//               id="assign-role-button"
//               variant="contained"
//               className="role-button ml-auto"
//               onClick={() =>
//                  assignRoless()
//               }
//               // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
//             >
//               Select top 3 Coins
//             </Button>
//           </div>
//           <br/>
//           <br/>
//           </div>
//           <br/>
//           <br/>
//           </div>
//           <div id="rekt" className="coinClass-content display-none">
//           <div className="rekt_Height_Controll">
//             <Rekt />
//             <div className="assign-roles-div mt-20">
//             <Button
//               id="assign-role-button2"
//               variant="contained"
//               className="role-button2 ml-auto"
//               onClick={() =>
//                navigate("selectedCoins")
                
//               }
//               // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
//             >
//              Preview Team
//             </Button>
//             <Button
//               id="assign-role-button"
//               variant="contained"
//               className="role-button ml-auto"
//               onClick={() =>
//                  assignRoless()
//               }
//               // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
//             >
//               Select top 3 Coins
//             </Button>
//           </div>
//           <div className="assign-roles-div mt-20">
              
//               <Button
//                 id="assign-role-button"
//                 variant="contained"
//                 className="role-button ml-auto"
//                 onClick={() =>
//                    assignRoless()
//                 }
//                 // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
//               >
//                 Select top 3 Coins
//               </Button>
//             </div>
//           <br/>
//           <br/>
//           </div>
//           <br/>
//           <br/>
//           </div>
//           {/* <div className="assign-roles-div mt-20">
//             <Button
//               id="assign-role-button"
//               variant="contained"
//               className="role-button ml-auto"
//               onClick={() =>
//                  assignRoless()
//               }
//               // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
//             >
//               Select top 3 Coins
//             </Button>
//           </div> */}
//           <div className="error-cannot-add-coin">
//             <ErrorOutlineOutlinedIcon />{" "}
//             <span className="ml-10">
//               Cannot add more coin to this basket !!
//             </span>
//           </div>
//           <Snackbar
//             open={snackOpen}
//             autoHideDuration={3500}
//             onClose={handleSnackClose}
//           >
//             <motion.div
//               id="snack-bar-div"
//               initial={{ y: 200 }}
//               animate={{ y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Alert
//                 id="team-creation-message"
//                 onClose={handleSnackClose}
//                 severity="error"
//                 sx={{ width: "100%" }}
//               >
//                 Please read the tips given above.
//                 <br />
//                 Total selected coins must be 11.
//               </Alert>
//             </motion.div>
//           </Snackbar>
//         </div>
//       </div>
//     );
//   };

//   const RightComponent = () => {
//     return (
//       <div id="team-create-page-image">
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//           disableAutoFocus={true}
//         >
//           <motion.div
//             id="modal-view"
//             initial={{ x: "50vw", y: "200vh" }}
//             animate={{ scale: 1, x: "50vw", y: "50vh" }}
//             transition={{ duration: 0.5 }}
//           >
//             <Box sx={style}>
//               <OpenChart coin={graphCoin} />
//             </Box>
//             <motion.span onClick={handleClose}>
//               {/* <CancelIcon id="cross-modal" fontSize="large" /> */}
//             </motion.span>
//           </motion.div>
//         </Modal>
//         <div>
//           <span className="font-size-36 font-weight-700 mb-20 mt-20">
//             Here is your team preview!
//           </span>
//           {/* <h3>Doesn't these big winnings look WOW? Ofcourse they do!</h3> */}
//         </div>
//         <TeamPreview superstars={superstars} mooning={mooning} rekt={rekt} />

//         {/* <TickerWidget /> */}
//       </div>
//     );
//   };
//   return (
//     <FolioPlayLayout
//       LeftComponent={LeftComponent}
//       RightComponent={RightComponent}
//     />
//   );
// }

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
import "../style/index.css";
export function TeamCreation() {
  const navigate = useNavigate();
  // const [wasActiveTab, setWasActiveTab] = useState(localStorage.getItem("wasActiveTabeState") || "mooning");
  
  const [wasActiveTab, setWasActiveTab] = useState(localStorage.getItem("wasActiveTabeState") || "superstars");
  const [graphCoin, setGraphCoin] = useState("");
  const [open, setOpen] = useState(false);
  const [coins, setCoins] = useState([]);
  const [snackOpen, setSnackOpen] = useState({ isOpen: false, message: '' });
   const {state} = useLocation();
  const [temp, setTemp] = useState(0);
  const [mooningfilter, setMooningfilter] =useState(JSON.parse(localStorage.getItem("MooningSelected")) || []);
  const [superstarfilter, setSuperstarfilter] =useState(JSON.parse(localStorage.getItem("SuperStarSelected")) || []); 
  const [rektfilter, setRektfilter] =useState(JSON.parse(localStorage.getItem("RektSelected")) || []);  
  const [rektSelectedCoins, setRektSelectedCoins] =useState(0);
  const [superstartSelectedCoins, setSuperstarSelectedCoins] =useState(0);
  const [mooningSelectedCoins, setMooningSelectedCoins] =useState(0);
  
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
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen({ isOpen: false, message: '' });
  };
  

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


  async function fetchCoins() {
    const AllCoins = await getAllCoins()
    const updatedCoins = AllCoins.map(coin => ({ ...coin, selected: false }));
    console.log(updatedCoins);

    setCoins(updatedCoins);

    if(!localStorage.getItem("SuperStarSelected")){
      const mooningCoins = await updatedCoins.filter((coinn) => coinn.category === "Mooning");
      setMooningfilter(mooningCoins);
    }
    if(!localStorage.getItem("MooningSelected")){
      const superstarCoins = await updatedCoins.filter((coinn) => coinn.category === "Superstar");
      setSuperstarfilter(superstarCoins);
    }
    if(!localStorage.getItem("RektSelected")){
      const rektCoins = await updatedCoins.filter((coinn) => coinn.category === "Defi");
      setRektfilter(rektCoins);
    }  
    }
   
  useEffect(() => {  
    fetchCoins();
  }, []);
  useEffect(() => {  
    const superstarselectedCoinss = superstarfilter.filter(coin => coin.selected).length;
    setSuperstarSelectedCoins(superstarselectedCoinss);
    const rektselectedCoinss = rektfilter.filter(coin => coin.selected).length;
    setRektSelectedCoins(rektselectedCoinss);
    const mooningselectedCoinss = mooningfilter.filter(coin => coin.selected).length;
    setMooningSelectedCoins(mooningselectedCoinss);
  }, [superstarfilter,mooningfilter,rektfilter]);



async function addCoinsFun(e,coinCategory,coinSelected){
console.log(coinCategory+e);
if (coinCategory === "Superstar") {
  const selectedCoins = superstarfilter.filter(coin => coin.selected).length;
  if (selectedCoins < 2) {
    const changeSelect = superstarfilter.map(coin =>
      coin.id === e ? { ...coin, selected: !coin.selected } : coin
    );
    localStorage.setItem("SuperStarSelected", JSON.stringify(changeSelect));
    setSuperstarfilter(changeSelect);
  } else if(coinSelected){
    const changeSelect = superstarfilter.map(coin =>
      coin.id === e ? { ...coin, selected: !coin.selected } : coin
    );
    localStorage.setItem("SuperStarSelected", JSON.stringify(changeSelect));
    setSuperstarfilter(changeSelect);

  }
   else {
    setSnackOpen({ isOpen: true, message: "You can't select more than 2 coins" });
    console.log("You can't select more than 2 coins");
  }

}

if(coinCategory === "Mooning") {
  const mooningselectedCoins = mooningfilter.filter(coin => coin.selected).length;
  
  if (mooningSelectedCoins < 6 && mooningSelectedCoins+rektSelectedCoins < 9  || superstartSelectedCoins === 1 && mooningSelectedCoins < 6 && mooningSelectedCoins+rektSelectedCoins < 10) {
    const mooningchangeSelect = await mooningfilter.map(coin =>
      coin.id === e ? { ...coin, selected: !coin.selected } : coin
    );
    localStorage.setItem("MooningSelected", JSON.stringify(mooningchangeSelect));
    setMooningfilter(mooningchangeSelect);
  }else if(rektSelectedCoins === 1 && mooningSelectedCoins+rektSelectedCoins < 10){
    const mooningchangeSelect = await mooningfilter.map(coin =>
      coin.id === e ? { ...coin, selected: !coin.selected } : coin
    )}else if(coinSelected){
    const mooningchangeSelect = await mooningfilter.map(coin =>
      coin.id === e ? { ...coin, selected: !coin.selected } : coin
    );
    localStorage.setItem("MooningSelected", JSON.stringify(mooningchangeSelect));
    setMooningfilter(mooningchangeSelect);
  } 
  else {
    setSnackOpen({ isOpen: true, message: "Cannot add more coin to this basket !!" });
   
    console.log("You can't select more coins");
  }

}

if(coinCategory === "Defi") {
  const selectedCoins = rektfilter.filter(coin => coin.selected).length;
  
  if (rektSelectedCoins < 6 && mooningSelectedCoins+rektSelectedCoins < 9 || superstartSelectedCoins === 1 && rektSelectedCoins < 6 &&  mooningSelectedCoins+rektSelectedCoins < 10) {
     
    const changeSelect = await rektfilter.map(coin =>
      coin.id === e ? { ...coin, selected: !coin.selected } : coin
    );
    localStorage.setItem("RektSelected", JSON.stringify(changeSelect));
    setRektfilter(changeSelect);
  }else if(coinSelected){
    const changeSelect = await rektfilter.map(coin =>
      coin.id === e ? { ...coin, selected: !coin.selected } : coin
    );
    localStorage.setItem("RektSelected", JSON.stringify(changeSelect));
    setRektfilter(changeSelect);
  }   
  else {
    setSnackOpen({ isOpen: true, message: "Cannot add more coin to this basket !!" });
    console.log("You can't select more coins");
  }
}
}
  async function assignRoless(){
if(superstartSelectedCoins+mooningSelectedCoins+rektSelectedCoins === 11){
  navigate("/teams/createteam/assignrole",{state:state});
 console.log("ready for selection");
}else{
  setSnackOpen({ isOpen: true, message: "Total selected coins must be 11." });
}
  }

  const county = 11;
  const selected = 6;
  const cons = rektSelectedCoins+ superstartSelectedCoins+mooningSelectedCoins;
  const all = [...superstarfilter, ...mooningfilter,...rektfilter]
    const CoinsCounterCircle = Array.from({ length: county }).map((_, index) => (
      <div key={index}>
        {/* <img src={coinRound} alt="Image" style={{ width: "50px" }} /> */}
          {index+1 <= cons && cons !==undefined &&  cons >0 ? ( <div style={{width:"20px",height:"20px",backgroundColor:"#fea31b",borderRadius:"50%",color:"#fea31b",border:"2px solid #fea31b",textAlign:"center",fontSize:"0.9rem",alignItems:"center",fontWeight:"bold"}}>{`${index+1}`}</div>
  ) : ( <div style={{width:"20px",height:"20px",backgroundColor:"white",borderRadius:"50%",color:"black",textAlign:"center",fontSize:"0.9rem",alignItems:"center"}}>{`${index+1}`}</div>
  )
        }
      </div>
    ));
    const SelectedCoinIcons = () => {
      console.log(all);
      return (
        <>
          {all?.filter((coin) => coin.selected)
                .map((coin, index) => {
                  return (
                    <div style={{width:"27px",height:"26px",backgroundColor:"white",borderRadius:"50%",color:"black",textAlign:"center",fontSize:"0.9rem",alignItems:"center",overflow:"hidden"}} >
                      <img src={coin.imageUrl} key={index} style={{width:"21px",padding:"2.5px 0 0 0"}}/>           
                    </div>                
                  );
                })
          }
        </>
      );
    }
  const Superstars = () => {
    return (
      <Grid
        style={{ color: "var(--black)" }}
        container
        rowSpacing={"1em"}
      >
        {superstarfilter.map((coin, index) => {
          return (
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
                      addCoinsFun(e.target.id, coin.category,coin.selected);
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
                      addCoinsFun(e.target.id, coin.category,coin.selected);
                    }}
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
        rowSpacing={"1em"}
   
        // onMouseLeave={() => updateTotalCoinCount()}
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {mooningfilter.map((coin, index) => {
          return (
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
                    id= {coin.id}
                    // onClick={(event) => {
                    //   addCoin(event, wasActiveTab, superstars, mooning, rekt);
                    // }}
                    onClick={(e) => {
                      addCoinsFun(e.target.id, coin.category,coin.selected);
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
                    id= {coin.id}
                    // onClick={(event) => {
                    //   addCoin(event, wasActiveTab, superstars, mooning, rekt);
                    // }}
                    onClick={(e) => {
                      addCoinsFun(e.target.id, coin.category,coin.selected);
                    }}
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
        rowSpacing={"1em"}
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        // onMouseLeave={() => updateTotalCoinCount()}
      >
        {rektfilter.map((coin, index) => {
          return (
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
                    style={{ cursor: "pointer" }}
                    height="40px"
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
                    id= {coin.id}
                    onClick={(e) => {
                      addCoinsFun(e.target.id, coin.category,coin.selected);
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
                    id= {coin.id}
                    onClick={(e) => {
                      addCoinsFun(e.target.id, coin.category,coin.selected);
                    }}
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
  const changeTabs = (e) => {
  // setSelectedCoinCount(localStorage.getItem("SelectedCoinCount") || 0); 
  // localStorage.setItem("wasActiveTabeState")

  // console.log(event);
  console.log(e);
    setSnackOpen(false);
    localStorage.setItem("wasActiveTabeState",e)
    setWasActiveTab(e);
  };
  var prevRoute = state && state.comingFrom ? state.comingFrom : "/activity";
  const LeftComponent = () => {
    return (
      <div className="fullpage">
       {temp===0 && <>
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
          
          <Container sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly",width:"100%",height:"26px"}}> 
        {/* {CoinsCounterCircle} */}

        <SelectedCoinIcons/>
            </Container>
          <br />
          <div className="coin-classes mb-10">
            <span
              id="superstars"
              className= {wasActiveTab ==="superstars" ? "coinClass coin-class-selected ml-20" :"coinClass ml-20" }
              onClick={(e)=>{changeTabs(e.target.id) }}
            >
              SuperStars
            </span>
            <span className="font-size-12">
              {superstartSelectedCoins}
            </span>
            <span
              id="mooning"
              className= {wasActiveTab ==="mooning" ? "coinClass coin-class-selected ml-20" :"coinClass ml-20" }
              onClick={(e)=>{changeTabs(e.target.id) }}
            >
              Mooning
            </span>
            <span  className="font-size-12">
             {mooningSelectedCoins}
            </span>
            <span
              id="rekt"
              className= {wasActiveTab ==="rekt" ? "coinClass coin-class-selected ml-20" :"coinClass ml-20" }
              onClick={(e)=>{changeTabs(e.target.id) }}
            >
              Rekt
            </span>
            <span  className="font-size-12">
            {rektSelectedCoins}
            </span>
          </div>
        </div>
       </>}
       {temp===1 && <>
        <div className="sticky-top">
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
          <br />
        
        </div>
       </>}
       

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
                
              }
              // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
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
              // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
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
            <Mooning />
            <div className="assign-roles-div mt-20">
            <Button
              id="assign-role-button2"
              variant="contained"
              className="role-button2 ml-auto"
              onClick={() =>
               navigate("selectedCoins")
                
              }
              // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
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
              // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
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
              // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
            >
              Select top 3 Coins
            </Button>
          </div>
          <br/>
          <br/>
          </div>
          <br/>
          <br/>
          </div> </> ) : (null)}
        
          {wasActiveTab==="rekt" ?  (<>       
          <div id="rekt" className="coinClass-content">
          <div className="rekt_Height_Controll">
            <Rekt />
            <div className="assign-roles-div mt-20">
            <Button
              id="assign-role-button2"
              variant="contained"
              className="role-button2 ml-auto"
              onClick={() =>
               navigate("selectedCoins")
                
              }
              // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
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
              // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
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
                // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
              >
                Select top 3 Coins
              </Button>
            </div>
          <br/>
          <br/>
          </div>
          <br/>
          <br/>
          </div>    </>) : (null)}
          {/* <div className="assign-roles-div mt-20">
            <Button
              id="assign-role-button"
              variant="contained"
              className="role-button ml-auto"
              onClick={() =>
                 assignRoless()
              }
              // style={document.getElementsByClassName('coin-added-button').length !== 11?{background:"var(--grey-shade)"}:{}}
            >
              Select top 3 Coins
            </Button>
          </div> */}
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
          <span className="font-size-36 font-weight-700 mb-20 mt-20">
            Here is your team preview!
          </span>
          {/* <h3>Doesn't these big winnings look WOW? Ofcourse they do!</h3> */}
        </div>
        <TeamPreview superstarfilter={superstarfilter} mooningfilter={mooningfilter} rektfilter={rektfilter} />

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
