import { useDispatch, useSelector } from 'react-redux'
import { FormInformation } from '../components/FormInformation'
import { RootState } from '@/redux/store'
import { Passenger } from '@/models/Passenger'
import { useEffect, useState } from 'react'
import { setPassengerInfor } from '@/redux/slice/flightSlice'
import { fillInforPassengerToCreateBooking } from '@/services/BookingService'
import { getUserByUsername } from '@/services/UserService'
import { setBookingDepartureData, setBookingReturnData, setVoucher } from '@/redux/slice/bookingSlice'
import { useNavigate } from 'react-router-dom'
import { Airline } from '@/models/Airline'
import { getAirlineByPlaneId } from '@/services/AirlineService'
import { Airport } from '@/models/Airport'
import { getAirport } from '@/services/AirportService'
import { format } from 'date-fns'
import { Voucher } from '@/models/Voucher'
import { getVoucherByCode } from '@/services/Voucher'

export const PassengerInformation = () => {
  const passenger = useSelector((state: RootState) => state.flight.passenger)
  const passengerInfor = useSelector((state: RootState) => state.flight.passengerInfor)
  //const selectFlights = useSelector((state: RootState) => state.flight.selectFlights)
  const bookingTempDeparture = useSelector((state: RootState) => state.flight.bookingTempDeparture)
  const bookingTempReturn = useSelector((state: RootState) => state.flight.bookingTempReturn)
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const voucher = useSelector((state: RootState) => state.booking.voucher)
  const selectDepartFlight = useSelector((state: RootState) => state.flight.selectDepartFlight)
  const selectReturnFlight = useSelector((state: RootState) => state.flight.selectReturnFlight)

  const [departureAirline, setDepartureAirline] = useState<Airline | null>(null)
  const [returnAirline, setReturnAirline] = useState<Airline | null>(null)
  const [departureAirport, setDepartAirport] = useState<Airport | null>(null)
  const [returnAirport, setReturnAirport] = useState<Airport | null>(null)

  const dispatch = useDispatch()

  const handlePassengerChange = (index: number, newPassenger: Passenger) => {
    const newPassengers = [...passengerInfor]
    newPassengers[index] = newPassenger

    dispatch(setPassengerInfor(newPassengers))
  }

  const [loadingVoucher, setLoadingVoucher] = useState<boolean>(false)

  const handleGetVoucher = async () => {
    setLoadingVoucher(true)

    dispatch(setVoucher(await getVoucherByCode(voucherStr)))

    setLoadingVoucher(false)
  }

  const [voucherStr, setVoucherStr] = useState<string>('')

  const navigate = useNavigate()

  async function handleFillInforPassengerToCreateBooking() {
    // const user = await getUserByUsername('sangt2202')

    // console.log(currentUser)

    // return

    //setIsLoading(true)

    try {
      if (selectDepartFlight) {
        const bookingData = {
          bookingRequestDTO: {
            flightId: selectDepartFlight.id,
            bookerFullName: passengerInfor[0].fullName,
            bookerEmail: passengerInfor[0].email,
            bookerPersonalId: passengerInfor[0].personalId,
            userId: currentUser?.id,
            bookingDate: new Date(),
            passengers: passengerInfor.map((passenger, index) => ({
              fullName: passenger.fullName,
              email: passenger.email,
              personalId: passenger.personalId,
              seatNumber: bookingTempDeparture!.selectSeats[index]
            }))
          },
          seatNumber: bookingTempDeparture!.selectSeats
        }

        dispatch(setBookingDepartureData(bookingData))

        // const success = await fillInforPassengerToCreateBooking(
        //   flight.id,
        //   bookingTempDeparture!.selectSeats,
        //   currentUser!,
        //   passengerInfor
        // )

        // console.log(success)
      }
      if (selectReturnFlight) {
        const bookingData = {
          bookingRequestDTO: {
            flightId: selectReturnFlight.id,
            bookerFullName: passengerInfor[0].fullName,
            bookerEmail: passengerInfor[0].email,
            bookerPersonalId: passengerInfor[0].personalId,
            userId: currentUser?.id,
            bookingDate: new Date(),
            passengers: passengerInfor.map((passenger, index) => ({
              fullName: passenger.fullName,
              email: passenger.email,
              personalId: passenger.personalId,
              seatNumber: bookingTempReturn!.selectSeats[index]
            }))
          },
          seatNumber: bookingTempReturn!.selectSeats
        }

        dispatch(setBookingReturnData(bookingData))
        // const success = await fillInforPassengerToCreateBooking(
        //   flight.id,
        //   bookingTempReturn!.selectSeats,
        //   currentUser!,
        //   passengerInfor
        // )

        // console.log(success)
      }
    } catch (error) {
      console.log(error)
    }
    //setIsLoading(false)
    navigate('/payment')
  }
  useEffect(() => {
    console.log(passengerInfor)
    fetchAirline()
    fetchAirport()
  })

  const fetchAirline = async () => {
    {
      selectDepartFlight ? setDepartureAirline(await getAirlineByPlaneId(selectDepartFlight.planeId)) : null
    }

    {
      selectReturnFlight ? setReturnAirline(await getAirlineByPlaneId(selectReturnFlight.planeId)) : null
    }

    // if (selectFlights.length === 2) {
    //   setReturnAirline(await getAirlineByPlaneId(selectFlights[1].planeId))
    // }
  }

  const fetchAirport = async () => {
    {
      selectDepartFlight ? setDepartAirport(await getAirport(selectDepartFlight.departureAirportId)) : null
    }
    {
      selectReturnFlight ? setReturnAirport(await getAirport(selectReturnFlight.departureAirportId)) : null
    }

    // if (selectFlights.length === 2) {
    //   setReturnAirport(await getAirport(selectFlights[1].departureAirportId))
    // }
  }

  return (
    <div className='bg-[#FAFBFC] h-fit flex flex-col  text-white  w-full px-32 mb-52 pt-3 '>
      <div className='flex gap-7'>
        <div className='flex flex-col grow'>
          <div className='flex flex-col'>
            <div className="text-green-300 text-2xl font-bold font-['Montserrat']">Passenger information</div>
            <div className='h-2'></div>
            <div className="w-full text-slate-400 text-lg font-normal font-['Montserrat']">
              Enter the required information for each traveler and be sure that it exactly matches the government-issued
              ID presented at the airport.
            </div>
            <div className='h-4'></div>
            <div className="text-slate-500 text-lg font-semibold font-['Montserrat']">Passenger 1 (Booker)</div>
            <div className='h-4'></div>

            <FormInformation
              key={0}
              index={0}
              passenger={passengerInfor[0]}
              onPassengerChange={handlePassengerChange}
            />

            {Array.from({ length: passenger - 1 }, (_, index) => (
              <div className='flex flex-col'>
                <div className='h-4'></div>
                <div className="text-slate-500 text-lg font-semibold font-['Montserrat']">Passenger {index + 2}</div>
                <div className='h-4'></div>
                <FormInformation
                  key={index + 1}
                  index={index + 1}
                  passenger={passengerInfor[index + 1]}
                  onPassengerChange={handlePassengerChange}
                />
              </div>
            ))}

            <div className='h-10'></div>

            <div className='flex gap-6'>
              <div className='w-[200px] h-11 bg-white rounded border border-zinc-500 flex-col justify-start items-start gap-2.5 inline-flex relative '>
                <div className="bg-[#FAFBFC] text-zinc-900 text-sm font-normal font-['Montserrat'] absolute top-[-10px] start-4 px-1 flex">
                  Voucher
                </div>
                <input
                  type='text'
                  name='fullName'
                  value={voucherStr}
                  onChange={(value) => {
                    setVoucherStr(value.target.value)
                  }}
                  className='h-full w-full px-4 py-2 rounded border border-zinc-500 text-black'
                />
              </div>
              <div
                className='h-11 w-20 bg-green-300 flex justify-center items-center rounded-md'
                onClick={handleGetVoucher}
              >
                {loadingVoucher ? (
                  <svg
                    className='w-30 h-5  text-white animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                ) : (
                  <div className="font-semibold text-zinc-900 text-sm  font-['Montserrat'] ">Apply</div>
                )}
              </div>

              {voucher !== null ? (
                <div className="opacity-75 text-neutral-900 text-base font-medium font-['Montserrat']">
                  Successfully apply {voucher.voucherName} voucher
                </div>
              ) : null}
            </div>

            <div className='h-6'></div>

            <div
              className='w-[159px] h-11 px-4 py-2 hover:opacity-75  bg-green-300 rounded justify-center items-center gap-1 inline-flex'
              onClick={handleFillInforPassengerToCreateBooking}
            >
              <div className="text-stone-700 text-xl font-semibold font-['Montserrat']">Save</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-[470px] '>
          <div
            className='flex flex-col justify-between items-start w-full h-fit  px-8 pt-4 pb-4 rounded-2xl bg-white hover:bg-slate-50  my-4 gap-3 '
            style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
          >
            {selectDepartFlight ? (
              <div className='flex gap-3'>
                {/* <img className='w-[120px] h-[120px] rounded-xl object-cover' src={} /> */}
                <div className='flex flex-col grow '>
                  <div className="text-green-300 text-2xl font-semibold font-['Montserrat'] ">Departure flight</div>

                  {/* <div className="opacity-75 text-neutral-900 text-base font-medium font-['Montserrat']">Economy </div> */}
                  <div className="text-neutral-900 text-xl font-semibold font-['Montserrat']">
                    {departureAirline?.airlineName}
                  </div>

                  <div className="opacity-75 text-neutral-900 text-base font-medium font-['Montserrat']">
                    {departureAirport?.airportName} - {departureAirport?.iataCode}
                  </div>

                  <div className="opacity-75 text-neutral-900 text-base font-medium font-['Montserrat']">
                    {format(new Date(selectDepartFlight.departureDate), 'dd-MM-yyyy HH:mm')}
                  </div>
                </div>
              </div>
            ) : null}

            {selectReturnFlight && (
              <div className='flex gap-3'>
                {/* <img className='w-[120px] h-[120px] rounded-xl object-cover' src={} /> */}
                <div className='flex flex-col grow '>
                  <div className="text-green-300 text-2xl font-semibold font-['Montserrat'] ">Return flight</div>

                  {/* <div className="opacity-75 text-neutral-900 text-base font-medium font-['Montserrat']">Economy </div> */}
                  <div className="text-neutral-900 text-xl font-semibold font-['Montserrat']">
                    {returnAirline?.airlineName}
                  </div>

                  <div className="opacity-75 text-neutral-900 text-base font-medium font-['Montserrat']">
                    {returnAirport?.airportName} - {departureAirport?.iataCode}
                  </div>

                  <div className="opacity-75 text-neutral-900 text-base font-medium font-['Montserrat']">
                    {format(new Date(selectReturnFlight.departureDate), 'dd-MM-yyyy HH:mm')}
                  </div>
                </div>
              </div>
            )}

            <div className='w-[402px] h-[0.50px] opacity-25 bg-neutral-900' />
            <div>
              <span className="text-neutral-900 text-base font-medium font-['Montserrat']">
                Your booking is protected by{' '}
              </span>
              <span className="text-neutral-900 text-base font-bold font-['Montserrat']">golobe</span>
            </div>

            <div className='w-full h-[0.50px] opacity-25 bg-neutral-900' />
            <div className="text-neutral-900 text-base font-bold font-['TradeGothic LT Extended']">Price Details</div>
            {/* <div className='w-full justify-between items-start inline-flex'>
              <div className="text-neutral-900 text-base font-medium font-['Montserrat']">Base Fare </div>
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">$400</div>
            </div> */}

            <div className='w-full justify-between items-start inline-flex'>
              <div className="text-neutral-900 text-base font-medium font-['Montserrat']">Departure flight price </div>
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">
                ${bookingTempDeparture !== undefined ? bookingTempDeparture?.price : 0}
              </div>
            </div>

            {selectReturnFlight && (
              <div className='w-full justify-between items-start inline-flex'>
                <div className="text-neutral-900 text-base font-medium font-['Montserrat']">Return flight price </div>
                <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">
                  ${bookingTempReturn !== undefined ? bookingTempReturn?.price : 0}
                </div>
              </div>
            )}

            <div className='w-full justify-between items-start inline-flex'>
              <div className="text-neutral-900 text-base font-medium font-['Montserrat']">Discount </div>
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">
                $
                {voucher !== null
                  ? (voucher.discountAmount / 100) *
                    ((bookingTempDeparture !== undefined ? bookingTempDeparture?.price : 0) +
                      (bookingTempReturn !== undefined ? bookingTempReturn?.price : 0))
                  : 0}
              </div>
            </div>

            <div className='w-full h-[0.50px] opacity-25 bg-neutral-900' />

            <div className='w-full justify-between items-start inline-flex'>
              <div className="text-neutral-900 text-base font-medium font-['Montserrat']">Total </div>
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">
                $
                {voucher !== null
                  ? (bookingTempDeparture !== undefined ? bookingTempDeparture?.price : 0) +
                    (bookingTempReturn !== undefined ? bookingTempReturn?.price : 0) -
                    (voucher.discountAmount / 100) *
                      ((bookingTempDeparture !== undefined ? bookingTempDeparture?.price : 0) +
                        (bookingTempReturn !== undefined ? bookingTempReturn?.price : 0))
                  : (bookingTempDeparture !== undefined ? bookingTempDeparture?.price : 0) +
                    (bookingTempReturn !== undefined ? bookingTempReturn?.price : 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
