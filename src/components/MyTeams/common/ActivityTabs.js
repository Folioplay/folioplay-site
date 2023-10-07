import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion/dist/framer-motion";
import "../style/index.css";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import deleteClickedTeam from "../common/deleteCLickedTeam";
// import { useMoralis } from "react-moralis";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { useNavigate } from "react-router-dom";
import { Chip, LinearProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LabTabs from "../../../Common/TabComponent";
import { S3_URL } from "../../../APIS/apis";
import { deleteTeamId } from "../../../APIS/apis";
import {fetchTeams} from "../src/index"
import {getMyTeamActivities} from "../../../APIS/apis"
// import LabTabs from "../../../Common/TabComponent";
export default function ActivityTabs({ tournaments }) {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const [value, setValue] = React.useState("2");
  const [teamsLength, setTeamsLength] = useState(0);
  const [participatedContestsLength, setParticipatedContestsLength] =
    useState(0);
  const tournamentUpdatedOpen =
    tournaments &&
    tournaments.filter(
      (item) => item.tournament !== null && item.tournament.status === 0
    );
  const tournamentUpdatedRunning =
    tournaments &&
    tournaments.filter(
      (item) => item.tournament !== null && item.tournament.status === 2
    );
  const tournamentUpdatedCompleted =
    tournaments &&
    tournaments.filter(
      (item) => item.tournament !== null && item.tournament.status === 3
    );
  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

   async function fetchTeams() {
    // setTeams(await getAllUserTeams());
    const teamData = await getMyTeamActivities()
   await setTeams(teamData); 
   setTeamsLength(teamData.length);
    await console.log("team featched") 
    await console.log(teamData) 
  }

async function deleteTeamById(teamid,teamIndex){
  await localStorage.setItem("teamId",teamid)
  await localStorage.setItem("teamIndex",teamIndex)
  await deleteTeamId(teamid,teamIndex);
  // window.location.reload();
  fetchTeams();
  
}

  useEffect(() => {
    fetchTeams();
    console.log("useEffect Called 1")   
    if (tournaments) {      
      const actualTournaments = tournaments.filter(
        (item) => item.tournament !== null
      );
      setParticipatedContestsLength(actualTournaments.length);
    }
  }, []);

  


  const tournamentsList = tournaments ? (
    <LabTabs
      tournamentUpdatedOpen={tournamentUpdatedOpen}
      tournamentUpdatedRunning={tournamentUpdatedRunning}
      tournamentUpdatedCompleted={tournamentUpdatedCompleted}
    />
  ) : (
    <div></div>
  );
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35 }}
                      className="activity-team-card mb-15"
                    >
                      <span className="activity-team-info">
                        <span className="activity-team-name font-size-20 font-weight-600"  id={"team-" + index}
                      onClick={(event) => {
                        navigate("/activity/team/" + team.teamData.id);
                      }}>
                          {team.teamData.name}
                        </span>
                        <span>
                          <span className="activity-team-winnings font-weight-500">
                          {`${team.totalWinnings} Winnings`}
                          </span>
                          <span className="activity-team-contests font-weight-500 ml-10">
                            {`${team.totalTournamentsPlayed} Contests`}
                          </span>
                        </span>
                      </span>
                      {/* <span className="image-wrappers image-1">
                           <DeleteIcon
                        className="delete-team-button team-buttons ml-5"
                        id={"team-" + index}
                      onClick={(event) => {
                        deleteTeamById(team.teamData.id,index);
                      }}
                        fontSize="large"
                      />
                        </span> */}
                      <div className="activity-team-coins-preview">
                      
                        <span className="image-wrappers image-1">
                          <img
                            className="activity-team-coin-image image-1"
                            src={S3_URL + team.teamData.selectedCoins[1].symbol + ".png"}
                            width="45px"
                            height="45px"
                          />
                        </span>
                        <span className="image-wrappers image-2">
                          <img
                            className="activity-team-coin-image image-2"
                            src={S3_URL + team.teamData.selectedCoins[4].symbol + ".png"}
                            width="45px"
                            height="45px"
                          />
                        </span>
                        <span className="image-wrappers image-3">
                          <img
                            className="activity-team-coin-image image-3"
                            src={S3_URL + team.teamData.selectedCoins[8].symbol + ".png"}
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
                      <span >
                           <DeleteIcon
                        className="delete-team-button team-buttons ml-5"
                        id={"team-" + index}
                      onClick={(event) => {
                        deleteTeamById(team.teamData.id,index);
                      }}
                        fontSize="large"
                        style={{marginTop:"50px",fontSize:"1.1rem"}}
                      />
                        </span>
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
