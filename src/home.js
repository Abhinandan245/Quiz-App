import React, { useEffect } from 'react';
import './index.css';
import { Descriptive } from './descriptive';
import { Multiple } from './multiple';
import data from './data';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from './redux/actionCreators.js/action';
import { Container, Header, Timer, Heading, Question, ButtonWrapper, ChartWrapper } from './styles/stylesHome';
import { Button } from './styles/buttons';
import { Loading } from './styles/loading';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


let correct = 0
let unattempted = 0
export default function Home() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const Next = () => {
        let bool = false
        if (state.items[state.index].category == "multiple" || state.items[state.index].category == "bool") {
            state.items[state.index].options.forEach((item1) => {
                if (item1.select) {
                    bool = true
                    if (state.items[state.index].answer == item1.op) {
                        correct += 1
                    }
                }
            })

        }
        else if (state.items[state.index].category == "check") {
            let sum = 0
            let sum1 = 0
            state.items[state.index].options.forEach((item1) => {
                if (item1.select) {
                    bool = true
                    sum1 += 1
                    if (state.items[state.index].answer.includes(item1.op)) {
                        sum += 1
                    }
                }
            })
            if (sum == state.items[state.index].answer.length && sum1 == sum) {
                correct += 1
            }
        }
        else {
            if (state.text.trim().length > 0) {
                bool = true
                if (state.items[state.index].answer == state.text) {
                    correct += 1
                }
            }
        }
        if (!bool) {
            unattempted += 1
        }
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
    const data10 = {
        labels: ["TOTAL QUESTIONS", "CORRECT", "UNATTEMPTED"],
        datasets: [
            {
                id: 1,
                data: [data.length, correct, unattempted],
                borderColor: ["dodgerblue", "chartreuse", "yellow"],
                backgroundColor: ["dodgerblue", "chartreuse", "yellow"],
                borderWidth: 2
            },
        ],
    }
    const legend1 = {
        legend: {
            labels: {
                color: "black",
                font: {
                    size: 15
                }
            }
        }
    }
    if (state.loading) {
        return <Loading><h1>...Loading...</h1></Loading>
    }
    return (
        <>
            {(state.index == data.length) ? <ChartWrapper><Pie data={data10} options={{ maintainAspectRatio: false, plugins: legend1 }} /></ChartWrapper>
                :
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
