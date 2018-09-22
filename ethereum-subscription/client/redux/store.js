import reducers from "./reducers";
import {initialState} from "./reducers";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

export const initStore = (state = initialState) => {
    return createStore(
        reducers,
        state,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
};