import React from 'react';
import login_gif from "../../../images/folio_login_gif.gif";
import ReactLoading from "react-loading";

const LoginGif = () => {
    return (
        <div className="loginGif">
            <ReactLoading type={"bubbles"} color={"#453df1"} height={'10%'} width={'10%'} />
        </div>
    );
};

export default LoginGif;