
export interface Seat {
    class: string;
    status: string;
    userId: string;
    key: string;
}

export interface SeatResponse {
    [key: string]: Seat;
}


export const groupSeatByClass = (data: SeatResponse) : Record<string, Record<string, Seat[]>> =>{
    const grouped: Record<string, Record<string, Seat[]>> = {};

   

    Object.entries(data).forEach(([key, seat]) => {
        const seatClass = seat.class;
        //console.log(key)
        const initial = key.charAt(0);

        if (!grouped[seatClass]) {
            grouped[seatClass] = {};
        }
        if (!grouped[seatClass][initial]) {
            grouped[seatClass][initial] = [];
        }
        grouped[seatClass][initial].push({ ...seat, key });
    });

    console.log(grouped)

    return grouped;
}