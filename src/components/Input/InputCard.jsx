import React, { useState, useContext, useEffect } from 'react';
import { Paper, InputBase, Button, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, alpha } from '@material-ui/core/styles';
import storeApi from '../../utils/storeApi';
import { useDispatch } from 'react-redux';
import { addList } from '../../utils/redux/addNewList'
import { getListData } from '../../utils/redux/getList'
import { addCard } from '../../utils/redux/addNewCard';
import { getCardData } from '../../utils/redux/getCard'
const useStyle = makeStyles((theme) => ({
  card: {
    width: '280px',
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: '#5AAC44',
    color: '#fff',
    '&:hover': {
      background: alpha('#5AAC44', 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));
export default function InputCard({ setOpen, listId, type }) {
  const classes = useStyle();
  const dispatch = useDispatch()
  const idBoard = useContext(storeApi);
  const [title, setTitle] = useState('');

  const handleOnChange = (e) => {
    setTitle(e.target.value);

  };

  const handleBtnConfirm = async () => {

    if (type === 'card') {
      const addCardParam = {
        name: title,
        idList: listId
      }

      await dispatch(addCard(addCardParam))
      dispatch(getCardData(listId))
      setTitle('');
      setOpen(false);
    } else {
      const addListParam = {
        name: title,
        idBoard: idBoard
      }

      await dispatch(addList(addListParam))
      dispatch(getListData(idBoard))
      setTitle('');
      setOpen(false);
    }
  };


  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleOnChange}
            multiline

            fullWidth
            inputProps={{
              className: classes.input,
            }}
            value={title}
            placeholder={
              type === 'card'
                ? 'Enter a title of this card..'
                : 'Enter list title...'
            }
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
          {type === 'card' ? 'Add Card' : 'Add List'}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
