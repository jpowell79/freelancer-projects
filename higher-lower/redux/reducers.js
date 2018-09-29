import {constants} from "./constants";
import {combineReducers} from "redux";

export const initialState = {
    sample: ""
};

export const sample = (state = "", action) => {
    switch(action.type){
    case constants.SAMPLE_ACTION:
        return action.payload;
    default:
        return state;
    }
};

export default combineReducers({
    sample
});