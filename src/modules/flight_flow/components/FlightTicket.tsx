import React from 'react'
import logo from '../../../assets/images/logo_vnairline.png'

export const FlightTicket = () => {
  return (
    <div
      className='flex justify-between items-center w-full h-fit  px-8 pt-4 pb-4 my-3 rounded-2xl bg-white '
      style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
    >
      <img src={logo} alt='Logo' className='my-10' />
      <div className='grow'>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between'>
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

            <div className='w-[84px] h-11 flex-col justify-start items-end inline-flex'>
              <div className="self-stretch opacity-75 text-neutral-900 text-xs font-medium font-['Montserrat']">
                starting from
              </div>
              <div className="text-right text-rose-400 text-2xl font-bold font-['Montserrat']">$104</div>
            </div>
          </div>

          <div className='flex items-start gap-5'>
            <input type='checkbox' className='self-center' />
            <div className='flex flex-col'>
              <div className=' justify-start items-start gap-2 inline-flex'>
                <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">12:00 pm</div>
                <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">-</div>
                <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">01:28 pm</div>
              </div>

              <div className="opacity-40 text-neutral-900 text-sm font-normal font-['Montserrat']">Emirates</div>
            </div>

            <div className="self-center opacity-80 text-neutral-900 text-sm font-semibold font-['Montserrat']">
              non stop
            </div>

            <div className='flex flex-col '>
              <div className="opacity-80 text-neutral-900 text-base font-semibold font-['Montserrat']">2h 28m</div>
              <div className="opacity-40 text-neutral-900 text-sm font-normal font-['Montserrat']">EWR-BNA</div>
            </div>
          </div>

          <div className='flex items-start gap-5'>
            <input type='checkbox' className='self-center' />
            <div className='flex flex-col'>
              <div className=' justify-start items-start gap-2 inline-flex'>
                <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">12:00 pm</div>
                <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">-</div>
                <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">01:28 pm</div>
              </div>

              <div className="opacity-40 text-neutral-900 text-sm font-normal font-['Montserrat']">Emirates</div>
            </div>

            <div className="self-center opacity-80 text-neutral-900 text-sm font-semibold font-['Montserrat']">
              non stop
            </div>

            <div className='flex flex-col '>
              <div className="opacity-80 text-neutral-900 text-base font-semibold font-['Montserrat']">2h 28m</div>
              <div className="opacity-40 text-neutral-900 text-sm font-normal font-['Montserrat']">EWR-BNA</div>
            </div>
          </div>

          <div className='w-full h-[0.50px] opacity-25 bg-neutral-900' />

          <div className='flex gap-3'>
            <div className='w-10 h-10 flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className='w-10 h-10 px-2 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
                <svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M13.7863 3.625C11.2504 3.625 10.0004 6.125 10.0004 6.125C10.0004 6.125 8.7504 3.625 6.21446 3.625C4.15352 3.625 2.52149 5.34922 2.5004 7.40664C2.45743 11.6773 5.88829 14.7145 9.64884 17.2668C9.75251 17.3373 9.87501 17.3751 10.0004 17.3751C10.1258 17.3751 10.2483 17.3373 10.352 17.2668C14.1121 14.7145 17.543 11.6773 17.5004 7.40664C17.4793 5.34922 15.8473 3.625 13.7863 3.625V3.625Z'
                    stroke='#4C4850'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </div>
            </div>

            <div className='grow'>
              <div className='w-full h-10 flex-col justify-start items-start gap-2.5 inline-flex'>
                <div className='self-stretch h-12 px-4 py-2 bg-green-300 rounded justify-center items-center gap-1 inline-flex'>
                  <div className="text-neutral-900 text-sm font-semibold font-['Montserrat']">View Deals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
