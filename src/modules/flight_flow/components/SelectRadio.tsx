import React, { FC } from 'react'

interface SelectRadioProps {
  name: string
  value: string
  title: string
  content: string
  selected: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const SelectRadio: FC<SelectRadioProps> = ({ selected, onChange, onClick, name, value, title, content }) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between w-full py-2 px-4 rounded-xl  ${selected === value ? 'bg-[#8DD3BB]' : ''}`}
    >
      <div className='flex flex-col '>
        <div className=" text-neutral-900 text-base font-bold font-['TradeGothic LT Extended']">{title}</div>
        <div className=" text-neutral-900 text-sm font-normal font-['Montserrat']">{content}</div>
      </div>
      <div className='flex flex-col justify-center mx-4'>
        <input name={name} value={value} type='radio' className='h-4 w-4' onChange={onChange} />
      </div>
    </div>
  )
}
