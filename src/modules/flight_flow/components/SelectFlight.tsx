import { FC } from 'react'
import arrow from '../../../assets/svgs/arrow.svg'
import logo from '../../../assets/images/logo_vnairline.png'
import exit from '../../../assets/svgs/exit.svg'
import airplane from '../../../assets/svgs/airplane.svg'

interface SelectFlightProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const SelectFlight: FC<SelectFlightProps> = ({ onClick }) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='h-2'></div>

      <div className='w-full h-[0px] border border-zinc-500/opacity-50'></div>
      <div className='h-2'></div>

      <div className='flex '>
        <div className='w-[35px] h-[35px] bg-green-300 rounded-[10px] flex justify-center items-center'>
          <div className="text-white text-sm font-medium font-['Montserrat']">1</div>
        </div>

        <div className='w-2'></div>

        <div className='flex flex-col items-start justify-center'>
          <div className="text-zinc-500 text-[10px] font-medium font-['Montserrat']">Sun, 07 November 2024</div>

          <div className='flex justify-center  items-center '>
            <div className="text-center text-black text-[10px] font-semibold font-['Montserrat']">SGN</div>
            <div className='w-2'></div>
            <img className='w-6 h-6' src={arrow} />
            <div className='w-2'></div>
            <div className="text-center text-black text-[10px] font-semibold font-['Montserrat']">HAN</div>
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center w-full'>
        <img className='w-25 h-20' src={logo} />
        <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">Vietnam Airlines</div>
        <div className='w-[17px] h-[17px] rounded-xl border border-green-300 flex-col justify-center items-center gap-[13px] inline-flex'>
          <div className='h-12 py-2 rounded justify-center items-center gap-1 inline-flex'>
            <img className='w-6 h-6' src={exit} />
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center w-full'>
        <div className='flex flex-col'>
          <div className='text-center'>
            <span className="text-black text-sm font-semibold font-['Montserrat']">
              21:50
              <br />
            </span>
            <span className="text-zinc-500 text-sm font-semibold font-['Montserrat']">SGN</span>
          </div>
        </div>

        <svg width='39' height='6' viewBox='0 0 39 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M5.66667 3C5.66667 1.52724 4.47276 0.333335 3 0.333335C1.52724 0.333335 0.333336 1.52724 0.333336 3C0.333336 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3ZM39 2.5L3 2.5L3 3.5L39 3.5L39 2.5Z'
            fill='black'
          />
        </svg>
        <img className='w-6 h-6' src={airplane} />

        <svg width='39' height='6' viewBox='0 0 39 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M38.6667 3C38.6667 1.52724 37.4728 0.333333 36 0.333333C34.5272 0.333333 33.3333 1.52724 33.3333 3C33.3333 4.47276 34.5272 5.66667 36 5.66667C37.4728 5.66667 38.6667 4.47276 38.6667 3ZM36 2.5L-2.18557e-08 2.5L2.18557e-08 3.5L36 3.5L36 2.5Z'
            fill='black'
          />
        </svg>

        <div className='flex flex-col'>
          <div className='text-center'>
            <span className="text-black text-sm font-semibold font-['Montserrat']">
              21:50
              <br />
            </span>
            <span className="text-zinc-500 text-sm font-semibold font-['Montserrat']">SGN</span>
          </div>
        </div>
      </div>

      <div className='flex w-full justify-center items-center  '>
        <div className='w-[170px] h-8 px-4 py-2 bg-green-300 rounded-[19px] justify-center items-center gap-1 inline-flex'>
          <div className="text-white text-sm font-semibold font-['Montserrat']">Change departure</div>
        </div>
      </div>

      <div className='h-2'></div>
    </div>
  )
}
