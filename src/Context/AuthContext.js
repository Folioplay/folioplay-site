import React, {createContext, useEffect, useState} from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, providers } from "ethers";
import {useMoralis} from "react-moralis";


export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {

    const {isAuthenticated } = useMoralis();

    return (
        <AuthContext.Provider
            value={{ }}>
            {children}
        </AuthContext.Provider>
    );
}
