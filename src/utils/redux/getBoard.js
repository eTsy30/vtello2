import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    nameBoard: [],
    // idboard: null,
    isLoading: null,

}


export const getBoardData = createAsyncThunk(
    'getBoardData',
    async () => {


        const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
        const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
        return fetch(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`)
            .then(function (response) {
                if (response.ok) {
                    return response.json().then(function (data) {

                        return data.filter(board => !board.closed)
                    })
                }
            })
    })
const boardReduser = createSlice({
    name: 'boardReduser',
    initialState,
    extraReducers: {
        [getBoardData.pending]: (state) => {
            state.isLoading = true;

        },
        [getBoardData.fulfilled]: (state, action) => {
            state.nameBoard = action.payload;
            state.isLoading = false;




        },
        [getBoardData.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {}
})
export default boardReduser.reducer
export const { } = boardReduser.actions
