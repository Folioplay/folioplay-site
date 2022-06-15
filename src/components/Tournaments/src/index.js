import React, { useEffect, useState } from "react";
import FolioplayBar from "../../FolioplayBar/src";
import { Button, LinearProgress } from "@mui/material";
import ReactLoading from "react-loading";

import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { useNavigate } from 'react-router-dom'
import '../style/index.css';
import { motion } from 'framer-motion/dist/framer-motion'
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { getAllTournaments } from "../../../APIS/apis";
import { useContext } from "react";

export default function Tournaments() {
    const [tournaments, setTournaments] = useState([]);
    const pad = num => ("0" + num).slice(-2);
    const navigate = new useNavigate();
    const getTimeFromDate = timestamp => {
        const date = new Date(timestamp * 1000);
        let hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        return pad(hours) + ":" + pad(minutes)
    }
    async function fetchTournaments() {
        setTournaments(await getAllTournaments());
    }
    useEffect(() => {
        fetchTournaments();
    }, [])

    const tournamentsList = tournaments.map((tournament, index) => {
        const seatsFilled = 100 * tournament.filled_spots / tournament.total_spots;
        const startDate = new Date(tournament.start_time);
        const finishDate = new Date(tournament.end_time);
        const currDate = new Date();
        // console.log(startDate);
        return (

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 * (index + 1) }} key={"tournament__" + index} className="tournament" >
                <div className="tournament-info" >
                    <span className="tournament-image">
                    </span>
                    <span style={{ textAlign: "left" }} onClick={() => navigate(`/tournaments/${tournament._id}`)}>
                        {tournament.name}
                        <br/>
                        <span className="tournaments-spots">
                            {tournament.live ? <><FiberManualRecordIcon fontSize="small" style={{ fontSize: "12px", color: "var(--green)" }} /> Live</> :
                                <>{getTimeFromDate(startDate.getTime())} hrs - {getTimeFromDate(finishDate.getTime())} hrs</>
                            }
                        </span>
                    </span>
                    <Button className="tournament-fee" size="small" style={{}}>{tournament.required_points} MGT</Button>
                </div>
                <div>
                    <LinearProgress variant="determinate" style={{ backgroundColor: "var(--dim-white)" }} value={seatsFilled} />
                    <span style={{ minWidth: "100px", color: "var(--dark-dim-white)" }}>{tournament.filled_spots}/{tournament.total_spots} Spots Filled</span>
                </div>
                <div className="tournament-reward">
                    <EmojiEventsOutlinedIcon/>{tournament.reward} MGT
                </div>
            </motion.div >
        );
    })
    const LeftComponent = () => {
        return (
            <div className="fullpage">
                <FolioplayBar/>
                <div style={{marginTop: "40px", textAlign: "left", marginLeft: "3.75%", marginBottom: "40px"}}>
                    <span className="font-weight-800 font-size-30">
                        Welcome
                    </span><br/>
                    <span style={{letterSpacing: "1px"}}>Time to turn the tables with your skills</span>
                </div>
                <div className="tournaments-wrapper">
                    {tournaments.length === 0 ? <div className="loading-component"><ReactLoading type={"spin"} color="var(--violet-blue)" /> </div> :
                        <>{ tournamentsList }</>
                    }
                </div>
            </div>
        );
    }
    const RightComponent = () => {
        return (
            <div id='tournament-page-image'>
                <h1 style={{letterSpacing: "2px", fontSize: "2.7rem", fontWeight: "900"}}>Let the game begin!</h1>
                <h3 style={{letterSpacing: "2px"}}>Choose a contest to start playing...</h3>
            </div>
        );
    }
    return (
        <FolioPlayLayout LeftComponent={LeftComponent} RightComponent={RightComponent}/>
    );
}