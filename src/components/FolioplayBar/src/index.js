import React, {useContext, useEffect, useState} from "react";
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
import {Menu, MenuItem} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {AuthContext} from "../../../Context/AuthContext";
import Divider from "@mui/material/Divider";
import { useMoralis } from "react-moralis";
import {ethers} from "ethers";

export default function FolioplayBar() {

    const { logout, user } = useMoralis();
    console.log(user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const provider = new ethers.providers.JsonRpcProvider(`https://polygon-rpc.com/`);
    const [balance, setBalance] = useState("");




    useEffect( () => {
        async function ethBalanceSet() {
            const bal = await provider.getBalance(user.get("ethAddress"));
            setBalance(ethers.utils.formatEther(bal));
        }
        if(user)
            ethBalanceSet();
    },[user])


    const logOut = async () => {
        localStorage.setItem("authtoken", null);
        localStorage.removeItem("walletconnect");
        await logout();
        window.location.pathname="/";
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                {['Home', 'Tournaments', 'Activity'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon style={{ color: "var(--dim-white)" }} /> : <MailIcon style={{ color: "var(--dim-white)" }} />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon style={{ color: "var(--dim-white)" }} />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} onClick={logOut} />
                </ListItem>
            </List>
        </Box>
    );
    return (
        <div className="folioplay-bar-content-wrapper">
            <img id="folioplay-hamburger" className="mr-20" onClick={toggleDrawer('left', true)} src={hamburgerIcon} alt="hamburger-icon" width={"20"} height={"12"} style={{ marginLeft: "3.75%" }} />
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: "var(--dim-violet-blue)",
                        color: "var(--white)"
                    }
                }}
                anchor={"left"}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >{list('left')}</Drawer>
            <span className="font-weight-800 font-size-25">FolioPlay</span>
            <React.Fragment>
                <img id="folioplay-wallet" className="ml-auto" src={walletIcon} alt="wallet-icon" width={"20"} height={"18"} style={{ marginRight: "3.75%" }} onClick={handleClick} />
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem  >
                        Balance : {balance}
                    </MenuItem>
                    <Divider />
                    <MenuItem  >
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Add Money
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Manage Transactions
                    </MenuItem>
                </Menu>
            </React.Fragment>
        </div>
    );
}