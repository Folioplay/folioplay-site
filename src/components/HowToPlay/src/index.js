import React from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import "../style/index.css";
import LeftTournamentView from "./LeftTournamentView";
import RightTournamentView from "./RightTournamentView";

import folioPlayLogo from "../../../images/FPLogoManifest.png"
import folioPlayLogoText from "../../../images/white_folioplay.svg"
export default function HowToPlay() {
  const loading =true;
  return (
    <>
      {!loading ? (<>
      {/* <div style={{height:"100vh",width:"100vw",backgroundColor:"blue"}}>

     <div className="loginverfiyPageBlink">
        <div  className="bli">
<img src={folioPlayLogo} alt="folioplayLogo" style={{zIndex:"1",width:"50%"}} />
        </div></div> </div> */}
        <Box sx={{ width: '100vw', height: "100vh", backgroundColor: "#453df1", position: "absolute" }}>

<LinearProgress style={{ color: "blue", padding: "2px 0 0 0", backgroundColor: "white" }} />
<br/> 
<Box sx={{ display: 'flex', justifyContent: "center", width: "100%", backgroundColor: "blue" }}>
  <div className="loginverfiyPageBlink">
    <div className="blinkData">
      <div>
        <img src={folioPlayLogo} alt="folioplayLogo" className="loginVerifyFPLogo" style={{ zIndex: "1" }} />
      </div>
      <div> <img src={folioPlayLogoText} alt="folioplayLogo" className="loginVerifyFPText" style={{ zIndex: "1" }} />
      </div>
    </div></div>
</Box>

</Box>
        </>):(<>
          <FolioPlayLayout
      LeftComponent={LeftTournamentView}
      RightComponent={RightTournamentView}
    /></>
        )}
    
    </>
  
    
  );
}
