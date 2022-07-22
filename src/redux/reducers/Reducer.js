import { FETCH_PRODUCTS_BEGIN, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from "../actionCreators.js/action";
const initialState = {
    items: [],
    loading: true,
    error: null,
    second: 15,
    text: "",
    desc: [],
    index: 0,
    radio: "",
};
export default function fetchReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_BEGIN:
            console.log("inside begin")
            return {
                ...state,
                loading: true,
            };

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };

        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        case "disabling":
            return {
                ...state, items: action.payload
            };
        case "changeSecond":
            return {
                ...state, second: state.second - 1
            };
        case "getDescription":
            return {
                ...state, desc: action.payload, text: ""
            }
        case "onNext":
            return {
                ...state, second: 10, index: state.index + 1
            };
        case "radioChange":
            return {
                ...state, items: action.payload1, radio: action.payload2
            }
        case "textAreaChange":
            return {
                ...state, text: action.payload
            }
        default:
            return state;
    }
}