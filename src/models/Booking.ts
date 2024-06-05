import { Passenger } from "./Passenger";

export interface Booking{
    id: number;
    flightId: number;
    selectedSeats: string[];
    bookerFullName: string;
    bookerEmail: string;
    bookerPersonalId: string;
    userId: number;
    passengers: Passenger[];
}