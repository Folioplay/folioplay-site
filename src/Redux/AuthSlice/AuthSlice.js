import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import WalletConnectProvider from "@walletconnect/web3-provider";
import {ethers, providers} from "ethers";


export const loginWalletConnect = createAsyncThunk(
    'users/fetchDataWalletConnect',
    async () => {
    const providerValue = new WalletConnectProvider({
        infuraId: "134301986fcf465687fd8dfc3919f066",
        // rpc: {
        //     137: "https://polygon-rpc.com/",
        // },
    });
    await providerValue.enable();
    const web3Provider = new providers.Web3Provider(providerValue);
    const account = web3Provider.provider.accounts[0];
    return (account);
    // await providerValue.disconnect();
});

export const loginMetamask = createAsyncThunk(
    'users/fetchDataMetamask',
    async () => {
    const providerValue = new ethers.providers.Web3Provider(window.ethereum);
    const account = await providerValue.send("eth_requestAccounts", []);
    console.log(account[0]);
    const userAccount = account[0];
    return (userAccount);
    // TODO: Call api to check account present in database
});

export const authSlice = createSlice({
    name: 'walletAddress',
    initialState: {
        userInfo: {
            loggedIn: null,
            userWalletAddress: null,
            provider: null,
        },
    },
    reducers: {
    },
    extraReducers:{
        [loginWalletConnect.fulfilled]: (state, action)=>{
            state.userInfo["userWalletAddress"] = action.payload;
            // state.userInfo.provider = action.payload.web3Provider;
            state.userInfo["loggedIn"]= true;
            console.log(state.userInfo.userWalletAddress);
            console.log(action.payload);
        },
        [loginMetamask.fulfilled]: (state,action)=>{
            state.userInfo.userWalletAddress = action.payload;
            // state.userInfo.provider = action.payload.web3Provider;
            state.userInfo.loggedIn= true;
        }
    }
})

export const { } = authSlice.actions;

export default authSlice.reducer;