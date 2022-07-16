import React, { useEffect } from "react";
import '../style/index.css'
import CircleIcon from '@mui/icons-material/Circle';
import { SettingsApplicationsRounded } from "@mui/icons-material";

export default function ImageSlider({ handlers, setPaused }) {
    console.log(handlers)
    return (
        <div className="mt-20 mb-20" style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
            <div id="image-slider-wrapper">

                <div
                    // {...handlers} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} 
                    className="image-div image-1 mr-20">
                    <img
                        // {...handlers} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} 
                        src={require('../../../images/image2.png').default} width="100%" height={"150px"} />
                </div>
                <div
                    // {...handlers} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} 
                    className="image-div image-2 mr-20">
                    <img
                        // {...handlers} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} 
                        src={require('../../../images/image1.png').default} width="100%" height={"150px"} />
                </div>
                <div
                    // {...handlers} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} 
                    className="image-div image-3 mr-20">
                    <img
                        // {...handlers} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} 
                        src={require('../../../images/image1.png').default} width="100%" height={"150px"} />
                </div>
                <div
                    // {...handlers} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} 
                    className="image-div image-4 mr-20">
                    <img
                        // {...handlers} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} 
                        src={require('../../../images/image1.png').default} width="100%" height={"150px"} />
                </div>
            </div>
        </div>
    );
}