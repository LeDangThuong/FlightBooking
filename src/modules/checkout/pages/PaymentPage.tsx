import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/redux/store'
import { Passenger } from '@/models/Passenger'
import { useEffect, useRef, useState } from 'react'
import { setPassengerInfor } from '@/redux/slice/flightSlice'
import { fillInforPassengerToCreateBooking } from '@/services/BookingService'
import { getUserByUsername } from '@/services/UserService'
import { setBookingDepartureData, setShowModelPayment } from '@/redux/slice/bookingSlice'
import CheckoutForm from '../components/CheckoutForm'
import check from '../../../assets/images/check.png'
import Modal from '@/components/ui/modal'
import { useNavigate } from 'react-router-dom'

export const PaymentPage = () => {
  const showModelPayment = useSelector((state: RootState) => state.booking.showModelPayment)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const goToHomePage = () => {
    dispatch(setShowModelPayment(false))
    console.log('goToHomePage')
    navigate('/home')
  }

  return (
    <div className='bg-[#FAFBFC] h-fit flex flex-col  text-white  w-full px-32 mb-52 pt-3 '>
      <div className='flex gap-7'>
        <div className='flex flex-col grow gap-3'>
          <div className="text-green-300 text-2xl font-bold font-['Nunito Sans']">Payment method</div>
          <div className="text-slate-500 text-lg font-semibold font-['Nunito Sans']">Credit card details</div>
          <CheckoutForm />
          <div className="text-slate-500 text-lg font-semibold font-['Nunito Sans']">Cancellation policy</div>
          <div className='w-[682px]'>
            <span className="text-slate-400 text-base font-normal font-['Nunito Sans']">
              This flight has a flexible cancellation policy. If you cancel or change your flight up to 30 days before
              the departure date, you are eligible for a free refund. All flights booked on Tripma are backed by our
              satisfaction guarantee, however cancellation policies vary by airline. See the
            </span>
            <span className="text-green-300 text-base font-normal font-['Nunito Sans']"> full cancellation policy</span>
            <span className="text-slate-400 text-base font-normal font-['Nunito Sans']"> for this flight.</span>
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

        <Modal
          className='rounded-md bg-white shadow-lg  py-2 px-4  h-[200px] w-[300px] flex flex-col justify-center'
          isOpen={showModelPayment}
        >
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='text-2xl font-bold  text-center text-green-500'>Payment successful</div>
            <div className='w-[50px] h-[50px] rounded-full bg-green-500 p-3'>
              <img src={check} alt='' />
            </div>
            <button
              className='border bg-blue-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-blue-600 transition duration-300'
              onClick={goToHomePage}
            >
              Go to home page
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
