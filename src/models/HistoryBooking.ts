export interface HistoryBooking {
    airlineLogo: string,
    departAirport: string,
    arrivalAirport: string,
    departDate: Date,
    arrivalDate: Date,
    iataCodeDepart: string,
    iataCodeArrival: string,
    seatNumber: string[]
}