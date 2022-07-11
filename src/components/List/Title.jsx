import React, { useState, useContext } from 'react';
import { Typography, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import storeApi from '../../utils/storeApi';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { deliteList } from '../../utils/redux/delList';
import { getListData } from '../../utils/redux/getList';
const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: 'flex',
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  input: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: theme.spacing(1),
    '&:focus': {
      background: '#ddd',
    },
  },
}));
export default function Title({ title, listId, idBoard }) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateListTitle } = useContext(storeApi);

  const classes = useStyle();
  const dispatch = useDispatch()
  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOnBlur = () => {
    updateListTitle(newTitle, listId);
    setOpen(false);
  };

  const closeList = async () => {

    await dispatch(deliteList(listId))
    dispatch(getListData(idBoard))
  }

  return (
    <div>
      {open ? (
        <div>
          <InputBase
            onChange={handleOnChange}
            autoFocus
            value={newTitle}
            inputProps={{
              className: classes.input,
            }}
            fullWidth
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
            {title}
          </Typography>
          <MoreHorizIcon />
          <CloseIcon onClick={closeList} />
        </div>
      )}
    </div>
  );
}
