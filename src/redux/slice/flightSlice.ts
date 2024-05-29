import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Flight } from "@/models/Flight"
import { Airport } from "@/models/Airport";
import { searchFlightOneWay } from "@/services/FlightService";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";




interface FlightState{
    typeTicket: string
    flights: Flight[]
    selectFlights: Flight[]
    dateRange: DateRange
    departureAirport: Airport | undefined
    arrivalAirport: Airport | undefined
    passenger: number
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
    passenger : 1
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
        },
    }
})

export const {setTypeTicket, searchFlights, setSelectFlights, setDateRange, setDepartureAirportState, setArrivalAirportState, setPassenger} = flightSlice.actions;

export const selectTypeTicket = (state: RootState) => state.flight.typeTicket;

export default flightSlice.reducer;