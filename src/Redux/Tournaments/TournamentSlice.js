import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {SERVER} from "../../APIS/apis";

export const  getTournamentAsync = createAsyncThunk(
    'tournament/',
    async()=>{
        return await fetch(`${SERVER}/tournament/`, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("authtoken"),
            }
        }).then((res) => res.json());
    }
)


export const getTournamentSlice = createSlice({
    name: 'get_tournament',
    initialState: {
        tournament:[],
    },
    reducers:{
    },
    extraReducers: {
        [getTournamentAsync.fulfilled]: (tournamentList, action) => {
            tournamentList.tournament=action.payload;
        },
    }
});

export default getTournamentSlice.reducer;