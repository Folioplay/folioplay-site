import React, { createContext, useState, useEffect } from "react";
import {useMoralis} from "react-moralis";
import SnackbarComponent from "../Common/Snackbar";
import {CircularProgress} from "@mui/material";
import LoginGif from "../components/LoginPage/common/LoginGif";
import ReactLoading from "react-loading";
// import {useNavigate} from "react-router";


export const AuthContext = createContext({});
const SERVER = process.env.REACT_APP_API_SERVER;

export const AuthContextProvider = ({ children }) => {

    const [presentAuthToken, setPresentAuthToken] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const {isAuthenticated} =
        useMoralis();

    function callLogin(){
        if(localStorage.getItem("authtoken")===null ||localStorage.getItem("authtoken")===undefined || localStorage.getItem("authtoken")===""){
            setTimeout(callLogin, 2000);
        }
        else {
            fetch(`${process.env.REACT_APP_API_SERVER}/user/`, {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("authtoken"),
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw Error();
                    }
                    return res.json();
                })
                .then((data)=>{
                    localStorage.setItem("folioUsername", data.username);
                    localStorage.setItem("folioWalletAddress", data.walletAddress);
                    localStorage.setItem("folioReferralCode", data.referralCode);
                    setPresentAuthToken(true);
                    setLoggedIn(true);
                    console.log(window.location.pathname)
                    if (window.location.pathname === "/")
                        window.location.pathname = "/tournaments";
                })
                .catch(err => {
                    if (window.location.pathname !== "/") {
                        localStorage.clear();
                        window.location.pathname = "/";
                    }
                })
                .finally(() => setLoading(false));
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("authtoken");
        if(isAuthenticated && (token === null || token === "")){
            callLogin();
        }
        else {
            fetch(`${process.env.REACT_APP_API_SERVER}/user/`, {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("authtoken"),
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw Error();
                    }
                    return res.json();
                })
                .then((data)=>{
                    localStorage.setItem("folioUsername", data.username);
                    localStorage.setItem("folioWalletAddress", data.walletAddress);
                    localStorage.setItem("folioReferralCode", data.referralCode);
                    setPresentAuthToken(true);
                    setLoggedIn(true);
                    console.log(window.location.pathname)
                    if (window.location.pathname === "/")
                        window.location.pathname = "/tournaments";
                })
                .catch(err => {
                    if (window.location.pathname !== "/") {
                        localStorage.clear();
                        window.location.pathname = "/";
                    }
                })
                .finally(() => setLoading(false));
        }
    },[])


    return (
        <AuthContext.Provider
            value={{loggedIn, presentAuthToken}}>
            {(!loading)? children: <ReactLoading /> }
        </AuthContext.Provider>
    );
}
