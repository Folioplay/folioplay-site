import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { motion } from "framer-motion/dist/framer-motion";
import "../../components/MyTeams/style/index.css";
import {Box} from "@mui/material";
import "./style.css";
import {useNavigate} from "react-router-dom";


export default function ContestTabs({tournamentUpdatedOpen, tournamentUpdatedRunning, tournamentUpdatedCompleted}) {
    var navigate = useNavigate();
    const [valueContest, setValueContest] = React.useState('1');

    const handleChangeContest = (event, newValue) => {
        setValueContest(newValue);
    };

    return (
        // <div className="activityPage__content">
        <Box sx={{ width: '100%', typography: 'body1',fontFamily:"poppins" }}>

        <TabContext value={valueContest}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeContest} aria-label="lab API tabs example">
                    <Tab label="Open" value="1"  style={{ textTransform: "capitalize", fontFamily: "poppins" }}/>
                    <Tab label="Running" value="2"  style={{ textTransform: "capitalize", fontFamily: "poppins" }}/>
                    <Tab label="Completed" value="3"  style={{ textTransform: "capitalize", fontFamily: "poppins" }}/>
                </TabList>
            </Box>
            <TabPanel className="contestTab__valueItem" value="1">
                {tournamentUpdatedOpen.length ?
                    <>
                        {tournamentUpdatedOpen.map((tournament, index) => {
                            const disabledTournament = tournament.status === 3;
                            const status = {
                                3: {value: "Completed", color: "#ff000096"},
                                1: {value: "Closed", color: "#FFCC00"},
                                0: {value: "Open", color: "#00ff00d6"},
                                2: {value: "Running", color: "#FFCC00"},
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
                                                style={{borderRadius: "100%"}}
                                                src={tournament.tournament.imageURL}
                                                width="60px"
                                                height={"60px"}
                                            />
                                        </span>
                                            <div className="activityPage__contentWrapper">
                                                <div className={"activityTabs__tournamentNameDiv"}>
                                      <span className="activityTab__tournamentName"
                                            style={{color: "#071F36", fontWeight: "700"}}>
                                        {tournament.tournament.name}
                                      </span>
                                                    <span
                                                        className="reward_amount"><EmojiEventsOutlinedIcon/>{tournament.amount_won} MGT</span>
                                                </div>

                                                <div className="tournaments-spots">
                                              <span className="activityTab__Amount">
                                                <span
                                                    className={"activityTabs__teamLength"}>{tournament.teams.length} Teams</span>
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
                    </> :
                    <div className="contestTab__valueItem">
                        No Open Tournament
                    </div>
                }
            </TabPanel>
            <TabPanel className="contestTab__valueItem" value="2">
                {tournamentUpdatedRunning.length ?
                    <>
                {tournamentUpdatedRunning.map( (tournament, index) => {
                    const disabledTournament = tournament.status === 3;
                    const status = {
                    3: {value: "Completed", color: "#ff000096"},
                    1: {value: "Closed", color: "#FFCC00"},
                    0: {value: "Open", color: "#00ff00d6"},
                    2: {value: "Running", color: "#FFCC00"},
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
                    style={{borderRadius: "100%"}}
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
                    </>
                    :
                    <div  className="contestTab__valueItem">
                    No Running Tournament
                    </div>
                }
            </TabPanel>
            <TabPanel className="contestTab__valueItem" value="3">
                {tournamentUpdatedCompleted.length?
                    <>
                {tournamentUpdatedCompleted.map( (tournament, index) => {
                    const disabledTournament = tournament.status === 3;
                    const status = {
                    3: {value: "Completed", color: "#ff000096"},
                    1: {value: "Closed", color: "#FFCC00"},
                    0: {value: "Open", color: "#00ff00d6"},
                    2: {value: "Running", color: "#FFCC00"},
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
                    style={{borderRadius: "100%"}}
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
                    </>
                    :
                    <div className="contestTab__valueItem">
                    No Completed Tournament
                    </div>
                }
            </TabPanel>


                {/*{tournamentList.map((item, indexInner)=>{*/}
                {/*    console.log("item", item, "index", indexInner)*/}
                {/*    return(*/}
                {/*        <TabPanel  className="contestTab__valueItem"  value={indexInner+1}>*/}
                {/*            {item.map( (tournament, index) => {*/}
                {/*                const disabledTournament = tournament.status === 3;*/}
                {/*                const status = {*/}
                {/*                    3: { value: "Completed", color: "#ff000096" },*/}
                {/*                    1: { value: "Closed", color: "#FFCC00" },*/}
                {/*                    0: { value: "Open", color: "#00ff00d6" },*/}
                {/*                    2: { value: "Running", color: "#FFCC00" },*/}
                {/*                };*/}

                {/*                return (*/}
                {/*                    <div>*/}
                {/*                        <motion.div*/}
                {/*                            // id={"tournament-" + tournament._id}*/}
                {/*                            // initial={{y: "100vh"}}*/}
                {/*                            animate={{y: 0}}*/}
                {/*                            transition={{delay: 0 + 0.08 * index, duration: 0.35}}*/}
                {/*                            key={"tournament__" + index}*/}
                {/*                            className="activity-tournament"*/}
                {/*                            onClick={() => {*/}
                {/*                                navigate(`/tournaments/${tournament.tournament._id}`);*/}
                {/*                            }}*/}
                {/*                        >*/}
                {/*                            <div className="tournament-info">*/}
                {/*                        <span className="tournament-image" style={{borderRadius: "100%"}}>*/}
                {/*                            <img*/}
                {/*                                style={{ borderRadius: "100%" }}*/}
                {/*                                src={tournament.tournament.imageURL}*/}
                {/*                                width="60px"*/}
                {/*                                height={"60px"}*/}
                {/*                            />*/}
                {/*                        </span>*/}
                {/*                                        <div className="activityPage__contentWrapper">*/}
                {/*                                            <div className={"activityTabs__tournamentNameDiv"}>*/}
                {/*                      <span className="activityTab__tournamentName" style={{color: "#071F36", fontWeight: "700"}}>*/}
                {/*                        {tournament.tournament.name}*/}
                {/*                      </span>*/}
                {/*                                <span className="reward_amount"><EmojiEventsOutlinedIcon/>{tournament.amount_won} MGT</span>*/}
                {/*                            </div>*/}

                {/*                            <div className="tournaments-spots">*/}
                {/*                              <span className="activityTab__Amount">*/}
                {/*                                <span className={"activityTabs__teamLength"}>{tournament.teams.length} Teams</span>*/}
                {/*                                  <span*/}
                {/*                                      className="activityTab__tournamentStatus font-size-12"*/}
                {/*                                      style={{*/}
                {/*                                          color: status[tournament.tournament.status].color,*/}
                {/*                                          padding: "0 10px",*/}
                {/*                                          border: "1px solid " + status[tournament.tournament.status].color,*/}
                {/*                                          borderRadius: "30px",*/}
                {/*                                      }}*/}
                {/*                                  >*/}
                {/*                                {status[tournament.tournament.status].value}*/}
                {/*                                </span>*/}
                {/*                                  </span>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        </motion.div>*/}
                {/*                    </div>*/}
                {/*                );*/}
                {/*            })}*/}

                {/*        </TabPanel>*/}
                {/*    )*/}
                {/*})}*/}




                {/*</Box>*/}
            </TabContext>
        </Box>
            );
}
