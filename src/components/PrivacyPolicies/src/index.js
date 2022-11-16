import React, { useEffect, useState } from "react";
import { Logout } from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Slide from '@mui/material/Slide';
import Modal from '@mui/material/Modal';
import { closePrivacyPolicies } from "../common/closePrivacyPolicies";
import { AuthContext } from "../../../Context/AuthContext";
import '../style/index.css'
export default function PrivacyPolicies() {
    const [openPolicies, setOpenPolicies] = useState(false);
    const handleOpenPolicies = () => setOpenPolicies(true);
    const handleClosePolicies = () => setOpenPolicies(false);
    const style = {

    };
    const style1 = {
        
        ['@media (maxWidth:600px)']: {
            left: "8%",
            width: "70%"
        }
    };
    useEffect(() => {
        // document.getElementsByClassName('overlay-div')[0].classList.add('overlay');
        document.getElementsByClassName('folio-privacy-policies')[0].addEventListener('mouseup', function (event) {
            var pol = document.getElementById('policies-div');
            console.log(event.target,event.target.parentNode);
            if (event.target !== pol && event.target.parentNode !== pol &&event.target.parentNode.parentNode !== pol) {
                closePrivacyPolicies();
                return;
            }
        });
    }, [])


    return (
        <div className="folio-privacy-policies display-none" style={style}>
            <div style={style1} id="policies-div">
                {/* <Slide direction="up" in={openPolicies} mountOnEnter unmountOnExit> */}
                    <div style={{ fontFamily: "poppins",width:"100%",height:"100%" }}>
                        <embed src={require("../../../images/privacyPolicies.pdf").default} style={{ fontFamily: "poppins",width:"100%",height:"100%",borderRadius:"12px" }}/>
                    </div>
                {/* </Slide> */}
            </div >
        </div >
    );
}