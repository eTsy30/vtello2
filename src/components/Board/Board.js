import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBoardData } from '../../utils/redux/getBoard'
import { getListData } from '../../utils/redux/getList'
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import randomColor from "randomcolor";
import './d.css'
export const Board = () => {
    const bgcolor = randomColor();

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
    background-color: ${bgcolor};
    `

    const dispatch = useDispatch()

    const boards = useSelector((state) => state.boardReduser.nameBoard)
    const list = useSelector((state) => state.listReduser.nameList)


    useEffect(() => {
        dispatch(getBoardData())
    }, [])


    const itemCard = (id) => {

        dispatch(getListData(id))
        console.log(id);
        console.log('list!!!!', list);
    }
    return (<Container  >
        {boards.map(board => (<Cell key={board.id}>

            <Link to={`/TrelloList/${board.id}`}>
                <Button onClick={() => itemCard(board.id)}>{board.name}</Button>
            </Link>
        </Cell>))}

    </Container>)





}

