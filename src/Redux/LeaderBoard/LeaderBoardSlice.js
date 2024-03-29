import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const  getLeaderboardAsync = createAsyncThunk(
    'leaderboard/',
    async(tournament_id)=>{
        return await fetch(`${process.env.REACT_APP_API_SERVER}/tournament/leaderboard/${tournament_id}`, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("authtoken"),
            },
        }).then((res) => res.json());
    }
)

export const  getWinnersAsync = createAsyncThunk(
    'winners/',
    async(tournament_id)=>{
        return await fetch(`${process.env.REACT_APP_API_SERVER}/tournament/winners/${tournament_id}`, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("authtoken"),
            },
        }).then((res) => res.json());
    }
)

export const  getPersonalLeaderBoardAsync = createAsyncThunk(
    'rank/',
    async(tournament_id)=>{
        return await fetch(`${process.env.REACT_APP_API_SERVER}/tournament/rank/${tournament_id}`, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("authtoken"),
            },
        }).then((res) => res.json());
    }
)


export const getLeaderboardSlice = createSlice({
    name: 'get_leaderboard',
    initialState: {
        leaderBoard:[],
        referralModal: false,
        winners: [],
        personalLeaderboard: []
    },
    reducers:{
        openReferralModal(state) {
            state.referralModal=true;
        },
        closeReferralModal(state){
            state.referralModal=false;
        }

    },
    extraReducers: {
        [getLeaderboardAsync.fulfilled]: (leaderBoardList, action) => {
            leaderBoardList.leaderBoard=action.payload;
        },
        [getWinnersAsync.fulfilled]: (winnersList, action) => {
            winnersList.winners=action.payload;
        },
        [getPersonalLeaderBoardAsync.fulfilled]: (personalList, action) => {
            personalList.personalLeaderboard=action.payload;
        },
    }
});
export const { openReferralModal, closeReferralModal } = getLeaderboardSlice.actions

export default getLeaderboardSlice.reducer;