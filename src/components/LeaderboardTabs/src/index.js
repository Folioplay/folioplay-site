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
import { getLeaderboard } from "../../../APIS/apis";
import { useMoralis } from "react-moralis";

export default function LeaderBoardTabs({ tournamentId }) {
  const [value, setValue] = React.useState("1");
  const { user } = useMoralis();
  const userWalletAddress = user.attributes.ethAddress ? user.attributes.ethAddress : "";
  const [leaderBoard, setLeaderBoard] = useState([]);
  useEffect(() => {
    async function getLeader() {
      const data = await getLeaderboard(tournamentId);
      setLeaderBoard(data);
    }
    getLeader();
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
            <Tab label="Winnings" value="2" style={{ textTransform: "capitalize", fontFamily: "poppins" }} />
            <Tab label="Leader Board" value="1" style={{ textTransform: "capitalize", fontFamily: "poppins" }} />
          </TabList>
        </Box>
        <TabPanel value="2">Winnings</TabPanel>
        <TabPanel value="1">
          <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10">
            <span className="mr-10"># Rank</span>
            <span className="ml-20">User</span>
            {/* <span className='ml-auto'>Team</span> */}
            <span className="ml-auto">Points</span>
          </div>
          {leaderBoard.length &&
            leaderBoard.map((entry, index) => {
              const userEntry = (entry.user.walletAddress === userWalletAddress) ? " font-weight-700" : "";
              return (
                <motion.div
                  initial={{ x: 400 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.1 * index }}
                  className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10" + userEntry}
                >
                  <span className="mr-10">#{" "}{index + 1}</span>
                  {/* <div className="leaderboard-profile-image"></div> */}
                  <span className={"leaderboard-username ml-20"}>
                    {entry.user.walletAddress.substring(0, 6)}****{entry.user.walletAddress.substring(entry.user.walletAddress.length - 4)}
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
