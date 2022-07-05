import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    nameBoard: [],
    // idboard: null,
    isLoading: null,

}


export const moveListPosition = createAsyncThunk(
    'moveList',
    async (pos) => {
        console.log(pos);
        try {
            const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
            const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
            const response = await fetch(`https://api.trello.com/1/lists/${pos.id}?key=${apiKey}&token=${apiToken}&pos=${pos.pos}`,
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


const moveListTOListReduser = createSlice({
    name: 'boardReduser',
    initialState,
    extraReducers: {
        [moveListPosition.pending]: (state) => {
            state.isLoading = true;
            console.log('pending');

        },
        [moveListPosition.fulfilled]: (state, action) => {
            state.nameBoard = action.payload;
            state.isLoading = false;
            console.log('fulfilled');




        },
        [moveListPosition.rejected]: (state) => {
            state.isLoading = false;
            console.log('rejected');
        }
    },
    reducers: {}
})
export default moveListTOListReduser.reducer
export const { } = moveListTOListReduser.actions
