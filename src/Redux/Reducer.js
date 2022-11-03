import {combineReducers} from "redux";
import AuthSlice from "./AuthSlice/AuthSlice";
import LeaderBoardSlice from "./LeaderBoard/LeaderBoardSlice";

export default combineReducers({
    // AuthSlice: AuthSlice,
    LeaderBoardSlice: LeaderBoardSlice
})
