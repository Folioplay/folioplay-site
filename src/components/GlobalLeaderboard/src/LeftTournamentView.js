import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useMoralis } from "react-moralis";
import { scrollTo } from "../../../CommonFunctions/functions.js";
import {
  getAllUserTeams,
  getAmountWon,
  getRank,
  getTournamentById,
} from "../../../APIS/apis";
import ReactLoading from "react-loading";
import TimerIcon from "@mui/icons-material/Timer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, LinearProgress } from "@mui/material";
import { chooseTeamOpen } from "../common/chooseTeamAnimations";
import LeaderBoardTabs from "../../LeaderboardTabs/src";
import Countdown from "react-countdown";
import JoinTournamentDrawer from "../../JoinTournamentDrawer/src";
import Snackbar from "@mui/material/Snackbar";
import { motion } from "framer-motion/dist/framer-motion";
import { SERVER } from "../../../APIS/apis";
import selectTeam from "../common/selectTeam";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeaderboardAsync,
  getWinnersAsync,
  getTournamentByIdAsync
} from "../../../Redux/LeaderBoard/LeaderBoardSlice";
import folioPlayLogo from "../../../images/folioplay-manifest.jpg"
const LeftTournamentView = () => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
 
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const dispatch = useDispatch();
  var navigate = useNavigate();

  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState("");

  const localStoritems = async () => {
    const userr = await localStorage.getItem("user");
    await setUser(userr);
    const isLoggedIn = await localStorage.getItem("isLoggedIn");
    await setIsAuthenticated(isLoggedIn);
  }
  // const { user } = useMoralis();
  const { state } = useLocation();
  // let account = user.get("ethAddress");
  const [balance, setBalance] = useState("");
  const [balanceSnackOpen, setBalanceSnackOpen] = useState(false);
  const [errorMessageSnackOpen, setErrorMessageSnackOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    variant: "error",
  });
  // const [tournament, setTournament] = useState(undefined);
  // const tournament = useSelector((state)=>state.LeaderBoardSlice.leaderBoard);
  const [amountWon, setAmountWon] = useState(0);
  const [rank, setRank] = useState(undefined);
  const params = useParams();
  const _id = params.tournamentId;
  const [teams, setTeams] = useState(undefined);
  const [userImg, setUserImg] = useState(null);
  const defaultImage = require("../../../images/profilepic.jpeg").default;
  var seatsFilled = 0;
  const getPresentUser = async () => {
    const authToken = localStorage.getItem("authtoken");
    const res = await fetch(`${SERVER}/user`, {
      method: "GET",
      headers: {
        "x-access-token": authToken,
      },
    }).then((res) => res.json());
    // setPresentUser(res);
    if (res.imageURL) setUserImg(res.imageURL);
    else setUserImg(defaultImage);
  };
  async function fetchTournament() {
  //  await setTournament(await getTournamentById({ _id: _id }));
 await  dispatch(getTournamentByIdAsync(_id));

  }
  async function fetchAmountWon() {
    setAmountWon(await getAmountWon({ _id: _id }));
    await console.log("ammounttt from line 118");
   await console.log(await getAmountWon({ _id: _id }));
  }

  async function fetchTeams() {
    setTeams(await getAllUserTeams());

  }
  async function fetchRank() {
    const data = await getRank({ tournamentId: _id });
    setRank(data);
    await console.log("rank data")
    await console.log(data)
  }
  useEffect(() => {

    localStoritems();
 
    
  }, []);

const loading =true;

  return (
    <div className="fullpage">
    
        {/* <div className="loading-component">
          <ReactLoading type={"spin"} color="var(--white)" />{" "}
        </div> */}
    
        {!loading ? (<>
        <div className="loginverfiyPageBlink">
<img src={folioPlayLogo} alt="folioplayLogo" className="bli"/>
        </div>
        </>):( <div className="tournament-view-bar">
            <ArrowBackIosIcon
              fontSize="medium"
              className="go-back-button"
              onClick={() => navigate("/tournaments", {})}
            />
           
          </div>)}
         
         
        

          </div>     
  
  );
};

export default LeftTournamentView;
