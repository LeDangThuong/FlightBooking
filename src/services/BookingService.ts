import axios from 'axios'

const API_URL = 'https://flightbooking-be.onrender.com/'

export const calculateTotalPriceBeforeBooking = async (flightId: number, selectedSeats: string[]) : Promise<number> => {
    try{    
        const response = await axios.post<number>(`${API_URL}booking/calculate-total-price-before-booking`, { flightId, selectedSeats});

        return response.data;

    }catch(e){

        console.error('Error fetching users:', e);
        throw e;

    }
}