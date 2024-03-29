import React, { FC } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'

interface Slide {
  url: string
}
interface SlideProp {
  slides: Slide[]
  currentIndex: number
  prevSlide: React.MouseEventHandler<HTMLDivElement>
  nextSlide: React.MouseEventHandler<HTMLDivElement>
}

export const Slides: FC<SlideProp> = ({ slides, currentIndex, prevSlide, nextSlide }) => {
  return (
    <div className='md:block hidden flex-1  min-h-screen rounded-3xl relative group transform '>
      <img
        src={slides[currentIndex].url}
        alt='Overview'
        className='h-full object-cover rounded-3xl transform duration-500 '
      />

      <div
        onClick={prevSlide}
        className='hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-4 rounded-full bg-[#DFF3EC] p-1 cursor-pointer duration-500 '
      >
        <BsChevronCompactLeft size={25} />
      </div>

      <div
        onClick={nextSlide}
        className='hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-4 rounded-full bg-[#DFF3EC] p-1 cursor-pointer duration-500 '
      >
        <BsChevronCompactRight size={25} />
      </div>

      <div className='absolute bottom-4 left-[45%] flex gap-2 '>
        {slides.map((slide, indexSlide) => {
          if (currentIndex === indexSlide) return <div className='h-2 w-4 bg-[#8DD3BB] rounded-2xl'></div>
          return <div className='h-2 w-2 bg-white rounded-2xl'></div>
        })}
      </div>
    </div>
  )
}
