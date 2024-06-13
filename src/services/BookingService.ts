import { HistoryBooking } from '@/models/HistoryBooking'
import { Passenger } from '@/models/Passenger'
import { User } from '@/models/User'
import { RootState } from '@/redux/store'
import axios from 'axios'
import { useSelector } from 'react-redux'

const API_URL = 'https://flightbookingbe-production.up.railway.app/'


export const calculateTotalPriceAfterBooking = async (flightId: number, selectedSeats: string[]) : Promise<number> => {
    try {    
        const response = await axios.post<number>(`${API_URL}booking/calculate-total-price-after-booking?flightId=${flightId}`, selectedSeats);

        return response.data;

    }catch(e){

        console.error('Error fetching users:', e);
        throw e;

    }
}

export const holdSeatBeforeBooking = async (flightId: number, selectedSeats: string[]) => {
    try {
        const response = await axios.post(`${API_URL}booking/hold-seat-before-booking?flightId=${flightId}`, selectedSeats);
        
        if (response.status === 200 ) {
            return true
        }

        return false
    } catch (error) {
        throw error
    }
}

export const bookSeatBeforeBooking = async (flightId: number, selectedSeats: string[]) => {
    
    try {
        const response = await axios.post(`${API_URL}booking/book-seat-before-booking?flightId=${flightId}`, selectedSeats);
        if (response.status === 200) {
            return true
        }

        return false
    } catch (error) {
        throw error
    }
}

export const fillInforPassengerToCreateBooking = async (flightId: number, selectedSeats: string[], currentUser: User, passengerInfor: Passenger[]): Promise<boolean> => {
    try{

        console.log( { 
            flightId,
            selectedSeats,
            bookerFullName: passengerInfor[0].fullName,
            bookerEmail: passengerInfor[0].email,
            bookerPersonalId: passengerInfor[0].personalId,
            userId: currentUser?.id ,
            passengers: passengerInfor.map((passenger, index) => ({
                fullName: passenger.fullName,
                email: passenger.email,
                personalId: passenger.personalId,
                seatNumber: selectedSeats[index]
            }))
        })


        const response = await axios.post(`${API_URL}booking/fill-info-passenger-to-create-booking`, { 
            flightId,
            selectedSeats,
            bookerFullName: passengerInfor[0].fullName,
            bookerEmail: passengerInfor[0].email,
            bookerPersonalId: passengerInfor[0].personalId,
            userId: currentUser?.id ,
            passengers: passengerInfor.map((passenger, index) => ({
                fullName: passenger.fullName,
                email: passenger.email,
                personalId: passenger.personalId,
                seatNumber: selectedSeats[index]
            }))
        });

        
        if (response.status === 200) {
            return true;
        }

        return false

    }catch(e){

        console.error('Error fetching users:', e);
        throw e;
    }
}


export const getTicketByUserId = async(userId: number)  : Promise<HistoryBooking[] | null>  => {
    try {
        const response = await axios.get<HistoryBooking[]>(`${API_URL}booking/get-ticket-by-user-id?userId=${userId}`);

        if (response.status === 200) {  
            return response.data
        }
       
    
        return null
    } catch (e) {
        console.error('Error fetching users:', e);
        return null
    }
}