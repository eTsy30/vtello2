import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getListData } from '../src/utils/redux/getList'
import store from './utils/store';
import StoreApi from './utils/storeApi';
import InputContainer from './components/Input/InputContainer';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import { SinginPage } from './components/SinginPage/SinginPage';
import { Board } from './components/Board/Board';
import Lists from './components/Board/TrelloCard'
import List from './components/List/List';
import { moveListPosition } from './utils/redux/moveListPosition'
import { moveTOlist } from './utils/redux/moveToAnotherList'
import { moveLits } from './utils/redux/getList'
import { moveCardOnList, removeCard } from './utils/redux/getCard'
import { moveCardInItsList } from './utils/redux/moveCardPocitionOnList'
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

export default function App() {
  const dispatch = useDispatch()

  const lists = useSelector((state) => state.listReduser.nameList)
  const cards = useSelector((state) => state.cardReduser.nameCard)
  console.log(cards);
  const arrAllLIst = lists.map(listElement => {
    return { ...listElement, cards: cards[listElement.id] }
  })
  const [data, setData] = useState(store);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getListData('62597042aff92c4fe13edf79'))
  }, [])


  const [backgroundUrl, setBackgroundUrl] = useState('');
  const classes = useStyle();


  const addMoreCard = (title, listId) => {
    console.log(title, listId);
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const addMoreList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    setData(newState);
  };

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

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




  return (<StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
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


