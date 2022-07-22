import React, { useEffect } from 'react';
import './index.css';
import { Descriptive } from './descriptive';
import { Multiple } from './multiple';
import data from './data';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from './redux/actionCreators.js/action';
import { Container, Header, Timer, Heading, Question, ButtonWrapper } from './styles/stylesHome';
import { Button } from './styles/buttons';
import { Loading } from './styles/loading';
import { FinishedText } from './styles/finishedText';
export default function Home() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const Next = () => {
        if (state.items[state.index].category == "descriptive" && state.index == state.items[state.index].id - 1) {
            state.items.map((item) => {
                if (item.category == "descriptive" && state.index == item.id - 1) {
                    const x = [...state.desc, { id: item.id, question: item.question, answer: state.text }];
                    dispatch({ type: "getDescription", payload: x })
                }
            })
        }
        dispatch({ type: "onNext" })
    }
    const isDisabled = () => {
        let x = state.items.map((item) => {
            if (state.index == item.id - 1) {
                return { ...item, disabled: true }
            }
            else {
                return item
            }
        })
        dispatch({ type: "disabling", payload: x })
    }
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    useEffect(() => {
        let x;
        if (state.second > 0) {
            x = setInterval(() => {
                dispatch({ type: "changeSecond" })
            }, 1000)
        }
        else {
            isDisabled()
        }
        return () => {
            clearInterval(x)
        }
    }, [state.second])

    if (state.loading) {
        return <Loading><h1>...Loading...</h1></Loading>
    }
    return (
        <>
            {(state.index == data.length) ? <FinishedText><h1>!!!Thank You!!!</h1></FinishedText> :
                <Container >
                    <Header>
                        <Heading>Quiz</Heading>
                        <Timer>{state.second} Seconds</Timer>
                    </Header>
                    <Question>{state.items[state.index].id}: {state.items[state.index].question}</Question>
                    {(state.items[state.index].category == "descriptive") ? <Descriptive /> : <Multiple />}
                    <ButtonWrapper>
                        <Button onClick={Next}>{(state.index == data.length - 1) ? "Finish" : "Next"}</Button>
                    </ButtonWrapper>
                </Container>}
        </>
    )
}
