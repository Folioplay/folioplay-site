import React, { createContext, useState, useEffect } from "react";
import {useMoralis} from "react-moralis";
import SnackbarComponent from "../Common/Snackbar";
import {CircularProgress} from "@mui/material";
// import {useNavigate} from "react-router";


export const AuthContext = createContext({});
const SERVER = process.env.REACT_APP_API_SERVER;

export const AuthContextProvider = ({ children }) => {

    const {isAuthenticated, user, isInitialized} =
        useMoralis();
    console.log(isAuthenticated, user, isInitialized);
    // const navigate = useNavigate();

    // const [validToken, setValidToken] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [user, setUserDetails] = useState(null);

    const checkValidAuthToken = async () => {
        await fetch(`${SERVER}/user/is-valid`, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("authtoken"),
            },
        })
            .then((res) => {
                return res.ok;
            })

    }

    const callLogin = async() => {

        if(localStorage.getItem("authtoken")===null ||localStorage.getItem("authtoken")===undefined || localStorage.getItem("authtoken")===""){              debugger
            setTimeout(callLogin, 2000);
        }
        else{
            debugger
            fetch(`${SERVER}/user/is-valid`, {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("authtoken"),
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        console.log("reserr", res.body)
                        if (res.status === 403)
                            throw new Error();

                    }
                    else{
                        setIsLoading(false);
                    }
                })
                .catch(err => {
                    debugger
                    localStorage.clear();
                    window.location.pathname = "/";
                })
            // setIsLoading(false);
            // clearTimeout(id);
        }

    }

    useEffect(()=>{
        // const {isAuthenticated, isWeb3Enabled, user, isInitialized, isAuthenticating, logout} =
        //     useMoralis();
        //
        // console.log(isAuthenticated, user, isInitialized);

        console.log("context isauthenticated", isAuthenticated)

        if(isAuthenticated){
            debugger

            setIsLoading(true);

            fetch(`${SERVER}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: user.walletAddress,
                    signature: user.walletSignature,
                    // email: user.email
                }),
            })
                .then((res) => {
                    if (!res.ok) throw "Invalid user";
                    else return res.json();
                })
                .then((data) => {
                    localStorage.removeItem("authtoken");
                    localStorage.setItem("authtoken", data.accessToken);
                    return {
                        "userdata": data.user,
                        "new_user": data.newUser
                    };
                });

            // callLogin();

            if(localStorage.getItem("authtoken")===undefined || localStorage.getItem("authtoken")===""){
                callLogin();
            }
            else{
                fetch(`${SERVER}/user/is-valid`, {
                    method: "GET",
                    headers: {
                        "x-access-token": localStorage.getItem("authtoken"),
                    },
                })
                    .then((res) => {
                        if (!res.ok) {
                            console.log("reserr", res.body)
                            if (res.status === 403)
                                throw new Error();

                        }
                        else{
                            setIsLoading(false);
                        }
                    })
                    .catch(err => {
                        localStorage.clear();
                        window.location.pathname = "/";
                    })
            }
        }


        // fetch(`${SERVER}/user/is-valid`, {
        //     method: "GET",
        //     headers: {
        //         "x-access-token": localStorage.getItem("authtoken"),
        //     },
        // })
        //     .then((res) => {
        //         if (!res.ok) {
        //             console.log("reserr", res.body)
        //             if (res.status === 403)
        //                 throw new Error();
        //
        //         }
        //     })
        //     .catch(err => {
        //         localStorage.clear();
        //         window.location.pathname = "/";
        //     })
        //
        //
        //
        //     if(!user){
        //         fetch(`${SERVER}/user/`, {
        //             method: "GET",
        //             headers: {
        //                 "x-access-token": localStorage.getItem("authtoken"),
        //             },
        //         })
        //             .then((res) => res.json())
        //             .then((data)=> {
        //                 localStorage.setItem("folioUsername", data.username);
        //                 localStorage.setItem("folioWalletAddress", data.walletAddress);
        //                 localStorage.setItem("folioReferralCode", data.referralCode);
        //                 setUserDetails(data);
        //             })
        //             .catch((err) => err)
        //             .finally(() => setIsLoading(false));
        //     }
    },[])

    console.log("isLoading", isLoading);

    const setLoadingTrue = () => {
        setIsLoading(true);
    }

    const setLoadingFalse = () => {
            setIsLoading(false);
        }


    // const logOutContext = () => {
    //     setUserDetails(null);
    // };

    // if (window.ethereum) {
    //     const { ethereum } = window;
    //     if (ethereum && ethereum.isMetaMask) {
    //         if (localStorage.getItem("walletType") === "metamask") {
    //             // console.log("ftfryfyffiuf5ttt", window.ethereum);
    //             if (!window.ethereum.networkVersion && window.ethereum.networkVersion!=='137') {
    //                 // console.log("esdrftgyhuj",window.ethereum)
    //                 logOut();
    //             }
                // // console.log(localStorage.getItem("walletType") === "metamask" && window.ethereum);
                // window.ethereum.on("chainChanged", async ([networkId]) => {
                //     console.log("in bhai")
                //     if (networkId !== '137') {
                //         await logOut();
                //         alert("Network ID change detected. Connect to Polygon Mainnet.")
                //     }
                // });
                //
                // window.ethereum.on("accountsChanged", async ([newAddress]) => {
                //         await logOut();
                //         alert("Account change detected. Please Sign-in Again.")
                //     }
                // );
            // }
    //     }
    // }

        return (
        <AuthContext.Provider
            value={{isLoading, setLoadingTrue, setLoadingFalse}}>
            {!isLoading ? children : <CircularProgress />}
        </AuthContext.Provider>
    );
}
