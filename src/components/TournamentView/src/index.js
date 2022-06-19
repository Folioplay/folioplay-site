import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LinearProgress } from "@mui/material";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import '../style/index.css'
import { Button } from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'
import LeaderBoardTabs from "../../LeaderboardTabs/src";
import CancelIcon from '@mui/icons-material/Cancel';
import {getTournamentById, getAllUserTeams, joinTournament} from "../../../APIS/apis";
import {useMoralis} from "react-moralis";
import {ethers} from "ethers";
export default function TournamentView() {

    const provider = new ethers.providers.JsonRpcProvider(`https://polygon-rpc.com/`);
    const {user} = useMoralis();

    var navigate = useNavigate();
    const [balance, setBalance] = useState("");
    const [tournament, setTournament] = useState(undefined);
    const params = useParams();
    const [chooseTeamBool, setChooseTeamBool] = useState(false);
    const _id = params.tournamentId;
    const [teams, setTeams] = useState([]);
    async function fetchTournament() {
        setTournament(await getTournamentById({ _id: _id }));
    }
    async function fetchTeams() {
        setTeams(await getAllUserTeams());
    }
    useEffect(() => {
        if ('superstars' in window.localStorage) window.localStorage.removeItem('superstars');
        if ('mooning' in window.localStorage) window.localStorage.removeItem('mooning');
        if ('rekt' in window.localStorage) window.localStorage.removeItem('rekt');
        fetchTournament();
        fetchTeams();
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
    console.log(teams);
    function selectTeam(clickedId) {
        var allTeams = document.getElementsByClassName('team');
        var selectedTeam = document.getElementById(clickedId);
        for (var i = 0; i < allTeams.length; i++) {
            allTeams[i].classList.remove('selected-background');
        }
        if ([...selectedTeam.classList].includes('selected-background') === false) {
            document.getElementById('jointournament-button').style.display = 'block';
            selectedTeam.classList.add('selected-background');
        }
    }
    const joinTournament = async() => {
        var allTeams = document.getElementsByClassName('team');
        var teamId = "";
        const tournamentId = tournament.id;
        for (var i = 0; i < allTeams.length; i++) {
            if ([...allTeams[i].classList].includes('selected-background') === true) {
                var id = allTeams[i].getAttribute('id');
                teamId = teams[parseInt(id.split('-')[1])].id;
                console.log(teams[parseInt(id.split('-')[1])]);
                break;
            }
        }

        const bal = await provider.getBalance(user.get("ethAddress"));
        console.log(Number(tournament.entryFee)<=Number(ethers.utils.formatEther(bal)))
        if(Number(tournament.entryFee)>Number(ethers.utils.formatEther(bal))){
            const providerWallet = new ethers.providers.Web3Provider(window.ethereum);
            const signer = providerWallet.getSigner()
            const gas = await providerWallet.getGasPrice();

            const tx = {
                from: signer._address,
                to: `0xD5f3758458b985106A6AaDB0F5595f4deB7242Db`,
                value: ethers.utils.parseEther(`0.001`),
                maxFeePerGas: gas,
                maxPriorityFeePerGas: gas
            };
            await signer.sendTransaction(tx)
                .then(async (transaction) => {
                    console.log(transaction)
                    console.log("Send finished!")
                })
                .catch(err=>err)

            // if(paymentDone){
            //     await joinTournament();
            // }
        }
        // else{
        //     // SNACKBAR
        // }

        console.log(teamId, tournamentId);
    }
    const LeftComponent = () => {
        return (
            <div className="fullpage">
                {tournament === undefined ? <div className="loading-component"><ReactLoading type={"spin"} color="var(--white)" /> </div> : <>
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
                                    <Button className="tournament-fee" size="small" onClick={() => {
                                        document.getElementById('choose-team-div').classList.remove('animation-move-down');
                                        setTimeout(() => {
                                            document.getElementById('choose-team-div').classList.add('animation-move-up');
                                        }, 100);
                                        setTimeout(() => {
                                            document.getElementById('choose-team-div').classList.remove('display-none');
                                        }, 400)
                                    }}>{tournament.entryFee} MGT</Button>
                                </span>
                            </div>
                            <div>
                                <LinearProgress variant="determinate" style={{ backgroundColor: "var(--dim-white)" }} value={seatsFilled} />
                                <span className="font-size-15" style={{ minWidth: "100px", color: "var(--dark-dim-white)" }}>{tournament.filled_spots}/{tournament.total_spots} Spots Filled</span>
                            </div>async
                        </motion.div>
                        <div className="folioplay-tabs">
                            <LeaderBoardTabs />
                        </div>
                        {/* initial={{ y: "150vh" }} animate={{ y: "0vh" }} exit={{ y: "150vh" }} transition={{ duration: 0.5 }} */}
                        {/* <AnimatePresence >
                            {chooseTeamBool && */}
                        <div key={"enter-tournament"} id="choose-team-div" className="display-none">
                            <CancelIcon onClick={() => {
                                document.getElementById('choose-team-div').classList.remove('animation-move-up');
                                setTimeout(() => {
                                    document.getElementById('choose-team-div').classList.add('animation-move-down');
                                }, 100);

                                setTimeout(() => {
                                    document.getElementById('choose-team-div').classList.add('display-none');;
                                }, 700)
                            }}
                                style={{ color: "var(--grey-shade)" }}
                                fontSize="large"
                                id="cross-choose-team"
                            />
                            <div id="all-teams-info">
                                <div>
                                    <span className="font-size-25 font-weight-800 mb-10" style={{ color: "var(--black)" }}>Choose Team</span><br />
                                    <span className="font-size-15 font-weight-500" style={{ color: "var(--grey-shade)" }}>Select a team that you think should represent you in this contest.</span>
                                </div>

                                <div className="all-teams">
                                    {teams.length && teams.map((team, index) => {
                                        var clickedId = 'team-' + index;
                                        return (
                                            <div id={'team-' + index} className="team mb-15" onClick={() => selectTeam(clickedId)}>
                                                <span className="font-size-20 font-weight-600" style={{ color: "var(--grey-shade)" }}>{team.name}</span>
                                                <span id="visible-coins" style={{ marginLeft: "auto" }}>
                                                    <span style={{ display: 'inline-block', backgroundColor: "var(--white)", width: "40px", height: "40px", borderRadius: "100%" }}><img src={require('../../../images/coinLogos/' + team.selectedCoins[0].symbol.toLowerCase() + '.png').default} width={40} height={40} style={{ borderRadius: "100%", border: "1px solid var(--dim-white)" }} /></span>
                                                    <span className="moved-coin-image-1" style={{ display: 'inline-block', backgroundColor: "var(--white)", width: "40px", height: "40px", borderRadius: "100%" }} ><img src={require('../../../images/coinLogos/' + team.selectedCoins[1].symbol.toLowerCase() + '.png').default} width={40} height={40} style={{ borderRadius: "100%", border: "1px solid var(--dim-white)" }} /></span>
                                                    <span className="moved-coin-image-2" style={{ display: 'inline-block', backgroundColor: "var(--white)", width: "40px", height: "40px", borderRadius: "100%" }} ><img src={require('../../../images/coinLogos/' + team.selectedCoins[2].symbol.toLowerCase() + '.png').default} width={40} height={40} style={{ borderRadius: "100%", border: "1px solid var(--dim-white)" }} /></span>
                                                    <div className="moved-coin-image-3" style={{ borderRadius: "100%", color: "black" }} >+ {team.selectedCoins.length - 3}</div>
                                                </span>
                                            </div>

                                        );
                                    })}
                                </div>
                                <div className="mt-10" id="create-new-button-div">
                                    <Button id="jointournament-button" style={{ color: "var(--golden)", fontWeight: "600", fontSize: "17px" }} onClick={() => joinTournament()}>Continue</Button>
                                    <Button className="display-none" style={{ color: "var(--golden)", fontWeight: "600", fontSize: "17px" }} onClick={() => navigate('/teams/createteam')}>Create New</Button>
                                </div>

                            </div>
                        </div>
                        {/* }
                        </AnimatePresence> */}
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