import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    nameCard: [],
    // idboard: null,
    isLoading: null,

}


export const getCardData = createAsyncThunk(
    'getCardtData',
    async (cardId) => {

        const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
        const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
        const boardId = '62597042aff92c4fe13edf79'
        // return fetch(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`)
        return fetch(` https://api.trello.com/1/lists/${cardId}/cards?key=${apiKey}&token=${apiToken}`)

            .then(function (response) {
                if (response.ok) {
                    return response.json().then(function (data) {

                        return data
                    })
                }
            })
    })
const cardReduser = createSlice({
    name: 'cardIdReduser',
    initialState,
    extraReducers: {
        [getCardData.pending]: (state) => {
            state.isLoading = true;

        },
        [getCardData.fulfilled]: (state, action) => {
            state.nameCard = [...state.nameCard, action.payload];
            state.isLoading = false;




        },
        [getCardData.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {}
})
export default cardReduser.reducer
export const { } = cardReduser.actions
