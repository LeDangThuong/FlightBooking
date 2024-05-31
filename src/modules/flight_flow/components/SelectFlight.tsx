import { FC, useEffect, useState } from 'react'
import arrow from '../../../assets/svgs/arrow.svg'
import logo from '../../../assets/images/logo_vnairline.png'
import exit from '../../../assets/svgs/exit.svg'
import airplane from '../../../assets/svgs/airplane.svg'
import { Flight } from '@/models/Flight'
import { Airport } from '@/models/Airport'
import { Airline } from '@/models/Airline'
import { getAirport } from '@/services/AirportService'
import { getAirlineByPlaneId } from '@/services/AirlineService'
import { format } from 'date-fns'

interface SelectFlightProps {
  onClickClose?: React.MouseEventHandler<HTMLDivElement>
  index: number
  flight: Flight
}

export const SelectFlight: FC<SelectFlightProps> = ({ onClickClose, flight, index }) => {
  const departureTime = format(flight.departureDate, 'HH:mm')
  const arrivalTime = format(flight.arrivalDate, 'HH:mm')

  const departureDate = format(flight.departureDate, 'EEE, dd MMMM yyyy')
  const [loading, setLoading] = useState<boolean>(false)

  const [departureAirport, setDepartureAirport] = useState<Airport | null>(null)
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null)
  const [airline, setAirline] = useState<Airline | null>(null)

  const setAirport = async () => {
    setLoading(true)
    setDepartureAirport(await getAirport(flight.departureAirportId))
    setArrivalAirport(await getAirport(flight.arrivalAirportId))
    setAirline(await getAirlineByPlaneId(flight.planeId))
    setLoading(false)
  }

  //const flightDuration = calculateTimeDifference(flight.departureDate, flight.arrivalDate)

  useEffect(() => {
    setAirport()
  }, [])
  return loading ? (
    <div></div>
  ) : (
    <div className='flex flex-col w-full'>
      <div className='h-2'></div>

      <div className='w-full h-[0px] border border-zinc-500/opacity-50'></div>
      <div className='h-2'></div>

      <div className='flex '>
        <div className='w-[35px] h-[35px] bg-green-300 rounded-[10px] flex justify-center items-center'>
          <div className="text-white text-sm font-medium font-['Montserrat']">{index + 1}</div>
        </div>

        <div className='w-2'></div>

        <div className='flex flex-col items-start justify-center'>
          <div className="text-zinc-500 text-[10px] font-medium font-['Montserrat']">{departureDate}</div>

          <div className='flex justify-center  items-center '>
            <div className="text-center text-black text-[10px] font-semibold font-['Montserrat']">
              {departureAirport?.iataCode}
            </div>
            <div className='w-2'></div>
            <img className='w-6 h-6' src={arrow} />
            <div className='w-2'></div>
            <div className="text-center text-black text-[10px] font-semibold font-['Montserrat']">
              {arrivalAirport?.iataCode}
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center w-full'>
        <img className='w-25 h-20' src={airline?.logoUrl} />
        <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">{airline?.airlineName}</div>
        <div
          className='w-[17px] h-[17px] rounded-xl border border-green-300 flex-col justify-center items-center gap-[13px] inline-flex'
          onClick={onClickClose}
        >
          <div className='h-12 py-2 rounded justify-center items-center gap-1 inline-flex'>
            <img className='w-6 h-6' src={exit} />
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center w-full'>
        <div className='flex flex-col'>
          <div className='text-center'>
            <span className="text-black text-sm font-semibold font-['Montserrat']">
              {departureTime}
              <br />
            </span>
            <span className="text-zinc-500 text-sm font-semibold font-['Montserrat']">
              {departureAirport?.iataCode}
            </span>
          </div>
        </div>

        <svg width='39' height='6' viewBox='0 0 39 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M5.66667 3C5.66667 1.52724 4.47276 0.333335 3 0.333335C1.52724 0.333335 0.333336 1.52724 0.333336 3C0.333336 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3ZM39 2.5L3 2.5L3 3.5L39 3.5L39 2.5Z'
            fill='black'
          />
        </svg>
        <img className='w-6 h-6' src={airplane} />

        <svg width='39' height='6' viewBox='0 0 39 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M38.6667 3C38.6667 1.52724 37.4728 0.333333 36 0.333333C34.5272 0.333333 33.3333 1.52724 33.3333 3C33.3333 4.47276 34.5272 5.66667 36 5.66667C37.4728 5.66667 38.6667 4.47276 38.6667 3ZM36 2.5L-2.18557e-08 2.5L2.18557e-08 3.5L36 3.5L36 2.5Z'
            fill='black'
          />
        </svg>

        <div className='flex flex-col'>
          <div className='text-center'>
            <span className="text-black text-sm font-semibold font-['Montserrat']">
              {arrivalTime}
              <br />
            </span>
            <span className="text-zinc-500 text-sm font-semibold font-['Montserrat']">{arrivalAirport?.iataCode}</span>
          </div>
        </div>
      </div>

      <div className='h-2'></div>
    </div>
  )
}
