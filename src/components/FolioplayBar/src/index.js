import React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import walletIcon from '../../../images/Vectorwallet.png'
import hamburgerIcon from '../../../images/Vectorhamburger.png'
import '../style/index.css'
export default function FolioplayBar() {
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}

        >
            <List>
                {['Home', 'Tournaments', 'Activity', 'Logout'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon style={{ color: "var(--dim-white)" }} /> : <MailIcon style={{ color: "var(--dim-white)" }} />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            {/* <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );
    return (
        <div className="folioplay-bar-content-wrapper">
            <img id="folioplay-hamburger" onClick={toggleDrawer('left', true)} src={hamburgerIcon} alt="hamburger-icon" width={"20"} height={"12"} style={{ marginLeft: "3.75%", marginRight: "20px" }} />
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: "var(--dim-violet-blue)",
                        color: "var(--white)",
                        backdropFilter: "blur(3px)"
                    }
                }}
                anchor={"left"}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >{list('left')}</Drawer>
            <span style={{ fontSize: "1.5rem", fontWeight: "800", letterSpacing: "1px" }}>FolioPlay</span>
            <img id="folioplay-wallet" src={walletIcon} alt="wallet-icon" width={"20"} height={"18"} style={{ marginRight: "3.75%", marginLeft: "auto" }} />
        </div>
    );
}