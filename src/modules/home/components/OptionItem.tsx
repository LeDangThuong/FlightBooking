import React from 'react'
import { Button } from '@/components/ui/button'
import optionImg from '@/assets/images/landing_background.png'

const OptionItem = () => {
  return (
    <div className='w-full h-[559px] relative' style={{ filter: 'drop-shadow(0px 4px 16px rgba(17,34,17,0.05))' }}>
      <img src={optionImg} className='w-full h-[559px] absolute left-0 top-0 rounded-2xl object-cover' />
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-black'></div>
      <div className='absolute inset-x-0 bottom-0 transform -translate-y-1/2'>
        <div className='flex flex-col justify-start items-center gap-4 h-full px-6'>
          <div className='flex flex-col justify-start items-center gap-2'>
            <p className='text-4xl font-bold text-center text-white'>Flights</p>
            <p className='text-base text-center text-white'>
              Search Flights &amp; Places Hire to our most popular destinations
            </p>
          </div>
          <Button className='rounded bg-[#8DD3BB]  text-[#112211] hover:opacity-85 gap-1'>
            <svg
              width={17}
              height={16}
              viewBox='0 0 17 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='flex-grow-0 flex-shrink-0 w-4 h-4 relative'
              preserveAspectRatio='xMidYMid meet'
            >
              <path
                d='M9.96858 14.9998H9.99983C10.1543 15.0007 10.3054 14.9551 10.4336 14.8689C10.5618 14.7827 10.6611 14.66 10.7186 14.5167L10.6967 14.5084L10.6967 14.5081C10.641 14.647 10.5447 14.766 10.4205 14.8495C10.2962 14.933 10.1497 14.9772 9.99996 14.9763H9.99983H9.9691M9.96858 14.9998L9.96963 14.9764C9.96945 14.9764 9.96928 14.9764 9.9691 14.9763M9.96858 14.9998V14.9763H9.9691M9.96858 14.9998L9.9691 14.9763M9.9691 14.9763C9.67379 14.9629 9.42874 14.7655 9.33168 14.4843L9.33151 14.4839C9.32949 14.4784 9.32777 14.4732 9.32603 14.4674L9.32617 14.4674L9.32513 14.465L7.49283 10.173C7.46895 10.0936 7.4662 10.0093 7.48487 9.92852C7.50363 9.84732 7.54336 9.77245 7.6001 9.71139L9.9691 14.9763ZM15.2645 1.23664C15.3636 1.33611 15.4317 1.46215 15.4607 1.59953C15.4896 1.73691 15.4781 1.87973 15.4276 2.01073L15.4276 2.01086L10.6968 14.5079L7.60012 9.71137L14.0164 2.82886C14.0165 2.82876 14.0166 2.82866 14.0167 2.82857C14.0393 2.80593 14.0572 2.77909 14.0694 2.74957C14.0817 2.71991 14.088 2.68813 14.088 2.65604C14.088 2.62394 14.0817 2.59216 14.0694 2.56251C14.0571 2.53285 14.0391 2.50591 14.0164 2.48321C13.9937 2.46052 13.9668 2.44251 13.9371 2.43023C13.9075 2.41795 13.8757 2.41163 13.8436 2.41163C13.8115 2.41163 13.7797 2.41795 13.75 2.43023C13.7205 2.44246 13.6937 2.46036 13.6711 2.48291C13.671 2.48301 13.6709 2.48311 13.6708 2.48321L6.78512 8.89918C6.72406 8.95593 6.64918 8.99567 6.56797 9.01443C6.48716 9.0331 6.40288 9.03035 6.32347 9.00648L2.03403 7.17479L2.03408 7.17469L2.03191 7.17401L2.01945 7.17006C2.01939 7.17004 2.01933 7.17002 2.01927 7.17C1.87747 7.12251 1.75378 7.03243 1.66507 6.91204C1.57633 6.7916 1.52693 6.6467 1.52362 6.49713C1.5203 6.34756 1.56324 6.20062 1.64657 6.07637C1.72872 5.95387 1.84617 5.85932 1.98327 5.80522V5.8061L1.99156 5.80296L14.4925 1.07139L14.4925 1.07138C14.6235 1.02159 14.766 1.0107 14.9029 1.04003C15.0399 1.06935 15.1654 1.13763 15.2645 1.23664ZM15.2645 1.23664C15.2645 1.23665 15.2645 1.23666 15.2645 1.23667L15.2811 1.2201L15.2645 1.23664Z'
                fill='black'
                stroke='#112211'
                stroke-width='0.046875'
              />
            </svg>
            <p>Show Flights</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OptionItem
