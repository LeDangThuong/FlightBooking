import React, { useEffect, useState } from 'react'
import OptionItem from './OptionItem'
import { getAllReviews } from '@/services/ReviewService'
import { Button } from '@mui/material'
import { Review } from '@/models/Review'
import { useDispatch, useSelector } from 'react-redux'
import { setReviews } from '@/redux/slice/reviewSlice'
import { RootState } from '@/redux/store'
import { useNavigate } from 'react-router-dom'

const OptionSection = () => {
  //const [reviews, setReviews] = useState<Review[]>([])

  const dispatch = useDispatch()
  const reviews = useSelector((state: RootState) => state.review.reviews)

  useEffect(() => {
    const handleScroll = async () => {
      console.log('handleScroll')
      //setReviews(await getAllReviews())
      dispatch(setReviews(await getAllReviews()))
    }

    handleScroll()
  }, [])

  const navigate = useNavigate()

  return (
    <div className='flex flex-col mt-[200px]'>
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
      <div className='flex flex-col lg:flex-row justify-center items-center gap-6 mt-20'>
        {reviews.map((review) => (
          <OptionItem
            review={review}
            onClickShow={() => {
              navigate('/review_detail', { state: { review } })
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default OptionSection
