import { SeatResponse } from "./Seat";

export interface Flight{
    id: number;
    flightStatus: string;
    departureDate: Date;
    arrivalDate: Date;
    duration: number;
    departureAirportId: number;
    arrivalAirportId: number;
    planeId: number;
    economyPrice: number;
    businessPrice: number;
    firstClassPrice: number;
    seatStatuses: string;
}