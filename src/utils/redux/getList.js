import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getCard from "./getCard";
const initialState = {
    nameList: [],
    // idboard: null,
    isLoading: null,

}


export const getListData = createAsyncThunk(
    'getListData',

    async (boardId) => {

        try {
            const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
            const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
            const response = await fetch(`https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`)
            const responseListData = await response.json()
            return responseListData
            console.log(responseListData);
        }
        catch (error) {
            return console.log(error);
        }

    }
    //=============
)
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
    reducers: {

        moveLits: (state, action) => {
            console.log('moveLits', typeof action.payload.lists);
            const items = Array.from(action.payload.lists);

            const [reorderedItem] = items.splice(action.payload.result.source.index, 1);

            items.splice(action.payload.result.destination.index, 0, reorderedItem);

            state.nameList = items
        },

    }
})
export default listReduser.reducer
export const { moveLits } = listReduser.actions
