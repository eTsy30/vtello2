import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import tokenTrelloReduser from './getTtelloKey'
import boardReduser from './getBoard'
import cardReduser from './getCard'
import listReduser from './getList'
export const store = configureStore({
    reducer: {
        tokenTrelloReduser: tokenTrelloReduser,
        boardReduser: boardReduser,
        cardReduser: cardReduser,
        listReduser: listReduser,

    },

}, applyMiddleware(thunk))
