import React from 'react'
import logo from '../assets/icons/Logo.svg'
import flightIcon from '../assets/icons/airplane.svg'
import stayIcon from '../assets/icons/stays.svg'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header>
      <nav className='bg-black border-gray-200 dark:bg-gray-900'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  md:dark:bg-gray-900 '>
            <li>
              <Link
                to='#'
                className='flex flex-row gap-1 py-2 px-3 md:p-0 text-white  rounded hover:text-[#8DD3BB]'
                aria-current='page'
              >
                <img src={flightIcon} className='h-6 ' alt='Flight Booking Icon' />
                Find Flight
              </Link>
            </li>
            <li>
              <Link to='#' className='flex flex-row gap-1 py-2 px-3 md:p-0 text-white rounded hover:text-[#8DD3BB]'>
                <img src={stayIcon} className='h-6 ' alt='Find Stays Icon' />
                Find Stays
              </Link>
            </li>
          </ul>

          <div className='flex gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <Button variant='ghost' className='text-white'>
              Login
            </Button>
            <Button className='text-black bg-white hover:bg-[#8DD3BB] font-medium'>Sign Up</Button>
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
            <Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
              <img src={logo} className='h-8' alt='Flight Booking Logo' />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
