import { FC } from 'react'

interface SeatChoosexProps {
  code: String
  selected: boolean
  inavailable?: boolean
}

export const SeatChoose: FC<SeatChoosexProps> = ({ code, selected, inavailable }) => {
  return (
    <div
      className={
        inavailable !== null && inavailable
          ? 'h-8 w-8 bg-gray-800 text-gray-200 cursor-not-allowed shadow-2xl rounded-sm flex justify-center items-center my-2 mx-2'
          : selected
            ? 'h-8 w-8 bg-green-500 text-gray-200 shadow-2xl rounded-sm flex justify-center items-center my-2 mx-2'
            : 'h-8 w-8 bg-gray-200 text-gray-200 hover:bg-gray-500 hover:text-white rounded-sm flex justify-center items-center my-2 mx-2'
      }
    >
      <div>{code}</div>
    </div>
  )
}
