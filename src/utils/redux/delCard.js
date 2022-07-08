import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    delCard: [],
    isLoading: null,

}


export const deliteCard = createAsyncThunk(
    'deliteCard',
    async (delCardParam) => {
        console.log(delCardParam);
        try {
            const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
            const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
            const response = await fetch(`https://api.trello.com/1/cards/${delCardParam}?key=${apiKey}&token=${apiToken}`, {
                method: 'DELETE'
            })
            const responseListData = await response.json()
            return responseListData
        }
        catch (error) {
            return console.log(error);
        }

    })
const delCardReduser = createSlice({
    name: 'newListReduser',
    initialState,
    extraReducers: {
        [deliteCard.pending]: (state) => {
            state.isLoading = true;
            console.log('pending');

        },
        [deliteCard.fulfilled]: (state, action) => {
            state.deliteCard = action.payload;
            state.isLoading = false;
            console.log('fulfilled');



        },
        [deliteCard.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {}
})
export default delCardReduser.reducer
export const { } = delCardReduser.actions
