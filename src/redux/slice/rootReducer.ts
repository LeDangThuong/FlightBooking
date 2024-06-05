import { combineReducers } from "@reduxjs/toolkit";
import flightSlice from "./flightSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
    flight: flightSlice,
    user: userSlice
});

export default rootReducer;