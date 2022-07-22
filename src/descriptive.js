import React from 'react';
import './index.css';
import { useSelector, useDispatch } from "react-redux";
import { DescContainer, Textarea, CharacterLeft } from './styles/styleDescriptive';

export let Descriptive = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const { disabled } = state.items[state.index]
    const onTextareaChange = (e) => {
        dispatch({ type: "textAreaChange", payload: e.target.value })
    }
    return (
        <>
            <DescContainer>
                <Textarea rows="5" cols="56" maxLength="200" value={state.text} onChange={onTextareaChange} disabled={disabled}></Textarea>
                <CharacterLeft>Characters Left: {(200 >= state.text.length) ? 200 - state.text.length : 0}</CharacterLeft>
            </DescContainer>
        </>
    )
}
