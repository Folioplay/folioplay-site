import React from "react";

function LoginRight() {
  return (
    <div id="login-page-image">
      <img
        alt="folioplay-logo"
        src={require("../../../images/folioplayLogo.png").default}
      />
      <img src={require("../../../images/white_folioplay.svg").default} />
      <h3 style={{ letterSpacing: "2px" }}>
        Decentralized fantasy gaming platform
      </h3>
    </div>
  );
}

export default LoginRight;
