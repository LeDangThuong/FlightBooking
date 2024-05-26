import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Flight } from "@/models/Flight"
import { Airport } from "@/models/Airport";
import { searchFlightOneWay } from "@/services/FlightService";
import { DateRange } from "react-day-picker";




interface FlightState{
    typeTicket: string
    flights: Flight[]
    selectFlights: Flight[]
    dateRange: DateRange

}

const initialState: FlightState = {
    typeTicket: 'one-way',
    flights: [],
    selectFlights: [],
    dateRange: {
        from: new Date(),
       
      }
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
      
    }
})

export const {setTypeTicket, searchFlights, setSelectFlights, setDateRange} = flightSlice.actions;

export const selectTypeTicket = (state: RootState) => state.flight.typeTicket;

export default flightSlice.reducer;