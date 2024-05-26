import { Airline } from '@/models/Airline';
import axios from 'axios'

const API_URL = 'https://flightbooking-be.onrender.com/'

export const getAirline = async (id: number) : Promise<Airline> => {
    try{    
        const response = await axios.get<Airline>(`${API_URL}airlines/${id}`)

        return response.data;

    }catch(e){

        console.error('Error fetching users:', e);
        throw e;

    }
}