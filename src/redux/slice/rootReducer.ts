import { combineReducers } from "@reduxjs/toolkit";
import flightSlice from "./flightSlice";
import userSlice from "./userSlice";
import reviewSlice from "./reviewSlice";

const rootReducer = combineReducers({
    flight: flightSlice,
    user: userSlice,
    review: reviewSlice
});

export default rootReducer;