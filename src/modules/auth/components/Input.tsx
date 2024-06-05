import React, { ChangeEvent, FC } from 'react'

interface InputProp {
  title: string
  type: string
  id: string
  className?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProp> = ({ id, title, type, className, onChange }) => {
  return (
    <div className={`relative mb-3 ${className}`}>
      <input
        onChange={onChange}
        type={type}
        id={id}
        className='border border-gray-400 w-full h-10 rounded-md focus:border-blue-500 px-3'
      ></input>
      <span className='text-xs absolute text-opacity-35 left-0 top-[10px] mx-1 px-2 transition duration-200 input-text'>
        {title}
      </span>
    </div>
  )
}
