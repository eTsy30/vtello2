import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBoardData } from '../../utils/redux/getBoard'
import { getListData } from '../../utils/redux/getList'
import { useEffect } from "react";
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import styled from 'styled-components'
import randomColor from "randomcolor";
import { AddBoad } from './addBoad';
import { Modal } from './Modal'
import './board.css'


export const Board = () => {

    const [modalActive, setModaiActive] = useState(false);


    const Container = styled.div` 
    display: grid;
    grid-template-columns: repeat(3,250px);
    grid-template-rows: repeat(3,1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-content: center;
    justify-content: center;
    justify-items: start;
    
  `
    const Cell = styled.div`
    border: 1px solid 'white';
    border-radius: 15px;
     flex: 0 ,32%;
     width: 150px;
     height: 100px;
     margin-bottom: 10px;
  
    `
    const Button = styled.button`
    border-radius: 15px;
    width:100%;
    height: 100%;
    background-color: black;
    opacity: 40%;
    `

    const dispatch = useDispatch()

    const boards = useSelector((state) => state.boardReduser.nameBoard)



    useEffect(() => {
        dispatch(getBoardData())
    }, [])


    const itemCard = (id) => {

        dispatch(getListData(id))

    }

    const activateModal = () => {
        setModaiActive(true)
    }

    return (<div className='boardMain'>
        {/* <h1>Boards</h1> */}
        <div className='container'  >


            {boards.map(board => (<Cell key={board.id}>

                <Link to={`/MainPage/${board.id}`}>
                    <Button onClick={() => itemCard(board.id)}><span className='textColor'>{board.name}</span></Button>
                </Link>
            </Cell>))}
            <Button onClick={activateModal}>*</Button>
            <Modal
                active={modalActive}
                setActive={setModaiActive}

            // status={responseStatus}
            // naviganeSucsess="/"
            // naviganeNOTSucsess="/new-password"
            ></Modal>

        </div>

    </div>

    )


}

