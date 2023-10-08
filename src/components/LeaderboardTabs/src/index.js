import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion/dist/framer-motion";
import { leaderboard } from "../../TournamentView/common/leaderboard";
import { Button } from "@mui/material";
import "../style/index.css";
import RefreshIcon from "../../../images/RefreshIcon.png"
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import {
  getLeaderboard,
  getPersonalLeaderboard,
  getRewardDetailsAPI,
} from "../../../APIS/apis";
// import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { SubscriptionsOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import LeaderBoardSlice, {
  getLeaderboardAsync,
  getPersonalLeaderBoardAsync,
  getWinnersAsync
} from "../../../Redux/LeaderBoard/LeaderBoardSlice";

export default function LeaderBoardTabs({
  tournamentId,
  tournamentStatus,
  tournamentPrizes,
  rewardSize,
  tournament
}) {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoding] = useState("");
  const [value, setValue] = React.useState("3");
  const [user, setUser] = useState("");
  // const { user } = useMoralis();


  const showLoding = async () => {
    setLoding(true);

    setTimeout(() => {
      setLoding(false);
    }, 500);
  }
  const localStoritems = async () => {
    const userwallet = await localStorage.getItem("walletAddress");
    setUser(userwallet);
  }

  const userWalletAddress = user
    ? user
    : "";
  // const [leaderBoard, setLeaderBoard] = useState([]);
  const [personalLeaderBoard, setPersonalLeaderBoard] = useState([]);
  const [rewardsList, setRewardsList] = useState([]);
  const [prizes, setPrizes] = useState([]);
  let count = 0;
  let rewardUserCount = 0;


  const getLeaderBoardRedux = useSelector((state) => state.LeaderBoardSlice.leaderBoard);
  const getPersonalLeaderBoardRedux = useSelector((state) => state.LeaderBoardSlice.personalLeaderboard);

  useEffect(() => {
    localStoritems();
    console.log("tournament prop passed")
    console.log(tournament);
    dispatch(getLeaderboardAsync(tournamentId));
    dispatch(getPersonalLeaderBoardAsync(tournamentId));
    async function getPersonalLeader() {
      const data = await getPersonalLeaderboard(tournamentId);
      setPersonalLeaderBoard(data);
    }
    async function getRewardsDetails() {
      const data = await getRewardDetailsAPI(tournamentId);
      setRewardsList(data);
    }
    getPersonalLeader();
    getRewardsDetails();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var updatedPrizes = {};
  var amounts = [];
  var reversePrizes = {};
  var left = 0, right = 0;
  while (right < tournamentPrizes.length) {
    while (right < tournamentPrizes.length && tournamentPrizes[left] == tournamentPrizes[right]) {
      right++;
    }
    amounts.push(tournamentPrizes[left]);
    if (right - left > 1) {
      left++;
      reversePrizes[tournamentPrizes[left - 1]] = left + '-' + right;
      left--;
    } else {
      left++;
      reversePrizes[tournamentPrizes[left - 1]] = left;
      left--;
    }
    left = right;
  }
  amounts = amounts.sort(function (a, b) {
    return b - a;
  });

  const startTime = tournament ? new Date(tournament.start_time) : undefined;
  const endTime = tournament ? new Date(tournament.end_time) : undefined;

  const monthNamesArray = [
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

  //  Cancelled Tournament Data
  const TournamentCancelledData = [{
    id: 1,
    Title: "Tournament Name",
    Value: tournament.name
  },
  {
    id: 2,
    Title: "Tournament Status",
    Value: "Cancelled"
  },
  {
    id: 3,
    Title: "Start Time",
    Value: <div>{startTime.getDate()} {monthNames[startTime.getMonth()]}'
      {startTime.getFullYear() % 100} {" "} | {startTime.getHours() / 10 < 1
        ? "0" + startTime.getHours()
        : startTime.getHours()}
      :
      {startTime.getMinutes() / 10 < 1
        ? "0" + startTime.getMinutes()
        : startTime.getMinutes()}{" "}GMT</div>

  },
  {
    id: 4,
    Title: "End Time",
    Value: <div>{endTime.getDate()} {monthNames[endTime.getMonth()]}'
      {endTime.getFullYear() % 100} {" "} | {endTime.getHours() / 10 < 1
        ? "0" + endTime.getHours()
        : endTime.getHours()}
      :
      {endTime.getMinutes() / 10 < 1
        ? "0" + endTime.getMinutes()
        : endTime.getMinutes()}{" "}GMT</div>

  }

  ]

  const TournamentInfoData = [{
    id: 1,
    Title: "Tournament Name",
    Value: tournament.name
  },
  {
    id: 2,
    Title: "Tournament Status",
    Value: <>
      {tournament.status === 0 && "Open"}
      {tournament.status === 1 && "Closed"}
      {tournament.status === 2 && "Running"}
      {tournament.status === 3 && "Completed"}
    </>
  },
  {
    id: 3,
    Title: "Start Time",
    Value: <div>{startTime.getDate()} {monthNames[startTime.getMonth()]}'
      {startTime.getFullYear() % 100} {" "} | {startTime.getHours() / 10 < 1
        ? "0" + startTime.getHours()
        : startTime.getHours()}
      :
      {startTime.getMinutes() / 10 < 1
        ? "0" + startTime.getMinutes()
        : startTime.getMinutes()}{" "}GMT</div>

  },
  {
    id: 4,
    Title: "End Time",
    Value: <div>{endTime.getDate()} {monthNames[endTime.getMonth()]}'
      {endTime.getFullYear() % 100} {" "} | {endTime.getHours() / 10 < 1
        ? "0" + endTime.getHours()
        : endTime.getHours()}
      :
      {endTime.getMinutes() / 10 < 1
        ? "0" + endTime.getMinutes()
        : endTime.getMinutes()}{" "}GMT</div>

  },
  {
    id: 5,
    Title: <>
      {tournament.status === 0 && "Registration Closing"}
      {tournament.status === 1 || tournament.status === 2 || tournament.status === 3 && "Registration Closed"}

    </>,
    Value: <div>{startTime.getDate()} {monthNames[startTime.getMonth()]}'
      {startTime.getFullYear() % 100} {" "} | {startTime.getHours() / 10 < 1
        ? "0" + startTime.getHours()
        : startTime.getHours()}
      :
      {startTime.getMinutes() / 10 < 1
        ? "0" + startTime.getMinutes()
        : startTime.getMinutes() - 1}{" "}GMT</div>
  },
  {
    id: 6,
    Title: "Prize Money",
    Value: tournament.rewards.prize_pool
  },
  {
    id: 7,
    Title: "Places Paid",
    Value: tournament.rewards.places_paid

  },
  {
    id: 8,
    Title: "Minimum Entries",
    Value: tournament.status
  },
  {
    id: 9,
    Title: "Spots Filled",
    Value: tournament.filled_spots
  },
  {
    id: 10,
    Title: "Current Prize Pool",
    Value: tournament.rewardsprize_pool
  },

  ]


  return (
    <Box sx={{ width: "100%", typography: "body1" }} id="win-dash-tabs">
      <TabContext value={value}>
        <Box className={"tournamentView__leaderboardTabsStyle"} sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ width: "100%" }}>
            <Tab
              label="Tournament Info"
              value="3"
              style={{ textTransform: "capitalize", fontFamily: "poppins", maxWidth: window.innerWidth <= 420 ? "30vw" : "" }}
             

            />
            <Tab
              label="Prizes"
              value="1"
              style={{ textTransform: "capitalize", fontFamily: "poppins" }}
            />
            <Tab
              label="Leader Board"
              value="2"
              style={{ textTransform: "capitalize", fontFamily: "poppins" }}
            />

            <span className={"refreshLeaderboard"} style={{ marginLeft: "auto", marginRight: "20px" }}>
              {/* <RefreshIcon /> */}
              <Button
                style={{ color: "var(--grey-shade)", textTransform: "capitalize" }}
                onClick={() => {
                  showLoding();
                  dispatch(getLeaderboardAsync(tournamentId));
                  dispatch(getWinnersAsync(tournamentId));
                  dispatch(getPersonalLeaderBoardAsync(tournamentId));
                }}><img src={RefreshIcon} alt="refresh" style={{ width: "42%" }} /></Button>
            </span>
          </TabList>
        </Box>
        {/*  Progress Bar for Leaderboard & Prizes panel */}
        {loading &&
          <TabPanel value="1">
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "25%", width: "100%" }}>   <CircularProgress />
              </Box>
            </Box>
          </TabPanel>}
        {loading &&
          <TabPanel value="2" >
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "25%", width: "100%" }}>   <CircularProgress />
              </Box>
            </Box>
          </TabPanel>}
        {loading &&
          <TabPanel value="3" >
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "25%", width: "100%" }}>   <CircularProgress />
              </Box>
            </Box>
          </TabPanel>}



        {!getWinnersAsync && !loading &&
          <TabPanel value="1">
            No Data

            {/*// Show rewards when the Tournament is not completed*/}
            {tournamentStatus !== 3 &&
              amounts.map((value, index) => {
                let leaderboardActive = tournamentStatus !== 0 ? "leaderboard-active" : "";
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700 " + leaderboardActive}
                  >
                    <span className="leaderboard-points">{"  "}{reversePrizes[value]}</span>
                    <span className="ml-auto">{value}</span>
                  </motion.div>
                );
              })}

            {tournamentStatus === 3 &&
              rewardsList.length !== 0 &&
              rewardsList.map((entry, index) => {
                if (entry.user.walletAddress === userWalletAddress) {
                  rewardUserCount++;
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={
                        "leaderboard-entry pointer-available ml-auto mr-auto mb-20 pb-10 font-weight-700"
                      }
                      onClick={() => {
                        navigate("/activity/team/currentStatus", {
                          state: {
                            leaderBoardData: entry,
                            tournament_id: entry.tournamentId,
                          },
                        });
                      }}
                    >
                      <div className={"leaderboard-Main-Controller"} >
                        <div className={"leaderboard-Main-Controller-Rank"} >
                          {entry.rank}
                        </div>
                        <div className={"leaderboard-Main-Controller-UserName"}>
                          {localStorage.getItem("folioUsername")}{" "}
                        </div>
                        <div className={"leaderboard-Main-Controller-TeamCount"} >
                          <div className={"teamCounttemp"} style={{ maxWidth: "30%", width: "auto" }}>
                            T{entry.user_team_count}
                          </div>
                        </div>
                        <div className={"leaderboard-Main-Controller-Porfolio"} >
                          {entry.amount_won} FPC
                        </div>

                      </div>
                    </motion.div>
                  );
                }
              })}

            {/*// Show all points when tournament is closed*/}
            {tournamentStatus === 3 &&
              rewardsList.length !== 0 &&
              rewardsList.map((entry, index) => {
                if (entry.user.walletAddress !== userWalletAddress)
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={
                        "leaderboard-entry pointer-available ml-auto mr-auto mb-20 pb-10"
                      }
                      onClick={() => {
                        navigate("/activity/team/currentStatus", {
                          state: {
                            leaderBoardData: entry,
                            tournament_id: entry.tournamentId,
                          },
                        });
                      }}
                    >
                      <div className={"leaderboard-Main-Controller"} >
                        <div className={"leaderboard-Main-Controller-Rank"} >
                          {entry.rank}
                        </div>
                        <div className={"leaderboard-Main-Controller-UserName"}>
                          {entry.user.username}{" "}
                        </div>
                        <div className={"leaderboard-Main-Controller-TeamCount"} >
                          <div className={"teamCounttemp"} style={{ maxWidth: "30%", width: "auto" }}>
                            T{entry.user_team_count}
                          </div>
                        </div>
                        <div className={"leaderboard-Main-Controller-Porfolio"} >
                          {entry.amount_won} FPC
                        </div>
                      </div>
                    </motion.div>
                  );
              })}



            {/*Leaderboard Section*/}
          </TabPanel>}

        {getWinnersAsync && !loading &&
          <TabPanel value="1">
            <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10" style={{ display: "flex", maxWidth: "100%", width: "100%", textAlign: "start" }}>
              <div style={{ maxWidth: "15%", width: "100%" }}>Rank</div>

              {tournamentStatus === 3 && getLeaderBoardRedux.length && (
                <div style={{ maxWidth: "35%", width: "100%", textAlign: "start" }}>User</div>
              )}
              {/*<span className='ml-auto'>Team</span> */}
              <div style={{ maxWidth: "25%", width: "100%" }}></div>

              {tournamentStatus === 3 && getLeaderBoardRedux.length ? (<div style={{ maxWidth: "25%", width: "100%", textAlign: "end" }}>Prizes</div>) : (
                <div style={{ maxWidth: "60%", width: "100%", textAlign: "end" }}>Prizes</div>
              )

              }

            </div>

            {/*// Show rewards when the Tournament is not completed*/}
            {tournamentStatus !== 3 &&
              amounts.map((value, index) => {
                let leaderboardActive = tournamentStatus !== 0 ? "leaderboard-active" : "";
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700 " + leaderboardActive}
                  >
                    <span className="leaderboard-points" >{"  "}{reversePrizes[value]}</span>
                    <span className="ml-auto">{value}</span>
                  </motion.div>
                );
              })}

            {tournamentStatus === 3 &&
              rewardsList.length !== 0 &&
              rewardsList.map((entry, index) => {
                if (entry.user.walletAddress === userWalletAddress) {
                  rewardUserCount++;
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={
                        "leaderboard-entry pointer-available ml-auto mr-auto mb-20 pb-10 font-weight-700"
                      }
                      onClick={() => {
                        navigate("/activity/team/currentStatus", {
                          state: {
                            leaderBoardData: entry,
                            tournament_id: entry.tournamentId,
                          },
                        });
                      }}
                    >
                      <div className={"leaderboard-Main-Controller"} >
                        <div className={"leaderboard-Main-Controller-Rank"} >
                          {entry.rank}
                        </div>
                        <div style={{maxWidth:"60%",display:"flex",width:"100%"}}>
                        <div className={"leaderboard-Main-Controller-UserName"}>
                          {localStorage.getItem("folioUsername")}{" "}
                        </div>
                        <div className={"leaderboard-Main-Controller-TeamCount"} >
                          <div className={"teamCounttemp"} style={{ maxWidth: "100%", width: "auto" }}>
                            T{entry.user_team_count}
                          
                          </div>
                          </div>
                        </div>
                        <div className={"leaderboard-Main-Controller-Porfolio"} >
                          {entry.amount_won} FPC
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              })}

            {/*// Show all points when tournament is closed*/}
            {tournamentStatus === 3 &&
              rewardsList.length !== 0 &&
              rewardsList.map((entry, index) => {
                if (entry.user.walletAddress !== userWalletAddress)
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={
                        "leaderboard-entry pointer-available ml-auto mr-auto mb-20 pb-10"
                      }
                      onClick={() => {
                        navigate("/activity/team/currentStatus", {
                          state: {
                            leaderBoardData: entry,
                            tournament_id: entry.tournamentId,
                          },
                        });
                      }}
                    >

                      <div className={"leaderboard-Main-Controller"} >
                        <div className={"leaderboard-Main-Controller-Rank"} >
                          {entry.rank}
                        </div>
                        <div className={"leaderboard-Main-Controller-UserName"}>
                          {entry.user.username}{" "}
                        </div>
                        <div className={"leaderboard-Main-Controller-TeamCount"} >
                          <div className={"teamCounttemp"} style={{ maxWidth: "30%", width: "auto" }}>
                            T{entry.user_team_count}
                          </div>
                        </div>
                        <div className={"leaderboard-Main-Controller-Porfolio"} >
                          {entry.amount_won} FPC
                        </div>
                      </div>
                    </motion.div>
                  );
              })}



            {/*Leaderboard Section*/}
          </TabPanel>}
        {/*  Tab Panel Value 2 started */}

        {getWinnersAsync && !loading && <TabPanel value="2">

          {tournamentStatus === 0 || tournamentStatus === 1 ? (<>
            <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10" style={{ display: "flex", maxWidth: "100%", width: "100%", textAlign: "start" }}>

              <div style={{ maxWidth: "50%", width: "100%", textAlign: "start", padding: "0 0px 0px 20px" }}>User</div>
              <div style={{ maxWidth: "25%", width: "100%" }}></div>
              <div style={{ maxWidth: "25%", width: "100%", textAlign: "end", padding: "0 3px 0px" }}>Points</div>
              {/* <span className='ml-auto'>Team</span> */}

            </div></>) : (<>
              <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10" style={{ display: "flex", maxWidth: "100%", width: "100%", textAlign: "start" }}>
                <div style={{ maxWidth: "15%", width: "100%" }}>Rank</div>
                <div style={{ maxWidth: "35%", width: "100%", textAlign: "start" }}>User</div>
                <div style={{ maxWidth: "25%", width: "100%" }}></div>
                <div style={{ maxWidth: "25%", width: "100%" }}>Points</div>
                {/* <span className='ml-auto'>Team</span> */}

              </div></>)

          }

          {tournamentStatus === 0 &&
            getLeaderBoardRedux.length !== 0 &&
            getLeaderBoardRedux.map((entry, index) => {
              if (entry.user.walletAddress === userWalletAddress)
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={
                      "leaderboard-entry pointer-available ml-auto mr-auto mb-20 pb-10 font-weight-700"
                    }
                    onClick={() => {
                      if (entry.user.walletAddress === userWalletAddress)
                        navigate("/activity/team/currentStatus", {
                          state: {
                            leaderBoardData: entry,
                            tournament_id: tournamentId,
                          },
                        });
                    }}
                  >
                    <span className="leaderboard-points">{"  "}-</span>
                    <span className={"leaderboard-username"}>
                      {entry.user.username}{" "}
                      <span className={"teamCount"}>
                        T{entry.user_team_count}
                      </span>
                    </span>
                    <span className="ml-auto">{entry.portfolio}</span>
                  </motion.div>
                );
            })}

          {tournamentStatus === 0 &&
            getLeaderBoardRedux.length !== 0 &&
            getLeaderBoardRedux.map((entry, index) => {
              if (entry.user.walletAddress !== userWalletAddress)
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10"}
                  >
                    <span className="leaderboard-points">{"  "}-</span>
                    <span className={"leaderboard-username"}>
                      {entry.user.username}{" "}
                      <span className={"teamCount"}>
                        T{entry.user_team_count}
                      </span>
                    </span>
                    <span className="ml-auto">{entry.portfolio}</span>
                  </motion.div>
                );
            })}

          {/*Show personal points when tournament is ended*/}
          {tournamentStatus !== 0 &&
            getPersonalLeaderBoardRedux.length !== 0 &&
            getPersonalLeaderBoardRedux.map((entry, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={
                    "leaderboard-entry pointer-available ml-auto mr-auto mb-20 pb-10 font-weight-700"
                  }
                  onClick={() => {
                    const teamData = getLeaderBoardRedux.find(
                      (obj) => obj.team.name === entry.team.name
                    );
                    navigate("/activity/team/currentStatus", {
                      state: {
                        leaderBoardData: teamData,
                        tournament_id: tournamentId,
                      },
                    });
                  }}
                >
                  <div className={"leaderboard-Main-Controller"} >
                    <div className={"leaderboard-Main-Controller-Rank"} >
                      {entry.rank}
                    </div>
                    <div style={{maxWidth:"60%",width:"100%",display:"flex"}}>
                    <div className={"leaderboard-Main-Controller-UserName"}>
                      {localStorage.getItem("folioUsername")}{" "}
                    </div>
                    <div className={"leaderboard-Main-Controller-TeamCount"} >
                      <div className={"teamCounttemp"} style={{ maxWidth: "30%", width: "100%" }}>
                        J{entry.user_team_count}
                      </div>
                    </div>
                    </div>
                    <div className={"leaderboard-Main-Controller-Porfolio"} >
                      {entry.portfolio}
                    </div>
                  </div>

                </motion.div>
              );
            })}

          {/*// Show all points when tournament is closed*/}
          {tournamentStatus !== 0 &&
            getLeaderBoardRedux.length !== 0 &&
            getLeaderBoardRedux.map((entry, index) => {
              if (entry.user.walletAddress !== userWalletAddress)
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={
                      "leaderboard-entry pointer-available ml-auto mr-auto mb-20 pb-10"
                    }
                    onClick={() => {
                      navigate("/activity/team/currentStatus", {
                        state: {
                          leaderBoardData: entry,
                          tournament_id: entry.tournamentId,
                        },
                      });
                    }}
                    style={{ display: "flex", maxWidth: "100%", width: "100%", textAlign: "start" }}
                  >

                    <div className={"leaderboard-Main-Controller"} >
                      <div className={"leaderboard-Main-Controller-Rank"} >
                        {entry.rank}
                      </div>
                      <div style={{maxWidth:"60%",width:"100%",display:"flex"}}>
                      <div className={"leaderboard-Main-Controller-UserName"}>
                        {entry.user.username}{" "}
                      </div>
                      
                      <div className={"leaderboard-Main-Controller-TeamCount"} >
                        <div className={"teamCounttemp"} style={{ maxWidth: "30%", width: "auto" }}>
                          T{entry.user_team_count}
                        </div>
                      </div>
                      </div>
                      <div className={"leaderboard-Main-Controller-Porfolio"} >
                        {entry.portfolio}
                      </div>
                    </div>
                  </motion.div>
                );
            })}
        </TabPanel>}

        {getWinnersAsync && !loading && <TabPanel value="3">
          <>

            {/* <div className={"leaderboard-Main-Controller"} >
                    <div className={"leaderboard-Main-Controller-Rank"} >
                    1
                    </div>
                    <div className={"leaderboard-Main-Controller-UserName"}>
                      TOurnament Name
                    </div>
                    <div  className={"leaderboard-Main-Controller-TeamCount"} >
                   <div className={"teamCounttemp"} style={{ maxWidth:"30%",width:"auto"}}>
                 
                   </div>
                    </div>
                    <div className={"leaderboard-Main-Controller-Porfolio"} >
                    {tournament.name}
                    </div>
                  </div> */}
            {tournament.status === -2 ? (<>

              {TournamentCancelledData.map((tourna) => (
                <div className={"leaderboard-Main-Controller-Tab3"} key={tourna.id} mb-20 pb-10 >

                  <div style={{ maxWidth: "47%", width: "100%", color: "rgba(0, 0, 0, 0.6)" }}>
                    {tourna.Title}
                  </div>

                  <div style={{ maxWidth: "3%", width: "100%" }}>

                  </div>

                  <div style={{ maxWidth: "50%", width: "100%", textAlign: "start" }} >
                    {tourna.Value}
                  </div>

                </div>
              ))}
            </>) : (<>
              {TournamentInfoData.map((tourna) => (
                <div className={"leaderboard-Main-Controller-Tab3"} key={tourna.id} mb-20 pb-10 >

                  <div style={{ maxWidth: "47%", width: "100%", color: "rgba(0, 0, 0, 0.6)" }}>
                    {tourna.Title}
                  </div>

                  <div style={{ maxWidth: "3%", width: "100%" }}>

                  </div>

                  <div style={{ maxWidth: "50%", width: "100%", textAlign: "start" }} >
                    {tourna.Value}
                  </div>                 

                </div>
              ))}
              <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10" style={{ display: "flex", maxWidth: "100%", width: "100%", textAlign: "start" }}>
              <div style={{ maxWidth: "15%", width: "100%" ,color:"rgba(0, 0, 0, 0.6)"}}>Rank</div>

              {/*<span className='ml-auto'>Team</span> */}
              <div style={{ maxWidth: "25%", width: "100%" }}></div>

             <div style={{ maxWidth: "60%", width: "100%", textAlign: "end" }}>Prizes</div>             
            </div>
            {tournamentStatus !== "-2" &&
              amounts.map((value, index) => {
                let leaderboardActive = tournamentStatus !== 0 ? "leaderboard-active" : "";
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700 " + leaderboardActive}
                  >
                    <span className="leaderboard-points" style={{color:"rgba(0, 0, 0, 0.6)"}} >{"  "}{reversePrizes[value]}</span>
                    <span className="ml-auto">{value}</span>
                  </motion.div>
                );
              })}
            </>)}





          </>


        </TabPanel>}


      </TabContext>
    </Box>
  );
}