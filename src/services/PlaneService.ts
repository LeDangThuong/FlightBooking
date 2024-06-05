
import { Plane } from '@/models/Plane';
import axios from 'axios'

const API_URL = 'https://flightbooking-be.onrender.com/'

export const getPlaneDetailByPlaneId = async (id: number) : Promise<Plane> => {
    try{    
        const response = await axios.get<Plane>(`${API_URL}airlines/get-plane-detail-by-planeId?planeId=${id}`)

        return response.data;

    }catch(e){

        console.error('Error fetching users:', e);
        throw e;

    }
}