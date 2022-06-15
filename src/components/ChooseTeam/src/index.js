import React, { useState, useEffect } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import '../style/index.css'


export function TeamCreation() {
    const LeftComponent = () => {
        return (
            <div className="fullpage">
            </div>
        );
    }

    const RightComponent = () => {
        return (
            <div>
            </div>
        );
    }
    return (
        <FolioPlayLayout LeftComponent={LeftComponent} RightComponent={RightComponent} />
    );
}