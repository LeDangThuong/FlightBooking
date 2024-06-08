import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { FlightItem } from '../components/FlightItem'
import { setPassenger } from '@/redux/slice/flightSlice'
import { InforAirline } from '../components/InforAirline'
import { holdSeatBeforeBooking } from '@/services/BookingService'

export const DetailsFlight = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const selectFlights = useSelector((state: RootState) => state.flight.selectFlights)
  const passenger = useSelector((state: RootState) => state.flight.passenger)
  const bookingTempDeparture = useSelector((state: RootState) => state.flight.bookingTempDeparture)
  const bookingTempReturn = useSelector((state: RootState) => state.flight.bookingTempReturn)
  const typeTicket = useSelector((state: RootState) => state.flight.typeTicket)

  const handleFlightItem = async () => {
    // hold seat

    await holdSeatBeforeBooking(selectFlights[0].id, bookingTempDeparture!.selectSeats)
    if (typeTicket === 'ROUND_TRIP') {
      await holdSeatBeforeBooking(selectFlights[1].id, bookingTempReturn!.selectSeats)
    }

    navigate('/passenger_information')
  }

  return (
    <div className='bg-[#FAFBFC] h-fit flex flex-col  text-white  w-full px-32 mb-52 '>
      <div className=" h-9 mt-3 text-green-300 text-[32px] font-semibold font-['Montserrat']">
        Fight booking details
        <br />
      </div>
      div.h-5
      <div className='flex flex-col w-[300px] justify-start items-start flex-grow h-14 rounded-tl rounded-tr'>
        <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 rounded bg-white border border-[#79747e]'>
          <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 pl-4 py-2 rounded-tl rounded-tr'>
            <div className='flex flex-col justify-center items-start flex-grow h-10 relative'>
              <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative w-full'>
                <input
                  type='number'
                  className=' appearance-none
                      rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none'
                  value={passenger}
                  onChange={(value) => {
                    if (Number.parseInt(value.target.value) >= 1) {
                      dispatch(setPassenger(Number.parseInt(value.target.value)))
                    }
                  }}
                />
                {/* <p className='flex-grow-0 flex-shrink-0 text-base text-left text-[#1c1b1f]'>1 Passenger</p> */}
              </div>
              <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 absolute left-[-4px] top-[-16px] px-1 bg-white'>
                <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-[#1c1b1f]'>Passenger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-2'></div>
      {selectFlights.map((flight, index) => (
        <div className='flex flex-col mb-6'>
          <InforAirline flight={flight} />
          <FlightItem typeFlight={index === 0 ? 'DEPARTURE' : 'RETURN'} flight={flight} numberSeats={passenger} />
        </div>
      ))}
      <div className='h-2'></div>
      <div className='h-2'></div>
      <div className='h-5'></div>
      <div className='flex justify-between'>
        <div>
          <span className="text-slate-900 text-3xl font-semibold font-['Montserrat'] leading-9 mr-2">Total: </span>
          <span className="text-rose-400 text-3xl font-bold font-['Montserrat'] leading-9">
            $
            {(bookingTempDeparture !== undefined ? bookingTempDeparture?.price : 0) +
              (bookingTempReturn !== undefined ? bookingTempReturn?.price : 0)}
          </span>
        </div>

        <div className='w-fit h-12 flex-col justify-start items-start gap-2.5 inline-flex'>
          <div
            className='self-stretch h-12 px-4 py-2 bg-green-300 rounded justify-center items-center gap-1 inline-flex'
            onClick={handleFlightItem}
          >
            <div className="text-neutral-900 text-sm font-semibold font-['Montserrat']">Continue booking</div>
          </div>
        </div>
      </div>
      <div className='h-2'></div>
    </div>
  )
}
