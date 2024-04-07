import React from 'react'
import { Button } from '@/components/ui/button'
import { LocationItem } from './LocationItem'

const LocationList = () => {
  return (
    <div className='flex flex-col justify-start items-center gap-10 mt-44 px-32 w-full'>
      <div className='flex flex-col sm:flex-row justify-between items-start gap-6 w-full'>
        <div className='flex flex-col justify-start items-start gap-4'>
          <p className='text-[32px] font-semibold text-left text-black'>Plan your perfect trip</p>
          <p className='opacity-75 text-base text-left text-[#121]'>
            Search Flights &amp; Places Hire to our most popular destinations
          </p>
        </div>
        <Button className='h-10 px-4 py-2 rounded border border-[#8dd3bb] text-black hover:opacity-85'>
          See more places
        </Button>
      </div>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {Array.from({ length: 9 }).map((_, index) => (
            <LocationItem key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocationList
