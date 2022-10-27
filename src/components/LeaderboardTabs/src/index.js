import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion/dist/framer-motion";
import { leaderboard } from "../../TournamentView/common/leaderboard";
import "../style/index.css";
import { useEffect, useState } from "react";
import {getLeaderboard, getPersonalLeaderboard, getRewardDetailsAPI} from "../../../APIS/apis";
import { useMoralis } from "react-moralis";
import {useNavigate} from "react-router-dom";

export default function LeaderBoardTabs({ tournamentId, tournamentStatus, tournamentPrizes, rewardSize }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const { user } = useMoralis();
  const userWalletAddress = user.attributes.ethAddress ? user.attributes.ethAddress : "";
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [personalLeaderBoard, setPersonalLeaderBoard] = useState([]);
  const [rewardsList, setRewardsList] = useState([]);
  const [prizes, setPrizes] = useState([]);
  let count = 0;
  let rewardUserCount = 0;
  useEffect(() => {
    async function getLeader() {
      const data = await getLeaderboard(tournamentId);
      setLeaderBoard(data);
    }
    async function getPersonalLeader() {
      const data = await getPersonalLeaderboard(tournamentId);
      setPersonalLeaderBoard(data);
    }
    async function getRewardsDetails() {
      const data = await getRewardDetailsAPI(tournamentId);
      setRewardsList(data);
    }
    getLeader();
    getPersonalLeader();
    getRewardsDetails();
    // async function getPrizes() {
    //   const data = await getLeaderboard(tournamentId);
    //   setLeaderBoard(data);
    // }
    // getPrizes();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(leaderBoard);
  console.log("rewardList", rewardsList);
  return (
    <Box sx={{ width: "100%", typography: "body1" }} id="win-dash-tabs">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Prizes" value="2" style={{ textTransform: "capitalize", fontFamily: "poppins" }} />
            <Tab label="Leader Board" value="1" style={{ textTransform: "capitalize", fontFamily: "poppins" }} />
          </TabList>
        </Box>
        <TabPanel value="2">
          <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10">
            <span className="mr-10">Rank</span>
            {tournamentStatus===3 && leaderBoard.length && <span className="ml-20">User</span>}
             {/*<span className='ml-auto'>Team</span> */}
            <span className="ml-auto">Prizes</span>
          </div>


          {/*// Show rewards when the Tournament is not completed*/}
          {tournamentStatus!==3 && leaderBoard.length!==0 &&
              [...Array(rewardSize>=leaderBoard.length ? leaderBoard.length : rewardSize ),].map((value, index) => {
                let leaderboardActive = tournamentStatus!==0 ? "leaderboard-active": "";
                return (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.1 * index }}
                        className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700 " + leaderboardActive}
                    >
                      <span className="leaderboard-points">{"  "}{index+1}</span>
                      <span className="ml-auto">{tournamentPrizes[index]}</span>
                    </motion.div>
                );
              })}


          {/*// Show rewards and winners when the Tournament is completed*/}
          {/*{tournamentStatus===3 && leaderBoard.length &&*/}
          {/*    [...Array(rewardSize>=leaderBoard.length ? leaderBoard.length : rewardSize ),].map((value, index) => {*/}
          {/*      if(leaderBoard[index].user.walletAddress === userWalletAddress) rewardUserCount++;*/}
          {/*      return (*/}
          {/*          <motion.div*/}
          {/*              initial={{ x: 400 }}*/}
          {/*              animate={{ x: 0 }}*/}
          {/*              transition={{ duration: 0.1 * index }}*/}
          {/*              className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700"}*/}
          {/*              onClick={()=>{*/}
          {/*                if(leaderBoard[index].user.walletAddress === userWalletAddress)*/}
          {/*                  navigate("/activity/team/currentStatus",  { state: { leaderBoardData: leaderBoard[index]} })*/}
          {/*              }*/}
          {/*              }*/}
          {/*          >*/}
          {/*            <span className="leaderboard-points">{"  "}{index+1}</span>*/}
          {/*            <span className={"leaderboard-username"}>*/}
          {/*              {leaderBoard.length && leaderBoard[index].user.username}{(!leaderBoard[index].team.length && leaderBoard[index].user.walletAddress === userWalletAddress) && <span>({rewardUserCount})</span>}*/}
          {/*            </span>*/}
          {/*            <span className="ml-auto">{tournamentPrizes[index]}</span>*/}
          {/*          </motion.div>*/}
          {/*      );*/}
          {/*    })}*/}

          {tournamentStatus===3 && rewardsList.length!==0 &&
              rewardsList.map((entry, index) => {
                if(entry.user.walletAddress === userWalletAddress){
                  rewardUserCount++;
                  return (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.1 * index }}
                        className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700"}
                        onClick={()=>{
                          navigate("/activity/team/currentStatus", { state: { leaderBoardData: entry} } )
                        }
                        }
                    >
                      <span className="mr-10">{"  "}{entry.rank}</span>
                      <span className={"leaderboard-username"}>
                        {localStorage.getItem("folioUsername")}  <span className={"teamCount"}>T{entry.user_team_count}</span>
                      </span>
                      <span className="ml-auto">{entry.amount_won}</span>
                    </motion.div>
                )}
              })}

          {/*// Show all points when tournament is closed*/}
          {tournamentStatus===3 && rewardsList.length!==0 &&
              rewardsList.map((entry, index) => {
                if(entry.user.walletAddress !== userWalletAddress)
                  return (
                      <motion.div
                          initial={{x: 400}}
                          animate={{x: 0}}
                          transition={{duration: 0.1 * index}}
                          className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10"}
                          onClick={() => {
                            navigate("/activity/team/currentStatus", {state: {leaderBoardData: entry}})
                          }
                          }
                      >
                        <span className="mr-10">{"  "}{entry.rank}</span>
                        <span className={"leaderboard-username"}>
                        {entry.user.username} <span className={"teamCount"}>T{entry.user_team_count}</span>
                        </span>
                        <span className="ml-auto">{entry.amount_won}</span>
                      </motion.div>
                  );
              })}




          {/*Leaderboard Section*/}

        </TabPanel>
        <TabPanel value="1">
          <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10">
            <span className="mr-10">Rank</span>
            <span className="ml-20">User</span>
            {/* <span className='ml-auto'>Team</span> */}
            <span className="ml-auto">Points</span>
          </div>


          {/*// Show only user points when tournament is not closed*/}

          {/*{tournamentStatus!==0 && personalLeaderBoard.length &&*/}
          {/*    personalLeaderBoard.map((entry, index) => {*/}
          {/*      count++;*/}
          {/*      return (*/}
          {/*          <motion.div*/}
          {/*              initial={{ x: 400 }}*/}
          {/*              animate={{ x: 0 }}*/}
          {/*              transition={{ duration: 0.1 * index }}*/}
          {/*              className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700"}*/}
          {/*              onClick={()=>{*/}
          {/*                const teamData = leaderBoard.find(obj => obj.team.name=== entry.team.name)*/}
          {/*                navigate("/activity/team/currentStatus", { state: { leaderBoardData: teamData} } )*/}
          {/*              }*/}
          {/*              }*/}
          {/*          >*/}
          {/*            <span className="mr-10">{"  "}{entry.rank}</span>*/}
          {/*            <span className={"leaderboard-username"}>*/}
          {/*          {localStorage.getItem("folioUsername")} {personalLeaderBoard.length>1 && (count)}*/}
          {/*        </span>*/}
          {/*            <span className="ml-auto">{entry.portfolio}</span>*/}
          {/*          </motion.div>*/}
          {/*      );*/}
          {/*    })}*/}

          {tournamentStatus===0 && leaderBoard.length!==0 &&
              leaderBoard.map((entry, index) => {
                const userEntry = (entry.user.walletAddress === userWalletAddress) ? " font-weight-700" : "";
                if(entry.user.walletAddress === userWalletAddress)
                return (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.1 * index }}
                        className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10" + userEntry}
                        onClick={()=>{
                          if(entry.user.walletAddress === userWalletAddress)
                            navigate("/activity/team/currentStatus", { state: { leaderBoardData: entry} } )
                        }
                        }
                    >
                      <span className="leaderboard-points">{"  "}1</span>
                      <span className={"leaderboard-username"}>
                        {entry.user.username} <span className={"teamCount"}>T{entry.user_team_count}</span>
                  </span>
                      <span className="ml-auto">{entry.portfolio}</span>
                    </motion.div>
                );
              })}

          {tournamentStatus===0 && leaderBoard.length!==0 &&
              leaderBoard.map((entry, index) => {
                const userEntry = (entry.user.walletAddress === userWalletAddress) ? " font-weight-700" : "";
                if(entry.user.walletAddress !== userWalletAddress)
                  return (
                      <motion.div
                          initial={{ x: 400 }}
                          animate={{ x: 0 }}
                          transition={{ duration: 0.1 * index }}
                          className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10" + userEntry}
                          onClick={()=>{
                            if(entry.user.walletAddress === userWalletAddress)
                              navigate("/activity/team/currentStatus", { state: { leaderBoardData: entry} } )
                          }
                          }
                      >
                        <span className="leaderboard-points">{"  "}1</span>
                        <span className={"leaderboard-username"}>
                        {entry.user.username} <span className={"teamCount"}>T{entry.user_team_count}</span>
                  </span>
                        <span className="ml-auto">{entry.portfolio}</span>
                      </motion.div>
                  );
              })}

          {/*Show personal points when tournament is ended*/}
          {tournamentStatus!==0 && personalLeaderBoard.length!==0 &&
              personalLeaderBoard.map((entry, index) => {
                return (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.1 * index }}
                        className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700"}
                        onClick={()=>{
                          const teamData = leaderBoard.find(obj => obj.team.name=== entry.team.name)
                          navigate("/activity/team/currentStatus", { state: { leaderBoardData: teamData} } )
                        }
                        }
                    >
                      <span className="mr-10">{"  "}{entry.rank}</span>
                      <span className={"leaderboard-username"}>
                        {localStorage.getItem("folioUsername")} <span className={"teamCount"}>T{entry.user_team_count}</span>
                      </span>
                      <span className="ml-auto">{entry.portfolio}</span>
                    </motion.div>
                );
              })}

          {/*// Show all points when tournament is closed*/}
          {tournamentStatus!==0 && leaderBoard.length!==0 &&
            leaderBoard.map((entry, index) => {
              if(entry.user.walletAddress !== userWalletAddress)
                return (
                    <motion.div
                        initial={{x: 400}}
                        animate={{x: 0}}
                        transition={{duration: 0.1 * index}}
                        className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10"}
                        onClick={() => {
                          navigate("/activity/team/currentStatus", {state: {leaderBoardData: entry}})
                        }
                        }
                    >
                      <span className="mr-10">{"  "}{ entry.rank }</span>
                        <span className={"leaderboard-username"}>
                        {entry.user.username} <span className={"teamCount"}>T{entry.user_team_count}</span>
                        </span>
                      <span className="ml-auto">{entry.portfolio}</span>
                    </motion.div>
              );
            })}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
