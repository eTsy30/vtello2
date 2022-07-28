import { useState } from 'react'
import './SinginPage.css'
import { useSelector, useDispatch } from 'react-redux'
import { gettoken } from '../../utils/redux/getTtelloKey'
import template from './template'

const Singin = (props) => {
    const dispatch = useDispatch()
    const [inputValue, setinputValue] = useState('')
    const keyTrello = useSelector((state) => state.tokenTrelloReduser)
    const x = 1

    console.log('d')
    function changeTextField(event) {
        setinputValue(event.target.value)
    }

    function onButtonSuccess() {
        dispatch(gettoken(inputValue))
    }

    return template(props, { changeTextField, onButtonSuccess, inputValue })
}

export default Singin
