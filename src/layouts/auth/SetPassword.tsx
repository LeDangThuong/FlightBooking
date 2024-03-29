import React, { useState } from 'react'
import Logo from '../../assets/svgs/Logo.svg'
import { FaAngleLeft } from 'react-icons/fa6'
import { Input } from '@/components/login/Input'
import { ButtonGreen } from '@/components/login/ButtonGreen'
import { Slides } from '@/components/login/Slides'

export const SetPassword = () => {
  const slides = [
    {
      url: 'https://www.usatoday.com/gcdn/presto/2019/06/23/USAT/c3a9f051-bd6c-4b39-b5b9-38244deec783-GettyImages-932651818.jpg'
    },
    {
      url: 'https://file1.dangcongsan.vn/data/3/images/2024/01/24/upload_682/du3.jpg'
    },
    {
      url: 'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2022/10/kris-plus-travel-hacks-singapore.jpg'
    },
    {
      url: 'https://vietworldtravel.vn/wp-content/uploads/2022/04/malaysia-kuala.jpg'
    },
    {
      url: 'https://media.cntraveler.com/photos/61a92be2860c006c27c59e74/1:1/w_2000,h_2000,c_limit/Little%20Palm%20Island%20Resort%20&%20Spa_SAMMY%20Pool.jpg'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1

    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1

    setCurrentIndex(newIndex)
  }

  return (
    <div className='flex'>
      {' '}
      <div className=' flex flex-1 h-screen w-full justify-center items-center '>
        <div className='w-full pr-10 pl-10 xl:pr-40 xl:pl-40 md:pr-30 md:pl-30'>
          <div className='mb-3'>
            <img src={Logo} alt='Logo' className='my-10' />
            <div className='flex my-3 items-center'>
              <FaAngleLeft size={18} />
              <h1 className='mx-1'>Back to login</h1>
            </div>
          </div>
          <h1 className='text-[30px] font-bold mb-2'>Set a password</h1>
          <h3 className='font-thin mb-4'>
            Your previous password has been reseted. Please set a new password for your account.
          </h3>

          <Input id='createpassword' type='password' title='Create password' className='my-5' />
          <Input id='reenterpassword' type='password' title='Re-enter password' className='my-5' />

          <ButtonGreen title='Set password' onClick={() => {}} />
        </div>
      </div>
      <Slides slides={slides} currentIndex={currentIndex} prevSlide={prevSlide} nextSlide={nextSlide} />
    </div>
  )
}
