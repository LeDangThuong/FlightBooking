import React, { useEffect, useState } from 'react'
import backgroundImage from '@/assets/images/landing_background.png'
import LocationList from '../components/LocationList'
import ReviewList from '../components/ReviewList'
import OptionSection from '../components/OptionSection'
import SearchBar from '../components/SearchBar'
import photo1 from '../../../assets/images/photo1.png'
import PopularFlightComponent from '../components/PopularFlightComponent'
import { Flight } from '@/models/Flight'
import { getAllFlight } from '@/services/FlightService'
import { useDispatch } from 'react-redux'
import { setArrivalAirportState, setDateRange, setDepartureAirportState } from '@/redux/slice/flightSlice'
import { getAirport } from '@/services/AirportService'
import { useNavigate } from 'react-router-dom'
import { DateRange } from 'react-day-picker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomePage = () => {
  const [flights, setFlights] = useState<Flight[]>()

  const handleFilght = async () => {
    setFlights(await getAllFlight())
  }

  useEffect(() => {
    handleFilght()
  }, [])

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSearch = () => {
    toast.error('Please provide full information!')
    // Các thao tác khác khi nhấn nút tìm kiếm
  }

  return (
    <div className='bg-white min-h-screen flex flex-col text-white mb-80 w-full'>
      <div className='relative h-[600px] mb-20'>
        <img className='w-full h-full rounded-lg object-cover' src={backgroundImage} alt='background' />
        <div className='absolute inset-0 bg-gradient-to-b from-black to-transparent'></div>
        <p className='absolute top-44 w-full text-center'>
          <div className='flex flex-col justify-start items-center gap-4'>
            <div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1'>
              <p className='flex-grow-0 flex-shrink-0 text-[45px] font-bold text-center text-white'>Helping Others</p>
              <p className='flex-grow-0 flex-shrink-0 text-[80px] font-bold text-center uppercase text-white'>
                Live &amp; Travel
              </p>
            </div>
            <p className='flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-white'>
              Special offers to suit your plan
            </p>
          </div>
        </p>
      </div>
      <div className='mx-32'>
        <ToastContainer />
        <SearchBar onClick={handleSearch} />

        <OptionSection />

        <div className='flex flex-col mt-32'>
          <div className='flex flex-col sm:flex-row justify-between items-start gap-6 w-full'>
            <div className='flex flex-col justify-start items-start gap-4'>
              <p className='text-[32px] font-semibold text-left text-black'>Popular flight</p>
              <p className='opacity-75 text-base text-left text-[#121]'>
                Popular Flights &amp; Places Hire to our most popular destinations
              </p>
            </div>
          </div>

          <div className='flex my-4 gap-4  w-full'>
            {flights?.slice(0, 4).map((flight) => (
              <PopularFlightComponent
                key={flight.id}
                flight={flight}
                onClickShow={async () => {
                  const departureAirport = await getAirport(flight?.departureAirportId!)
                  const arrivalAirport = await getAirport(flight?.arrivalAirportId!)

                  dispatch(setDepartureAirportState(departureAirport))
                  dispatch(setArrivalAirportState(arrivalAirport))

                  dispatch(
                    setDateRange({
                      from: flight.departureDate
                    })
                  )

                  navigate('/flight_listing')
                }}
              />
            ))}
          </div>
        </div>

        <ReviewList />
      </div>
    </div>
  )
}

export default HomePage
