import React, { useState } from 'react'
import Logo from '../../../assets/svgs/Logo.svg'
import { FaAngleLeft } from 'react-icons/fa6'
import { Input } from '@/modules/auth/components/Input'
import { ButtonGreen } from '@/modules/auth/components/ButtonGreen'
import { Slides } from '@/modules/auth/components/Slides'
import { CircleLoader } from 'react-spinners'
import { resetPassword } from '@/services/UserService'
import { useNavigate } from 'react-router-dom'

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

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleResetPassword = async () => {
    try {
      setIsLoading(true)
      const codeOTP = parseInt(localStorage.getItem('codeOTP')!)
      const email = localStorage.getItem('email')
      const success = await resetPassword(codeOTP, email!, newPassword, confirmPassword)
      setIsLoading(false)
      if (success) {
        navigate('/')
      }
    } catch (error) {
      console.log('🚀 ~ file: SetPassword.tsx:handleResetPassword ~ error')
    }
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
          <h1 className='text-[30px] font-bold mb-2'>Set a password</h1>
          <h3 className='font-thin mb-4'>
            Your previous password has been reseted. Please set a new password for your account.
          </h3>

          <Input
            id='createpassword'
            type='password'
            title='Create password'
            className='my-5'
            onChange={handleNewPassword}
          />
          <Input
            id='reenterpassword'
            type='password'
            title='Re-enter password'
            className='my-5'
            onChange={handleConfirmPassword}
          />

          <ButtonGreen title='Set password' onClick={handleResetPassword} />
        </div>
      </div>
      <Slides slides={slides} currentIndex={currentIndex} prevSlide={prevSlide} nextSlide={nextSlide} />
    </div>
  )
}
