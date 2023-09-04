import React, { useState, useEffect } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import FolioplayBar from "../../FolioplayBar/src";
import "../style/index.css";
import "../common/ActivityTabs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router";
import ActivityTabs from "../common/ActivityTabs";
import {
  getAllUserTeams,
  getPreviousUserTournaments,
  getMyTeamActivities
} from "../../../APIS/apis";
import { removeCoinsFromLocalStorage } from "../../../CommonFunctions/functions";
export default function MyTeams() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState(undefined);
  const [tournaments, setTournaments] = useState(undefined);
  async function fetchTeams() {
    // setTeams(await getAllUserTeams());
    setTeams(await getMyTeamActivities());
    console.log(getAllUserTeams());
    console.log("get all user");
    console.log(getMyTeamActivities());
    console.log("get my team");

  }
  async function fetchUserTournaments() {
    setTournaments(await getPreviousUserTournaments());
  }
  useEffect(() => {
    fetchTeams();
    fetchUserTournaments();
  }, []);
  
  const LeftComponent = () => {
    return (
      <div className="fullpage">
        <FolioplayBar />
        <br />
        <span className="font-size-30 font-weight-700 ml-20 mb-20">
          My Activity
        </span>
        <br />
        <br />
        <br />
        <div className="activity-content-wrapper mt-20">
        <div className="activity-add-team-buttton">
            <AddCircleIcon
              className="mr-10"
              id="circle-add-team-button"
              onClick={() => {
                removeCoinsFromLocalStorage();
                navigate("/teams/createteam/");
              }}
            />
          </div>
          <div id="activity-tabs-wrapper">
            <ActivityTabs teams={teams} tournaments={tournaments} />
            {/* <div className="activity-add-team-buttton"><AddCircleIcon id="circle-add-team-button" /></div> */}
          </div>
        </div>
      </div>
    );
  };
  const RightComponent = () => {
    return (
      <div id="tournament-page-image">
        <span className="font-size-36 font-weight-700 mb-0">
          Let the game begin!
        </span>
        <span
          className="font-size-20 font-weight-500 mt-0"
          style={{ letterSpacing: "1px" }}
        >
          Choose a contest to start playing...
        </span>
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
