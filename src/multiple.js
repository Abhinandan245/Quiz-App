import React from 'react';
import './index.css';
import { useSelector, useDispatch } from "react-redux";
import { MultContainer, Radio, Checkbox } from './styles/styleMultiple';

export let Multiple = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    const { category, question, options, disabled } = state.items[state.index]

    const onRadioChange = (e, question1) => {
        const x = state.items.map((item) => {
            if (item.category == "multiple" || item.category == "bool") {
                if (item.question == question1) {
                    return {
                        ...item, options: item.options.map((item) => {
                            if (item.op == e.target.value) {
                                return { ...item, select: true }
                            }
                            else {
                                return { ...item, select: false }
                            }
                        })
                    }
                }
                else {
                    return item
                }
            }
            else if (item.category == "check") {
                if (item.question == question1) {
                    return {
                        ...item, options: item.options.map((item) => {
                            if (item.op == e.target.value) {
                                return { ...item, select: !(item.select) }
                            }
                            else {
                                return item
                            }
                        })
                    }
                }
                else {
                    return item
                }
            }
            else {
                return item
            }

        })
        dispatch({ type: "radioChange", payload1: x, payload2: e.target.value })
    }
    return (
        <>
            <MultContainer>
                {
                    options.map((item, index) => {
                        return (
                            <div key={index}>
                                {(category == "multiple" || category == "bool") ?
                                    <Radio>
                                        <input type="radio" id={item.op} value={item.op} name={question} onChange={(e) => onRadioChange(e, question)} checked={item.select} disabled={disabled} />
                                        <label htmlFor={item.op}>{item.op}</label><br></br>
                                    </Radio> :
                                    <Checkbox>
                                        <input type="checkbox" id={item.op} name={item.op} value={item.op} onChange={(e) => onRadioChange(e, question)} checked={item.select} disabled={disabled} />
                                        <label htmlFor={item.op}>{item.op}</label><br></br>
                                    </Checkbox>}
                            </div>
                        )
                    })
                }
            </MultContainer>
        </>
    )
}