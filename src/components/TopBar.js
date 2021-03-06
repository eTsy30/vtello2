import React from 'react';
import { useSelector } from 'react-redux'
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(4),
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    flexGrow: 1,
  },
  btn: {
    color: '#fff',
    background: 'hsla(0,0%,100%,.24)',
    position: 'fixed',
    right: '10px',
    top: '3px'

  },
}));

export default function TopBar({ setOpen }) {

  const userName = useSelector((state) => state.memberReduser.memberName)

  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{userName.fullName}</Typography>
      <Button className={classes.btn} onClick={() => setOpen(true)}>
        Change Background
      </Button>
    </div>
  );
}
