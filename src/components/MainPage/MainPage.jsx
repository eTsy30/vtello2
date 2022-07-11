import React, { useState, useEffect } from 'react'

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
import { moveListPosition } from '../../utils/redux/moveListPosition'
import { moveTOlist } from '../../utils/redux/moveToAnotherList'
import { moveLits } from '../../utils/redux/getList'
import { moveCard } from '../../utils/redux/getCard'
import { moveCardInItsList } from '../../utils/redux/moveCardPocitionOnList'
import { getCardData } from '../../utils/redux/getCard'
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

    const boardName = board.filter(b => { if (b.id === idBoard) { return b } })

    const lists = useSelector((state) => state.listReduser.nameList)
    const cards = useSelector((state) => state.cardReduser.nameCard)



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

    const onDragEnd = async (result) => {
        const { destination, source, draggableId, type, listID } = result;
        console.log('destination куда=', destination, 'source источник=', source, draggableId, type, 'listID=', listID);

        if (!destination) {

            return;
        }

        if (destination.droppableId === 'app') {

            const pos = {
                pos: getPositions(lists, destination) / 2,
                id: draggableId
            }
            dispatch(moveLits({ lists, result }))
            dispatch(moveListPosition(pos))
            return
        }

        if (destination.droppableId !== 'app') {

            if (destination.droppableId === source.droppableId) {


                const pos = {
                    pos: getPositions(cards[source.droppableId], destination) / 2,
                    id: draggableId
                }
                dispatch(moveCard({ destination, source }))
                await dispatch(moveCardInItsList(pos))
                dispatch(getCardData(destination.droppableId))
                return
            }


            const pos = {
                list: destination.droppableId,
                card: draggableId
            }
            dispatch(moveCard({ destination, source }))
            await dispatch(moveTOlist(pos))
            dispatch(getCardData(destination.droppableId))
        }

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
                                {lists.map((list, index) => <List list={list} key={list.id} idBoard={idBoard} index={index} />)

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
