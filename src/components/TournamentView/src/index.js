import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LinearProgress } from "@mui/material";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import '../style/index.css'
import { Button } from "@mui/material";
import { motion } from 'framer-motion/dist/framer-motion'
import LeaderBoardTabs from "../../LeaderboardTabs/src";
import { getTouirnamentById } from "../../../APIS/apis";
export default function TournamentView() {
    var navigate = useNavigate();
    const [tournament, setTournament] = useState(undefined);
    const params = useParams();

    const _id = params.tournamentId;
    async function fetchTournament() {
        setTournament(await getTouirnamentById({ _id: _id }));
    }
    useEffect(() => {
        fetchTournament();
    }, [])
    const pad = num => ("0" + num).slice(-2);
    const getTimeFromDate = timestamp => {
        const date = new Date(timestamp * 1000);
        let hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        return pad(hours) + ":" + pad(minutes)
    }
    var seatsFilled = 0;
    if (tournament !== undefined) {
        seatsFilled = 100 * tournament.filled_spots / tournament.total_spots;
    }
    const LeftComponent = () => {
        return (
            <div className="fullpage">
                {tournament === undefined ? <div className="loading-component"><ReactLoading type={"spin"} color="var(--white)" /> </div>: <>
                    <div className="tournament-view-bar">
                        <ArrowBackIosIcon fontSize="medium" className="go-back-button" onClick={() => navigate(-1)} />
                        <span className="ml-20 font-size-25 font-weight-700" >{tournament.name}</span>
                    </div>
                    <div className="empty-area">
                    </div>
                    <div className="tournament-info-container">

                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, y: -90 }} transition={{ duration: 0.3 }} className="tournament-view-card">
                            <div className="tournament-info" >
                                <span style={{ textAlign: "left" }}>
                                    <span className="font-size-15" style={{ color: "var(--grey-shade)" }}>Prize Pool</span><br />
                                    <span className="font-size-20 font-weight-700">{tournament.total_reward} MGT</span>
                                </span>
                                <span className="ml-auto">
                                    <span style={{ color: "var(--grey-shade)", fontSize: "15px" }}>Entry Fee</span><br />
                                    <Button className="tournament-fee" size="small">{tournament.required_points} MGT</Button>
                                </span>
                            </div>
                            <div>
                                <LinearProgress variant="determinate" style={{ backgroundColor: "var(--dim-white)" }} value={seatsFilled} />
                                <span className="font-size-15" style={{ minWidth: "100px", color: "var(--dark-dim-white)" }}>{tournament.filled_spots}/{tournament.total_spots} Spots Filled</span>
                            </div>
                        </motion.div>
                        <div className="folioplay-tabs">
                            <LeaderBoardTabs />
                        </div>

                    </div>
                </>}
            </div >
        )
    }
    const RightComponent = () => {
        return (
            <div id='tournament-view-page-image'>
                <h1>Here's what you can win!</h1>
                <h3>Doesn't these big winnings look WOW?
                    Ofcourse they do!</h3>
            </div>
        )
    }
    return (
        <FolioPlayLayout LeftComponent={LeftComponent} RightComponent={RightComponent} />
    );
}