import { Review } from '@/models/Review'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ReviewDetail = () => {
  const location = useLocation()

  const { review } = location.state as { review: Review }

  useEffect(() => {
    console.log(review)
  })

  return (
    <div className='bg-[#FAFBFC] h-full flex flex-col justify-start text-white  w-full gap-6 px-32 py-10 items-center'>
      <div className="w-full h-9 text-black text-[32px] font-semibold font-['Montserrat']">{review.title}</div>

      <div className="w-full text-neutral-900 text-sm font-normal font-['Montserrat'] leading-tight mt-5">
        {review.description}
      </div>

      <img src={review.listImage[0]} alt='' className='h-[500px] w-[700px] rounded-md object-cover' />
      <div className="w-full text-neutral-900 text-sm font-normal font-['Montserrat'] leading-tight">
        {review.conclude}
      </div>

      <div className="w-full text-neutral-900 text-sm font-normal font-['Montserrat'] leading-tight">
        {review.subDescription}
      </div>

      {review.list.map((post) => (
        <div className='flex flex-col justify-start items-center gap-5'>
          <div className="w-full h-9 text-black text-[32px] font-semibold font-['Montserrat']">{post.question}</div>
          <img src={post.image} alt={post.imageAlt} className='h-[500px] w-[700px] rounded-md object-cover' />
          <div className="w-full text-neutral-900 text-sm font-normal font-['Montserrat'] leading-tight">
            {post.description}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReviewDetail
