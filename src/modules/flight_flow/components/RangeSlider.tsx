import React, { ChangeEvent, useState } from 'react'
import Slider from '@mui/material/Slider'
import 'rc-slider/assets/index.css'
import { styled } from '@mui/material'

interface DoubleRangeSliderProps {
  value: number[]
  onChange: (event: Event, value: number | number[], activeThumb: number) => void
}

export const DoubleRangeSlider: React.FC<DoubleRangeSliderProps> = ({ onChange, value }) => {
  return (
    <div>
      <div x-data='range()' className='relative max-w-xl w-full'>
        <div>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={onChange}
            valueLabelDisplay='auto'
            style={{
              color: '#52af77',
              width: '100%'
            }}
          />
        </div>
      </div>
    </div>
  )
}
