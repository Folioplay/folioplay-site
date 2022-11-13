import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'userDetails',
    initialState: {
        user: {
            id: null,
            walletAddress: null,
            username: null,
        },
    },
    reducers: {
        userDetails(state, action) {
            state.user.id = action.payload.id;
            state.user.walletAddress = action.payload.walletAddress;
            state.user.username = action.payload.username;
        }
    },
})

export const {  userDetails } = authSlice.actions;

export default authSlice.reducer;