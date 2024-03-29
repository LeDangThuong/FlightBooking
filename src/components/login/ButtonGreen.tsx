import React, { FC } from 'react'

interface ButtonProp {
  title: string
  onClick: React.MouseEventHandler<HTMLDivElement>
}
export const ButtonGreen: FC<ButtonProp> = ({ title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='flex w-full cursor-pointer active:bg-[#9ABDB1] h-10 bg-[#8DD3BB] mt-4 rounded-lg justify-center items-center hover:bg-[#699D8B]'
    >
      <h1 className='text-base font-semibold'>{title}</h1>
    </div>
  )
}
