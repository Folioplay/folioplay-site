import React, {createContext, useEffect, useState} from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {ethers, providers} from "ethers";


export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {

    //
    // useEffect(()=>{
    //     if(userWalletAddress!==null){
    //         window.location.pathname="/main";
    //     }
    // },[]);

    const [loggedIn, setLoggedIn] = useState(false);
    const [userWalletAddress, setUserWalletAddress] = useState(null);
    const [provider, setProvider] = useState(null);

    //TODO: Check the account exist or not

    const loginWalletConnect = async () => {
        const providerValue = new WalletConnectProvider({
            infuraId: "134301986fcf465687fd8dfc3919f066",
            // rpc: {
            //     137: "https://polygon-rpc.com/",
            // },
        });
        await providerValue.enable();
        console.log(providerValue);
        const web3Provider = new providers.Web3Provider(providerValue);
        setProvider(web3Provider);
        const account = web3Provider.provider.accounts[0];
        setLoggedIn(true);
        setUserWalletAddress(account);
        // await providerValue.disconnect();
    };

    const loginMetamask = async () => {
        const providerValue = new ethers.providers.Web3Provider(window.ethereum);
        const account = await providerValue.send("eth_requestAccounts", []);
        setUserWalletAddress(account[0]);
        // TODO: Call api to check account present in database
    };

    const logout = async () => {
        setLoggedIn(false);
        setUserWalletAddress(null);
        // TODO: Disconnect Provider session
    };

    return (
        <AuthContext.Provider
            value={{logout, loginWalletConnect, loggedIn, userWalletAddress, provider, loginMetamask}}>
            {children}
        </AuthContext.Provider>
    );
}
