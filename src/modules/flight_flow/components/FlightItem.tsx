import React from 'react'
import logo from '../../../assets/images/logo_emirates.png'
import airplane from '../../../assets/svgs/airplane.svg'
import wifi from '../../../assets/svgs/wifi.svg'
import fastfood from '../../../assets/svgs/fastfood.svg'
import stopwatch from '../../../assets/svgs/stopwatch.svg'
import airlineseat from '../../../assets/svgs/airline-seat.svg'

export const FlightItem = () => {
  return (
    <div
      className='flex flex-col justify-between items-center w-full h-fit  px-8 pt-4 pb-4 rounded-2xl bg-white my-4 gap-6 '
      style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
    >
      <div className='flex w-[100%] justify-between '>
        <div className="text-neutral-900 text-xl font-bold font-['TradeGothic LT Extended']">Return Wed, Dec 8</div>
        <div className="opacity-75 text-neutral-900 text-xl font-medium font-['Montserrat']">2h 28m</div>
      </div>

      <div className='flex w-full justify-between'>
        <div className=' px-8 py-4 bg-white rounded-lg border border-green-300 justify-center items-center gap-6 flex'>
          <img className='w-16 h-[44.49px]' src={logo} />
          <div className='flex flex-col'>
            <div className="text-neutral-900 text-2xl font-semibold font-['Montserrat']">Emirates</div>
            <div className="opacity-60 text-neutral-900 text-sm font-medium font-['Montserrat']">Airbus A320</div>
          </div>
        </div>

        <div className='flex gap-6 items-center'>
          <img className='w-10 h-10' src={airplane} />
          <div className=' h-12 border border-slate-200'></div>

          <img className='w-10 h-10' src={wifi} />
          <div className=' h-12 border border-slate-200'></div>

          <img className='w-10 h-10' src={stopwatch} />
          <div className=' h-12 border border-slate-200'></div>

          <img className='w-10 h-10' src={fastfood} />
          <div className=' h-12 border border-slate-200'></div>

          <img className='w-10 h-10' src={airlineseat} />
        </div>
      </div>

      <div className='flex justify-center items-center gap-6'>
        <div className="text-neutral-900 text-2xl font-semibold font-['Montserrat']">12:00 pm</div>
        <div className="opacity-60 text-neutral-900 text-base font-medium font-['Montserrat']">Newark(EWR)</div>
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

        <div className="text-neutral-900 text-2xl font-semibold font-['Montserrat']">12:00 pm</div>
        <div className="opacity-60 text-neutral-900 text-base font-medium font-['Montserrat']">Newark(EWR)</div>
      </div>
    </div>
  )
}
