import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {SERVER} from "../../APIS/apis";




export const getSelectedCoins = createSlice({
    name: 'get_coins',
    initialState: {
       
        selectedItem:[]
    },
    reducers:{
        toggleSelectedCoins: (state, action) => {
            // const coin = state.coins.find(coin => coin.id === action.payload);
            // if (coin) {
            //     coin.selected = !coin.selected;
            // }
state.selectedItem=[...state.selectedItem,action.payload]
        },
    },
   
});


export const { toggleSelectedCoins } = getSelectedCoins.actions;
export default getSelectedCoins.reducer;