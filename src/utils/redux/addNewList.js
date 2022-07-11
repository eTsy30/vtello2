import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    addList: [],
    isLoading: null,

}


export const addList = createAsyncThunk(
    'addList',
    async (addListParam) => {

        try {
            const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
            const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
            const response = await fetch(`https://api.trello.com/1/lists?name=${addListParam.name}&idBoard=${addListParam.idBoard}&key=${apiKey}&token=${apiToken}`, {
                method: 'POST'
            })
            const responseListData = await response.json()
            return responseListData
        }
        catch (error) {
            return console.log(error);
        }

    })
const newListReduser = createSlice({
    name: 'newListReduser',
    initialState,
    extraReducers: {
        [addList.pending]: (state) => {
            state.isLoading = true;


        },
        [addList.fulfilled]: (state, action) => {
            state.addList = action.payload;
            state.isLoading = false;



        },
        [addList.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {}
})
export default newListReduser.reducer
export const { } = newListReduser.actions
