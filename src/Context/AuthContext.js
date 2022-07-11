import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});
const SERVER = "https://folioplay-api.ssrivastava.tech";

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
                if(!res.ok) {
                    localStorage.clear();
                    window.location.pathname="/";
                }
            })
            .catch((err) => err)
            .finally(()=> setIsLoading(false));

    },[])

    return (
        <AuthContext.Provider
            value={validToken}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}
