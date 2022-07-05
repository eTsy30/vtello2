import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    nameList: [],
    // idboard: null,
    isLoading: null,

}


export const getListData = createAsyncThunk(
    'getListData',
    async (listsId) => {


        const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
        const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'

        return fetch(`https://api.trello.com/1/boards/${listsId}/lists?key=${apiKey}&token=${apiToken}`)

            .then(function (response) {
                if (response.ok) {
                    return response.json().then(function (data) {

                        return data
                    })
                }
            })
    })
const listReduser = createSlice({
    name: 'cardIdReduser',
    initialState,
    extraReducers: {
        [getListData.pending]: (state) => {
            state.isLoading = true;

        },
        [getListData.fulfilled]: (state, action) => {
            state.nameList = action.payload;
            state.isLoading = false;




        },
        [getListData.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {}
})
export default listReduser.reducer
export const { } = listReduser.actions
