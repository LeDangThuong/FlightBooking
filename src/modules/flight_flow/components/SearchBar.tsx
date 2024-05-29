import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/dateRangePicker'
import { useNavigate } from 'react-router-dom'
import search from '../../../assets/svgs/search.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Airport } from '@/models/Airport'
import { useEffect, useState } from 'react'
import { getAllAirport } from '@/services/AirportService'
import { searchFlightOneWay, searchFlightRoundTrip } from '@/services/FlightService'
import { searchFlights, setTypeTicket } from '@/redux/slice/flightSlice'
import { RootState } from '@/redux/store'

const SearchBar = () => {
  const navigate = useNavigate()

  const handleShowFlight = async () => {
    if (typeTicket === 'ONE_WAY') {
      const flight = await searchFlightOneWay(departureAirport!, arrivalAirport!, dateRange.from!)
      dispatch(searchFlights(flight))
    } else if (typeTicket === 'ROUND_TRIP') {
      const flight = await searchFlightRoundTrip(departureAirport!, arrivalAirport!, dateRange.from!, dateRange.to!)
      dispatch(searchFlights(flight))
    }

    console.log(typeTicket)
  }

  const dateRange = useSelector((state: RootState) => state.flight.dateRange)
  const typeTicket = useSelector((state: RootState) => state.flight.typeTicket)

  const [airports, setAirports] = useState<Airport[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const departureAirportState = useSelector((state: RootState) => state.flight.departureAirport)
  const arrivalAirportState = useSelector((state: RootState) => state.flight.arrivalAirport)

  const dispatch = useDispatch()
  const [departureAirport, setDepartureAirport] = useState<Airport>()
  const [arrivalAirport, setArrivalAirport] = useState<Airport>()

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
        setAirports(data)
        setLoading(false)
      } catch (error) {
        setError('Error fetching users')
        setLoading(false)
      }
    }

    fetchData()

    setDepartureAirport(departureAirportState)
    setArrivalAirport(arrivalAirportState)

    console.log(airports)
  }, [])

  return (
    <div
      className='flex flex-col justify-start items-start w-[1232px]   top-[120px] gap-8 px-8 pt-4 pb-8 rounded-2xl bg-white'
      style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
    >
      <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-12 mt-5'>
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
        <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 w-[1184px] gap-6'>
          <div className='flex flex-col justify-start items-start  h-14 rounded-tl rounded-tr w-[250px]'>
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
          </div>{' '}
          <div className='flex flex-col justify-start items-start  h-14 rounded-tl rounded-tr w-[250px]'>
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
          <DatePickerWithRange className='text-black border border-[#79747e] rounded h-14' />
          <div className='flex flex-col justify-start items-start flex-grow h-14 rounded-tl rounded-tr'>
            <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 rounded bg-white border border-[#79747e]'>
              <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 pl-4 py-2 rounded-tl rounded-tr'>
                <div className='flex flex-col justify-center items-start flex-grow h-10 relative'>
                  <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative'>
                    <p className='flex-grow-0 flex-shrink-0 text-base text-left text-[#1c1b1f]'>1 Passenger, Economy</p>
                  </div>
                  <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 absolute left-[-4px] top-[-16px] px-1 bg-white'>
                    <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-[#1c1b1f]'>Passenger - Class</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-14 h-14 flex-col justify-start items-start gap-2.5 inline-flex' onClick={handleShowFlight}>
            <div className='self-stretch grow shrink basis-0 px-4 py-2 bg-green-300 rounded justify-center items-center gap-1 inline-flex'>
              <div className='w-6 h-6 pl-[2.25px] pr-[2.29px] pt-[2.25px] pb-[2.29px] justify-center items-center flex'>
                <img src={search} alt='Search icon' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
