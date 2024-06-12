import { Airport } from '@/models/Airport';
import axios from 'axios'

const API_URL = 'https://flightbookingbe-production.up.railway.app/'

export const getAllAirport = async (): Promise<Airport[]> =>{
    try{
        const response = await axios.get<Airport[]>(`${API_URL}airports`);

        return response.data;

        
    }catch(e){
        console.error('Error fetching users:', e);
        throw e;

    }
}

export const getAirport = async (id: number) : Promise<Airport> => {
    try{    
        const response = await axios.get<Airport>(`${API_URL}airports/${id}`)

        return response.data;

    }catch(e){

        console.error('Error fetching users:', e);
        throw e;

    }
}