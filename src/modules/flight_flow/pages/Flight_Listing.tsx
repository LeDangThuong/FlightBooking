import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import logo from '../../../assets/images/logo_vnairline.png'

import { Fillter } from '../components/Fillter'
import { FlightTicket } from '../components/FlightTicket'
import { FlightTicket2 } from '../components/FlightTicket2'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Flight } from '@/models/Flight'
import { setSelectDepartFlight, setSelectReturnFlight } from '@/redux/slice/flightSlice'
import Skeleton from '@mui/material/Skeleton'
import { CircleLoader } from 'react-spinners'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'

const FlightListing = () => {
  const [selectTab, setSelectTab] = useState('Cheapest')

  const location = useLocation()

  const dispatch = useDispatch()

  const loadingSearchFilght = useSelector((state: RootState) => state.flight.loadingSearchFilght)

  const typeTicket = useSelector((state: RootState) => state.flight.typeTicket)

  const departFlights = useSelector((state: RootState) => state.flight.departFlights)
  const returnFlights = useSelector((state: RootState) => state.flight.returnFlights)
  const selectDepartFlight = useSelector((state: RootState) => state.flight.selectDepartFlight)
  const selectReturnFlight = useSelector((state: RootState) => state.flight.selectReturnFlight)

  //const [selectFlights, setSelectFlight] = useState<Flight[]>([])

  const handleSelectDepartFlight = (flight: Flight) => {
    if (selectDepartFlight === undefined) {
      dispatch(setSelectDepartFlight(flight))
      return
    }
    toast.error('Departure flight has been selected')
  }

  const handleSelectReturnFlight = (flight: Flight) => {
    if (selectReturnFlight === undefined) {
      dispatch(setSelectReturnFlight(flight))
      return
    }
    toast.error('Return flight has been selected')
  }

  return (
    <div className='bg-[#FAFBFC] h-full flex flex-col justify-start text-white  w-full gap-6'>
      <ToastContainer />
      <div className='h-1'></div>
      <div className='mx-32'>
        <SearchBar />
      </div>
      <div className='flex flex-col h-fit lg:flex-row  mx-32  space-x-6'>
        <div className='md:grow-0 '>
          <Fillter
            onClickError={() => {
              toast.error('Please select the correct ticket number')
            }}
          />
        </div>
        <div className='grow-0 w-[0.50px] h-[1360px]  bg-neutral-900 hidden lg:flex' />
        <div className='lg:grow h-fit flex flex-col   '>
          {/* <div
            className='lg:flex hidden justify-between items-center w-full h-fit  px-8 pt-4 pb-1 rounded-2xl bg-white  '
            style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
          >
            <div
              className='w-32 cursor-pointer'
              onClick={() => {
                setSelectTab('Cheapest')
              }}
            >
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">Cheapest</div>
              <div className=' justify-start items-start gap-1 inline-flex'>
                <div className="opacity-40 text-neutral-900 text-sm font-normal font-['Montserrat']">$99 . 2h 18m</div>
              </div>
              <div
                className={
                  selectTab === 'Cheapest'
                    ? 'border-b-4 border-green-300 w-40 mt-2'
                    : 'border-b-4 border-white w-40 mt-2'
                }
              ></div>
            </div>

            <div className=' h-[50px]   border border-slate-200'></div>

            <div
              className='w-32 cursor-pointer'
              onClick={() => {
                setSelectTab('Best')
              }}
            >
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">Best</div>
              <div className=' justify-start items-start gap-1 inline-flex'>
                <div className="opacity-40 text-neutral-900 text-sm font-normal font-['Montserrat']">$99 . 2h 18m</div>
              </div>
              <div
                className={
                  selectTab === 'Best' ? 'border-b-4 border-green-300 w-40 mt-2' : 'border-b-4 border-white w-40 mt-2'
                }
              ></div>
            </div>

            <div className='  h-[50px]  border border-slate-200'></div>

            <div
              className='w-32 cursor-pointer'
              onClick={() => {
                setSelectTab('Quickest')
              }}
            >
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">Quickest</div>
              <div className=' justify-start items-start gap-1 inline-flex'>
                <div className="opacity-40 text-neutral-900 text-sm font-normal font-['Montserrat']">$99 . 2h 18m</div>
              </div>
              <div
                className={
                  selectTab === 'Quickest'
                    ? 'border-b-4 border-green-300 w-40 mt-2'
                    : 'border-b-4 border-white w-40 mt-2'
                }
              ></div>
            </div>

            <div className='  h-[50px]  border border-slate-200'></div>

            <div className='w-40 h-6 justify-start items-center gap-2 inline-flex'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M3.75 7.5H20.25M3.75 12H20.25M3.75 16.5H20.25'
                  stroke='black'
                  stroke-width='1.5'
                  stroke-miterlimit='10'
                  stroke-linecap='round'
                />
              </svg>

              <div className='justify-start items-start gap-2 flex'>
                <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">Other sort</div>
              </div>
            </div>
          </div> */}

          <div className='w-full h-[18px] mt-4 items-start flex justify-between'>
            <div>
              <span className="text-neutral-900 text-sm font-semibold font-['Montserrat']">
                Showing {departFlights.length + returnFlights.length} of{' '}
              </span>
              <span className="text-rose-400 text-sm font-semibold font-['Montserrat']">
                {departFlights.length + returnFlights.length} places
              </span>
            </div>
            <div className='justify-start items-start gap-1 flex'>
              <div className='flex gap-1'>
                <span className="text-neutral-900 text-sm font-normal font-['Montserrat']">Sort by</span>
                <span className="text-neutral-900 text-sm font-semibold font-['Montserrat']"> Recommended</span>
                <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M3.9375 6.75L9 11.8125L14.0625 6.75'
                    stroke='#112211'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </div>
              <div className='w-[18px] h-[18px] px-[3.94px] pt-[6.75px] pb-[6.19px] justify-center items-center flex' />
            </div>
          </div>
          <div className='my-2'></div>

          {loadingSearchFilght ? (
            <div className='flex justify-center items-center w-full h-70'>
              <CircleLoader color={'#36D7B7'} loading={loadingSearchFilght} size={50} />
            </div>
          ) : (
            <div className='flex flex-col'>
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">Departure flights</div>
              {departFlights.length !== 0 ? (
                departFlights.map((flight) => (
                  <FlightTicket2
                    location={location}
                    flight={flight}
                    onClickChooseFlight={() => handleSelectDepartFlight(flight)}
                  />
                ))
              ) : (
                <div className='flex justify-center items-center w-full h-20'>
                  <div className="text-neutral-500 text-lg font-medium font-['Montserrat']">Non-existent</div>
                </div>
              )}

              {typeTicket === 'ROUND_TRIP' ? (
                <div className='flex flex-col'>
                  <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">Return flights</div>
                  {returnFlights.length !== 0 ? (
                    returnFlights.map((flight) => (
                      <FlightTicket2
                        location={location}
                        flight={flight}
                        onClickChooseFlight={() => handleSelectReturnFlight(flight)}
                      />
                    ))
                  ) : (
                    <div className='flex justify-center items-center w-full h-20'>
                      <div className="text-neutral-500 text-lg font-medium font-['Montserrat']">Non-existent</div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            // flights.map((flight) => (
            //   <FlightTicket2 flight={flight} onClickChooseFlight={() => handleSelectFlight(flight)} />
            // ))
          )}

          {/* <div className='w-full h-12 my-3 flex-col justify-start items-start gap-2.5 inline-flex'>
            <div className='self-stretch h-12 px-4 py-2 bg-neutral-900 rounded justify-center items-center gap-1 inline-flex'>
              <div className="text-white text-sm font-semibold font-['Montserrat']">Show more results</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default FlightListing
