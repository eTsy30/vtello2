import { Typography, TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles, alpha } from '@material-ui/core/styles';
import './SinginPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { gettoken } from '../../utils/redux/getTtelloKey'
import { Link } from 'react-router-dom';

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
        width: '350px',
    },
    buttonSuccess: {
        background: '#5AAC44',
        color: '#fff',
        '&:hover': {
            background: alpha('#5AAC44', 0.75),
        },
    }, trelloKey: { marginBottom: '30px' }

}))


export const SinginPage = () => {
    const dispatch = useDispatch()
    const [inputValue, setinputValue] = useState('')
    const keyTrello = useSelector((state) => state.tokenTrelloReduser);

    const changeTextField = (event) => {
        setinputValue(event.target.value)
    }

    const onButtonSuccess = () => {

        dispatch(gettoken(inputValue))

    }

    const classes = useStyle();
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
        </div>
    )
}
