import React from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import FolioplayBar from "../../FolioplayBar/src";
import { tournaments } from "../common/demoTournaments";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Button, LinearProgress } from "@mui/material";
import '../style/index.css'
export default function Tournaments() {
    const pad = num => ("0" + num).slice(-2);
    const getTimeFromDate = timestamp => {
        const date = new Date(timestamp * 1000);
        let hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        return pad(hours) + ":" + pad(minutes)
    }
    const tournamentsList = tournaments.map((tournament) => {
        const seatsFilled = 100 * tournament.filled_spots / tournament.total_spots;
        const startDate = new Date(tournament.start);
        const finishDate = new Date(tournament.end);
        const currDate = new Date();
        // console.log(startDate);
        return (
            <div className="tournament" >
                <div className="tournament-info" >
                    <span className="tournament-image">
                    </span>
                    <span style={{ textAlign: "left" }}>
                        {tournament.name}
                        <br />
                        <span className="tournaments-spots">
                            {getTimeFromDate(tournament.start)} hrs - {getTimeFromDate(tournament.end)} hrs
                        </span>
                    </span>
                    <Button className="tournament-fee" size="small" style={{}}>{tournament.entry_price} MGT</Button>
                </div>
                <div>
                    <LinearProgress variant="determinate" style={{ backgroundColor: "var(--dim-white)" }} value={seatsFilled} />
                    <span style={{ minWidth: "100px", color: "var(--dark-dim-white)" }}>{tournament.filled_spots}/{tournament.total_spots} Spots Filled</span>
                </div>
                <div className="tournament-reward">
                    <EmojiEventsOutlinedIcon />{tournament.reward} MGT
                </div>

            </div >
        );
    })
    const LeftComponent = () => {
        return (
            <div className="fullpage">
                <FolioplayBar />
                <div style={{ marginTop: "40px", textAlign: "left", marginLeft: "3.75%", marginBottom: "40px" }}>
                    <span style={{ letterSpacing: "1px", fontSize: "2rem", fontWeight: "800" }}>
                        Welcome
                    </span><br />
                    <span style={{ letterSpacing: "1px" }}>Time to turn the tables with your skills</span>
                </div>
                <div className="tournaments-wrapper">
                    {tournamentsList}
                </div>
            </div>
        );
    }
    const RightComponent = () => {
        return (
            <div id='tournament-page-image'>
                <h1 style={{ letterSpacing: "2px", fontSize: "2.7rem", fontWeight: "900" }}>Let the game begin!</h1>
                <h3 style={{ letterSpacing: "2px" }}>Choose a contest to start playing...</h3>
            </div>
        );
    }
    return (
        <FolioPlayLayout LeftComponent={LeftComponent} RightComponent={RightComponent} />
    );
}