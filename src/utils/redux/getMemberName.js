import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    memberName: [],
    isLoading: null,

}


export const getName = createAsyncThunk(
    'getName',
    async (memberId) => {

        try {
            const apiKey = 'f1efcc0f321ad7be4623828f1dcff1c7'
            const apiToken = '8b09f6f119b24c1cbb4ea6c944fc1741468029616691f9d86728d4ae8b851967'
            const response = await fetch(`https://api.trello.com/1/members/${memberId}?key=${apiKey}&token=${apiToken}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
            const responseListData = await response.json()

            return responseListData
        }
        catch (error) {
            return console.log(error);
        }

    })
const memberReduser = createSlice({
    name: 'memberReduser',
    initialState,
    extraReducers: {
        [getName.pending]: (state) => {
            state.isLoading = true;


        },
        [getName.fulfilled]: (state, action) => {
            state.memberName = action.payload;
            state.isLoading = false;




        },
        [getName.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {}
})
export default memberReduser.reducer
export const { } = memberReduser.actions
