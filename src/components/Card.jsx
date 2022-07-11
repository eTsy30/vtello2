
import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deliteCard } from '../utils/redux/delCard'
import { getCardData } from '../utils/redux/getCard'
import storeApi from '../utils/storeApi';
const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  }, del: {
    float: 'right',
    padding: 0
  }
}));
export default function Card({ card, index, cardId }) {
  const classes = useStyle();
  const dispatch = useDispatch()
  const idBoard = useContext(storeApi);


  const delCard = async () => {

    await dispatch(deliteCard(card.id))
    dispatch(getCardData(card.idList))

  }
  return (
    <Draggable draggableId={card.id} index={index} type="card">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}>{card.name}<IconButton
            onClick={delCard}
            className={classes.del} aria-label="delete">
            <DeleteIcon />
          </IconButton></Paper>

        </div>
      )}
    </Draggable>
  );
}








