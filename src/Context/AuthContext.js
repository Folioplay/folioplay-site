import React, { createContext, useState, useEffect } from "react";
import {useMoralis} from "react-moralis";

export const AuthContext = createContext({});
const SERVER = process.env.REACT_APP_API_SERVER;

export const AuthContextProvider = ({ children }) => {
    const [validToken, setValidToken] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{

            fetch(`${SERVER}/user/is-valid`, {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("authtoken"),
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        localStorage.clear();
                        window.location.pathname = "/";
                    }
                })
                .catch((err) => err)
                .finally(() => setIsLoading(false));
    },[])
    const { logout } = useMoralis();


    const logOut = async () => {
        localStorage.setItem("authtoken", null);
        localStorage.removeItem("walletconnect");
        await logout();
    };

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
            value={validToken}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}
