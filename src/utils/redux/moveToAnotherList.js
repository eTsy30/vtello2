import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    nameBoard: [],
    // idboard: null,
    isLoading: null,

}


export const moveTOlist = createAsyncThunk(
    'moveTOlist',
    async (moveparams) => {
        console.log(moveparams);
        try {
            const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
            const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
            const response = await fetch(`https://api.trello.com//1/cards/${moveparams.card}?idList=${moveparams.list}&key=${apiKey}&token=${apiToken}`,
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

    }
)
const moveListReduser = createSlice({
    name: 'boardReduser',
    initialState,
    extraReducers: {
        [moveTOlist.pending]: (state) => {
            state.isLoading = true;

        },
        [moveTOlist.fulfilled]: (state, action) => {
            state.nameBoard = action.payload;
            state.isLoading = false;




        },
        [moveTOlist.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {}
})
export default moveListReduser.reducer
export const { } = moveListReduser.actions
