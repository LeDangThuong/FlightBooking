import React, { FC, ReactNode } from 'react'

interface ButtonIconProp {
  icon: ReactNode
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export const ButtonIcon: FC<ButtonIconProp> = ({ icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='flex aspect-video border justify-center items-center rounded-2xl border-[#8DD3BB] hover:bg-[#DFF3EC] cursor-pointer active:bg-[#9ABDB1]'
    >
      {icon}
    </div>
  )
}
