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
    flights: Flight[]
    selectFlights: Flight[]
    dateRange: DateRange
    departureAirport: Airport | undefined
    arrivalAirport: Airport | undefined
    passenger: number
    bookingTempDeparture: BookingTemp | undefined
    bookingTempReturn: BookingTemp | undefined
    passengerInfor: Passenger[]
}

const initialState: FlightState = {
    typeTicket: 'ONE_WAY',
    flights: [],
    selectFlights: [],
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
      }]
}

export const flightSlice = createSlice({
    name: 'flight', 
    initialState,
    reducers:{
        setTypeTicket: (state, action: PayloadAction<string>) =>{
            state.typeTicket = action.payload
        },

        searchFlights: (state, action: PayloadAction<Flight[]>) =>{
          state.flights = action.payload;
        },

        setSelectFlights:  (state, action: PayloadAction<Flight[]>) =>{
            state.selectFlights = action.payload
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
    }
})

export const {setTypeTicket, searchFlights, setSelectFlights, setDateRange, setDepartureAirportState, 
    setArrivalAirportState, setPassenger, setBookingTempDeparture, setBookingTempReturn, setPassengerInfor} = flightSlice.actions;

export const selectTypeTicket = (state: RootState) => state.flight.typeTicket;

export default flightSlice.reducer;