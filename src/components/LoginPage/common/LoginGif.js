import React from 'react';
import login_gif from "../../../images/folio_login_gif.gif";

const LoginGif = () => {
    return (
        <div className="loginGif">
            <img src={login_gif} alt="Loading..." height="100%" width="100%"/>
        </div>
    );
};

export default LoginGif;