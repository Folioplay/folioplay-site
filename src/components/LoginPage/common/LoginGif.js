import React from 'react';
import ReactLoading from "react-loading";

const LoginGif = () => {
    return (
        <div className="loginGif">
            <ReactLoading type={"bubbles"} color={"#453df1"} height={'10%'} width={'10%'} />
        </div>
    );
};

export default LoginGif;