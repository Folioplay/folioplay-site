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


export const getLeaderboardSlice = createSlice({
    name: 'get_leaderboard',
    initialState: {
        leaderBoard:[]
    },
    reducers:{

    },
    extraReducers: {
        [getLeaderboardAsync.fulfilled]: (leaderBoardList, action) => {
            leaderBoardList.leaderBoard=action.payload;
            console.log(leaderBoardList.leaderBoard);
        },
    }
});

export default getLeaderboardSlice.reducer;