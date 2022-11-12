import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const  getTransactionsAsync = createAsyncThunk(
    'transactions/',
    async()=>{
        return await fetch(
            `${process.env.REACT_APP_API_SERVER}/wallet`,
            {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("authtoken"),
                },
            }
        ).then((res) => res.json());
    }
)


export const getTransactionsSlice = createSlice({
    name: 'get_transaction',
    initialState: {
        balance: 0,
        bonus_points: 0
    },
    reducers:{

    },
    extraReducers: {
        [getTransactionsAsync.fulfilled]: (transaction, action) => {
            transaction.balance=action.payload.balance;
            transaction.bonus_points=action.payload.bonusPoints;
        }
    }
});

export default getTransactionsSlice.reducer;