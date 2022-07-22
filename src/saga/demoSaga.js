import { fetchProductsBegin, fetchProductsSuccess, fetchProductsFailure, FETCH_PRODUCTS } from "../redux/actionCreators.js/action";
import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import data from "../data";

function* fetchProducts() {
    try {
        const answer = yield call(async () => {
            let response = await axios.get("https://jsonplaceholder.typicode.com/posts")

            for (let i = 0; i < data.length; i++) {
                response.data[i].category = data[i].category
                response.data[i].disabled = data[i].disabled
                response.data[i].question = data[i].question
                response.data[i].options = data[i].options
                response.data[i].id = data[i].id
            }
            return response.data
        })
        console.log(answer)
        yield put(fetchProductsSuccess(answer))
    }
    catch (e) {
        yield put(fetchProductsFailure(e))
    }
}
export function* waitForFetchProducts() {
    yield takeEvery(FETCH_PRODUCTS, fetchProducts)
}