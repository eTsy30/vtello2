import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import tokenTrelloReduser from './getTtelloKey'
import boardReduser from './getBoard'
import cardReduser from './getCard'
import listReduser from './getList'
import moveListReduser from './moveToAnotherList'
import moveListTOListReduser from './moveListPosition'
import moveCard from './moveCardPocitionOnList'
export const store = configureStore({
    reducer: {
        tokenTrelloReduser: tokenTrelloReduser,
        boardReduser: boardReduser,
        cardReduser: cardReduser,
        listReduser: listReduser,
        moveListReduser: moveListReduser,
        moveListTOListReduser: moveListTOListReduser,
        moveCard: moveCard
    },

}, applyMiddleware(thunk))
