import { FC } from 'react'

interface SeatCodeProps {
  code: String
}

export const SeatCode: FC<SeatCodeProps> = ({ code }) => {
  return (
    <div className='h-8 w-8 bg-gray-600 rounded-sm flex justify-center items-center my-2 mx-2'>
      <div>{code}</div>
    </div>
  )
}
