import { useDispatch, useSelector } from 'react-redux'
import { FormInformation } from '../components/FormInformation'
import { RootState } from '@/redux/store'
import { Passenger } from '@/models/Passenger'
import { useEffect, useState } from 'react'
import { setPassengerInfor } from '@/redux/slice/flightSlice'
import { fillInforPassengerToCreateBooking } from '@/services/BookingService'
import { getUserByUsername } from '@/services/UserService'

export const PassengerInformation = () => {
  const passenger = useSelector((state: RootState) => state.flight.passenger)
  const passengerInfor = useSelector((state: RootState) => state.flight.passengerInfor)
  const selectFlights = useSelector((state: RootState) => state.flight.selectFlights)
  const bookingTempDeparture = useSelector((state: RootState) => state.flight.bookingTempDeparture)
  const bookingTempReturn = useSelector((state: RootState) => state.flight.bookingTempReturn)
  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  const dispatch = useDispatch()

  const handlePassengerChange = (index: number, newPassenger: Passenger) => {
    const newPassengers = [...passengerInfor]
    newPassengers[index] = newPassenger

    dispatch(setPassengerInfor(newPassengers))
  }

  async function handleFillInforPassengerToCreateBooking() {
    // const user = await getUserByUsername('sangt2202')

    // console.log(currentUser)

    // return

    //setIsLoading(true)
    try {
      selectFlights.forEach(async (flight, index) => {
        if (index === 0) {
          const success = await fillInforPassengerToCreateBooking(
            flight.id,
            bookingTempDeparture!.selectSeats,
            currentUser!,
            passengerInfor
          )

          console.log(success)
        } else {
          const success = await fillInforPassengerToCreateBooking(
            flight.id,
            bookingTempReturn!.selectSeats,
            currentUser!,
            passengerInfor
          )

          console.log(success)
        }
      })
    } catch (error) {
      console.log(error)
    }
    //setIsLoading(false)
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
            <div className='flex gap-3'>
              {/* <img className='w-[120px] h-[120px] rounded-xl object-cover' src={} /> */}
              <div className='flex flex-col grow '>
                <div className="opacity-75 text-neutral-900 text-base font-medium font-['Montserrat']">Economy </div>
                <div className="text-neutral-900 text-xl font-semibold font-['Montserrat']">Emirates A380 Airbus</div>
                <div className='flex items-center gap-2'>
                  <div className='w-10 h-8 flex-col justify-start items-start gap-2.5 inline-flex'>
                    <div className='self-stretch h-8 px-4 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
                      <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">4.2</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-900 text-xs font-bold font-['Montserrat']">Very Good</span>
                    <span className="text-neutral-900 text-xs font-medium font-['Montserrat']"> 54 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-[402px] h-[0.50px] opacity-25 bg-neutral-900' />
            <div>
              <span className="text-neutral-900 text-base font-medium font-['Montserrat']">
                Your booking is protected by{' '}
              </span>
              <span className="text-neutral-900 text-base font-bold font-['Montserrat']">golobe</span>
            </div>

            <div className='w-full h-[0.50px] opacity-25 bg-neutral-900' />
            <div className="text-neutral-900 text-base font-bold font-['TradeGothic LT Extended']">Price Details</div>
            <div className='w-full justify-between items-start inline-flex'>
              <div className="text-neutral-900 text-base font-medium font-['Montserrat']">Base Fare </div>
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">$400</div>
            </div>
            <div className='w-full justify-between items-start inline-flex'>
              <div className="text-neutral-900 text-base font-medium font-['Montserrat']">Discount </div>
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">$400</div>
            </div>
            <div className='w-full justify-between items-start inline-flex'>
              <div className="text-neutral-900 text-base font-medium font-['Montserrat']">Taxes </div>
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">$400</div>
            </div>
            <div className='w-full justify-between items-start inline-flex'>
              <div className="text-neutral-900 text-base font-medium font-['Montserrat']">Service Fee </div>
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">$400</div>
            </div>

            <div className='w-full h-[0.50px] opacity-25 bg-neutral-900' />

            <div className='w-full justify-between items-start inline-flex'>
              <div className="text-neutral-900 text-base font-medium font-['Montserrat']">Total </div>
              <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">$400</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
