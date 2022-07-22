import { all } from "redux-saga/effects";
import { waitForFetchProducts } from "./saga/demoSaga";


export default function* rootSaga() {
    yield all([waitForFetchProducts()])
}