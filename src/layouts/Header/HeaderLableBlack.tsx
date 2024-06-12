import React from 'react'
import logo from '../../assets/svgs/Logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { twMerge } from 'tailwind-merge'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import defaultAvatar from '../../assets/images/default_avatar.jpg'

interface HeaderProps {
  className?: string
}

const HeaderLableBlack = ({ className }: HeaderProps) => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  const handleUser = () => {
    navigate('/profile')
  }

  const handleToHome = () => {
    navigate('/home')
  }

  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  return (
    <header>
      <nav className={twMerge('bg-white border-gray-200 w-full shadow ', className)}>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   '>
            <li>
              <Link
                to='#'
                className='flex flex-row items-center gap-2 py-2 px-3 md:p-0 text-black  rounded hover:text-[#8DD3BB]'
                aria-current='page'
              >
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M8.74733 21.75H7.49952C7.37414 21.75 7.25077 21.7185 7.14069 21.6585C7.03062 21.5984 6.93735 21.5118 6.86941 21.4064C6.80147 21.301 6.76104 21.1803 6.7518 21.0552C6.74257 20.9302 6.76483 20.8048 6.81655 20.6906L9.83811 14.0227L5.30108 13.9219L3.64639 15.9267C3.33092 16.3233 3.07921 16.5 2.43702 16.5H1.59702C1.46402 16.5043 1.33195 16.4764 1.212 16.4188C1.09205 16.3612 0.987757 16.2755 0.907956 16.1691C0.796393 16.0186 0.686706 15.7636 0.793581 15.3998L1.72264 12.0717C1.72967 12.0469 1.73811 12.022 1.74749 11.9977C1.74795 11.9953 1.74795 11.9929 1.74749 11.9906C1.73781 11.9663 1.72951 11.9414 1.72264 11.9161L0.792643 8.56687C0.691862 8.21016 0.802018 7.96078 0.912643 7.81406C0.986929 7.71549 1.08331 7.63573 1.19403 7.58118C1.30475 7.52664 1.42672 7.49883 1.55014 7.5H2.43702C2.91655 7.5 3.38202 7.71516 3.65577 8.0625L5.27624 10.0336L9.83811 9.96609L6.81749 3.30984C6.7657 3.19568 6.74335 3.07036 6.75249 2.94533C6.76163 2.8203 6.80196 2.69956 6.8698 2.59414C6.93764 2.48872 7.03082 2.40198 7.14083 2.34186C7.25083 2.28175 7.37416 2.25016 7.49952 2.25H8.76092C8.9369 2.25354 9.10983 2.29667 9.26685 2.3762C9.42388 2.45572 9.56097 2.5696 9.66796 2.70937L15.5297 9.83438L18.2376 9.76312C18.4359 9.75234 18.9853 9.74859 19.1123 9.74859C21.7026 9.75 23.2495 10.5909 23.2495 12C23.2495 12.4434 23.0723 13.2656 21.8869 13.7887C21.187 14.0981 20.2533 14.2547 19.1114 14.2547C18.9858 14.2547 18.4378 14.2509 18.2367 14.2402L15.5292 14.168L9.65296 21.293C9.54588 21.4321 9.40891 21.5454 9.25216 21.6246C9.0954 21.7037 8.92288 21.7465 8.74733 21.75Z'
                    fill='currentColor'
                  />
                </svg>
                Find Flight
              </Link>
            </li>
          </ul>

          <div className='flex gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center'>
            {/* <Button  className='text-white hover:text-[#8DD3BB] font-semibold'>Login</Button> */}
            <Button onClick={handleSignOut} className='text-black bg-white hover:bg-[#8DD3BB] font-semibold'>
              Sign Out
            </Button>

            <div className='w-[45px] h-[45px] rounded-full bg-[#8DD3BB]' onClick={handleUser}>
              <img
                className='w-full h-full rounded-full'
                src={currentUser?.avatarUrl ?? defaultAvatar}
                alt={currentUser?.fullName}
              />
            </div>

            <div onClick={handleUser} className="text-black text-sm font-semibold font-['Montserrat']">
              {currentUser?.fullName}
            </div>
            <Button
              data-collapse-toggle='navbar-cta'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-cta'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </Button>
          </div>
          <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-cta'>
            <Link to='/home' className='flex items-center space-x-3 rtl:space-x-reverse'>
              <img src={logo} className='h-8' alt='Flight Booking Logo' />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderLableBlack
