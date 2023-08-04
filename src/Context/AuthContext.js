import React, { createContext, useState, useEffect } from "react";
// import { Magic } from 'magic-sdk';
// import { OAuthExtension } from "@magic-ext/oauth";

import SnackbarComponent from "../Common/Snackbar";
import {CircularProgress} from "@mui/material";
import LoginGif from "../components/LoginPage/common/LoginGif";
import ReactLoading from "react-loading";
// import {useNavigate} from "react-router";

//  Naman
import { json, useNavigate } from "react-router-dom";   
import { Magic } from 'magic-sdk';
import { OAuthExtension } from "@magic-ext/oauth";


export const AuthContext = createContext({});
// const SERVER = process.env.REACT_APP_API_SERVER;
const SERVER = process.env.REACT_APP_API_SERVER;

export const AuthContextProvider = ({ children }) => {

    const [presentAuthToken, setPresentAuthToken] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState("");


       
          const checkLoggedIn = async () => {
            try {
                const tokenn = await localStorage.getItem("authtoken");
                const Loggedinn = await  localStorage.getItem("isLoggedIn");
                const didTokenn = await localStorage.getItem("authtoken");
                await setLoggedIn(Loggedinn) ; 
                
               
                await setIsAuthenticated(Loggedinn);   
                await setPresentAuthToken(Loggedinn);

                
               const userr = await localStorage.getItem("user");
               await setUser(userr);
               const walletAddresss = await localStorage.getItem("walletAddress");
           
            } catch (err) {
              console.error(err);
            }
          };


    function callLogin(){
        if(localStorage.getItem("authtoken")===null ||localStorage.getItem("authtoken")===undefined || localStorage.getItem("authtoken")===""){
           
                setTimeout(callLogin, 1000);            
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
                    if (window.location.pathname === "/" || window.location.pathname === "/loginverify")
                        window.location.pathname = "/tournaments";
                })
                .catch(err => {
                    if (window.location.pathname !== "/" || window.location.pathname !== "/loginverify") {
                        localStorage.clear();
                        if ( window.location.pathname === "/loginverify") {
                           
                        }else{
                            localStorage.clear();
                            window.location.pathname = "/"; 
                        }
                       
                    }
                })
                .finally(() => setLoading(false));
        }
    }

    useEffect(()=>{
        checkLoggedIn();
        const token = localStorage.getItem("authtoken");
        if(isAuthenticated && (token === null || token === "")){
           
                    setTimeout(callLogin, 2000);
                
        }
        else {
            fetch(`http://13.235.244.216/user/`, {
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
                    if (window.location.pathname === "/" || window.location.pathname === "/loginverify")
                        window.location.pathname = "/tournaments";

                        if (window.location.pathname === "/loginverify")
                        window.location.pathname = "/tournaments";
                })
                .catch(err => {
                    // if (window.location.pathname !== "/") {
                    //     localStorage.clear();
                    //     window.location.pathname = "/";
                    // }

                    if (window.location.pathname !== "/loginverify") {
                       
                 
                        if (window.location.pathname !== "/") {
                            localStorage.clear();
                            window.location.pathname = "/";
                        }
                    }
                })
                .finally(() => setLoading(false));
    
    }
    },[])


    return (
        <AuthContext.Provider
            value={{loggedIn, presentAuthToken , user}}>
            {(!loading)? children: <div className="loadingReactScreen"><ReactLoading /> </div>}
        </AuthContext.Provider>
    );
}
// import React, { createContext, useState, useEffect } from "react";
// import { CircularProgress } from "@mui/material";
// import ReactLoading from "react-loading";

// export const AuthContext = createContext({});

// export const AuthContextProvider = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("authtoken"));
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const authToken = localStorage.getItem("authtoken");
//       if (authToken) {
//         try {
//           const res = await fetch(`${process.env.REACT_APP_API_SERVER}/user/`, {
//             method: "GET",
//             headers: {
//               "x-access-token": authToken,
//             },
//           });
//           if (!res.ok) {
//             throw new Error("Failed to fetch user data.");
//           }
//           const data = await res.json();
//           localStorage.setItem("user", JSON.stringify(data));
//           setLoggedIn(true);
//         } catch (error) {
//           console.error(error);
//           logout();
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     // Add a delay of 2000 milliseconds before checking authentication status
//     const delay = 15000;
//     const timerId = setTimeout(() => {
//       checkAuthentication();
//     }, delay);

//     // Clean up the timer to avoid memory leaks
//     return () => clearTimeout(timerId);
//   }, []);

//   const login = (authToken, userData) => {
//     localStorage.setItem("authtoken", authToken);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setLoggedIn(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("authtoken");
//     localStorage.removeItem("user");
//     setLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ loggedIn, login, logout }}>
//       {!loading ? (
//         children
//       ) : (
//         <div className="loadingReactScreen">
//           <ReactLoading />
//         </div>
//       )}
//     </AuthContext.Provider>
//   );
// };
