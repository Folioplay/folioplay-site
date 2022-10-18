import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion/dist/framer-motion";
import "../style/index.css";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { useNavigate } from "react-router-dom";
import {Chip, LinearProgress} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
export default function ActivityTabs({ teams, tournaments }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const [teamsLength, setTeamsLength] = useState(0);
  const [participatedContestsLength, setParticipatedContestsLength] =
    useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
  useEffect(() => {
    console.log(teams, "in useEffect");
    if (teams) setTeamsLength(teams.length);
    if (tournaments) setParticipatedContestsLength(tournaments.length);
  }, []);


  const tournamentsList = tournaments ? <div className={"activityPage__tournamentWrapper"}>
      return(
      <div>
          {/*<div className="activityPage__chipComponent">*/}
          {/*</div>*/}
          {tournaments.map( (tournament, index) => {
          const disabledTournament = tournament.status === 3;
            const status = {
                3: { value: "Completed", color: "#ff000096" },
                1: { value: "Closed", color: "#FFCC00" },
                0: { value: "Open", color: "#00ff00d6" },
                2: { value: "Running", color: "#FFCC00" },
            };

            return (
              <div>
                  <motion.div
                      // id={"tournament-" + tournament._id}
                      // initial={{y: "100vh"}}
                      animate={{y: 0}}
                      transition={{delay: 0 + 0.08 * index, duration: 0.35}}
                      key={"tournament__" + index}
                      className="activity-tournament"
                      onClick={() => {
                          navigate(`/tournaments/${tournament.tournament._id}`);
                      }}
                  >
                    <div className="tournament-info">
                    <span className="tournament-image" style={{borderRadius: "100%"}}>
                        <img
                            style={{ borderRadius: "100%" }}
                            src={tournament.tournament.imageURL}
                            width="60px"
                            height={"60px"}
                        />
                    </span>
                        <div className="activityPage__contentWrapper">
                            <div className={"activityTabs__tournamentNameDiv"}>
                              <span className="activityTab__tournamentName" style={{color: "#071F36", fontWeight: "700"}}>
                                {tournament.tournament.name}
                              </span>
                                <span className="reward_amount"><EmojiEventsOutlinedIcon/>{tournament.amount_won} MGT</span>
                            </div>

                            <div className="tournaments-spots">
                              <span className="activityTab__Amount">
                                <span className={"activityTabs__teamLength"}>{tournament.teams.length} Teams</span>
                                  <span
                                      className="activityTab__tournamentStatus font-size-12"
                                      style={{
                                          color: status[tournament.tournament.status].color,
                                          padding: "0 10px",
                                          border: "1px solid " + status[tournament.tournament.status].color,
                                          borderRadius: "30px",
                                      }}
                                  >
                                {status[tournament.tournament.status].value}
                            </span>
                              </span>
                        </div>
                        </div>
                    </div>
                  </motion.div>
              </div>
          );
        })}
      </div>
      )
      </div>:
    (
    <div></div>
  ) ;
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            id="activity-tabs"
          >
            <Tab
              label={"Contests (" + participatedContestsLength + ")"}
              value="2"
              style={{ textTransform: "capitalize", fontFamily: "poppins" }}
            />
            <Tab
              label={"My Teams (" + teamsLength + ")"}
              value="1"
              style={{ textTransform: "capitalize", fontFamily: "poppins" }}
            />
          </TabList>
        </Box>
        <TabPanel value="2">
          <div className="activity-space">{tournamentsList}</div>
        </TabPanel>
        <TabPanel value="1">
          <div className="activity-space">
            {teams !== undefined && tournaments !== undefined ? (
              <>
                {teams.map((team, index) => {
                  return (
                    <motion.div
                      id={"team-" + index}
                      onClick={(event) => {
                        navigate("/activity/team/" + team.id);
                      }}
                      initial={{ y: "100vh" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0 + 0.08 * index, duration: 0.35 }}
                      className="activity-team-card mb-15"
                    >
                      <span className="activity-team-info">
                        <span className="activity-team-name font-size-20 font-weight-600">
                          {team.name}
                        </span>
                        {/*<span>*/}
                        {/*  <span className="activity-team-winnings font-weight-500">*/}
                        {/*    4 Winnings*/}
                        {/*  </span>*/}
                        {/*  <span className="activity-team-contests font-weight-500 ml-10">*/}
                        {/*    10 Contests*/}
                        {/*  </span>*/}
                        {/*</span>*/}
                      </span>
                      <div className="activity-team-coins-preview">
                        <span className="image-wrappers image-1">
                          <img
                            className="activity-team-coin-image image-1"
                            src={
                              process.env.REACT_APP_API_SERVER +
                              "/media/" +
                              team.selectedCoins[1].symbol +
                              ".png"
                            }
                            width="45px"
                            height="45px"
                          />
                        </span>
                        <span className="image-wrappers image-2">
                          <img
                            className="activity-team-coin-image image-2"
                            src={
                              process.env.REACT_APP_API_SERVER +
                              "/media/" +
                              team.selectedCoins[5].symbol +
                              ".png"
                            }
                            width="45px"
                            height="45px"
                          />
                        </span>
                        <span className="image-wrappers image-3">
                          <img
                            className="activity-team-coin-image image-3"
                            src={
                              process.env.REACT_APP_API_SERVER +
                              "/media/" +
                              team.selectedCoins[8].symbol +
                              ".png"
                            }
                            width="45px"
                            height="45px"
                          />
                        </span>
                        <span className="image-wrappers coin-counter">
                          <span className="font-size-12 font-weight-600">
                            +8
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
