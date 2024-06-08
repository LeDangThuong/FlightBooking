import React, { FC, useEffect, useState } from 'react'
import logo from '../../../assets/images/logo_emirates.png'
import airplane from '../../../assets/svgs/airplane.svg'
import wifi from '../../../assets/svgs/wifi.svg'
import fastfood from '../../../assets/svgs/fastfood.svg'
import stopwatch from '../../../assets/svgs/stopwatch.svg'
import airlineseat from '../../../assets/svgs/airline-seat.svg'
import { useNavigate } from 'react-router-dom'
import { Flight } from '@/models/Flight'
import { format, set } from 'date-fns'
import { Airport } from '@/models/Airport'
import { Airline } from '@/models/Airline'
import { getAirport } from '@/services/AirportService'
import { getAirlineByPlaneId } from '@/services/AirlineService'
import { Plane } from '@/models/Plane'
import { getPlaneDetailByPlaneId } from '@/services/PlaneService'
import { Seat, SeatResponse, groupSeatByClass } from '@/models/Seat'
import { SeatChoose } from './SeatChoose'
import { SeatCode } from './SeatCode'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { calculateTotalPriceAfterBooking } from '@/services/BookingService'
import { BookingTemp } from '@/models/BookingTemp'
import { useDispatch } from 'react-redux'
import { setBookingTempDeparture, setBookingTempReturn } from '@/redux/slice/flightSlice'
import { getSeatStatus } from '@/services/FlightService'

interface FlightItemProps {
  flight: Flight
  typeFlight: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  numberSeats: number
}

