import {combineReducers} from "redux";
import AuthSlice from "./AuthSlice/AuthSlice";
import LeaderBoardSlice from "./LeaderBoard/LeaderBoardSlice";
import transactionSlice from "./Transaction/TransactionSlice";
import tournamentSlice from "./Tournaments/TournamentSlice";

export default combineReducers({
    // AuthSlice: AuthSlice,
    LeaderBoardSlice: LeaderBoardSlice,
    transactionSlice: transactionSlice,
    tournamentSlice: tournamentSlice,
})
