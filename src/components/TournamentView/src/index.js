import React from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";

import "../style/index.css";
import LeftTournamentView from "./LeftTournamentView";
import RightTournamentView from "./RightTournamentView";
export default function TournamentView() {
  return (
    <FolioPlayLayout
      LeftComponent={LeftTournamentView}
      RightComponent={RightTournamentView}
    />
  );
}
