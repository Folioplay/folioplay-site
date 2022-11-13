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
import {
  getLeaderboard,
  getPersonalLeaderboard,
  getRewardDetailsAPI,
} from "../../../APIS/apis";
import { useMoralis } from "react-moralis";
import {useNavigate} from "react-router-dom";
import { SubscriptionsOutlined } from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import LeaderBoardSlice, {getLeaderboardAsync} from "../../../Redux/LeaderBoard/LeaderBoardSlice";

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

  useEffect(() => {
    dispatch(getLeaderboardAsync(tournamentId));
    // async function getLeader() {
    //   const data = await getLeaderboard(tournamentId);
    //   setLeaderBoard(data);
    // }
    async function getPersonalLeader() {
      const data = await getPersonalLeaderboard(tournamentId);
      setPersonalLeaderBoard(data);
    }
    async function getRewardsDetails() {
      const data = await getRewardDetailsAPI(tournamentId);
      setRewardsList(data);
    }

    // getLeader();
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
  // for(var i=0;i<tournamentPrizes.length;i++){
  //   if(tournamentPrizes[i] != tournamentPrizes[i+1]){
  //     var l = i+1;
  //     updatedPrizes[l+''] = tournamentPrizes[i];
  //     amounts.push(tournamentPrizes[i]);
  //     reversePrizes[tournamentPrizes[i]] = l+'';
  //   }else{
  //     var left = i;
  //     while(i<tournamentPrizes.length-1 && tournamentPrizes[left] == tournamentPrizes[i]){
  //       i++;
  //     }
  //     left=left+1;
  //     var right = i;
  //     updatedPrizes[left+'-'+right] = tournamentPrizes[left-1];
  //     amounts.push(tournamentPrizes[left-1]);
  //     reversePrizes[tournamentPrizes[left-1]] = left+'-'+right;
  //     i--;
  //   }
  // }
  // console.log(amounts);
  amounts = amounts.sort(function(a, b) {
    return b-a;
  });
  // const [initialPrize, setInitialPrize] = useState([
  //   {
  //     "startRange": 1,
  //     "endRange": 1,
  //     "prize": 0
  //   }
  // ]);
  //
  // const parsePrizes = () => {
  //   let previousValue = tournamentPrizes[0];
  //   let rangeStarts = 1;
  //   let rangeEnds = 1;
  //   for(let i=1; i<tournamentPrizes.length; i++){
  //     if(tournamentPrizes[i]!==previousValue){
  //       setInitialPrize([...initialPrize, {
  //         "startRange": rangeStarts,
  //         "endRange": rangeEnds,
  //         "prize": previousValue
  //       }])
  //       rangeStarts = i;
  //       rangeEnds = i;
  //     }
  //   }
  // }

  return (
    <Box sx={{ width: "100%", typography: "body1" }} id="win-dash-tabs">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
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
            personalLeaderBoard.length !== 0 &&
            personalLeaderBoard.map((entry, index) => {
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
                    initial={{ x: 400 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.1 * index }}
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
