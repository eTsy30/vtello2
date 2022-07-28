import { Typography, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import React from 'react'
import styles from './styles';


const template = (props, state) => {
    const classes = styles();
    const { changeTextField, onButtonSuccess, inputValue } = state

    return (
        <div className='containerSingin'>
            <div className={classes.leftSide}>
                <Typography className={classes.typographyFont}> Trello</Typography>
                <TextField className={classes.textField} label="Enter you client Key" onChange={changeTextField} value={inputValue} color="secondary" focused />
                {inputValue !== '' ? <Link to={'/Board'}><Button variant="contained" onClick={onButtonSuccess} className={classes.buttonSuccess}>
                    Success
                </Button></Link> : <Button variant="outlined">
                    Enter you key
                </Button>}

                <Button className={classes.trelloKey}>
                    <a href='https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=f1efcc0f321ad7be4623828f1dcff1c7' target="_blank">Get Trello Key </a>
                </Button>
            </div>
            <div className='right'>
            </div>
        </div>)
}
