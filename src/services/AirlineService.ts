import { Airline } from '@/models/Airline';
import axios from 'axios'

const API_URL = 'https://flightbookingbe-production.up.railway.app/'

export const getAirlineByPlaneId = async (id: number) : Promise<Airline> => {
    try{    
        const response = await axios.get<Airline>(`${API_URL}airlines/get-airline-by-planeId?planeId=${id}`)

        return response.data;

    }catch(e){

        console.error('Error fetching users:', e);
        throw e;

    }
}

export const getAllAirline = async (): Promise<Airline[]> => {
    try {
        const response = await axios.get<Airline[]>(`${API_URL}airlines`)

        return response.data
    } catch (e) {  

        console.error('Error fetching users:', e);
        throw e;

    }
}

