import React, { useEffect, useState } from 'react'
import { DoubleRangeSlider } from './RangeSlider'
import flightup from '../../../assets/svgs/flightup.svg'
import arrow from '../../../assets/svgs/arrow.svg'
import logo from '../../../assets/images/logo_vnairline.png'
import exit from '../../../assets/svgs/exit.svg'
import airplane from '../../../assets/svgs/airplane.svg'
import { SelectFlight } from './SelectFlight'
import { useNavigate } from 'react-router-dom'
import { Flight } from '@/models/Flight'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import {
  setCheckTime0000_0400,
  setCheckTime0400_0800,
  setCheckTime0800_1200,
  setCheckTime1200_1600,
  setCheckTime1600_2000,
  setCheckTime2000_2400,
  setDepartFlights,
  setLoadingSearchFlight,
  setReturnFlights,
  setSelectDepartFlight,
  setSelectReturnFlight
} from '@/redux/slice/flightSlice'
import { Airline } from '@/models/Airline'
import { getAllAirline } from '@/services/AirlineService'
import { filterFlights, filterFlightsWithoutFilter } from '@/services/FlightService'

interface FillterProps {
  onClickError: () => void
}

export const Fillter: React.FC<FillterProps> = ({ onClickError }) => {
  const [sliderValue, setSliderValue] = useState<number[]>([50, 100])
  const [sliderValueTime, setSliderValueTime] = useState<number[]>([50, 100])

  const dispatch = useDispatch()
  const typeTicket = useSelector((state: RootState) => state.flight.typeTicket)
  const selectDepartFlight = useSelector((state: RootState) => state.flight.selectDepartFlight)
  const selectReturnFlight = useSelector((state: RootState) => state.flight.selectReturnFlight)
  const departFlights = useSelector((state: RootState) => state.flight.departFlights)
  const returnFlights = useSelector((state: RootState) => state.flight.returnFlights)
  const loadingSearchFilght = useSelector((state: RootState) => state.flight.loadingSearchFilght)

  const checkTime0000_0400 = useSelector((state: RootState) => state.flight.checkTime0000_0400)
  const checkTime0400_0800 = useSelector((state: RootState) => state.flight.checkTime0400_0800)
  const checkTime0800_1200 = useSelector((state: RootState) => state.flight.checkTime0800_1200)
  const checkTime1200_1600 = useSelector((state: RootState) => state.flight.checkTime1200_1600)
  const checkTime1600_2000 = useSelector((state: RootState) => state.flight.checkTime1600_2000)
  const checkTime2000_2400 = useSelector((state: RootState) => state.flight.checkTime2000_2400)

  const departureAirport = useSelector((state: RootState) => state.flight.departureAirport)

  const arrivalAirport = useSelector((state: RootState) => state.flight.arrivalAirport)

  const dateRange = useSelector((state: RootState) => state.flight.dateRange)

  const maxPriceValue = 1200
  const hours = 864

  const navigate = useNavigate()

  useEffect(() => {
    handleCheckTime(checkTime0000_0400, 0, 0, 4, 0)
  }, [checkTime0000_0400])

  useEffect(() => {
    handleCheckTime(checkTime0400_0800, 4, 0, 8, 0)
  }, [checkTime0400_0800])

  useEffect(() => {
    handleCheckTime(checkTime0800_1200, 8, 0, 12, 0)
  }, [checkTime0800_1200])

  useEffect(() => {
    handleCheckTime(checkTime1200_1600, 12, 0, 16, 0)
  }, [checkTime1200_1600])

  useEffect(() => {
    handleCheckTime(checkTime1600_2000, 16, 0, 20, 0)
  }, [checkTime1600_2000])

  useEffect(() => {
    handleCheckTime(checkTime2000_2400, 20, 0, 24, 0)
  }, [checkTime2000_2400])

  // const handleCloseFlight = (flight: Flight) => {
  //   dispatch(setSelectFlights(selectFlights.filter((i) => i != flight)))
  // }

  const handleCheckTime = async (
    checked: boolean,
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ) => {
    dispatch(setLoadingSearchFlight(true))

    console.log(checkTime0000_0400)
    console.log(checkTime0400_0800)
    console.log(checkTime0800_1200)
    console.log(checkTime1200_1600)
    console.log(checkTime1600_2000)
    console.log(checkTime2000_2400)

    if (
      !checkTime0000_0400 &&
      !checkTime0400_0800 &&
      !checkTime0800_1200 &&
      !checkTime1200_1600 &&
      !checkTime1600_2000 &&
      !checkTime2000_2400
    ) {
      dispatch(setLoadingSearchFlight(true))

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
        //const flight = await searchFlightOneWay(departureAirport!, arrivalAirport!, dateRange.from!)
        //dispatch(searchFlights(flight))
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

        //const flight = await searchFlightRoundTrip(departureAirport!, arrivalAirport!, dateRange.from!, dateRange.to!)
        // dispatch(searchFlights(flight))
      }

      dispatch(setLoadingSearchFlight(false))
      return
    }

    if (typeTicket === 'ONE_WAY') {
      const departFlightsCheck = await filterFlights(
        'ONE_WAY',
        departureAirport!,
        arrivalAirport!,
        dateRange.from!,
        'economy',
        'asc',
        startHour,
        startMinute,
        endHour,
        endMinute
      )

      if (checked) {
        dispatch(setDepartFlights(departFlightsCheck))
      } else {
        const flights = departFlights.filter((item) => !departFlightsCheck.includes(item))
        dispatch(setDepartFlights(flights))
      }
    } else {
      const departFlightsCheck = await filterFlights(
        'ONE_WAY',
        departureAirport!,
        arrivalAirport!,
        dateRange.from!,
        'economy',
        'asc',
        startHour,
        startMinute,
        endHour,
        endMinute
      )
      const returnFlightsCheck = await filterFlights(
        'ONE_WAY',
        arrivalAirport!,
        departureAirport!,
        dateRange.to!,
        'economy',
        'asc',
        startHour,
        startMinute,
        endHour,
        endMinute
      )
      if (checked) {
        dispatch(setDepartFlights(departFlightsCheck))
        dispatch(setReturnFlights(returnFlightsCheck))
      } else {
        const flightsDepartCheck = departFlights.filter((item) => !departFlightsCheck.includes(item))
        const flightsReturnCheck = returnFlights.filter((item) => !returnFlightsCheck.includes(item))

        dispatch(setDepartFlights(flightsDepartCheck))
        dispatch(setReturnFlights(flightsReturnCheck))
      }
    }
    dispatch(setLoadingSearchFlight(false))
  }

  const handleCloseDepartFlight = () => {
    dispatch(setSelectDepartFlight(undefined))
  }

  const handleCloseReturnFlight = () => {
    dispatch(setSelectReturnFlight(undefined))
  }

  const handViewDetail = () => {
    if (typeTicket === 'ONE_WAY' && selectDepartFlight === undefined) {
      onClickError()
      return
    } else if (typeTicket === 'ROUND_TRIP' && (selectDepartFlight === undefined || selectReturnFlight === undefined)) {
      onClickError()
      return
    }
    navigate('/detail_flight')
  }

  function secondsToTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600) // Tính số giờ
    const minutes = Math.floor((seconds % 3600) / 60) // Tính số phút
    const ampm = hours >= 12 ? 'PM' : 'AM' // Xác định AM hoặc PM
    const formattedHours = hours % 12 || 12 // Định dạng giờ theo 12 giờ
    // Tạo chuỗi kết quả
    const timeString = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`
    return timeString
  }

  const [priceValue, setPriceValue] = useState<number[]>([
    sliderValue[0] * maxPriceValue,
    sliderValue[1] * maxPriceValue
  ])

  const [timeValue, setTimeValue] = useState<number[]>([sliderValueTime[0] * hours, sliderValueTime[1] * hours])

  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }
    const minDistance = 10
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], sliderValue[1] - minDistance)
        setSliderValue([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setSliderValue([clamped - minDistance, clamped])
      }
    } else {
      setSliderValue(newValue as number[])
    }
    setPriceValue([sliderValue[0] * maxPriceValue, sliderValue[1] * maxPriceValue])
  }

  const handleSliderChangeTime = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }
    const minDistance = 10

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], sliderValueTime[1] - minDistance)
        setSliderValueTime([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setSliderValueTime([clamped - minDistance, clamped])
      }
    } else {
      setSliderValueTime(newValue as number[])
    }
    setTimeValue([sliderValueTime[0] * hours, sliderValueTime[1] * hours])
  }

  const [airlines, setAirlines] = useState<Airline[]>([])

  const hanldeGetAirlines = async () => {
    setAirlines(await getAllAirline())
  }

  useEffect(() => {
    hanldeGetAirlines()
  })

  return (
    <div className='lg:flex hidden flex-col gap-3 w-full '>
      <div className='w-full  flex-col justify-start items-start flex'>
        <div
          className='flex flex-col  justify-between items-start w-full h-fit  px-8 pt-4 pb-2 rounded-2xl bg-white '
          style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
        >
          <div className='flex'>
            <img className='w-6 h-6' src={flightup} />
            <div className="text-black text-sm font-medium font-['Montserrat'] mx-4">Your Flight</div>
          </div>

          {/* {selectFlights.map((flight, index) => (
            <SelectFlight flight={flight} index={index} onClickClose={() => handleCloseFlight(flight)} />
          ))} */}

          {selectDepartFlight && (
            <SelectFlight flight={selectDepartFlight} index={0} onClickClose={() => handleCloseDepartFlight()} />
          )}

          {selectReturnFlight && (
            <SelectFlight flight={selectReturnFlight} index={1} onClickClose={() => handleCloseReturnFlight()} />
          )}

          {/* <SelectFlight />
          <SelectFlight /> */}
          <div className='h-2'></div>
          <div className='w-full h-[0px] border border-zinc-500/opacity-50'></div>
          <div className='h-2'></div>
          <div className="w-[268px] text-black text-sm font-semibold font-['Montserrat']">Subtotal</div>
          <div className='flex justify-center items-center'>
            <div className="text-right text-rose-400 text-2xl font-bold font-['Montserrat']">
              ${(selectDepartFlight?.economyPrice ?? 0) + (selectReturnFlight?.economyPrice ?? 0)}
            </div>
            <div className="text-right text-black text-sm font-normal font-['Montserrat']">/Passenger</div>
          </div>
          <div className='h-2'></div>

          <div className='flex w-full justify-center cursor-pointer' onClick={handViewDetail}>
            <div className='w-[159px] h-8 px-4 py-2 bg-green-300 rounded-[19px] justify-center items-center gap-1 inline-flex'>
              <div className="text-white text-sm font-semibold font-['Montserrat']">Booking now</div>
            </div>
          </div>

          <div className='h-2'></div>
        </div>

        {/* <div className="text-neutral-900 text-xl font-semibold font-['Montserrat']">Filters</div> */}
        {/* 
        <div className='self-stretch justify-between items-start inline-flex mt-2'>
          <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">Price</div>
        </div>
        <div className='flex-col w-full justify-start items-start flex mb-8'>
          <div className='w-[100%] h-6 relative'>
            <DoubleRangeSlider value={sliderValue} onChange={handleSliderChange} />
            <div className='flex justify-between items-start '>
              <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">${priceValue[0]}</div>
              <div className=" text-neutral-900 text-xs font-medium font-['Montserrat'] ">${priceValue[1]}</div>
            </div>
          </div>
        </div> */}

        {/* <div className='self-stretch justify-between items-start inline-flex mt-2'>
          <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">Departure time</div>
        </div>
        <div className='flex-col w-full justify-start items-start flex mb-8'>
          <div className='w-[100%] h-6 relative'>
            <DoubleRangeSlider value={sliderValueTime} onChange={handleSliderChangeTime} />
            <div className='flex justify-between items-start '>
              <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">
                {secondsToTime(timeValue[0])}
              </div>
              <div className=" text-neutral-900 text-xs font-medium font-['Montserrat'] ">
                {secondsToTime(timeValue[1])}
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className='w-full h-[87px] flex-col justify-start items-start  inline-flex'>
          <div className='self-stretch justify-between items-start inline-flex mt-2'>
            <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">Rating</div>
          </div>

          <div className='flex gap-3 w-full mt-3'>
            <div className='w-10 h-8 flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className='self-stretch h-8 px-4 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
                <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">0+</div>
              </div>
            </div>

            <div className='w-10 h-8 flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className='self-stretch h-8 px-4 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
                <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">1+</div>
              </div>
            </div>

            <div className='w-10 h-8 flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className='self-stretch h-8 px-4 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
                <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">2+</div>
              </div>
            </div>
            <div className='w-10 h-8 flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className='self-stretch h-8 px-4 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
                <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">3+</div>
              </div>
            </div>
            <div className='w-10 h-8 flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className='self-stretch h-8 px-4 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
                <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">4+</div>
              </div>
            </div>

            <div className='w-10 h-8 flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className='self-stretch h-8 px-4 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
                <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">5+</div>
              </div>
            </div>
          </div>
        </div> */}
        <div className='w-full h-[0.50px] opacity-25 bg-neutral-900 my-6' />
        <div className='w-full h-fit flex-col justify-start items-start  inline-flex'>
          <div className='self-stretch justify-between items-start inline-flex mt-2  mb-1'>
            <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">Airlines</div>
          </div>

          <div className='w-full h-fit'>
            {airlines.map((airline) => (
              <div className='w-full h-6 justify-start items-center gap-2 flex '>
                <input type='checkbox' className='self-center h-full' />
                <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">{airline.airlineName}</div>
              </div>
            ))}

            {/* <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input type='checkbox' className='self-center h-full' />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">Emirated</div>
            </div>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input type='checkbox' className='self-center h-full' />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">Fly Dubai</div>
            </div>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input type='checkbox' className='self-center h-full' />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">Qatar</div>
            </div>

            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input type='checkbox' className='self-center h-full' />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">Etihad</div>
            </div> */}
          </div>
        </div>

        <div className='w-full h-fit flex-col justify-start items-start  inline-flex'>
          <div className='self-stretch justify-between items-start inline-flex mt-2  mb-1'>
            <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">Departure Time</div>
          </div>

          <div className='w-full h-fit'>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input
                type='checkbox'
                className='self-center h-full'
                checked={checkTime0000_0400}
                onChange={async (e) => {
                  dispatch(setCheckTime0000_0400(e.target.checked))
                }}
              />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">00:00 - 04:00 </div>
            </div>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input
                type='checkbox'
                className='self-center h-full'
                checked={checkTime0400_0800}
                onChange={async (e) => {
                  dispatch(setCheckTime0400_0800(e.target.checked))
                }}
              />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">04:00 - 08:00 </div>
            </div>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input
                type='checkbox'
                className='self-center h-full'
                checked={checkTime0800_1200}
                onChange={async (e) => {
                  dispatch(setCheckTime0800_1200(e.target.checked))
                }}
              />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">08:00 - 12:00</div>
            </div>

            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input
                type='checkbox'
                className='self-center h-full'
                checked={checkTime1200_1600}
                onChange={async (e) => {
                  dispatch(setCheckTime1200_1600(e.target.checked))
                }}
              />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">12:00 - 16:00 </div>
            </div>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input
                type='checkbox'
                className='self-center h-full'
                checked={checkTime1600_2000}
                onChange={async (e) => {
                  dispatch(setCheckTime1600_2000(e.target.checked))
                }}
              />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">16:00 - 20:00 </div>
            </div>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input
                type='checkbox'
                className='self-center h-full'
                checked={checkTime2000_2400}
                onChange={async (e) => {
                  dispatch(setCheckTime2000_2400(e.target.checked))
                }}
              />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">20:00 - 24:00 </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[0.50px] opacity-25 bg-neutral-900 my-6' />
      </div>
    </div>
  )
}
