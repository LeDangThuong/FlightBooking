import React from 'react'
import OptionItem from './OptionItem'

const OptionSection = () => {
  return (
    <div className='flex flex-col lg:flex-row justify-center items-center gap-6 mt-20'>
      <OptionItem />
      <OptionItem />
    </div>
  )
}

export default OptionSection
