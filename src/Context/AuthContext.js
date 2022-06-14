import React, {createContext, useEffect, useState} from "react";
import {useMoralis} from "react-moralis";


export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {

    const {isAuthenticated } = useMoralis();
    console.log(isAuthenticated);

    useEffect(()=>{
        if(!isAuthenticated && window.location.pathname!=="/"){
            window.location.pathname="/";
        }
        if(isAuthenticated && window.location.pathname==="/"){
            window.location.pathname="/tournaments";
        }
    })

    return (
        <AuthContext.Provider
            value={{ }}>
            {children}
        </AuthContext.Provider>
    );
}
