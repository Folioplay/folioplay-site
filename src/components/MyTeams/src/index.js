import React, { useState, useEffect } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import FolioplayBar from "../../FolioplayBar/src";
import '../style/index.css'
import '../common/ActivityTabs'
import ActivityTabs from "../common/ActivityTabs";
import { getAllUserTeams, getPreviousUserTournaments } from "../../../APIS/apis";
export default function MyTeams() {
    const [teams, setTeams] = useState(undefined);
    async function fetchTeams() {
        setTeams(await getAllUserTeams());
    }
    async function fetchUserTournaments() {
        setTournaments(await getPreviousUserTournaments());
    }
    useEffect(() => {
        fetchTeams();
        fetchUserTournaments();
    }, []);
    const [tournaments, setTournaments] = useState(undefined);

    const LeftComponent = () => {
        return (
            <div className="fullpage">
                <FolioplayBar />
                <br />
                <span className="font-size-30 font-weight-700 ml-20 mb-20">My Activity</span><br /><br /><br />
                <div className="activity-content-wrapper mt-20">
                    <div id="activity-tabs-wrapper">
                        <ActivityTabs teams={teams} tournaments={tournaments} />
                    </div>
                </div>
            </div>
        )
    }
    const RightComponent = () => {
        return (
            <div id="tournament-page-image">
                <span className="font-size-36 font-weight-700 mb-0">
                    Let the game begin!
                </span>
                <span className="font-size-20 font-weight-500 mt-0" style={{ letterSpacing: "1px" }}>
                    Choose a contest to start playing...
                </span>
            </div>
        );
    };
    return (
        <FolioPlayLayout LeftComponent={LeftComponent} RightComponent={RightComponent} />
    )
}