import React from 'react'
import locationImage from '../../../assets/images/landing_background.png'

export const LocationItem = () => {
  return (
    <div
      className='flex justify-start items-center flex-grow gap-4 p-4 rounded-2xl bg-white'
      style={{ boxShadow: '0px 4px 16px 0 rgba(17,34,17,0.05)' }}
    >
      <div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[90px] w-[90px] relative'>
        <img src={locationImage} className='self-stretch flex-grow rounded-lg object-cover' />
      </div>
      <div className='flex flex-col justify-start items-start flex-grow relative gap-2'>
        <p className='self-stretch flex-grow-0 flex-shrink-0 w-[251.33px] opacity-70 text-base font-semibold text-left text-[#121]'>
          Phu Cat, Binh Dinh
        </p>
        <div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
          <p className='flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#121]'>Explore now </p>
        </div>
      </div>
    </div>
  )
}
