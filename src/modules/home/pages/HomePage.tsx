import React from 'react'
import backgroundImage from '@/assets/images/landing_background.png'
import LocationList from '../components/LocationList'
import ReviewList from '../components/ReviewList'
import OptionSection from '../components/OptionSection'
import SearchBar from '../components/SearchBar'

const HomePage = () => {
  return (
    <div className='bg-white min-h-screen flex flex-col text-white mb-80 w-full'>
      <div className='relative h-[600px] mb-20'>
        <img className='w-full h-full rounded-lg object-cover' src={backgroundImage} alt='background' />
        <div className='absolute inset-0 bg-gradient-to-b from-black to-transparent'></div>
        <p className='absolute top-44 w-full text-center'>
          <div className='flex flex-col justify-start items-center gap-4'>
            <div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1'>
              <p className='flex-grow-0 flex-shrink-0 text-[45px] font-bold text-center text-white'>Helping Others</p>
              <p className='flex-grow-0 flex-shrink-0 text-[80px] font-bold text-center uppercase text-white'>
                Live &amp; Travel
              </p>
            </div>
            <p className='flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-white'>
              Special offers to suit your plan
            </p>
          </div>
        </p>
      </div>
      <div className='mx-32'>
        <SearchBar />

        <OptionSection />
        <ReviewList />
      </div>
    </div>
  )
}

export default HomePage
