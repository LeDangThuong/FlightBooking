import React from 'react'
import logo from '../assets/icons/darkLogo.svg'
import { FaFacebookSquare, FaInstagram, FaTwitterSquare, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='max-w-full mx-auto py-16 px-16 grid lg:grid-cols-3 gap-8 text-gray-300 bg-[#8DD3BB]'>
      <div>
        <img src={logo} alt='Logo' className='rounded-lg my-4' />
        <div className='flex gap-4 md:w-[75%] my-6 text-[#112211]'>
          <FaFacebookSquare size={24} />
          <FaTwitterSquare size={24} />
          <FaYoutube size={24} />
          <FaInstagram size={24} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-4 text-[#112211]'>
        <div>
          <h6 className='font-medium '>Our Destinations</h6>
          <ul>
            <li className='py-2 text-sm'>Analytics</li>
            <li className='py-2 text-sm'>Marketing</li>
            <li className='py-2 text-sm'>Commerce</li>
            <li className='py-2 text-sm'>Insights</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium '>Our Activities</h6>
          <ul>
            <li className='py-2 text-sm'>Pricing</li>
            <li className='py-2 text-sm'>Documentation</li>
            <li className='py-2 text-sm'>Guides</li>
            <li className='py-2 text-sm'>API Status</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium '>Travel Blogs</h6>
          <ul>
            <li className='py-2 text-sm'>About</li>
            <li className='py-2 text-sm'>Blog</li>
            <li className='py-2 text-sm'>Jobs</li>
            <li className='py-2 text-sm'>Press</li>
            <li className='py-2 text-sm'>Careers</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium '>About Us</h6>
          <ul>
            <li className='py-2 text-sm'>Claim</li>
            <li className='py-2 text-sm'>Policy</li>
            <li className='py-2 text-sm'>Terms</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium '>Contact Us</h6>
          <ul>
            <li className='py-2 text-sm'>Claim</li>
            <li className='py-2 text-sm'>Policy</li>
            <li className='py-2 text-sm'>Terms</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