export const FlightItem: FC<FlightItemProps> = ({ onClick, flight, numberSeats, typeFlight }) => {
  const departureTime = format(flight.departureDate, 'HH:mm')
  const arrivalTime = format(flight.arrivalDate, 'HH:mm')

  const departureDate = format(flight.departureDate, 'EEE, dd MMMM yyyy')
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [showChooseSeat, setShowChooseSeat] = useState<boolean>(false)

  const [priceTicket, setPriceTicket] = useState<number>(0)

  const [bookingTemps, setBookingTemp] = useState<BookingTemp>()

  const [selectSeat, setSelectSeat] = useState<string[]>([])

  const handleSelectSeat = async (codeSeat: string) => {
    setSelectSeat((prevSelectSeat) => {
      let newSelectSeat
      if (!prevSelectSeat.includes(codeSeat) && prevSelectSeat.length < numberSeats) {
        newSelectSeat = [...prevSelectSeat, codeSeat]
      } else if (prevSelectSeat.includes(codeSeat)) {
        newSelectSeat = prevSelectSeat.filter((i) => i != codeSeat)
      } else {
        newSelectSeat = prevSelectSeat
      }

      calculateTotalPriceAfterBooking(flight.id, newSelectSeat).then(setPriceTicket)

      return newSelectSeat
    })
  }

  const handleShowChooseSeat = () => {
    setShowChooseSeat(!showChooseSeat)
  }

  const [departureAirport, setDepartureAirport] = useState<Airport | null>(null)
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null)
  const [plane, setPlane] = useState<Plane | null>(null)

  const [seatData, setSeatData] = useState<Record<string, Record<string, Seat[]>> | null>(null)

  const getSeats = async () => {
    //const listSeats = flight.seatStatuses

    // console.log(listSeats)

    const listSeats = await getSeatStatus(flight.id)
    console.log(listSeats)

    // const seats = JSON.parse(listSeats) as SeatResponse

    // console.log(seats)

    const groupedSeat = groupSeatByClass(listSeats)

    console.log(groupedSeat)
    setSeatData(groupedSeat)
  }

  const setAirport = async () => {
    setLoading(true)
    setDepartureAirport(await getAirport(flight.departureAirportId))
    setArrivalAirport(await getAirport(flight.arrivalAirportId))
    setPlane(await getPlaneDetailByPlaneId(flight.planeId))

    setLoading(false)
  }

  //const flightDuration = calculateTimeDifference(flight.departureDate, flight.arrivalDate)

  useEffect(() => {
    setAirport()
    getSeats()
  }, [])

  useEffect(() => {
    const booking = { price: priceTicket, selectSeats: selectSeat } as BookingTemp

    setBookingTemp(booking)

    if (typeFlight === 'DEPARTURE') {
      dispatch(setBookingTempDeparture(booking))
    } else if (typeFlight === 'RETURN') {
      dispatch(setBookingTempReturn(booking))
    }
  }, [selectSeat, priceTicket, typeFlight, dispatch])

  return (
    <div
      onClick={onClick}
      className='flex flex-col justify-between items-center w-full h-fit  px-8 pt-4 pb-4 rounded-2xl bg-white my-4 gap-6 '
      style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
    >
      <div className='flex w-[100%] justify-between '>
        <div className="text-neutral-900 text-xl font-bold font-['TradeGothic LT Extended']">{departureDate}</div>
        <div className="text-right text-rose-400 text-[32px] font-bold font-['Montserrat']">${priceTicket}</div>
      </div>

      <div className='flex w-full h-25 justify-between'>
        <div className=' px-4 py-2 h-full bg-white rounded-lg border border-green-300 justify-center items-center gap-3 flex '>
          <img className='h-fit w-[130px] object-fill  ' src={plane?.airline?.logoUrl} />
          <div className='flex flex-col '>
            <div className="text-neutral-900 text-2xl font-semibold font-['Montserrat']">
              {plane?.airline?.airlineName}
            </div>
            <div className="opacity-60 text-neutral-900 text-sm font-medium font-['Montserrat']">
              {plane?.flightNumber}
            </div>
          </div>
        </div>

        <div className='flex gap-6 items-center'>
          <img className='w-8 h-8' src={airplane} />
          <div className=' h-12 border border-slate-200'></div>

          <img className='w-8 h-8' src={wifi} />
          <div className=' h-12 border border-slate-200'></div>

          <img className='w-8 h-8' src={stopwatch} />
          <div className=' h-12 border border-slate-200'></div>

          <img className='w-8 h-8' src={fastfood} />
          <div className=' h-12 border border-slate-200'></div>

          <img className='w-8 h-8' src={airlineseat} />
        </div>
      </div>

      <div className='flex justify-center items-center gap-6'>
        <div className="text-neutral-900 text-2xl font-semibold font-['Montserrat']">{departureTime}</div>
        <div className="opacity-60 text-neutral-900 text-base font-medium font-['Montserrat']">
          {departureAirport?.city} - {departureAirport?.iataCode}
        </div>
        <svg width='39' height='6' viewBox='0 0 39 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M5.66667 3C5.66667 1.52724 4.47276 0.333335 3 0.333335C1.52724 0.333335 0.333336 1.52724 0.333336 3C0.333336 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3ZM39 2.5L3 2.5L3 3.5L39 3.5L39 2.5Z'
            fill='black'
          />
        </svg>

        <img className='w-12 h-12' src={airplane} />
        <svg width='39' height='6' viewBox='0 0 39 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M38.6667 3C38.6667 1.52724 37.4728 0.333333 36 0.333333C34.5272 0.333333 33.3333 1.52724 33.3333 3C33.3333 4.47276 34.5272 5.66667 36 5.66667C37.4728 5.66667 38.6667 4.47276 38.6667 3ZM36 2.5L-2.18557e-08 2.5L2.18557e-08 3.5L36 3.5L36 2.5Z'
            fill='black'
          />
        </svg>

        <div className="text-neutral-900 text-2xl font-semibold font-['Montserrat']">{arrivalTime}</div>
        <div className="opacity-60 text-neutral-900 text-base font-medium font-['Montserrat']">
          {arrivalAirport?.city} - {arrivalAirport?.iataCode}
        </div>
      </div>

      <div
        className='flex justify-between w-full rounded-md items-center p-2 hover:bg-slate-50 '
        onClick={handleShowChooseSeat}
      >
        <div className='text-black text-start text-[22px]'> Choose seat:</div>

        {showChooseSeat ? <ExpandMoreIcon className='text-black' /> : <KeyboardArrowRightIcon className='text-black' />}
      </div>

      <div className='flex flex-col w-full relative'>
        <div className={showChooseSeat ? ' absolute right-10 top-20' : ' absolute right-10 top-20 hidden'}>
          <div className='flex items-center'>
            <SeatChoose code={''} selected={true} />
            <div className="opacity-60 text-neutral-900 text-base font-medium font-['Montserrat']">Ghế bạn chọn</div>
          </div>
          <div className='flex items-center'>
            <SeatChoose code={''} selected={false} />
            <div className="opacity-60 text-neutral-900 text-base font-medium font-['Montserrat']">Ghế trống</div>
          </div>
          <div className='flex items-center'>
            <SeatChoose code={''} selected={true} inavailable={true} />
            <div className="opacity-60 text-neutral-900 text-base font-medium font-['Montserrat']">
              Ghế không thể chọn
            </div>
          </div>
        </div>
        {showChooseSeat && seatData ? (
          Object.entries(seatData)

            .map(([seatClass, rows]) => (
              <div key={seatClass}>
                <div className="text-center text-rose-400 text-2xl font-bold font-['Montserrat'] my-3">{seatClass}</div>

                {Object.entries(rows).map(([initial, seats]) => (
                  <div key={initial} className='flex relative'>
                    <div className='absolute'>
                      <SeatCode code={initial} />
                    </div>

                    <div className='flex w-full justify-center items-center'>
                      {seats.map((seat) => {
                        if (seat.status === 'AVAILABLE') {
                          return (
                            <div
                              onClick={() => {
                                handleSelectSeat(seat.key)
                              }}
                            >
                              <SeatChoose code={seat.key} selected={selectSeat.includes(seat.key)} />
                            </div>
                          )
                        } else {
                          return (
                            <div>
                              <SeatChoose code={seat.key} selected={false} inavailable={true} />
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
