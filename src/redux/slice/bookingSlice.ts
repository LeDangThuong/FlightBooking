
import { HistoryBooking } from "@/models/HistoryBooking";
import { Voucher } from "@/models/Voucher";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface bookingState{
    bookingDepartureData: any | null;
    bookingReturnData: any | null;
    showModelPayment: boolean;
    historyBookings: HistoryBooking[] | null;
    voucher: Voucher | null;
}

const initState : bookingState ={
    bookingDepartureData: null,
    bookingReturnData: null,
    showModelPayment: false,
    historyBookings: null,
    voucher: null
}

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: initState,
    reducers: {
        setBookingDepartureData: (state, action:  PayloadAction<any>) => {
            state.bookingDepartureData = action.payload
        },
        setBookingReturnData: (state, action:  PayloadAction<any>) => {
            state.bookingReturnData = action.payload
        },
        setShowModelPayment: (state, action:  PayloadAction<boolean>) => {
            state.showModelPayment = action.payload
        },
        setHistoryBookings: (state, action:  PayloadAction<HistoryBooking[] | null>) => {
            state.historyBookings = action.payload
        },
        setVoucher: (state, action:  PayloadAction<Voucher | null>) => {
            state.voucher = action.payload
        },
    }
})

export const {setBookingDepartureData, setBookingReturnData, setShowModelPayment, setHistoryBookings, setVoucher} = bookingSlice.actions


export default bookingSlice.reducer;