import React from 'react'
import { Button } from '@/components/ui/button'
import { LocationItem } from './LocationItem'

const LocationList = () => {
  return (
    <div className='flex flex-col justify-start items-center  gap-10 mt-44'>
      <div className='flex justify-center items-start flex-grow-0 flex-shrink-0 gap-6'>
        <div className='flex flex-col justify-start items-start self-stretch flex-grow relative gap-4'>
          <p className='self-stretch flex-grow-0 flex-shrink-0 w-[1059px] h-9 text-[32px] font-semibold text-left text-black'>
            Plan your perfect trip
          </p>
          <p className='self-stretch flex-grow-0 flex-shrink-0 opacity-75 text-base text-left text-[#121]'>
            Search Flights &amp; Places Hire to our most popular destinations
          </p>
        </div>
        <Button className='flex justify-center items-center flex-grow-0 flex-shrink-0 h-10 px-4 py-2 rounded border border-[#8dd3bb] text-black hover:opacity-85'>
          See more places
        </Button>
      </div>
      <div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-8'>
        <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1232px] gap-8'>
          <LocationItem />
          <LocationItem />
          <LocationItem />
        </div>
        <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1232px] gap-8'>
          <LocationItem />
          <LocationItem />
          <LocationItem />
        </div>
        <div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1232px] gap-8'>
          <LocationItem />
          <LocationItem />
          <LocationItem />
        </div>
      </div>
    </div>
  )
}

export default LocationList
