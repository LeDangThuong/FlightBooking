
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface bookingState{
    bookingDepartureData: any | null;
    bookingReturnData: any | null;
    showModelPayment: boolean
}

const initState : bookingState ={
    bookingDepartureData: null,
    bookingReturnData: null,
    showModelPayment: false
}

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: initState,
    reducers: {
        setBookingDepartureData: (state, action:  PayloadAction<any>) => {
            state.bookingDepartureData = action.payload
        },
        setBookingReturnData: (state, action:  PayloadAction<any>) => {
            state.bookingDepartureData = action.payload
        },
        setShowModelPayment: (state, action:  PayloadAction<boolean>) => {
            state.showModelPayment = action.payload
        }
    }
})

export const {setBookingDepartureData, setBookingReturnData, setShowModelPayment} = bookingSlice.actions


export default bookingSlice.reducer;