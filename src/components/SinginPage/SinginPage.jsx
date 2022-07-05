import { Container, Typography, TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles, alpha } from '@material-ui/core/styles';
import './SinginPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { gettoken } from '../../utils/redux/getTtelloKey'
const useStyle = makeStyles((theme) => ({
    leftSide: {
        fontSize: '6rem',
        textAlign: 'center',
        width: '50%',
        display: 'flex',
        width: '50%',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:focus': {
            background: '#ddd',

        },
    },
    typographyFont: {
        fontSize: '9rem',
        fontFamily: 'Lobster',
        fontFamily: 'cursive',

    },
    textField: {
        margin: '15px',
    },
    buttonSuccess: {
        background: '#5AAC44',
        color: '#fff',
        '&:hover': {
            background: alpha('#5AAC44', 0.75),
        },
    }

}))


export const SinginPage = () => {
    const dispatch = useDispatch()
    const [inputValue, setinputValue] = useState('')
    const keyTrello = useSelector((state) => state.tokenTrelloReduser);
    console.log(keyTrello);
    const changeTextField = (event) => {
        setinputValue(event.target.value)
    }

    const onButtonSuccess = () => {

        dispatch(gettoken(inputValue))

    }

    const classes = useStyle();
    return (
        <div className='container'>
            <div className={classes.leftSide}>
                <Typography className={classes.typographyFont}> Trello</Typography>
                <TextField className={classes.textField} label="Enter you clientKey" onChange={changeTextField} value={inputValue} color="secondary" focused />
                {inputValue !== '' ? <Button variant="contained" onClick={onButtonSuccess} className={classes.buttonSuccess}>
                    Success
                </Button> : <Button variant="outlined">
                    Enter you key
                </Button>}
            </div>
            <div className='right'>
            </div>
        </div>
    )
}
