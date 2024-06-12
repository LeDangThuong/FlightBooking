import React, { ChangeEvent, useState } from 'react'
import Logo from '../../../assets/svgs/Logo.svg'

import { Slides } from '@/modules/auth/components/Slides'
import { Input } from '@/modules/auth/components/Input'
import { ButtonGreen } from '@/modules/auth/components/ButtonGreen'
import { ButtonIcon } from '@/modules/auth/components/ButtonIcon'
import { getUserByUsername, login } from '@/services/UserService'
import { useNavigate } from 'react-router-dom'
import { CircleLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '@/redux/slice/userSlice'
import { getTicketByUserId } from '@/services/BookingService'
import { setHistoryBookings } from '@/redux/slice/bookingSlice'

export const Login = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handlerUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlerPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  async function handleLogin() {
    setIsLoading(true)
    try {
      console.log(username, password)
      const token = await login(username, password)

      if (token) {
        const isLoggedIn = localStorage.getItem('token')

        const role = localStorage.getItem('role')

        const user = await getUserByUsername(username)
        //const historyBooking = await getTicketByUserId(user.id)

        console.log(user)

        dispatch(setCurrentUser(user))
        // dispatch(setHistoryBookings(historyBooking))

        if (!isLoggedIn) {
          navigate('/home')
        }
      }
    } catch (error) {
      console.log('Đăng nhập thất bại', error)
    }
    setIsLoading(false)
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  const handlerResetPassword = () => {
    navigate('/forgot-password')
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
          </div>
          <h1 className='text-[30px] font-bold mb-2'>Login</h1>
          <h3 className='font-thin mb-4'>Login to access your account!</h3>

          <Input id='email' type='text' title='Email' onChange={handlerUsername} />
          <Input id='password' type='password' title='Password' onChange={handlerPassword} />

          <div className='flex justify-center items-center'>
            <div className='flex grow'>
              <input type='checkbox' className='cursor-pointer' />
              <h3 className='font-semibold ml-2 text-xs justify-center'>Remember me</h3>
            </div>

            <h3 onClick={handlerResetPassword} className=' font-normal ml-2 text-xs text-[#FA837F] cursor-pointer'>
              Forgot password
            </h3>
          </div>

          <ButtonGreen
            title='Login'
            onClick={() => {
              handleLogin()
            }}
          />

          <div className='flex justify-center items-center mt-3'>
            <h1 className='text-sm font-normal mr-2'>Don't have an account?</h1>
            <h1 onClick={handleSignup} className='text-[14px] font-semibold text-[#FA837F] cursor-pointer '>
              Sign up
            </h1>
          </div>

          <div className='flex mt-5'>
            <div className='border-t-2 grow mt-3'></div>
            <h1 className='ml-3 mr-3 text-gray-400 text-[14px]'>Or login with</h1>
            <div className='border-t-2 grow mt-3'></div>
          </div>

          <div className='grid grid-cols-3 gap-2 mt-5'>
            <ButtonIcon
              icon={
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M24 12.0733C24 5.40546 18.6274 0 12 0C5.37262 0 0 5.40536 0 12.0733C0 18.0994 4.38825 23.0943 10.125 24V15.5633H7.07812V12.0733H10.125V9.41343C10.125 6.38755 11.9166 4.71615 14.6575 4.71615C15.9705 4.71615 17.3438 4.95195 17.3438 4.95195V7.92313H15.8306C14.3398 7.92313 13.875 8.85381 13.875 9.80864V12.0733H17.2031L16.6711 15.5633H13.875V24C19.6117 23.0943 24 18.0995 24 12.0733Z'
                    fill='#1877F2'
                  />
                </svg>
              }
              onClick={() => {}}
            />

            <ButtonIcon
              icon={
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
                    fill='#FFC107'
                  />
                  <path
                    d='M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z'
                    fill='#FF3D00'
                  />
                  <path
                    d='M12 22.0003C14.583 22.0003 16.93 21.0118 18.7045 19.4043L15.6095 16.7853C14.5718 17.5745 13.3038 18.0014 12 18.0003C9.39903 18.0003 7.19053 16.3418 6.35853 14.0273L3.09753 16.5398C4.75253 19.7783 8.11353 22.0003 12 22.0003Z'
                    fill='#4CAF50'
                  />
                  <path
                    d='M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
                    fill='#1976D2'
                  />
                </svg>
              }
              onClick={() => {}}
            />

            <ButtonIcon
              icon={
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M17.5172 12.5555C17.5078 10.957 18.232 9.75234 19.6945 8.86406C18.8766 7.69219 17.6391 7.04766 16.0078 6.92344C14.4633 6.80156 12.7734 7.82344 12.1547 7.82344C11.5008 7.82344 10.0055 6.96563 8.82891 6.96563C6.40078 7.00313 3.82031 8.90156 3.82031 12.7641C3.82031 13.9055 4.02891 15.0844 4.44609 16.2984C5.00391 17.8969 7.01484 21.8133 9.1125 21.75C10.2094 21.7242 10.9852 20.9719 12.4125 20.9719C13.7977 20.9719 14.5148 21.75 15.7383 21.75C17.8547 21.7195 19.6734 18.1594 20.2031 16.5563C17.3648 15.218 17.5172 12.6375 17.5172 12.5555ZM15.0539 5.40703C16.2422 3.99609 16.1344 2.71172 16.0992 2.25C15.0492 2.31094 13.8352 2.96484 13.1437 3.76875C12.382 4.63125 11.9344 5.69766 12.0305 6.9C13.1648 6.98672 14.2008 6.40313 15.0539 5.40703Z'
                    fill='black'
                  />
                </svg>
              }
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      <Slides slides={slides} currentIndex={currentIndex} prevSlide={prevSlide} nextSlide={nextSlide} />
    </div>
  )
}
