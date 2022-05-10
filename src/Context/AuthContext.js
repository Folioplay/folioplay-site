import React, {createContext, useEffect, useState} from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, providers } from "ethers";


export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userWalletAddress, setUserWalletAddress] = useState(null);
    const [provider, setProvider] = useState(null);



    useEffect(  () => {
        async function allotWallet() {
            if (localStorage.getItem("walletType") === "metamask") {
                await loginMetamask();
            } else {
                if (localStorage.getItem("walletType") === "walletConnect") {
                    await loginWalletConnect();
                }
            }
        }
        allotWallet();
    },[]);
    //TODO: Check the account exist or not
    //
    const loginWalletConnect = async () => {
        const providerValue = new WalletConnectProvider({
            infuraId: "134301986fcf465687fd8dfc3919f066",
            // rpc: {
            //     137: "https://polygon-rpc.com/",
            // },
        });
        await providerValue.enable();
        const web3Provider = new providers.Web3Provider(providerValue);
        setProvider(web3Provider);
        const account = web3Provider.provider.accounts[0];
        setLoggedIn(true);
        setUserWalletAddress(account);
        localStorage.setItem("walletAddress", account);
        localStorage.setItem("walletType", "walletConnect");
        // await providerValue.disconnect();
    };

    const loginMetamask = async () => {
        const providerValue = new ethers.providers.Web3Provider(window.ethereum);
        const account = await providerValue.send("eth_requestAccounts", []);
        setUserWalletAddress(account[0]);
        localStorage.setItem("walletAddress", account[0]);
        localStorage.setItem("walletType", "metamask");
        // TODO: Call api to check account present in database
    };

    const logout = async () => {
        setLoggedIn(false);
        setUserWalletAddress(null);
        localStorage.setItem("walletAddress", null);
        localStorage.setItem("walletType", null);
        // TODO: Disconnect Provider session
    };

    return (
        <AuthContext.Provider
            value={{ logout, loginWalletConnect, loggedIn, userWalletAddress, provider, loginMetamask }}>
            {children}
        </AuthContext.Provider>
    );
}
