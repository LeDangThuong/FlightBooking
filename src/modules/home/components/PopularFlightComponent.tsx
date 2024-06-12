import { Airport } from '@/models/Airport'
import { Flight } from '@/models/Flight'
import { PopularFlight } from '@/models/PopularFlight'
import { getAirport } from '@/services/AirportService'
import { getFilghtById, getPopularImageByFlightId } from '@/services/FlightService'
import { FC, useEffect, useState } from 'react'

interface PopularFlightProps {
  flight: Flight
  onClickShow?: () => void
}

const PopularFlightComponent: FC<PopularFlightProps> = ({ flight, onClickShow }) => {
  const [popularFlight, setPopularFlight] = useState<PopularFlight>()

  const [departureAirport, setDepartureAirport] = useState<Airport>()

  const [arrivalAirport, setArrivalAirport] = useState<Airport>()

  const handlePoplarFilght = async () => {
    setPopularFlight(await getPopularImageByFlightId(flight.id))
    handleAirport()
  }

  const handleAirport = async () => {
    setDepartureAirport(await getAirport(flight!.departureAirportId))
    setArrivalAirport(await getAirport(flight!.arrivalAirportId))
  }

  useEffect(() => {
    handlePoplarFilght()
  }, [])

  return (
    <div className='relative h-80 w-72' onClick={onClickShow}>
      <img src={popularFlight?.imgUrl} alt={'Image flight'} className='object-cover h-full w-full rounded-xl' />
      <div className='absolute bottom-0 p-4 left-0 w-full h-1/2 bg-black opacity-50 flex flex-col items-center justify-center rounded-b-xl '>
        <div className="w-full  text-white text-[25px] font-semibold font-['Montserrat']">
          {departureAirport?.city} to {arrivalAirport?.city}
          <br />
        </div>

        <div className='flex flex-col items-end justify-end w-full'>
          <div className="w-fit text-white text-[15px] font-semibold font-['Montserrat']">From</div>
          <div className="w-fit text-white text-[25px] font-semibold font-['Montserrat']">${flight?.economyPrice}</div>
        </div>
      </div>
    </div>
  )
}

export default PopularFlightComponent
