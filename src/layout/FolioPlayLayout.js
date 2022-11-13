import React, {useState} from 'react';
import PrivacyPolicies from '../components/PrivacyPolicies/src';
import './FolioPlayLayoutCss.css'
export default function FolioPlayLayout({ LeftComponent, RightComponent }) {

    return (

        <div className="wrapper" style={{ color: "var(--white)" }}>
            <div className='overlay-div'></div>
            <PrivacyPolicies />
            {/*<ReferralModal />*/}
            <div className="folioplay-left-view">
                <LeftComponent />
            </div>
            <div className='folioplay-right-view'>
                <RightComponent />
            </div>
        </div >

    );
}