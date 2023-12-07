import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {SERVER} from "../../APIS/apis";

export const  getCoinsAsync = createAsyncThunk(
    'coins/',
    async () => {
        const response = await fetch(`${SERVER}/coins/`, {
            method: "GET",
        });
        const data = await response.json();

        // Add 'selected: false' to each object in the array
        const updatedData = data.map(item => ({ ...item, selected: false }));

        return updatedData;
    }
)

const persistedState = localStorage.getItem('selectedCoins');
const initialState = persistedState ? JSON.parse(persistedState) : { coins: [] };


export const getCoinsSlice = createSlice({
    name: 'get_coins',
    initialState,
    reducers:{
        toggleSelected: (state, action) => {
            const coin = state.coins.find(coin => coin.id === action.payload);
            if (coin) {
                coin.selected = !coin.selected;
                
            }
// state.selectedItem=[...state.selectedItem,action.payload]
localStorage.setItem('selectedCoins', JSON.stringify(state));      
},
    },
    extraReducers: {
        [getCoinsAsync.fulfilled]: (coinsList, action) => {
            coinsList.coins=action.payload;
        },
    }
});


export const { toggleSelected } = getCoinsSlice.actions;
export default getCoinsSlice.reducer;