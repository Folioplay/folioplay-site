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
import {getLeaderboard, getPersonalLeaderboard} from "../../../APIS/apis";
import { useMoralis } from "react-moralis";
import {useNavigate} from "react-router-dom";

export default function LeaderBoardTabs({ tournamentId, tournamentStatus, tournamentPrizes, rewardSize }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const { user } = useMoralis();
  const userWalletAddress = user.attributes.ethAddress ? user.attributes.ethAddress : "";
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [personalLeaderBoard, setPersonalLeaderBoard] = useState([]);
  const [prizes, setPrizes] = useState([]);
  useEffect(() => {
    async function getLeader() {
      const data = await getLeaderboard(tournamentId);
      setLeaderBoard(data);
    }
    async function getPersonalLeader() {
      const data = await getPersonalLeaderboard(tournamentId);
      setPersonalLeaderBoard(data);
    }
    getLeader();
    getPersonalLeader();
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
            <span className="ml-20">User</span>
            {/* <span className='ml-auto'>Team</span> */}
            <span className="ml-auto">{tournamentStatus!==3 ? <>Points</>: <>Prizes</>}</span>
          </div>
          {tournamentStatus!==3 && personalLeaderBoard.length &&
              personalLeaderBoard.map((entry, index) => {
                // const userEntry = (entry.user.walletAddress === userWalletAddress) ? " font-weight-700" : "";
                // console.log("entry", entry.team.id);
                return (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.1 * index }}
                        className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700"}
                        onClick={()=>{
                          if(tournamentStatus===3 || tournamentStatus===2){
                            navigate("/activity/team/" + entry.id)
                          }
                        }
                        }
                    >
                      <span className="mr-10">{"  "}{entry.rank}</span>
                      {/* <div className="leaderboard-profile-image"></div> */}
                      <span className={"leaderboard-username ml-20"}>
                    {localStorage.getItem("folioUsername")}
                        {/* {entry.user.walletAddress.substring(0, 6)}****{entry.user.walletAddress.substring(entry.user.walletAddress.length - 4)} */}
                  </span>
                      {/* <span className='leaderboard-teamname ml-auto'>{entry.team_name}</span> */}
                      <span className="ml-auto">{entry.portfolio}</span>
                    </motion.div>
                );
              })}
          {tournamentStatus===3 && personalLeaderBoard.length &&
              [...Array(rewardSize),].map((value, index) => {
                // const userEntry = (entry.user.walletAddress === userWalletAddress) ? " font-weight-700" : "";
                // console.log("entry", entry.team.id);
                console.log(leaderBoard[index]);
                return (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.1 * index }}
                        className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700"}
                        onClick={()=>{
                          if(tournamentStatus===3 || tournamentStatus===2){
                            navigate("/activity/team/" + leaderBoard[index].team.id)
                          }
                        }
                        }
                    >
                      <span className="mr-10">{"  "}{index+1}</span>
                      {/* <div className="leaderboard-profile-image"></div> */}
                      <span className={"leaderboard-username ml-20"}>
                        {leaderBoard.length && leaderBoard[index].user.username}
                        {/* {entry.user.walletAddress.substring(0, 6)}****{entry.user.walletAddress.substring(entry.user.walletAddress.length - 4)} */}
                  </span>
                      {/* <span className='leaderboard-teamname ml-auto'>{entry.team_name}</span> */}
                      <span className="ml-auto">{tournamentPrizes[index]}</span>
                    </motion.div>
                );
              })}

        </TabPanel>
        <TabPanel value="1">
          <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10">
            <span className="mr-10">Rank</span>
            <span className="ml-20">User</span>
            {/* <span className='ml-auto'>Team</span> */}
            <span className="ml-auto">Points</span>
          </div>
          {personalLeaderBoard.length &&
              personalLeaderBoard.map((entry, index) => {
                // const userEntry = (entry.user.walletAddress === userWalletAddress) ? " font-weight-700" : "";
                // console.log("entry", entry.team.id);
                return (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.1 * index }}
                        className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10 font-weight-700"}
                        onClick={()=>{
                          if(tournamentStatus===3 || tournamentStatus===2){
                            navigate("/activity/team/" + entry.id)
                          }
                        }
                        }
                    >
                      <span className="mr-10">{  }{entry.rank}</span>
                      {/* <div className="leaderboard-profile-image"></div> */}
                      <span className={"leaderboard-username ml-20"}>
                    {localStorage.getItem("folioUsername")}
                        {/* {entry.user.walletAddress.substring(0, 6)}****{entry.user.walletAddress.substring(entry.user.walletAddress.length - 4)} */}
                  </span>
                      {/* <span className='leaderboard-teamname ml-auto'>{entry.team_name}</span> */}
                      <span className="ml-auto">{entry.portfolio}</span>
                    </motion.div>
                );
              })}
          {leaderBoard.length &&
            leaderBoard.map((entry, index) => {
              const userEntry = (entry.user.walletAddress === userWalletAddress) ? " font-weight-700" : "";
              console.log("entry", entry.team.id);
                return (
                <motion.div
                  initial={{ x: 400 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.1 * index }}
                  className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10" + userEntry}
                  onClick={()=>{
                    if(tournamentStatus===3 || tournamentStatus===2){
                      navigate("/activity/team/" + entry.team.id)
                    }
                  }
                  }
                >
                  <span className="mr-10">{"  "}{index + 1}</span>
                  {/* <div className="leaderboard-profile-image"></div> */}
                  <span className={"leaderboard-username ml-20"}>
                    {entry.user.username}
                    {/* {entry.user.walletAddress.substring(0, 6)}****{entry.user.walletAddress.substring(entry.user.walletAddress.length - 4)} */}
                  </span>
                  {/* <span className='leaderboard-teamname ml-auto'>{entry.team_name}</span> */}
                  <span className="ml-auto">{entry.portfolio}</span>
                </motion.div>
              );
            })}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
