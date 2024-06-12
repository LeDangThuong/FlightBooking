import { combineReducers } from "@reduxjs/toolkit";
import flightSlice from "./flightSlice";
import userSlice from "./userSlice";
import reviewSlice from "./reviewSlice";
import bookingSlice from "./bookingSlice";

const rootReducer = combineReducers({
    flight: flightSlice,
    user: userSlice,
    review: reviewSlice,
    booking: bookingSlice
});

export default rootReducer;