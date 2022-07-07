import React from 'react'
import styled from 'styled-components'
export const AddBoad = () => {

    const Button = styled.button`
    border-radius: 15px;
    width:150px;
    height: 100px;
    background-color: black;
    opacity: 40%;
    `
    return (
        <Button><span className='textColor'>+</span></Button>
    )
}

