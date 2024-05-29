import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SelectRadio } from '../components/SelectRadio'
import photo4 from '../../../assets/images/photo4.png'

export const BookingDetails = () => {
  const [selectedPay, setSelectedPay] = useState<string>('')
  const radioPayHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPay(event.target.value)
    console.log(selectedPay)
  }

  return (
    <div className='bg-[#FAFBFC] h-fit flex flex-col  text-white  w-full px-32 mb-52 '>
      <div className='w-full h-[17px] justify-start items-end gap-2 inline-flex mt-24 mb-5'>
        <div className="text-rose-400 text-sm font-medium font-['Montserrat']">Turkey</div>
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g opacity='0.75'>
            <path
              d='M6 3.5L10.5 8L6 12.5'
              stroke='#112211'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </g>
        </svg>

        <div className="text-rose-400 text-sm font-medium font-['Montserrat']">Istanbul</div>
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g opacity='0.75'>
            <path
              d='M6 3.5L10.5 8L6 12.5'
              stroke='#112211'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </g>
        </svg>

        <div className="opacity-75 text-neutral-900 text-sm font-medium font-['Montserrat']">
          CVK Park Bosphorus Hotel Istanbul
        </div>
      </div>

      <div className='flex gap-7'>
        <div className='flex flex-col grow'>
          {/* <FlightItem /> */}

          <div
            className='flex flex-col justify-between items-center w-full h-fit  px-2 pt-4 pb-4 rounded-2xl bg-white hover:bg-slate-50  my-4  '
            style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
          >
            <SelectRadio
              name={'pay'}
              value={'pay-in-pull'}
              title={'Pay in pull'}
              content={' Pay the total and you are all set'}
              selected={selectedPay}
              onChange={radioPayHandler}
            />
            <SelectRadio
              name={'pay'}
              value={'Pay in full'}
              title={'Pay part now, part later'}
              content={
                'Pay $207.43 now, and the rest ($207.43) will be automatically charged to the same payment method on Nov 14, 2022. No extra fees.'
              }
              selected={selectedPay}
              onChange={radioPayHandler}
            />

            <div className="text-neutral-900 text-xs font-medium font-['Montserrat'] underline self-start mx-4 my-2">
              More info
            </div>
          </div>

          <div
            className='flex flex-col justify-between items-center w-full h-fit  px-2 pt-4 pb-4 rounded-2xl bg-white hover:bg-slate-50  my-4  '
            style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
          >
            <SelectRadio
              name={'pay'}
              value={'pay-in-pull'}
              title={'Pay in pull'}
              content={' Pay the total and you are all set'}
              selected={selectedPay}
              onChange={radioPayHandler}
            />
            <SelectRadio
              name={'pay'}
              value={'Pay in full'}
              title={'Pay part now, part later'}
              content={
                'Pay $207.43 now, and the rest ($207.43) will be automatically charged to the same payment method on Nov 14, 2022. No extra fees.'
              }
              selected={selectedPay}
              onChange={radioPayHandler}
            />

            <div className="text-neutral-900 text-xs font-medium font-['Montserrat'] underline self-start mx-4 my-2">
              More info
            </div>
          </div>
        </div>
        <div className='flex flex-col w-[470px] '>
          <div
            className='flex flex-col justify-between items-start w-full h-fit  px-8 pt-4 pb-4 rounded-2xl bg-white hover:bg-slate-50  my-4 gap-3 '
            style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
          >
            <div className='flex gap-3'>
              <img className='w-[120px] h-[120px] rounded-xl object-cover' src={photo4} />
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
