import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    nameBoard: [],
    // idboard: null,
    isLoading: null,

}


export const moveCardInItsList = createAsyncThunk(
    'moveCard',
    async (pos) => {
        console.log(pos);
        try {
            const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
            const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
            const response = await fetch(`https://api.trello.com/1/cards/${pos.id}?key=${apiKey}&token=${apiToken}&pos=${pos.pos}`,
                {
                    method: 'PUT',
                }

            )

            const responseFormat = await response.json()

            console.log(responseFormat);
            return responseFormat
        }
        catch (error) {
            return console.log(error);
        }

    })


const moveCard = createSlice({
    name: 'moveCard',
    initialState,
    extraReducers: {
        [moveCardInItsList.pending]: (state) => {
            state.isLoading = true;
            console.log('pending');

        },
        [moveCardInItsList.fulfilled]: (state, action) => {
            state.nameBoard = action.payload;
            state.isLoading = false;
            console.log('fulfilled');




        },
        [moveCardInItsList.rejected]: (state) => {
            state.isLoading = false;
            console.log('rejected');
        }
    },
    reducers: {
        // moveCardOnList: (state, action) => {
        //     console.log('state', state);
        //     console.log('action', action.payload);
        //     const items = Array.from(action.payload.lists);
        //     console.log(items, 'items');
        // const [reorderedItem] = items.splice(action.payload.result.source.index, 1);
        // console.log([reorderedItem], '[reorderedItem]');
        // items.splice(action.payload.result.destination.index, 0, reorderedItem);
        // console.log(items, 'final')
        // state.nameList = items
        // }
    }
})
export default moveCard.reducer
export const { moveCardOnList } = moveCard.actions
