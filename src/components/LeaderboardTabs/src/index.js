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
import { useEffect, useState } from "react";
import {
  getLeaderboard,
  getPersonalLeaderboard,
  getRewardDetailsAPI,
} from "../../../APIS/apis";
import { useMoralis } from "react-moralis";
import {useNavigate} from "react-router-dom";
import { SubscriptionsOutlined } from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import LeaderBoardSlice, {
  getLeaderboardAsync,
  getPersonalLeaderBoardAsync,
  getWinnersAsync
} from "../../../Redux/LeaderBoard/LeaderBoardSlice";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function LeaderBoardTabs({
  tournamentId,
  tournamentStatus,
  tournamentPrizes,
  rewardSize,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const { user } = useMoralis();
  const userWalletAddress = user.attributes.ethAddress
    ? user.attributes.ethAddress
    : "";
  // const [leaderBoard, setLeaderBoard] = useState([]);
  const [personalLeaderBoard, setPersonalLeaderBoard] = useState([]);
  const [rewardsList, setRewardsList] = useState([]);
  const [prizes, setPrizes] = useState([]);
  let count = 0;
  let rewardUserCount = 0;


  const getLeaderBoardRedux=useSelector((state)=>state.LeaderBoardSlice.leaderBoard);
  const getPersonalLeaderBoardRedux=useSelector((state)=>state.LeaderBoardSlice.personalLeaderboard);

  useEffect(() => {
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
  var left = 0,right=0;
  while(right < tournamentPrizes.length){
    while(right < tournamentPrizes.length && tournamentPrizes[left] == tournamentPrizes[right]){
      right++;
    }
    amounts.push(tournamentPrizes[left]);
    if(right - left > 1){
      left++;
      reversePrizes[tournamentPrizes[left-1]] = left+'-'+right;
      left--;
    }else{
      left++;
      reversePrizes[tournamentPrizes[left-1]] = left;
      left--;
    }
    left = right;
  }
  amounts = amounts.sort(function(a, b) {
    return b-a;
  });
  return (
    <Box sx={{ width: "100%", typography: "body1" }} id="win-dash-tabs">
      <TabContext value={value}>
        <Box className={"tournamentView__leaderboardTabsStyle"} sx={{ borderBottom: 1, borderColor: "divider",width:"100%" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{width:"100%" }}>
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
            <span className={"refreshLeaderboard"} style={{marginLeft:"auto",marginRight:"20px"}}>
              {/* <RefreshIcon /> */}
              <Button 
              style={{color:"var(--grey-shade)",textTransform:"capitalize"}}
              onClick={()=>{
                dispatch(getLeaderboardAsync(tournamentId));
                dispatch(getWinnersAsync(tournamentId));
                dispatch(getPersonalLeaderBoardAsync(tournamentId));
              }}>Refresh</Button>
            </span>
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10">
            <span className="mr-10">Rank</span>
            {tournamentStatus === 3 && getLeaderBoardRedux.length && (
              <span className="ml-20">User</span>
            )}
            {/*<span className='ml-auto'>Team</span> */}
            <span className="ml-auto">Prizes</span>
          </div>

          {/*// Show rewards when the Tournament is not completed*/}
          {tournamentStatus!==3 &&
              amounts.map((value, index) => {
                let leaderboardActive = tournamentStatus!==0 ? "leaderboard-active": "";
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
                          tournament_id: tournamentId,
                        },
                      });
                    }}
                  >
                    <span className="mr-10">
                      {"  "}
                      {entry.rank}
                    </span>
                    <span className={"leaderboard-username"}>
                      {localStorage.getItem("folioUsername")}{" "}
                      <span className={"teamCount"}>
                        T{entry.user_team_count}
                      </span>
                    </span>
                    <span className="ml-auto">{entry.amount_won} FPC</span>
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
                          tournament_id: tournamentId,
                        },
                      });
                    }}
                  >
                    <span className="mr-10">
                      {"  "}
                      {entry.rank}
                    </span>
                    <span className={"leaderboard-username"}>
                      {entry.user.username}{" "}
                      <span className={"teamCount"}>
                        T{entry.user_team_count}
                      </span>
                    </span>
                    <span className="ml-auto">{entry.amount_won} FPC</span>
                  </motion.div>
                );
            })}



          {/*Leaderboard Section*/}
        </TabPanel>
        <TabPanel value="2">
          <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10">
            <span className="mr-10">Rank</span>
            <span className="ml-20">User</span>
            {/* <span className='ml-auto'>Team</span> */}
            <span className="ml-auto">Points</span>
          </div>

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
                  <span className="mr-10">
                    {"  "}
                    {entry.rank}
                  </span>
                  <span className={"leaderboard-username"}>
                    {localStorage.getItem("folioUsername")}{" "}
                    <span className={"teamCount"}>
                      T{entry.user_team_count}
                    </span>
                  </span>
                  <span className="ml-auto">{entry.portfolio}</span>
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
                          tournament_id: tournamentId,
                        },
                      });
                    }}
                  >
                    <span className="mr-10">
                      {"  "}
                      {entry.rank}
                    </span>
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
        </TabPanel>
      </TabContext>
    </Box>
  );
}
