
import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
}));
export default function Card({ card, index, listID }) {
  const classes = useStyle();

  return (
    <Draggable draggableId={card.id} index={index} type="card">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}>{card.name + 'pos= ' + card.pos + '  ' + 'ID=' + card.id + 'olol' + listID}</Paper>
        </div>
      )}
    </Draggable>
  );
}
///====







