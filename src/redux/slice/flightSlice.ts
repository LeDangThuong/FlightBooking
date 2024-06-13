import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Flight } from "@/models/Flight"
import { Airport } from "@/models/Airport";
import { searchFlightOneWay } from "@/services/FlightService";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { BookingTemp } from "@/models/BookingTemp";
import { Passenger } from "@/models/Passenger";




interface FlightState{
    typeTicket: string
    dateRange: DateRange
    departureAirport: Airport | undefined
    arrivalAirport: Airport | undefined
    passenger: number
    bookingTempDeparture: BookingTemp | undefined
    bookingTempReturn: BookingTemp | undefined
    passengerInfor: Passenger[]
    loadingSearchFilght: boolean
    departFlights: Flight[] 
    returnFlights: Flight[]
    selectDepartFlight: Flight | undefined
    selectReturnFlight: Flight | undefined

    checkTime0000_0400: boolean,
    checkTime0400_0800: boolean,
    checkTime0800_1200: boolean,
    checkTime1200_1600: boolean 
    checkTime1600_2000: boolean 
    checkTime2000_2400: boolean 
}

const initialState: FlightState = {
    typeTicket: 'ONE_WAY',

    dateRange: {
        from: new Date(),
        to: addDays(new Date(), 1)
    },

    departureAirport: undefined,
    arrivalAirport: undefined,
    passenger : 1,
    bookingTempDeparture: undefined,
    bookingTempReturn: undefined,
    passengerInfor: [{
        id: 0,
        fullName: '',
        email: '',
        personalId: '',
        seatNumber: ''
    }],
    loadingSearchFilght: false,
    departFlights: [],
    returnFlights: [],
    selectDepartFlight: undefined,
    selectReturnFlight: undefined,
    checkTime0000_0400: false,
    checkTime0400_0800: false,
    checkTime0800_1200: false,
    checkTime1200_1600: false,
    checkTime1600_2000: false,
    checkTime2000_2400: false
}

export const flightSlice = createSlice({
    name: 'flight', 
    initialState,
    reducers:{
        setTypeTicket: (state, action: PayloadAction<string>) =>{
            state.typeTicket = action.payload
        },

   

        setDateRange:  (state, action: PayloadAction<DateRange>) =>{
            state.dateRange = action.payload
        },

        setDepartureAirportState:  (state, action: PayloadAction<Airport>) =>{
            state.departureAirport = action.payload
        },

        setArrivalAirportState:  (state, action: PayloadAction<Airport>) =>{
            state.arrivalAirport = action.payload
        },
        setPassenger:  (state, action: PayloadAction<number>) =>{
            state.passenger = action.payload

            state.passengerInfor = Array.from({ length: action.payload }, (_, index) => ({
                id: index,
                fullName: '',
                email: '',
                personalId: '',
                seatNumber: ''
              }))
        },
        setBookingTempDeparture:  (state, action: PayloadAction<BookingTemp | undefined>) =>{
            state.bookingTempDeparture = action.payload
        },

        setBookingTempReturn:  (state, action: PayloadAction<BookingTemp | undefined>) =>{
            state.bookingTempReturn = action.payload
        },
        setPassengerInfor:  (state, action: PayloadAction<Passenger[]>) =>{
            state.passengerInfor = action.payload
        },
        setLoadingSearchFlight:  (state, action: PayloadAction<boolean>) =>{
            state.loadingSearchFilght = action.payload
        },
        setDepartFlights:  (state, action: PayloadAction<Flight[]>) =>{
            state.departFlights = action.payload
        },
        setReturnFlights:  (state, action: PayloadAction<Flight[]>) =>{
            state.returnFlights = action.payload
        },
        setSelectDepartFlight:  (state, action: PayloadAction<Flight | undefined>) =>{
            state.selectDepartFlight = action.payload
        },
        setSelectReturnFlight:  (state, action: PayloadAction<Flight | undefined>) =>{
            state.selectReturnFlight = action.payload
        },
        setCheckTime0000_0400:  (state, action: PayloadAction<boolean>) =>{
            state.checkTime0000_0400 = action.payload
        },
        setCheckTime0400_0800:  (state, action: PayloadAction<boolean>) =>{
            state.checkTime0400_0800 = action.payload
        },
        setCheckTime0800_1200:  (state, action: PayloadAction<boolean>) =>{
            state.checkTime0800_1200 = action.payload
        },
        setCheckTime1200_1600:  (state, action: PayloadAction<boolean>) =>{
            state.checkTime1200_1600 = action.payload
        },
        setCheckTime1600_2000:  (state, action: PayloadAction<boolean>) =>{
            state.checkTime1600_2000 = action.payload
        },
        setCheckTime2000_2400:  (state, action: PayloadAction<boolean>) =>{
            state.checkTime2000_2400 = action.payload
        },
    }
})

export const {setTypeTicket, setDateRange, setDepartureAirportState, 
    setArrivalAirportState, setPassenger, setBookingTempDeparture, setBookingTempReturn, setPassengerInfor
    , setLoadingSearchFlight, setDepartFlights, setReturnFlights, setSelectDepartFlight, setSelectReturnFlight,
    setCheckTime0000_0400, setCheckTime0400_0800, setCheckTime0800_1200, setCheckTime1200_1600, setCheckTime1600_2000, setCheckTime2000_2400
} = flightSlice.actions;

export const selectTypeTicket = (state: RootState) => state.flight.typeTicket;

export default flightSlice.reducer;