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
import newListReduser from './addNewList'
import newCardReduser from './addNewCard'
import delCardReduser from './delCard'
import delListReduser from './delList'
export const store = configureStore({
    reducer: {
        tokenTrelloReduser: tokenTrelloReduser,
        boardReduser: boardReduser,
        cardReduser: cardReduser,
        listReduser: listReduser,
        moveListReduser: moveListReduser,
        moveListTOListReduser: moveListTOListReduser,
        moveCard: moveCard,
        newListReduser: newListReduser,
        newCardReduser: newCardReduser,
        delCardReduser: delCardReduser,
        delListReduser: delListReduser
    },

}, applyMiddleware(thunk))
