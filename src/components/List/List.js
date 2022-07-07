import React, { useState, useEffect } from 'react';
import { Paper, Typography, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import Card from '../Card';
import InputContainer from '../Input/InputContainer';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getCardData } from '../../utils/redux/getCard'
const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: '300px',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(1),
  },
  cardContainer: {
    marginTop: theme.spacing(4),
  },
}));
export default function List({ list, index }) {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCardData(list.id))
  }, [])
  const cards = useSelector((state) => state.cardReduser.nameCard)

  const listcard = cards[list.id]
  const classes = useStyle();
  return (
    <Draggable draggableId={list.id} index={index} type="list1">
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <Title title={list.name + '' + 'listid=' + list.id} />
            <Droppable droppableId={list.id} >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.cardContainer}
                >
                  {listcard && listcard.map((card, index) => <Card key={card.id} listID={list.id} card={card} index={index} />)}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <InputContainer listId={list.id} type="card" />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
//==

