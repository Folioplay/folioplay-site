import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion/dist/framer-motion";

function createData(token, totalBalance, availableBalance) {
    return { token, totalBalance, availableBalance };
}

const rows = [
    createData(<div>USDT <b>Tether USD</b></div>, 65+'$', 65+'$'),
    createData(<div>USD <b>Coin</b></div>, 262, 16.0),
    createData(<b>DAI</b>, 159, 6.0),
];


const BalanceTable = () => {
    return (
    //     <div>
    //         <div className="leaderboard-entry ml-auto mr-auto mb-20 pb-10">
    //             <span className="mr-10"># Rank</span>
    //             <span className="ml-20">User</span>
    //             {/* <span className='ml-auto'>Team</span> */}
    //             <span className="ml-auto">Points</span>
    //         </div>
    //         {rows.length &&
    //             rows.map((entry, index) => {
    //             return (
    //                 <motion.div
    //                     initial={{ x: 400 }}
    //                     animate={{ x: 0 }}
    //                     transition={{ duration: 0.1 * index }}
    //                     className={"leaderboard-entry ml-auto mr-auto mb-20 pb-10"}
    //                 >
    //                     <span className="mr-10">{entry.token}</span>
    //                     {/* <div className="leaderboard-profile-image"></div> */}
    //                     <span className={"leaderboard-username ml-20"}>
    //                         {entry.totalBalance}
    //                     </span>
    //                     {/* <span className='leaderboard-teamname ml-auto'>{entry.team_name}</span> */}
    //                     <span className="ml-auto">{entry.availableBalance}</span>
    //                 </motion.div>
    //             );
    //         })}
    // </div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell className="tableRow">Token</TableCell>
                        <TableCell className="tableRow" align="center">Total Bal.</TableCell>
                        <TableCell className="tableRow" align="center">Avl. Bal.</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="tableContainer">
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.token}
                            </TableCell>
                            <TableCell align="center">{row.totalBalance}</TableCell>
                            <TableCell align="center">{row.availableBalance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BalanceTable;