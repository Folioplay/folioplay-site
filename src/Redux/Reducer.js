import {combineReducers} from "redux";
import AuthSlice from "./AuthSlice/AuthSlice";
import LeaderBoardSlice from "./LeaderBoard/LeaderBoardSlice";
import transactionSlice from "./Transaction/TransactionSlice";

export default combineReducers({
    // AuthSlice: AuthSlice,
    LeaderBoardSlice: LeaderBoardSlice,
    transactionSlice: transactionSlice,
})
