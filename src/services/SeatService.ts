import axios from 'axios'
import {SeatResponse} from '@/models/Seat'

const API_URL = 'https://flightbooking-be.onrender.com/'

export const getSeatStatus = async (id: number) : Promise<SeatResponse> => {
    try{    
        const response = await axios.get<SeatResponse>(`${API_URL}airlines/${id}/get-seat-status`)

        return response.data;

    }catch(e){

        console.error('Error fetching users:', e);
        throw e;

    }
}