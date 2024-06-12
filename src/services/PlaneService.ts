
import { Plane } from '@/models/Plane';
import axios from 'axios'

const API_URL = 'https://flightbookingbe-production.up.railway.app/'

export const getPlaneNumberByPlaneId = async (id: number) : Promise<Plane> => {
    try{    
        const response = await axios.get<Plane>(`${API_URL}airlines/get-plane-number?planeId=${id}`)

        return response.data;

    }catch(e){

        console.error('Error fetching users:', e);
        throw e;

    }
}

