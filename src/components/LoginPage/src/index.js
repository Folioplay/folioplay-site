import React, { useState, useEffect } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import "../style/index.css";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";
export default function LoginPage() {
  return (
    <FolioPlayLayout LeftComponent={LoginLeft} RightComponent={LoginRight} />
  );
}
