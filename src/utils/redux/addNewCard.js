import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    addCard: [],
    isLoading: null,

}


export const addCard = createAsyncThunk(
    'addList',
    async (addCardParam) => {
        console.log(addCardParam);
        try {
            const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
            const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
            const response = await fetch(`https://api.trello.com/1/cards?idList=${addCardParam.idList}&key=${apiKey}&token=${apiToken}&name=${addCardParam.name}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            })
            const responseListData = await response.json()
            console.log(responseListData);
            return responseListData
        }
        catch (error) {
            return console.log(error);
        }

    })
const newCardReduser = createSlice({
    name: 'newCardReduser',
    initialState,
    extraReducers: {
        [addCard.pending]: (state) => {
            state.isLoading = true;
            console.log('pending');

        },
        [addCard.fulfilled]: (state, action) => {
            state.addCard = action.payload;
            state.isLoading = false;
            console.log('fulfilled');



        },
        [addCard.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {}
})
export default newCardReduser.reducer
export const { } = newCardReduser.actions
