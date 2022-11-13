import React, { createContext, useState, useEffect } from "react";
import {useMoralis} from "react-moralis";
import SnackbarComponent from "../Common/Snackbar";
import {CircularProgress} from "@mui/material";
// import {useNavigate} from "react-router";


export const AuthContext = createContext({});
const SERVER = process.env.REACT_APP_API_SERVER;

export const AuthContextProvider = ({ children }) => {

    const [presentAuthToken, setPresentAuthToken] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const {isAuthenticated, user, isInitialized} =
        useMoralis();

    function callLogin(){
        if(localStorage.getItem("authtoken")===null ||localStorage.getItem("authtoken")===undefined || localStorage.getItem("authtoken")===""){
            setTimeout(callLogin, 2000);
        }
        else {
            fetch(`${process.env.REACT_APP_API_SERVER}/user/is-valid`, {
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
            // setTimeout(()=>{
            //     callLogin();
            // }, 2000);
            callLogin();
        }
        else {
            fetch(`${process.env.REACT_APP_API_SERVER}/user/is-valid`, {
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
                .catch(err => {
                    if (window.location.pathname !== "/") {
                        localStorage.clear();
                        window.location.pathname = "/";
                    }
                })
                .finally(() => setLoading(false));
        }
    },[])
    console.log("isAuthenticated", isAuthenticated);
    console.log("isInitialized", isInitialized);
    console.log("presentAuthToken", presentAuthToken);
    console.log("loading", loading);


    return (
        <AuthContext.Provider
            value={{loggedIn, presentAuthToken}}>
            {(!loading)? children: <CircularProgress /> }
        </AuthContext.Provider>
    );
}
