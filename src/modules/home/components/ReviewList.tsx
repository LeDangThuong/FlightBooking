import { Button } from '@/components/ui/button'
import React from 'react'
import ReviewItem from './ReviewItem'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ScrollBar } from '@/components/ui/scroll-area'

const ReviewList = () => {
  return (
    <div className='flex flex-col justify-start items-center gap-10 mt-20'>
      <div className='flex justify-between items-start flex-grow-0 flex-shrink-0 gap-6'>
        <div className='flex flex-col justify-start items-start self-stretch flex-grow relative gap-4'>
          <p className='self-stretch flex-grow-0 flex-shrink-0 w-[1128px] h-9 text-[32px] font-semibold text-left text-black'>
            Reviews
          </p>
          <p className='flex-grow-0 flex-shrink-0 text-base text-left text-black'>
            What people says about Globe facilities
          </p>
        </div>
        <Button className='flex justify-center items-center flex-grow-0 flex-shrink-0 h-10 px-4 py-2 rounded border border-[#8dd3bb] text-black hover:opacity-85'>
          See All
        </Button>
      </div>
      <ScrollArea className='w-[1240px] overflow-x-auto h-auto p-2 '>
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
