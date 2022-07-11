import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    delList: [],
    isLoading: null,

}


export const deliteList = createAsyncThunk(
    'deliteCard',
    async (listId) => {

        try {
            const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
            const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
            const response = await fetch(`https://api.trello.com/1/lists/${listId}?key=${apiKey}&token=${apiToken}&closed=true`, {
                method: 'PUT'
            })
            const responseListData = await response.json()
            return responseListData
        }
        catch (error) {
            return console.log(error);
        }

    })
const delListReduser = createSlice({
    name: 'newListReduser',
    initialState,
    extraReducers: {
        [deliteList.pending]: (state) => {
            state.isLoading = true;

        },
        [deliteList.fulfilled]: (state, action) => {
            state.delList = action.payload;
            state.isLoading = false;




        },
        [deliteList.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {}
})
export default delListReduser.reducer
export const { } = delListReduser.actions
