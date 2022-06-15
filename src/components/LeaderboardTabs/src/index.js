import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { motion } from 'framer-motion/dist/framer-motion'
import { leaderboard } from '../../TournamentView/common/leaderboard';
import '../style/index.css'

export default function LeaderBoardTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const leaderBoard = leaderboard.map((entry, index) => {
        return (
            <motion.div initial={{ x: 400 }} animate={{ x: 0 }} transition={{ duration: 0.1 * index }} className='leaderboard-entry ml-auto mr-auto mb-20 pb-10'>
                <span className='mr-10'>
                    # {index + 1}
                </span>
                <div className='leaderboard-profile-image' ></div>
                <span className='leaderboard-username ml-20'>{entry.name}</span>
                {/* <span className='leaderboard-teamname ml-auto'>{entry.team_name}</span> */}
                <span className='ml-auto'>{entry.points}</span>
            </motion.div >
        );
    })
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Winnings" value="1" />
                        <Tab label="Leader Board" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    Winnings
                </TabPanel>
                <TabPanel value="2">
                    <div className='leaderboard-entry ml-auto mr-auto mb-20 pb-10'>
                        <span className='mr-10'>
                            # Rank
                        </span>
                        <span className='ml-20'>User</span>
                        {/* <span className='ml-auto'>Team</span> */}
                        <span className='ml-auto'>Points</span>
                    </div >
                    {leaderBoard}
                </TabPanel>
            </TabContext>
        </Box>
    );
}