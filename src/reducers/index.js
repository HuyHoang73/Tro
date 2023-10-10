import { combineReducers } from "redux";
import authenReducer from "./authentication";

const allReducers = combineReducers({
    authenReducer
})

export default allReducers;