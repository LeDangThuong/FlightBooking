import { Airport } from '@/models/Airport'
import { Flight } from '@/models/Flight';
import axios from 'axios';
import {  format } from "date-fns";

const API_URL = 'https://flightbooking-be.onrender.com/'

export const searchFlightOneWay = async (departureAirport: Airport, arrivalAirport: Airport, departureDate: Date) => {
    console.log(departureDate.toISOString())

    const formatDepartureDate = format(departureDate, "yyyy-MM-dd HH:mm:ss")

    try{
        const response = await axios.get<Flight[]>(`${API_URL}flight/search-one-way?departureAirportId=${departureAirport.id}&arrivalAirportId=${arrivalAirport.id}&departureDate=${formatDepartureDate}`);

        console.log(response.data)

        return response.data;



        
    }catch(e){
        console.error('Error fetching users:', e);
        throw e;

    }
}