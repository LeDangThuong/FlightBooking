import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/dateRangePicker'
import { useNavigate } from 'react-router-dom'
import search from '../../../assets/svgs/search.svg'

const SearchBar = () => {
  const navigate = useNavigate()
  const handleShowFlight = () => {
    navigate('/flight_listing')
  }

  return (
    <div
      className='flex flex-col justify-start items-start w-[1232px] absolute left-1/2 transform -translate-x-1/2 top-[120px] gap-8 px-8 pt-4 pb-8 rounded-2xl bg-white'
      style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
    >
      <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-12 mt-5'>
        <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 w-[1184px] gap-6'>
          <div className='flex flex-col justify-start items-start flex-grow h-14 rounded-tl rounded-tr'>
            <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 rounded bg-white border border-[#79747e]'>
              <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 pl-4 py-1 rounded-tl rounded-tr'>
                <div className='flex flex-col justify-center items-start flex-grow h-10 relative'>
                  <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative'>
                    <p className='flex-grow-0 flex-shrink-0 text-base text-left text-[#1c1b1f]'>Lahore - Karachi</p>
                  </div>
                  <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 absolute left-[-4px] top-[-16px] px-1 bg-white'>
                    <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-[#121]'>From - To</p>
                  </div>
                </div>
                <div className='flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-12 w-12 relative gap-2.5 p-3'>
                  <svg
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='flex-grow-0 flex-shrink-0 w-6 h-6 relative'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M14.25 2.25L19.5 7.5L14.25 12.75M18.697 7.5H4.5M9.75 21.75L4.5 16.5L9.75 11.25M5.34375 16.5H19.5'
                      stroke='black'
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-14 w-[140px] rounded-tl rounded-tr'>
            <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 rounded bg-white border border-[#79747e]'>
              <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 pl-4 py-1 rounded-tl rounded-tr'>
                <div className='flex flex-col justify-center items-start flex-grow h-10 relative'>
                  <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative'>
                    <p className='flex-grow-0 flex-shrink-0 text-base text-left text-[#1c1b1f]'>Return</p>
                  </div>
                  <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 absolute left-[-4px] top-[-16px] px-1 bg-white'>
                    <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-[#121]'>Trip</p>
                  </div>
                </div>
                <div className='flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-12 w-12 relative gap-2.5 p-3'>
                  <svg
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='flex-grow-0 flex-shrink-0 w-6 h-6 relative'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M5.25 9L12 15.75L18.75 9'
                      stroke='black'
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <DatePickerWithRange className='text-black border border-[#79747e] rounded h-14' />
          {/* <div className='flex flex-col justify-start items-start flex-grow h-14 rounded-tl rounded-tr'>
              <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 rounded bg-white border border-[#79747e]'>
                <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 w-[210px] pl-4 py-2 rounded-tl rounded-tr'>
                  <div className='flex flex-col justify-center items-start flex-grow h-10 relative'>
                    <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative'>
                      <p className='flex-grow-0 flex-shrink-0 text-base text-left text-[#1c1b1f]'>
                        07 Nov 22 - 13 Nov 22
                      </p>
                    </div>
                    <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 absolute left-[-4px] top-[-16px] px-1 bg-white'>
                      <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-[#1c1b1f]'>Depart- Return</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          <div className='flex flex-col justify-start items-start flex-grow h-14 rounded-tl rounded-tr'>
            <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 rounded bg-white border border-[#79747e]'>
              <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 pl-4 py-2 rounded-tl rounded-tr'>
                <div className='flex flex-col justify-center items-start flex-grow h-10 relative'>
                  <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative'>
                    <p className='flex-grow-0 flex-shrink-0 text-base text-left text-[#1c1b1f]'>1 Passenger, Economy</p>
                  </div>
                  <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 absolute left-[-4px] top-[-16px] px-1 bg-white'>
                    <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-[#1c1b1f]'>Passenger - Class</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-14 h-14 flex-col justify-start items-start gap-2.5 inline-flex'>
            <div className='self-stretch grow shrink basis-0 px-4 py-2 bg-green-300 rounded justify-center items-center gap-1 inline-flex'>
              <div className='w-6 h-6 pl-[2.25px] pr-[2.29px] pt-[2.25px] pb-[2.29px] justify-center items-center flex'>
                <img src={search} alt='Search icon' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
