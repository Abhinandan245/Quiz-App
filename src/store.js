import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from "./rootSaga";
import fetchReducer from "./redux/reducers/Reducer";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(fetchReducer, compose(applyMiddleware(sagaMiddleware), composeWithDevTools()))
sagaMiddleware.run(rootSaga)
export default store;


