import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getListData } from '../../utils/redux/getList'

import StoreApi from '../../utils/storeApi';
import InputContainer from '../Input/InputContainer';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TopBar from '../TopBar';
import SideMenu from '../SideMenu';
import { useParams } from "react-router-dom";
import { getName } from '../../utils/redux/getMemberName'

import List from '../List/List';
// import { moveListPosition } from './utils/redux/moveListPosition'
// import { moveTOlist } from './utils/redux/moveToAnotherList'
// import { moveLits } from './utils/redux/getList'
import { removeCard } from '../../utils/redux/getCard'
// import { moveCardInItsList } from './utils/redux/moveCardPocitionOnList'
const useStyle = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        background: 'green',
        width: '100%',
        overflowY: 'auto',
    },
    listContainer: {
        display: 'flex',
    },
}));
export const MainPage = () => {
    const params = useParams();
    const idBoard = params.i
    const board = useSelector((state) => state.boardReduser.nameBoard)
    const dispatch = useDispatch()

    const lists = useSelector((state) => state.listReduser.nameList)
    const cards = useSelector((state) => state.cardReduser.nameCard)

    // const arrAllLIst = lists.map(listElement => {
    //     return { ...listElement, cards: cards[listElement.id] }
    // })

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getName(board[0].idMemberCreator))
        dispatch(getListData(idBoard))
    }, [])


    const [backgroundUrl, setBackgroundUrl] = useState('');
    const classes = useStyle();







    const getPositions = (arr, destination) => {
        let count = 0
        arr.forEach((el, index) => {
            if (destination.index - 1 === index) {
                count += Number(el.pos)
            }
            if (destination.index === index) {
                count += Number(el.pos);

            }
        }
        )

        return count

    }
    const onDragEnd = (result) => {
        const { destination, source, draggableId, type, listID } = result;
        console.log('destination куда=', destination, 'source источник=', source, draggableId, type, 'listID=', listID);


        dispatch(removeCard({ destination, source, }))

        // if (!destination) {
        //   return;
        // }
        // //////////////////////////////////////////////
        // if (destination.droppableId === 'app') {
        //   const pos = {
        //     pos: getPositions(lists, destination) / 2,
        //     id: draggableId
        //   }
        //   dispatch(moveLits({ lists, result }))
        //   dispatch(moveListPosition(pos))
        //   return
        // }
        // //////////////////////////////////////////
        // if (source.droppableId === destination.droppableId) {


        //   const id = source.droppableId
        //   const resultCard = cards[id]
        //   const pos = {
        //     pos: getPositions(cards[id], destination) / 2,
        //     id: draggableId
        //   }

        //   dispatch(moveCardOnList({ resultCard, result, id }))
        //   dispatch(moveCardInItsList(pos))
        //   return
        // } else {


        //   // const id = source.droppableId
        //   // const resultCard = cards[id]
        //   // const moveparams = {
        //   //   card: draggableId,
        //   //   list: destination.droppableId,
        //   // }
        //   // const idDestination = destination.droppableId


        //   // dispatch(addCard({ resultCard, result, idDestination }))
        //   dispatch(moveTOlist(moveparams))
        //   //cardid
        //   //listid
    }






    return (
        <StoreApi.Provider value={idBoard}>
            <div
                className={classes.root}
                style={{
                    backgroundImage: `url(${backgroundUrl})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <TopBar setOpen={setOpen} />

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="app" type="list" direction="horizontal">
                        {(provided) => (
                            <div
                                className={classes.listContainer}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {lists.map((list, index) => <List list={list} key={list.id} s index={index} />)

                                }
                                <InputContainer type="list" />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <SideMenu
                    setBackgroundUrl={setBackgroundUrl}
                    open={open}
                    setOpen={setOpen}
                />
            </div>
        </StoreApi.Provider>
    )


}
