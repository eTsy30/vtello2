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
        moveCardOnList: (state, action) => {


            console.log('=+=', action.payload.resultCard);
            console.log('moveCardOnList', typeof action.payload.resultCard);
            const items = Array.from(action.payload.resultCard);
            const [reorderedItem] = items.splice(action.payload.result.source.index, 1);
            items.splice(action.payload.result.destination.index, 0, reorderedItem);

            state.nameCard = { ...state.nameCard, [action.payload.id]: items }

        },
        removeCard: (state, action) => {
            console.log('===', action.payload.resultCard);
            const items = Array.from(action.payload.resultCard);
            console.log(items, '1');
            const [delitedCard] = items.splice(action.payload.result.source.index, 1);
            console.log(delitedCard, '2');
            state.nameCard = { ...state.nameCard, [action.payload.id]: items }
            console.log('state.nameCard', state.nameCard);
            items.push(delitedCard)
            state.nameCard = { ...state.nameCard, [action.payload.idDestination]: [...items.push(delitedCard)] }
            console.log('state.nameCard1', state.nameCard);
        },
        addCard: (state, action) => {
            // console.log('state', state);

            const items = Array.from(action.payload.resultCard);
            console.log(items, 'items');
            const [reorderedItem] = items.splice(action.payload.result.source.index, 1);
            console.log([reorderedItem], '[reorderedItem]');
            console.log(action.payload.id, 'iiiiiiiii');
            // items.splice(action.payload.result.destination.index, 0, reorderedItem);
            // console.log('firstindex', action.payload.result.destination.index);
            // console.log('Целое число, показывающее количество старых удаляемых из массива элементов.', 0);
            // // console.log('Добавляемые к массиву элементы', reorderedItem);
            // console.log(items, 'final')

            // console.log('state.nameCard', state.nameCard);

            state.nameCard = { ...state.nameCard, [action.payload.id]: [reorderedItem] }
            console.log('final store', state.nameCard);
        }
    }
})
export default cardReduser.reducer
export const { moveCardOnList, removeCard, addCard } = cardReduser.actions
