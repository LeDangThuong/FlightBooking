import React, { useState } from 'react'
import reviewImg from '@/assets/images/landing_background.png'
import { Button } from '@/components/ui/button'

const ReviewItem = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='w-full sm:w-[450px] h-full sm:h-[90vh] relative'>
      <div className='w-full sm:w-[425px] h-[610px] absolute left-6 top-[21px] rounded-[20px] bg-[#8dd3bb]/40' />
      <div
        className='absolute left-0 top-0 p-6 rounded-[20px] bg-white flex flex-col justify-start items-center gap-10'
        style={{ boxShadow: '2px 4px 16px 0 rgba(17,34,17,0.1)' }}
      >
        <div className='flex flex-col justify-start items-start gap-4 w-full sm:w-[377px]'>
          <p className='h-20 text-2xl font-bold text-left text-[#121]'>“A real sense of community, nurtured”</p>
          <p className={`text-[#112211] ${isExpanded ? '' : 'line-clamp-2'}`}>
            Really appreciate the help and support from the staff during these tough times. Shout out to Katie for
            helping me always, even when I was out of the country. And always available when needed.
          </p>
          <Button className='text-sm font-bold self-end text-[#121] p-0' onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'View less' : 'View more'}
          </Button>
          <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-5'>
            <div className='flex gap-3'>
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 '
                  preserveAspectRatio='none'
                >
                  <path
                    d='M18.4687 22.5002C18.3109 22.5008 18.1568 22.4516 18.0286 22.3596L12 17.989L5.97139 22.3596C5.84259 22.453 5.68742 22.5031 5.52832 22.5025C5.36921 22.5019 5.21441 22.4507 5.08629 22.3564C4.95818 22.262 4.86339 22.1294 4.81563 21.9776C4.76787 21.8258 4.76961 21.6628 4.82061 21.5121L7.17186 14.5479L1.07811 10.369C0.946113 10.2786 0.846491 10.1483 0.793797 9.99724C0.741103 9.84617 0.7381 9.68221 0.785225 9.52932C0.83235 9.37642 0.927135 9.2426 1.05573 9.14741C1.18432 9.05222 1.33999 9.00065 1.49998 9.00023H9.0178L11.2865 2.0182C11.3354 1.86746 11.4308 1.73607 11.559 1.64289C11.6871 1.5497 11.8415 1.49951 12 1.49951C12.1584 1.49951 12.3128 1.5497 12.441 1.64289C12.5692 1.73607 12.6645 1.86746 12.7134 2.0182L14.9822 9.00257H22.5C22.6602 9.00249 22.8162 9.05371 22.9452 9.14871C23.0741 9.24372 23.1693 9.37753 23.2167 9.53054C23.2642 9.68355 23.2613 9.84773 23.2087 9.99903C23.1561 10.1503 23.0564 10.2808 22.9242 10.3713L16.8281 14.5479L19.178 21.5102C19.216 21.6229 19.2267 21.7431 19.2092 21.8608C19.1917 21.9785 19.1464 22.0903 19.0771 22.187C19.0078 22.2837 18.9165 22.3626 18.8107 22.417C18.7049 22.4715 18.5877 22.5 18.4687 22.5002Z'
                    fill='#FFC107'
                  />
                </svg>
              ))}
            </div>
            <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-3'>
              <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1'>
                <p className='self-stretch flex-grow-0 flex-shrink-0 w-[377px] text-sm font-bold text-left text-[#121]'>
                  Olga
                </p>
                <p className='self-stretch flex-grow-0 flex-shrink-0 w-[377px] opacity-50 text-xs font-medium text-left text-[#121]'>
                  Weave Studios – Kai Tak
                </p>
              </div>
              <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
                <svg
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='flex-grow-0 flex-shrink-0 w-6 h-6 relative'
                  preserveAspectRatio='xMidYMid meet'
                >
                  <path
                    d='M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
                    fill='#FFC107'
                  />
                  <path
                    d='M3.15234 7.3455L6.43784 9.755C7.32684 7.554 9.47984 6 11.9993 6C13.5288 6 14.9203 6.577 15.9798 7.5195L18.8083 4.691C17.0223 3.0265 14.6333 2 11.9993 2C8.15834 2 4.82734 4.1685 3.15234 7.3455Z'
                    fill='#FF3D00'
                  />
                  <path
                    d='M11.9999 21.9999C14.5829 21.9999 16.9299 21.0114 18.7044 19.4039L15.6094 16.7849C14.5717 17.574 13.3036 18.0009 11.9999 17.9999C9.39891 17.9999 7.19041 16.3414 6.35841 14.0269L3.09741 16.5394C4.75241 19.7779 8.11341 21.9999 11.9999 21.9999Z'
                    fill='#4CAF50'
                  />
                  <path
                    d='M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
                    fill='#1976D2'
                  />
                </svg>
                <p className='flex-grow w-[345px] opacity-40 text-xs font-bold text-left text-[#121]'>Google</p>
              </div>
            </div>
          </div>
        </div>
        <img src={reviewImg} className='self-stretch flex-grow-0 flex-shrink-0 h-[200px] rounded-lg object-cover' />
      </div>
    </div>
  )
}

export default ReviewItem
