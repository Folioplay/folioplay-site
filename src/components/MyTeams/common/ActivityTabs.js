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
import { LinearProgress } from "@mui/material";
export default function ActivityTabs({ teams, tournaments }) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const navigate = useNavigate();
    const [value, setValue] = React.useState("1");
    const [teamsLength, setTeamsLength] = useState(0);
    const [participatedContestsLength, setParticipatedContestsLength] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        console.log(teams);
        if (teams) setTeamsLength(teams.length);
        if (tournaments) setParticipatedContestsLength(tournaments.length);
    }, [])
    const tournamentsList = tournaments ? tournaments.map((tournament, index) => {
        const seatsFilled =
            (100 * tournament.filled_spots) / tournament.total_spots;
        const startDate = new Date(tournament.start_time);
        const finishDate = new Date(tournament.end_time);
        const status = { 3: { "value": "Completed", "color": "#ff000096" }, 1: { "value": "Closed", "color": "#ff000096" }, 0: { "value": "Open", "color": "#00ff00d6" }, 2: { "value": "Running", "color": "#00ff00d6" } }
        const currDate = new Date();
        const disabledClass = tournament.status === 3 ? " disable-join-button" : "";
        const disabledTournament = tournament.status === 3 ? true : false;
        return (
            <motion.div
                id={"tournament-" + tournament._id}
                initial={{ y: "100vh" }} animate={{ y: 0 }} transition={{ delay: 0 + 0.08 * index, duration: 0.35 }}
                key={"tournament__" + index}
                className="tournament"
            >
                <div className="tournament-info">
                    <span className="tournament-image" style={{ borderRadius: "100%" }}>
                        {tournament.id === "62c45a6ddfe60c1bada234a8" ?
                            <img style={{ borderRadius: "100%" }} src={require("../../../images/bulls.png").default} width="50px" height={"50px"} />
                            : <> {tournament.id === "62c45abedfe60c1bada2355f" ?
                                <img style={{ borderRadius: "100%" }} src={require("../../../images/justice.png").default} width="50px" height={"50px"} />
                                : <></>}</>}
                    </span>
                    <span
                        style={{ textAlign: "left" }}
                        onClick={() => { navigate(`/tournaments/${tournament._id}`); }}
                    >
                        <span style={{ color: "#071F36", fontWeight: "700" }}>{tournament.name}</span>
                        <br />
                        <span className="tournaments-spots">
                            <span className="font-size-12">
                                {startDate.getDate()} {monthNames[startDate.getMonth()]}'{startDate.getFullYear() % 100},&ensp;{startDate.getHours() / 10 < 1 ? "0" + startDate.getHours() : startDate.getHours()} : {startDate.getMinutes() / 10 < 1 ? "0" + startDate.getMinutes() : startDate.getMinutes()} hrs -{" "}
                                {finishDate.getHours() / 10 < 1 ? "0" + finishDate.getHours() : finishDate.getHours()} : {finishDate.getMinutes() / 10 < 1 ? "0" + finishDate.getMinutes() : finishDate.getMinutes()} hrs
                            </span>
                        </span>
                    </span>
                </div>
                <div>
                    <LinearProgress
                        variant="determinate"
                        style={{ backgroundColor: "var(--dim-white)" }}
                        value={seatsFilled}
                    />
                    <div className="spots-wrapper">
                        <span className="font-size-12 font-weight-500 mt-5" style={{ color: "var(--golden)" }}>
                            {tournament.total_spots - tournament.filled_spots} spots left
                        </span>
                        <span className="font-size-12 font-weight-500 mt-5" style={{ color: "var(--dark-dim-white)" }}>
                            {tournament.total_spots} spots
                        </span>
                    </div>
                </div>
                <div className="tournament-reward">
                    {/* <span className="font-size-12" style={{ color: status[tournament.status].color, padding: "0 10px", border: "1px solid " + status[tournament.status].color, borderRadius: "30px" }}>{status[tournament.status].value}</span> */}
                    <span className="font-size-12">
                        <EmojiEventsOutlinedIcon />
                        {/* {tournament.reward} MGT */}
                        <span>1000 MGT</span>
                    </span>
                </div>
            </motion.div>
        );
    }) : <></>;
    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" id="activity-tabs">
                        <Tab label={"Contests (" + participatedContestsLength + ")"} value="2" style={{ textTransform: "capitalize", fontFamily: "poppins" }} />
                        <Tab label={"My Teams (" + teamsLength + ")"} value="1" style={{ textTransform: "capitalize", fontFamily: "poppins" }} />
                    </TabList>
                </Box>
                <TabPanel value="2">
                    <div className="activity-space">
                        {tournamentsList}
                    </div>
                </TabPanel>
                <TabPanel value="1">
                    <div className="activity-space">
                        {teams !== undefined && tournaments !== undefined ? <>{
                            teams.map((team, index) => {
                                return (
                                    <motion.div initial={{ y: "100vh" }} animate={{ y: 0 }} transition={{ delay: 0 + 0.08 * index, duration: 0.35 }} className="activity-team-card mb-15">
                                        <span className="activity-team-info">
                                            <span className="activity-team-name font-size-20 font-weight-600">{team.name}
                                            </span>
                                            <span>
                                                <span className="activity-team-winnings font-weight-500">4 Winnings</span>
                                                <span className="activity-team-contests font-weight-500 ml-10">10 Contests</span>
                                            </span>
                                        </span>
                                        <div className="activity-team-coins-preview">
                                            <span className="image-wrappers image-1">
                                                <img className="activity-team-coin-image image-1" src={process.env.REACT_APP_API_SERVER + '/media/' + team.selectedCoins[1].symbol + '.png'} width="45px" height="45px" />
                                            </span>
                                            <span className="image-wrappers image-2">
                                                <img className="activity-team-coin-image image-2" src={process.env.REACT_APP_API_SERVER + '/media/' + team.selectedCoins[5].symbol + '.png'} width="45px" height="45px" />
                                            </span>
                                            <span className="image-wrappers image-3">
                                                <img className="activity-team-coin-image image-3" src={process.env.REACT_APP_API_SERVER + '/media/' + team.selectedCoins[8].symbol + '.png'} width="45px" height="45px" />
                                            </span>
                                            <span className="image-wrappers coin-counter">
                                                <span className="font-size-12 font-weight-600">+8</span>
                                            </span>
                                        </div>
                                    </motion.div>);
                            })
                        }</>
                            : <></>}
                    </div>
                </TabPanel>
            </TabContext >
        </Box >
    );
}
