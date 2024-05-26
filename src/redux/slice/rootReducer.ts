import { combineReducers } from "@reduxjs/toolkit";
import flightSlice from "./flightSlice";

const rootReducer = combineReducers({
    flight: flightSlice
});

export default rootReducer;