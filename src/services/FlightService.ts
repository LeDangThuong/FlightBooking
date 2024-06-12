import { Airport } from '@/models/Airport'
import { Flight } from '@/models/Flight';
import { PopularFlight } from '@/models/PopularFlight';
import axios from 'axios';
import {  format } from "date-fns";

const API_URL = 'https://flightbookingbe-production.up.railway.app/'
// const API_URL = 'http://localhost:7050/'

export const searchFlightOneWay = async (departureAirport: Airport, arrivalAirport: Airport, departureDate: Date) => {
    console.log(departureDate.toISOString())

    const formatDepartureDate = format(departureDate, "yyyy-MM-dd HH:mm:ss")

    try{
        const response = await axios.get<Flight[]>(`${API_URL}flight/search-flight-by-type?ROUND_TRIP or ONE_WAY=ONE_WAY&departureAirportId=${departureAirport.id}&arrivalAirportId=${arrivalAirport.id}&departureDate=${formatDepartureDate}`);

        console.log(response.data)

        return response.data;



        
    }catch(e){
        console.error('Error fetching users:', e);
        throw e;

    }
}


export const searchFlightRoundTrip= async (departureAirport: Airport, arrivalAirport: Airport, departureDate: Date, returnDate: Date) => {
    console.log(departureDate.toISOString())

    const formatDepartureDate = format(departureDate, "yyyy-MM-dd HH:mm:ss")
    const formatReturnDate = format(departureDate, "yyyy-MM-dd HH:mm:ss")

    try{
        const response = await axios.get<Flight[]>(`${API_URL}flight/search-flight-by-type?ROUND_TRIP or ONE_WAY=ROUND_TRIP&departureAirportId=${departureAirport.id}&arrivalAirportId=${arrivalAirport.id}&departureDate=${formatDepartureDate}&returnDate=${formatReturnDate}`);

        console.log(response.data)

        return response.data;



        
    }catch(e){
        console.error('Error fetching users:', e);
        throw e;

    }
}

export const getSeatStatus = async (flightId: number) => {
    try{
        const response = await axios.get(`${API_URL}flight/${flightId}/get-seat-status?flightId=${flightId}`);
        return response.data;
    }catch(e){
        console.error('Error fetching users:', e);
        throw e;
    }
}

export const getPopularImageByFlightId = async (flightId: number): Promise<PopularFlight>  => {
    try{
        const response = await axios.get<PopularFlight>(`${API_URL}flight/get-popular-image-by-flight-id?flightId=${flightId}`);
        return response.data;
    }catch(e){
        console.error('Error fetching users:', e);
        throw e;
    }
}

export const getFilghtById = async (flightId: number): Promise<Flight> => {
    try{
        const response = await axios.get<Flight>(`${API_URL}flight/get-flight-by-id?flightId=${flightId}`);
        return response.data;
    }catch(e){
        console.error('Error fetching users:', e);
        throw e;
    }
}

export const getAllFlight = async (): Promise<Flight[]> => {
    try{
        const response = await axios.get<Flight[]>(`${API_URL}flight/get-all-flight`);
        return response.data;
    }catch(e){
        console.error('Error fetching users:', e);
        throw e;
    }
}