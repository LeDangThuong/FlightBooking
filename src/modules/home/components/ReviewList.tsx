import { Button } from '@/components/ui/button'
import React from 'react'
import ReviewItem from './ReviewItem'
import { ScrollArea } from '@radix-ui/react-scroll-area'

const ReviewList = () => {
  return (
    <div className='flex flex-col justify-start items-center gap-10 mt-20 w-full'>
      <div className='flex justify-between items-start  gap-6 w-full'>
        <div className='flex flex-col justify-start items-start self-stretch flex-grow gap-4'>
          <p className='self-stretch text-[32px] font-semibold text-black'>Reviews</p>
          <p className='text-base text-black'>What people says about Golobe facilities</p>
        </div>
        <Button className='rounded border border-[#8dd3bb] text-black hover:opacity-85'>See All</Button>
      </div>
      <ScrollArea className='w-full overflow-x-auto h-auto p-2 '>
        <div className='flex w-max gap-6 h-auto'>
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </div>
      </ScrollArea>
    </div>
  )
}

export default ReviewList
