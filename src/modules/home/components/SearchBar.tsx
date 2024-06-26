import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/dateRangePicker'
import { Airport } from '@/models/Airport'
import {
  setTypeTicket,
  setArrivalAirportState,
  setDepartureAirportState,
  setPassenger,
  setDepartFlights,
  setReturnFlights
} from '@/redux/slice/flightSlice'
import { RootState } from '@/redux/store'
import { getAllAirport } from '@/services/AirportService'
import { filterFlightsWithoutFilter, searchFlightOneWay, searchFlightRoundTrip } from '@/services/FlightService'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getAllReviews } from '@/services/ReviewService'
import { setReviews } from '@/redux/slice/reviewSlice'

interface SearchBarProps {
  onClick?: () => void
}

const SearchBar: FC<SearchBarProps> = ({ onClick }) => {
  const navigate = useNavigate()

  const handleShowFlight = async () => {
    if (departureAirport === undefined || arrivalAirport === undefined) {
      onClick!()
      return
    }

    setLoading(true)

    if (typeTicket === 'ONE_WAY') {
      const departFlight = await filterFlightsWithoutFilter(
        'ONE_WAY',
        departureAirport!,
        arrivalAirport!,
        dateRange.from!,
        'economy',
        'asc'
      )

      dispatch(setDepartFlights(departFlight))
    } else if (typeTicket === 'ROUND_TRIP') {
      const departFlight = await filterFlightsWithoutFilter(
        'ONE_WAY',
        departureAirport!,
        arrivalAirport!,
        dateRange.from!,
        'economy',
        'asc'
      )
      const returnFlight = await filterFlightsWithoutFilter(
        'ONE_WAY',
        arrivalAirport!,
        departureAirport!,
        dateRange.to!,
        'economy',
        'asc'
      )
      dispatch(setDepartFlights(departFlight))
      dispatch(setReturnFlights(returnFlight))
    }

    dispatch(setDepartureAirportState(departureAirport!))
    dispatch(setArrivalAirportState(arrivalAirport!))

    navigate('/flight_listing')

    setLoading(false)
  }

  const typeTicket = useSelector((state: RootState) => state.flight.typeTicket)
  const dateRange = useSelector((state: RootState) => state.flight.dateRange)
  const passenger = useSelector((state: RootState) => state.flight.passenger)

  const departureAirportState = useSelector((state: RootState) => state.flight.departureAirport)
  const arrivalAirportState = useSelector((state: RootState) => state.flight.arrivalAirport)

  const dispatch = useDispatch()

  const [airports, setAirports] = useState<Airport[]>([])

  const [departureAirport, setDepartureAirport] = useState<Airport>()
  const [arrivalAirport, setArrivalAirport] = useState<Airport>()

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [showDropdownFrom, setShowDropdownFrom] = useState<boolean>(false)
  const [showDropdownTo, setShowDropdownTo] = useState<boolean>(false)

  const handleShowDropdownFrom = () => {
    setShowDropdownFrom(!showDropdownFrom)
  }

  const handleShowDropdownTo = () => {
    setShowDropdownTo(!showDropdownTo)
  }

  const handleSelectDepartureAirport = (airport: Airport) => {
    setDepartureAirport(airport)
    handleShowDropdownFrom()
  }

  const handleSelectArrivalAirport = (airport: Airport) => {
    setArrivalAirport(airport)
    handleShowDropdownTo()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAirport()
        // dispatch(setReviews(await getAllReviews()))
        setAirports(data)
        setLoading(false)
      } catch (error) {
        setError('Error fetching users')
        setLoading(false)
      }
    }

    fetchData()

    console.log(airports)

    if (departureAirportState !== undefined) {
      setDepartureAirport(departureAirportState)
    }

    if (arrivalAirportState !== undefined) {
      setArrivalAirport(arrivalAirportState)
    }
  }, [])

  return (
    <div
      className='flex flex-col justify-start items-start  md:w-[700px] lg:w-[1232px] w-[500px] absolute left-1/2 transform -translate-x-1/2 top-[480px] gap-8 px-8 pt-4 pb-8 rounded-2xl bg-white'
      style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
    >
      <ToastContainer />
      <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-8'>
        <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-8'>
          <Button className='flex justify-center items-center flex-grow-0 flex-shrink-0 h-12 px-4 py-2 rounded text-black hover:text-[#8DD3BB] gap-1 active:underline-offset-2'>
            <svg
              width={24}
              height={24}
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
              className='flex-grow-0 flex-shrink-0 w-6 h-6 relative'
              preserveAspectRatio='none'
            >
              <path
                d='M8.74733 21.75H7.49952C7.37414 21.75 7.25077 21.7185 7.14069 21.6585C7.03062 21.5984 6.93735 21.5118 6.86941 21.4064C6.80147 21.301 6.76104 21.1803 6.7518 21.0552C6.74257 20.9302 6.76483 20.8048 6.81655 20.6906L9.83811 14.0227L5.30108 13.9219L3.64639 15.9267C3.33092 16.3233 3.07921 16.5 2.43702 16.5H1.59702C1.46402 16.5043 1.33195 16.4764 1.212 16.4188C1.09205 16.3612 0.987757 16.2755 0.907956 16.1691C0.796393 16.0186 0.686706 15.7636 0.793581 15.3998L1.72264 12.0717C1.72967 12.0469 1.73811 12.022 1.74749 11.9977C1.74795 11.9953 1.74795 11.9929 1.74749 11.9906C1.73781 11.9663 1.72951 11.9414 1.72264 11.9161L0.792643 8.56687C0.691862 8.21016 0.802018 7.96078 0.912643 7.81406C0.986929 7.71549 1.08331 7.63573 1.19403 7.58118C1.30475 7.52664 1.42672 7.49883 1.55014 7.5H2.43702C2.91655 7.5 3.38202 7.71516 3.65577 8.0625L5.27624 10.0336L9.83811 9.96609L6.81749 3.30984C6.7657 3.19568 6.74335 3.07036 6.75249 2.94533C6.76163 2.8203 6.80196 2.69956 6.8698 2.59414C6.93764 2.48872 7.03082 2.40198 7.14083 2.34186C7.25083 2.28175 7.37416 2.25016 7.49952 2.25H8.76092C8.9369 2.25354 9.10983 2.29667 9.26685 2.3762C9.42388 2.45572 9.56097 2.5696 9.66796 2.70937L15.5297 9.83438L18.2376 9.76312C18.4359 9.75234 18.9853 9.74859 19.1123 9.74859C21.7026 9.75 23.2495 10.5909 23.2495 12C23.2495 12.4434 23.0723 13.2656 21.8869 13.7887C21.187 14.0981 20.2533 14.2547 19.1114 14.2547C18.9858 14.2547 18.4378 14.2509 18.2367 14.2402L15.5292 14.168L9.65296 21.293C9.54588 21.4321 9.40891 21.5454 9.25216 21.6246C9.0954 21.7037 8.92288 21.7465 8.74733 21.75Z'
                fill='currentColor'
              />
            </svg>
            <p>Flights</p>
          </Button>
          <svg
            width={1}
            height={48}
            viewBox='0 0 1 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='flex-grow-0 flex-shrink-0'
            preserveAspectRatio='xMidYMid meet'
          >
            <line x1='0.5' y1='2.18557e-8' x2='0.499998' y2={48} stroke='#D7E2EE' />
          </svg>
        </div>

        <div className='flex gap-4'>
          <div
            className='w-fit h-12 flex-col justify-start items-start gap-2.5 inline-flex'
            onClick={() => dispatch(setTypeTicket('ONE_WAY'))}
          >
            <div
              className={
                typeTicket === 'ONE_WAY'
                  ? 'h-12 px-4 py-2 bg-green-300 rounded justify-center items-center gap-1 inline-flex'
                  : 'h-12 px-4 py-2 bg-white rounded justify-center items-center gap-1 inline-flex border-black border-[1px]'
              }
            >
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9.46858 15H9.49983C9.65427 15.0009 9.80542 14.9553 9.9336 14.8691C10.0618 14.783 10.1611 14.6603 10.2186 14.5169L10.1967 14.5086L10.1967 14.5084C10.141 14.6473 10.0447 14.7662 9.92052 14.8497C9.79624 14.9332 9.64971 14.9774 9.49996 14.9766H9.49983H9.4691M9.46858 15L9.46963 14.9766C9.46945 14.9766 9.46928 14.9766 9.4691 14.9766M9.46858 15V14.9766H9.4691M9.46858 15L9.4691 14.9766M9.4691 14.9766C9.17379 14.9631 8.92874 14.7658 8.83168 14.4846L8.83151 14.4841C8.82949 14.4786 8.82777 14.4735 8.82603 14.4677L8.82617 14.4676L8.82513 14.4652L6.99283 10.1733C6.96895 10.0939 6.9662 10.0096 6.98487 9.92877C7.00363 9.84756 7.04336 9.77269 7.1001 9.71164L9.4691 14.9766ZM14.7645 1.23688C14.8636 1.33635 14.9317 1.4624 14.9607 1.59977C14.9896 1.73715 14.9781 1.87998 14.9276 2.01097L14.9276 2.01111L10.1968 14.5082L7.10012 9.71161L13.5164 2.8291C13.5165 2.82901 13.5166 2.82891 13.5167 2.82881C13.5393 2.80618 13.5572 2.77934 13.5694 2.74981C13.5817 2.72016 13.588 2.68838 13.588 2.65628C13.588 2.62418 13.5817 2.5924 13.5694 2.56275C13.5571 2.5331 13.5391 2.50615 13.5164 2.48346C13.4937 2.46076 13.4668 2.44276 13.4371 2.43048C13.4075 2.41819 13.3757 2.41187 13.3436 2.41187C13.3115 2.41187 13.2797 2.41819 13.25 2.43048C13.2205 2.44271 13.1937 2.4606 13.1711 2.48316C13.171 2.48326 13.1709 2.48336 13.1708 2.48346L6.28512 8.89942C6.22406 8.95617 6.14918 8.99591 6.06797 9.01467C5.98716 9.03334 5.90288 9.0306 5.82347 9.00672L1.53403 7.17504L1.53408 7.17494L1.53191 7.17425L1.51945 7.1703C1.51939 7.17028 1.51933 7.17026 1.51927 7.17024C1.37747 7.12275 1.25378 7.03267 1.16507 6.91228C1.07633 6.79184 1.02693 6.64694 1.02362 6.49737C1.0203 6.34781 1.06324 6.20086 1.14657 6.07661C1.22872 5.95412 1.34617 5.85957 1.48327 5.80546V5.80634L1.49156 5.8032L13.9925 1.07164L13.9925 1.07162C14.1235 1.02184 14.266 1.01095 14.4029 1.04027C14.5399 1.0696 14.6654 1.13787 14.7645 1.23688ZM14.7645 1.23688C14.7645 1.23689 14.7645 1.23691 14.7645 1.23692L14.7811 1.22034L14.7645 1.23688Z'
                  fill='black'
                  stroke='#112211'
                  stroke-width='0.046875'
                />
              </svg>
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">One way</div>
            </div>
          </div>

          <div
            className='w-fit h-12 flex-col justify-start items-start gap-2.5 inline-flex'
            onClick={() => dispatch(setTypeTicket('ROUND_TRIP'))}
          >
            <div
              className={
                typeTicket === 'ROUND_TRIP'
                  ? 'h-12 px-4 py-2 bg-green-300 rounded justify-center items-center gap-1 inline-flex'
                  : 'h-12 px-4 py-2 bg-white rounded justify-center items-center gap-1 inline-flex border-black border-[1px]'
              }
            >
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9.46858 15H9.49983C9.65427 15.0009 9.80542 14.9553 9.9336 14.8691C10.0618 14.783 10.1611 14.6603 10.2186 14.5169L10.1967 14.5086L10.1967 14.5084C10.141 14.6473 10.0447 14.7662 9.92052 14.8497C9.79624 14.9332 9.64971 14.9774 9.49996 14.9766H9.49983H9.4691M9.46858 15L9.46963 14.9766C9.46945 14.9766 9.46928 14.9766 9.4691 14.9766M9.46858 15V14.9766H9.4691M9.46858 15L9.4691 14.9766M9.4691 14.9766C9.17379 14.9631 8.92874 14.7658 8.83168 14.4846L8.83151 14.4841C8.82949 14.4786 8.82777 14.4735 8.82603 14.4677L8.82617 14.4676L8.82513 14.4652L6.99283 10.1733C6.96895 10.0939 6.9662 10.0096 6.98487 9.92877C7.00363 9.84756 7.04336 9.77269 7.1001 9.71164L9.4691 14.9766ZM14.7645 1.23688C14.8636 1.33635 14.9317 1.4624 14.9607 1.59977C14.9896 1.73715 14.9781 1.87998 14.9276 2.01097L14.9276 2.01111L10.1968 14.5082L7.10012 9.71161L13.5164 2.8291C13.5165 2.82901 13.5166 2.82891 13.5167 2.82881C13.5393 2.80618 13.5572 2.77934 13.5694 2.74981C13.5817 2.72016 13.588 2.68838 13.588 2.65628C13.588 2.62418 13.5817 2.5924 13.5694 2.56275C13.5571 2.5331 13.5391 2.50615 13.5164 2.48346C13.4937 2.46076 13.4668 2.44276 13.4371 2.43048C13.4075 2.41819 13.3757 2.41187 13.3436 2.41187C13.3115 2.41187 13.2797 2.41819 13.25 2.43048C13.2205 2.44271 13.1937 2.4606 13.1711 2.48316C13.171 2.48326 13.1709 2.48336 13.1708 2.48346L6.28512 8.89942C6.22406 8.95617 6.14918 8.99591 6.06797 9.01467C5.98716 9.03334 5.90288 9.0306 5.82347 9.00672L1.53403 7.17504L1.53408 7.17494L1.53191 7.17425L1.51945 7.1703C1.51939 7.17028 1.51933 7.17026 1.51927 7.17024C1.37747 7.12275 1.25378 7.03267 1.16507 6.91228C1.07633 6.79184 1.02693 6.64694 1.02362 6.49737C1.0203 6.34781 1.06324 6.20086 1.14657 6.07661C1.22872 5.95412 1.34617 5.85957 1.48327 5.80546V5.80634L1.49156 5.8032L13.9925 1.07164L13.9925 1.07162C14.1235 1.02184 14.266 1.01095 14.4029 1.04027C14.5399 1.0696 14.6654 1.13787 14.7645 1.23688ZM14.7645 1.23688C14.7645 1.23689 14.7645 1.23691 14.7645 1.23692L14.7811 1.22034L14.7645 1.23688Z'
                  fill='black'
                  stroke='#112211'
                  stroke-width='0.046875'
                />
              </svg>
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">Round trip</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row w-[500px] justify-start  flex-grow-0 flex-shrink-0 md:w-[1184px] gap-6'>
          <div className='flex flex-col justify-start items-start  h-14 rounded-tl rounded-tr w-[450px] md:w-[650px] lg:w-[250px] px:[20px]'>
            <div className='relative w-full'>
              <div
                className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 rounded bg-white border border-[#79747e]'
                onClick={handleShowDropdownFrom}
              >
                <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 pl-4 py-1 rounded-tl rounded-tr'>
                  <div className='flex flex-col justify-center items-start flex-grow h-10 relative'>
                    <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative'>
                      <p className='flex-grow-0 flex-shrink-0 text-base text-left text-[#1c1b1f]'>
                        {departureAirport?.city} - {departureAirport?.iataCode}
                      </p>
                    </div>
                    <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 absolute left-[-4px] top-[-16px] px-1 bg-white'>
                      <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-[#121]'>From</p>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-12 w-12 relative gap-2.5 p-3'>
                    <svg
                      width={24}
                      height={24}
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='flex-grow-0 flex-shrink-0 w-6 h-6 relative'
                      preserveAspectRatio='none'
                    >
                      <path
                        d='M5.25 9L12 15.75L18.75 9'
                        stroke='black'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className={
                  showDropdownFrom
                    ? 'rounded border-[1px] border-gray-300 bg-white absolute top-[60px] w-full shadow-md h-[200px] overflow-y-auto'
                    : 'rounded border-[1px] border-gray-300 bg-white absolute top-[60px] w-full shadow-md h-[200px] overflow-y-auto hidden'
                }
              >
                {airports.map((airport) => (
                  <div
                    className='cursor-pointer hover:bg-gray-300 py-2 px-4 text-black '
                    onClick={() => handleSelectDepartureAirport(airport)}
                  >
                    {airport.city} - {airport.iataCode}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-start items-start  h-14 rounded-tl rounded-tr w-[450px] md:w-[650px] lg:w-[250px] px:[20px]'>
            <div className='relative w-full'>
              <div
                className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 rounded bg-white border border-[#79747e]'
                onClick={handleShowDropdownTo}
              >
                <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 pl-4 py-1 rounded-tl rounded-tr'>
                  <div className='flex flex-col justify-center items-start flex-grow h-10 relative'>
                    <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative'>
                      <p className='flex-grow-0 flex-shrink-0 text-base text-left text-[#1c1b1f]'>
                        {arrivalAirport?.city} - {arrivalAirport?.iataCode}
                      </p>
                    </div>
                    <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 absolute left-[-4px] top-[-16px] px-1 bg-white'>
                      <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-[#121]'>To</p>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-12 w-12 relative gap-2.5 p-3'>
                    <svg
                      width={24}
                      height={24}
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='flex-grow-0 flex-shrink-0 w-6 h-6 relative'
                      preserveAspectRatio='none'
                    >
                      <path
                        d='M5.25 9L12 15.75L18.75 9'
                        stroke='black'
                        stroke-width='1.5'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className={
                  showDropdownTo
                    ? 'rounded border-[1px] border-gray-300 bg-white absolute top-[60px] w-full shadow-md h-[200px] overflow-y-auto'
                    : 'rounded border-[1px] border-gray-300 bg-white absolute top-[60px] w-full shadow-md h-[200px] overflow-y-auto hidden'
                }
              >
                {airports.map((airport) => (
                  <div
                    className='cursor-pointer hover:bg-gray-300 py-2 px-4 text-black '
                    onClick={() => handleSelectArrivalAirport(airport)}
                  >
                    {airport.city} - {airport.iataCode}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DatePickerWithRange className='text-black border border-[#79747e] rounded h-14  w-[450px] md:w-[650px] lg:w-[250px] px:[20px]' />

          <div className='flex flex-col justify-start items-start flex-grow h-14 rounded-tl rounded-tr  w-[450px] md:w-[650px] lg:w-[250px] px:[20px]'>
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
        </div>
      </div>
      <div className='flex justify-end items-center self-stretch flex-grow-0 flex-shrink-0 gap-6'>
        {/* <Button className='flex justify-center items-center flex-grow-0 flex-shrink-0 h-12 px-4 py-2 rounded text-black hover:opacity-85 gap-1'>
          <svg
            width={16}
            height={16}
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='flex-grow-0 flex-shrink-0 w-4 h-4 relative'
            preserveAspectRatio='xMidYMid meet'
          >
            <path d='M8 3.5V12.5V3.5ZM12.5 8H3.5H12.5Z' fill='#112211' />
            <path
              d='M8 3.5V12.5M12.5 8H3.5'
              stroke='#112211'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
          <p>Add Promo Code</p>
        </Button> */}

        <Button
          onClick={handleShowFlight}
          className='flex justify-center items-center flex-grow-0 flex-shrink-0 h-12 px-4 py-2 rounded  bg-[#8dd3bb] text-black hover:opacity-85 gap-1'
        >
          {loading ? (
            <svg
              className='w-5 h-5 mr-3 -ml-1 text-white animate-spin'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          ) : (
            <svg
              width={16}
              height={16}
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='flex-grow-0 flex-shrink-0 w-4 h-4 relative'
              preserveAspectRatio='xMidYMid meet'
            >
              <path
                d='M9.46858 15.0003H9.49983C9.65427 15.0012 9.80542 14.9556 9.9336 14.8694C10.0618 14.7832 10.1611 14.6605 10.2186 14.5171L10.1967 14.5089L10.1967 14.5086C10.141 14.6475 10.0447 14.7664 9.92052 14.8499C9.79624 14.9335 9.64971 14.9777 9.49996 14.9768H9.49983H9.4691M9.46858 15.0003L9.46963 14.9769C9.46945 14.9769 9.46928 14.9768 9.4691 14.9768M9.46858 15.0003V14.9768H9.4691M9.46858 15.0003L9.4691 14.9768M9.4691 14.9768C9.17379 14.9633 8.92874 14.766 8.83168 14.4848L8.83151 14.4844C8.82949 14.4789 8.82777 14.4737 8.82603 14.4679L8.82617 14.4679L8.82513 14.4654L6.99283 10.1735C6.96895 10.0941 6.9662 10.0098 6.98487 9.92901C7.00363 9.8478 7.04336 9.77294 7.1001 9.71188L9.4691 14.9768ZM14.7645 1.23713C14.8636 1.3366 14.9317 1.46264 14.9607 1.60002C14.9896 1.7374 14.9781 1.88022 14.9276 2.01122L14.9276 2.01135L10.1968 14.5084L7.10012 9.71185L13.5164 2.82935C13.5165 2.82925 13.5166 2.82915 13.5167 2.82905C13.5393 2.80642 13.5572 2.77958 13.5694 2.75006C13.5817 2.7204 13.588 2.68862 13.588 2.65652C13.588 2.62443 13.5817 2.59265 13.5694 2.56299C13.5571 2.53334 13.5391 2.5064 13.5164 2.4837C13.4937 2.46101 13.4668 2.443 13.4371 2.43072C13.4075 2.41844 13.3757 2.41212 13.3436 2.41212C13.3115 2.41212 13.2797 2.41844 13.25 2.43072C13.2205 2.44295 13.1937 2.46085 13.1711 2.4834C13.171 2.4835 13.1709 2.4836 13.1708 2.4837L6.28512 8.89967C6.22406 8.95642 6.14918 8.99616 6.06797 9.01492C5.98716 9.03359 5.90288 9.03084 5.82347 9.00696L1.53403 7.17528L1.53408 7.17518L1.53191 7.17449L1.51945 7.17055C1.51939 7.17053 1.51933 7.17051 1.51927 7.17049C1.37747 7.123 1.25378 7.03291 1.16507 6.91253C1.07633 6.79209 1.02693 6.64719 1.02362 6.49762C1.0203 6.34805 1.06324 6.20111 1.14657 6.07686C1.22872 5.95436 1.34617 5.85981 1.48327 5.8057V5.80658L1.49156 5.80344L13.9925 1.07188L13.9925 1.07187C14.1235 1.02208 14.266 1.01119 14.4029 1.04052C14.5399 1.06984 14.6654 1.13812 14.7645 1.23713ZM14.7645 1.23713C14.7645 1.23714 14.7645 1.23715 14.7645 1.23716L14.7811 1.22059L14.7645 1.23713Z'
                fill='black'
                stroke='#112211'
                stroke-width='0.046875'
              />
            </svg>
          )}

          <p>Show Flights</p>
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
