import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    nameCard: {},
    // idboard: null,
    isLoading: null,

}


export const getCardData = createAsyncThunk(
    'getCardtData',
    async (cardId,) => {

        const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
        const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'


        return fetch(` https://api.trello.com/1/lists/${cardId}/cards?key=${apiKey}&token=${apiToken}`)

            .then(function (response) {
                if (response.ok) {
                    return response.json().then(function (data) {

                        return { data, cardId }
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

            state.nameCard = { ...state.nameCard, [action.payload.cardId]: action.payload.data }
            state.isLoading = false;




        },
        [getCardData.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {

        moveCard: (state, action) => {

            const { destination, source } = action.payload
            const cardlistFrom = state.nameCard[source.droppableId]
            const cardlistTo = state.nameCard[destination.droppableId]
            const elementMove = cardlistFrom[source.index]
            cardlistFrom.splice(source.index, 1)
            cardlistTo.splice(destination.index, 0, elementMove)

        }

    }
})
export default cardReduser.reducer
export const { moveCard } = cardReduser.actions
