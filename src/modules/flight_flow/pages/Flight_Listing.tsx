import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import logo from '../../../assets/images/logo_vnairline.png'

import { Fillter } from '../components/Fillter'
import { FlightTicket } from '../components/FlightTicket'

const FlightListing = () => {
  const [selectTab, setSelectTab] = useState('Cheapest')

  return (
    <div className='bg-[#FAFBFC] h-full flex flex-col  text-white  w-full'>
      <div className='mx-32'>
        <SearchBar />
      </div>
      <div className='flex my-72 mx-32  space-x-6'>
        <div className='grow-0 w-[343px] h-[880px]'>
          <Fillter />
        </div>
        <div className='grow-0 w-[0.50px] h-[1360px] opacity-25 bg-neutral-900' />
        <div className='grow h-[880px] flex flex-col '>
          <div
            className='flex justify-between items-center w-full h-fit  px-8 pt-4 pb-1 rounded-2xl bg-white '
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
          </div>

          <div className='w-full h-[18px] mt-4 items-start flex justify-between'>
            <div>
              <span className="text-neutral-900 text-sm font-semibold font-['Montserrat']">Showing 4 of </span>
              <span className="text-rose-400 text-sm font-semibold font-['Montserrat']">257 places</span>
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
          <FlightTicket />
          <FlightTicket />
          <FlightTicket />
          <FlightTicket />

          <div className='w-full h-12 my-3 flex-col justify-start items-start gap-2.5 inline-flex'>
            <div className='self-stretch h-12 px-4 py-2 bg-neutral-900 rounded justify-center items-center gap-1 inline-flex'>
              <div className="text-white text-sm font-semibold font-['Montserrat']">Show more results</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightListing
