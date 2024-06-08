import { Review } from '@/models/Review';
import axios from 'axios'


 const API_URL = 'https://flightbooking-be.onrender.com/'
// const API_URL = 'http://localhost:7050/'


export const getAllReviews = async (): Promise<Review[]> => {
    try {
        const response = await axios.get<Review[]>(`${API_URL}reviews/getAllReview`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;

    }
}

