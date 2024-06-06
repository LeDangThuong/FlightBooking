import React, { ChangeEvent, useState } from 'react'
import Logo from '../../../assets/svgs/Logo.svg'
import { FaAngleLeft } from 'react-icons/fa6'
import { Input } from '@/modules/auth/components/Input'
import { ButtonGreen } from '@/modules/auth/components/ButtonGreen'
import { ButtonIcon } from '@/modules/auth/components/ButtonIcon'
import { Slides } from '@/modules/auth/components/Slides'
import { verifyCode } from '@/services/UserService'
import { useNavigate } from 'react-router-dom'
import { CircleLoader } from 'react-spinners'

export const VerifyCode = () => {
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
  const [isLoading, setIsLoading] = useState(false)
  const [codeOTP, setCodeOTP] = useState<number>()
  const navigate = useNavigate()

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

  const handlerVerifyCode = async () => {
    setIsLoading(true)
    try {
      const email = localStorage.getItem('email')
      const success = await verifyCode(codeOTP!, email!)
      setIsLoading(false)
      if (success) {
        navigate('/reset-password')
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleCodeOTP = (event: ChangeEvent<HTMLInputElement>) => {
    setCodeOTP(parseInt(event.target.value))
  }

  return (
    <div className='flex'>
      {isLoading && (
        <div className='overlay'>
          <CircleLoader color={'#36D7B7'} loading={isLoading} size={150} />
        </div>
      )}
      <div className=' flex flex-1 h-screen w-full justify-center items-center '>
        <div className='w-full pr-10 pl-10 xl:pr-40 xl:pl-40 md:pr-30 md:pl-30'>
          <div className='mb-3'>
            <img src={Logo} alt='Logo' className='my-10' />
            <div className='flex my-3 items-center'>
              <FaAngleLeft size={18} />
              <h1 className='mx-1'>Back to login</h1>
            </div>
          </div>
          <h1 className='text-[30px] font-bold mb-2'>Verify code</h1>
          <h3 className='font-thin mb-4'>An authentication code has been sent to your email (Code with 6 digits).</h3>

          <Input id='code' type='text' title='Enter code' className='my-5' onChange={handleCodeOTP} />

          <div className='flex justify-center items-center mb-6'>
            <div className='flex grow'>
              <h3 className='font-semibold ml-2 text-xs justify-center'>Didn't receive a code? </h3>
              <h3 className=' font-normal ml-2 text-xs text-[#FA837F] cursor-pointer'>Resend</h3>
            </div>
          </div>

          <ButtonGreen title='Verify' onClick={handlerVerifyCode} />
        </div>
      </div>

      <Slides slides={slides} currentIndex={currentIndex} prevSlide={prevSlide} nextSlide={nextSlide} />
    </div>
  )
}
