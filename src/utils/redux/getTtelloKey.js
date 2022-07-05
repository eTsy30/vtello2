
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tokenTrello: null,

}

const tokenTrelloReduser = createSlice({
    name: 'tokenTrelloReduser',
    initialState,
    reducers: {
        gettoken: (state, action) => {
            state.tokenTrello = action.payload

        }
    }
})
export default tokenTrelloReduser.reducer
export const { gettoken, } = tokenTrelloReduser.actions
