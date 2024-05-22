import React, { useState } from 'react'
import { DoubleRangeSlider } from './RangeSlider'
import flightup from '../../../assets/svgs/flightup.svg'
import arrow from '../../../assets/svgs/arrow.svg'
import logo from '../../../assets/images/logo_vnairline.png'
import exit from '../../../assets/svgs/exit.svg'
import airplane from '../../../assets/svgs/airplane.svg'
import { SelectFlight } from './SelectFlight'
import { useNavigate } from 'react-router-dom'

export const Fillter = () => {
  const [sliderValue, setSliderValue] = useState<number[]>([50, 100])
  const [sliderValueTime, setSliderValueTime] = useState<number[]>([50, 100])

  const maxPriceValue = 1200
  const hours = 864

  const navigate = useNavigate()

  const handViewDetail = () => {
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
  return (
    <>
      <div className="text-neutral-900 text-xl font-semibold font-['Montserrat']">Filters</div>
      <div className='w-full h-[87px] flex-col justify-start items-start flex'>
        <div
          className='flex flex-col  justify-between items-start w-full h-fit  px-8 pt-4 pb-2 rounded-2xl bg-white '
          style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
        >
          <div className='flex'>
            <img className='w-6 h-6' src={flightup} />
            <div className="text-black text-sm font-medium font-['Montserrat'] mx-4">Your Flight</div>
          </div>
          <SelectFlight />
          <SelectFlight />
          <div className='h-2'></div>
          <div className='w-full h-[0px] border border-zinc-500/opacity-50'></div>
          <div className='h-2'></div>
          <div className="w-[268px] text-black text-sm font-semibold font-['Montserrat']">Subtotal</div>
          <div className='flex justify-center items-center'>
            <div className="text-right text-rose-400 text-2xl font-bold font-['Montserrat']">$104,00</div>
            <div className="text-right text-black text-sm font-normal font-['Montserrat']">/Passenger</div>
          </div>
          <div className='h-2'></div>

          <div className='flex w-full justify-center' onClick={handViewDetail}>
            <div className='w-[159px] h-8 px-4 py-2 bg-green-300 rounded-[19px] justify-center items-center gap-1 inline-flex'>
              <div className="text-white text-sm font-semibold font-['Montserrat']">Booking now</div>
            </div>
          </div>

          <div className='h-2'></div>
        </div>

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
        </div>

        <div className='self-stretch justify-between items-start inline-flex mt-2'>
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
        </div>

        <div className='w-full h-[87px] flex-col justify-start items-start  inline-flex'>
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
        </div>
        <div className='w-full h-[0.50px] opacity-25 bg-neutral-900 my-6' />
        <div className='w-full h-fit flex-col justify-start items-start  inline-flex'>
          <div className='self-stretch justify-between items-start inline-flex mt-2  mb-1'>
            <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">Airlines</div>
          </div>

          <div className='w-full h-fit'>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
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
            </div>
          </div>
        </div>
        <div className='w-full h-[0.50px] opacity-25 bg-neutral-900 my-6' />
        <div className='w-full h-fit flex-col justify-start items-start  inline-flex'>
          <div className='self-stretch justify-between items-start inline-flex mt-2  mb-1'>
            <div className="text-neutral-900 text-base font-semibold font-['Montserrat']">Trips</div>
          </div>

          <div className='h-fit'>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input type='checkbox' className='self-center h-full' />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">Round trip</div>
            </div>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input type='checkbox' className='self-center h-full' />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">On Way</div>
            </div>
            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input type='checkbox' className='self-center h-full' />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">Multi-City</div>
            </div>

            <div className='w-full h-6 justify-start items-center gap-2 flex '>
              <input type='checkbox' className='self-center h-full' />
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat']">My Dates Are Flexible</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
