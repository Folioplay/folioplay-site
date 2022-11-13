import React, { useContext, useEffect, useRef, useState } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import "../style/index.css";

import UserProfileLeft from "./UserProfileLeft";
import UserProfileRight from "./UserProfileRight";
export default function UserProfile() {
  return (
    <FolioPlayLayout
      LeftComponent={UserProfileLeft}
      RightComponent={UserProfileRight}
    />
  );
}
