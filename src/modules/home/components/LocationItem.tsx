import React from 'react'
import locationImage from '../../../assets/images/landing_background.png'
import { Button } from '@/components/ui/button'

export const LocationItem = () => {
  return (
    <div className='flex justify-start items-center flex-grow gap-4 p-4 rounded-2xl bg-white shadow-md'>
      <div className='w-full sm:w-[90px] h-[90px]'>
        <img src={locationImage} className='w-full h-full rounded-lg object-cover' />
      </div>
      <div className='flex flex-col justify-start items-start flex-grow gap-2'>
        <p className='text-base font-semibold text-left text-[#121] opacity-70'>Phu Cat, Binh Dinh</p>
        <Button className='p-0 rounded text-black hover:opacity-85'>Explore now</Button>
      </div>
    </div>
  )
}
