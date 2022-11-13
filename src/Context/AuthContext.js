import React, { createContext, useState, useEffect } from "react";
import {useMoralis} from "react-moralis";
import SnackbarComponent from "../Common/Snackbar";
import {CircularProgress} from "@mui/material";
import LoginGif from "../components/LoginPage/common/LoginGif";
// import {useNavigate} from "react-router";


export const AuthContext = createContext({});
const SERVER = process.env.REACT_APP_API_SERVER;

export const AuthContextProvider = ({ children }) => {

    const [presentAuthToken, setPresentAuthToken] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
<<<<<<< HEAD
<<<<<<< HEAD
    const [user, setUser] = useState(null);

    const {isAuthenticated} =
=======

    const {isAuthenticated, user, isInitialized} =
>>>>>>> 0fd28f9 (code change)
=======
    const [user, setUser] = useState(null);

    const {isAuthenticated} =
>>>>>>> 10d5df2 (build updated)
        useMoralis();

    function callLogin(){
        if(localStorage.getItem("authtoken")===null ||localStorage.getItem("authtoken")===undefined || localStorage.getItem("authtoken")===""){
            setTimeout(callLogin, 2000);
        }
        else {
<<<<<<< HEAD
<<<<<<< HEAD
            fetch(`${process.env.REACT_APP_API_SERVER}/user/`, {
=======
            fetch(`${process.env.REACT_APP_API_SERVER}/user/is-valid`, {
>>>>>>> 0fd28f9 (code change)
=======
            fetch(`${process.env.REACT_APP_API_SERVER}/user/`, {
>>>>>>> 10d5df2 (build updated)
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("authtoken"),
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw Error();
                    }
                    console.log("valid")
                    setPresentAuthToken(true);
                    setLoggedIn(true);
                    console.log(window.location.pathname)
                    if (window.location.pathname === "/")
                        window.location.pathname = "/tournaments";
                })
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("authtoken");
        if(isAuthenticated && (token === null || token === "")){
<<<<<<< HEAD
<<<<<<< HEAD
            callLogin();
        }
        else {
            fetch(`${process.env.REACT_APP_API_SERVER}/user/`, {
=======
            // setTimeout(()=>{
            //     callLogin();
            // }, 2000);
            callLogin();
        }
        else {
            fetch(`${process.env.REACT_APP_API_SERVER}/user/is-valid`, {
>>>>>>> 0fd28f9 (code change)
=======
            callLogin();
        }
        else {
            fetch(`${process.env.REACT_APP_API_SERVER}/user/`, {
>>>>>>> 10d5df2 (build updated)
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("authtoken"),
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw Error();
                    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 10d5df2 (build updated)
                    return res.json();
                })
                .then((data)=>{
                    // setUser({
                    //     walletAddress: data.walletAddress,
                    //     username: data.username,
                    //     referralCode: data.referralCode
                    // })
                    localStorage.setItem("folioUsername", data.username);
                    localStorage.setItem("folioWalletAddress", data.walletAddress);
                    localStorage.setItem("folioReferralCode", data.referralCode);
<<<<<<< HEAD
                    setPresentAuthToken(true);
                    setLoggedIn(true);
                    console.log(window.location.pathname)
                    if (window.location.pathname === "/")
                        window.location.pathname = "/tournaments";
                })
=======
                    console.log("valid")
=======
>>>>>>> 10d5df2 (build updated)
                    setPresentAuthToken(true);
                    setLoggedIn(true);
                    console.log(window.location.pathname)
                    if (window.location.pathname === "/")
                        window.location.pathname = "/tournaments";
                })
>>>>>>> 0fd28f9 (code change)
                .catch(err => {
                    if (window.location.pathname !== "/") {
                        localStorage.clear();
                        setUser(null);
                        window.location.pathname = "/";
                    }
                })
                .finally(() => setLoading(false));
        }
    },[])
<<<<<<< HEAD
<<<<<<< HEAD
=======
    console.log("isAuthenticated", isAuthenticated);
    console.log("isInitialized", isInitialized);
    console.log("presentAuthToken", presentAuthToken);
    console.log("loading", loading);
>>>>>>> 0fd28f9 (code change)
=======
>>>>>>> 10d5df2 (build updated)


    return (
        <AuthContext.Provider
            value={{loggedIn, presentAuthToken}}>
<<<<<<< HEAD
<<<<<<< HEAD
            {(!loading)? children: <LoginGif /> }
=======
            {(!loading)? children: <CircularProgress /> }
>>>>>>> 0fd28f9 (code change)
=======
            {(!loading)? children: <LoginGif /> }
>>>>>>> 10d5df2 (build updated)
        </AuthContext.Provider>
    );
}
