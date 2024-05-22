import React, { useState } from 'react'
import logo from '../../../assets/images/logo_vnairline.png'
import airplane from '../../../assets/svgs/airplane.svg'

interface FightTicket2Props {
  onClickChooseFlight?: () => void
}

export const FlightTicket2: React.FC<FightTicket2Props> = ({ onClickChooseFlight }) => {
  const [selectTab, setSelectTab] = useState<null | number>(null)

  const handleSelectTab = (tab: number) => {
    if (tab === selectTab) {
      setSelectTab(null)
      return
    }

    setSelectTab(tab)
  }

  return (
    <div
      className='flex justify-between items-center w-full h-fit  px-8 pt-4 pb-4 my-3 rounded-2xl bg-white '
      style={{ boxShadow: '0px 4px 16px 0 rgba(141,211,187,0.15)' }}
    >
      <img src={logo} alt='Logo' className='my-10' />
      <div className='grow'>
        <div className='flex flex-col gap-3'>
          <div className='flex w-full justify-between'>
            <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">Vietnam Airlines</div>
            <div className='w-fit h-[29px] justify-end items-center inline-flex'>
              <div className="text-right text-rose-400 text-2xl font-bold font-['Montserrat']">$104,00</div>
              <div className="text-right text-black text-sm font-normal font-['Montserrat']">/Passenger</div>
            </div>
          </div>

          <div className='w-full h-9  py-px justify-center items-center gap-[25px] flex '>
            <div className='text-center'>
              <span className="text-black text-sm font-semibold font-['Montserrat']">
                21:50
                <br />
              </span>
              <span className="text-zinc-500 text-sm font-semibold font-['Montserrat']">HAN</span>
            </div>

            <svg width='60' height='6' viewBox='0 0 39 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M5.66667 3C5.66667 1.52724 4.47276 0.333335 3 0.333335C1.52724 0.333335 0.333336 1.52724 0.333336 3C0.333336 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3ZM39 2.5L3 2.5L3 3.5L39 3.5L39 2.5Z'
                fill='black'
              />
            </svg>
            <img className='w-6 h-6' src={airplane} />

            <svg width='60' height='6' viewBox='0 0 39 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M38.6667 3C38.6667 1.52724 37.4728 0.333333 36 0.333333C34.5272 0.333333 33.3333 1.52724 33.3333 3C33.3333 4.47276 34.5272 5.66667 36 5.66667C37.4728 5.66667 38.6667 4.47276 38.6667 3ZM36 2.5L-2.18557e-08 2.5L2.18557e-08 3.5L36 3.5L36 2.5Z'
                fill='black'
              />
            </svg>
            <div className='text-center'>
              <span className="text-black text-sm font-semibold font-['Montserrat']">
                01:50
                <br />
              </span>
              <span className="text-zinc-500 text-sm font-semibold font-['Montserrat']">SGN</span>
            </div>
            <div className='opacity-40 w-fit flex'>
              <div className="text-neutral-900 text-sm font-medium font-['Montserrat'] w-fit">Total time: </div>
              <div className="text-neutral-900 text-sm font-bold font-['Montserrat'] w-fit">2h 28m</div>
            </div>
          </div>

          <div className='w-full h-[0.50px] opacity-25 bg-neutral-900' />

          <div className='flex gap-6'>
            <div
              className={
                selectTab !== null && selectTab !== 0
                  ? "opacity-40 text-black text-sm font-normal font-['Montserrat']"
                  : "text-black text-sm font-normal font-['Montserrat']"
              }
              onClick={() => handleSelectTab(0)}
            >
              Flight Details
            </div>
            <div
              className={
                selectTab !== null && selectTab !== 1
                  ? "opacity-40 text-black text-sm font-normal font-['Montserrat']"
                  : "text-black text-sm font-normal font-['Montserrat']"
              }
              onClick={() => handleSelectTab(1)}
            >
              Price & Benefits
            </div>
            <div
              className={
                selectTab !== null && selectTab !== 2
                  ? "opacity-40 text-black text-sm font-normal font-['Montserrat']"
                  : "text-black text-sm font-normal font-['Montserrat']"
              }
              onClick={() => handleSelectTab(2)}
            >
              Discounts
            </div>
          </div>

          <div
            className={
              selectTab !== null && selectTab === 0
                ? ' flex bg-stone-50 rounded-[14px] w-full h-full py-3 justify-center gap-3 '
                : ' hidden bg-stone-50 rounded-[14px] w-full h-full py-3 justify-center gap-3 '
            }
          >
            <div className='flex flex-col max-h-full justify-between'>
              <div className='flex flex-col items-end'>
                <div className="text-center text-black text-sm font-medium font-['Montserrat']">21:50</div>
                <div className="text-center text-black text-[10px] font-normal font-['Montserrat']">
                  Mon, 25 Nov 2024
                </div>
              </div>

              <div className='flex flex-col items-end'>
                <div className="text-center text-black text-[10px] font-normal font-['Montserrat']">2h 28m</div>
              </div>

              <div className='flex flex-col items-end'>
                <div className="text-center text-black text-sm font-medium font-['Montserrat']">21:50</div>
                <div className="text-center text-black text-[10px] font-normal font-['Montserrat']">
                  Mon, 25 Nov 2024
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <div className='w-1.5 h-1.5 bg-green-300 rounded-full' />
              <div className='grow max-h-full w-0.5 bg-green-300'></div>
              <div className='w-1.5 h-1.5 bg-green-300 rounded-full' />
            </div>

            <div className='flex flex-col gap-8'>
              <div className='flex flex-col items-start'>
                <div className="text-center text-black text-sm font-medium font-['Montserrat']">Ha Noi City</div>
                <div className="text-center text-black text-[10px] font-light font-['Montserrat']">Noi Bai Airport</div>
              </div>

              <div className='flex'>
                <div className='flex flex-col'>
                  <div className="text-neutral-900 text-xs font-medium font-['Montserrat']">Vietnam Airlines</div>
                  <div className='flex gap-5 justify-center items-center '>
                    <div className="text-neutral-900 text-[8px] font-light font-['Montserrat']">VN-775</div>
                    <div className='w-0.5 h-0.5 bg-black rounded-full' />
                    <div className="text-neutral-900 text-[8px] font-light font-['Montserrat']">Economy</div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-start'>
                <div className="text-center text-black text-sm font-medium font-['Montserrat']">Baggage 23Kg</div>
                <div className="text-center text-black text-[10px] font-light font-['Montserrat']">
                  Cabin baggage 1x12kg
                </div>
              </div>
              <div className='flex flex-col items-start'>
                <div className="text-center text-black text-sm font-medium font-['Montserrat']">Ho Chi Minh City</div>
                <div className="text-center text-black text-[10px] font-light font-['Montserrat']">
                  Tan Son Nhat Airport
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              selectTab !== null && selectTab === 1
                ? ' flex flex-col bg-stone-50 rounded-[14px] w-full h-full py-3 justify-center gap-3 px-10'
                : ' hidden bg-stone-50 rounded-[14px] w-full h-full py-3 justify-center gap-3 px-10'
            }
          >
            <div className="text-black text-xs font-medium font-['Montserrat']">Conditions</div>

            <div className='flex flex-col'>
              <div className='flex items-center gap-2 '>
                <img src={airplane} alt='' h-5 w-5 />
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">Have tea-break at middle</div>
              </div>
              <div className='flex items-center gap-2 '>
                <img src={airplane} alt='' h-5 w-5 />
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">Having promotions</div>
              </div>
              <div className='flex items-center gap-2 '>
                <img src={airplane} alt='' h-5 w-5 />
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">
                  Have insurance for delay Flight
                </div>
              </div>
              <div className='flex items-center gap-2 '>
                <img src={airplane} alt='' h-5 w-5 />
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">Have wifi on plane</div>
              </div>

              <div className='flex items-center gap-2 '>
                <img src={airplane} alt='' h-5 w-5 />
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">Without Power & USB port</div>
              </div>
            </div>

            <div className='w-full h-[0px] border border-zinc-500'></div>

            <div className="text-black text-xs font-medium font-['Montserrat']">Baggage Prices (Per Pax)</div>

            <div className='flex flex-col gap-1'>
              <div className='flex justify-between'>
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">Cabin baggage 7kg</div>
                <div className=" text-zinc-500 text-xs font-medium font-['Montserrat']">Free</div>
              </div>
              <div className='flex justify-between'>
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">+20 kg baggage </div>
                <div className=" text-zinc-500 text-xs font-medium font-['Montserrat']">20$</div>
              </div>
              <div className='flex justify-between'>
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">+30 kg baggage </div>
                <div className=" text-zinc-500 text-xs font-medium font-['Montserrat']">40$</div>
              </div>
              <div className='flex justify-between'>
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">+40 kg baggage </div>
                <div className=" text-zinc-500 text-xs font-medium font-['Montserrat']">60$</div>
              </div>
            </div>
            <div className='w-full h-[0px] border border-zinc-500'></div>
            <div className="text-black text-xs font-medium font-['Montserrat']">Price Details</div>

            <div className='flex flex-col gap-1'>
              <div className='flex justify-between'>
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">Adult Basic Fare </div>
                <div className=" text-zinc-500 text-xs font-medium font-['Montserrat']">104$</div>
              </div>
              <div className='flex justify-between'>
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">Taxt</div>
                <div className=" text-zinc-500 text-xs font-medium font-['Montserrat']">Included</div>
              </div>

              <div className='w-full h-[0px] border border-zinc-200'></div>

              <div className='flex justify-between'>
                <div className="text-zinc-500 text-xs font-medium font-['Montserrat']">Total pay</div>
                <div className=" text-zinc-500 text-xs font-medium font-['Montserrat']">104$</div>
              </div>
            </div>
          </div>

          <div className='flex justify-end gap-3'>
            <div className='w-10 h-10 px-2 py-2 rounded border border-green-300 justify-center items-center gap-1 inline-flex'>
              <svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M13.7863 3.625C11.2504 3.625 10.0004 6.125 10.0004 6.125C10.0004 6.125 8.7504 3.625 6.21446 3.625C4.15352 3.625 2.52149 5.34922 2.5004 7.40664C2.45743 11.6773 5.88829 14.7145 9.64884 17.2668C9.75251 17.3373 9.87501 17.3751 10.0004 17.3751C10.1258 17.3751 10.2483 17.3373 10.352 17.2668C14.1121 14.7145 17.543 11.6773 17.5004 7.40664C17.4793 5.34922 15.8473 3.625 13.7863 3.625V3.625Z'
                  stroke='#4C4850'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </div>

            <div
              className='w-[159px] h-10 flex-col justify-start items-start gap-2.5 inline-flex'
              onClick={onClickChooseFlight}
            >
              <div className='self-stretch h-12 px-4 py-2 bg-green-300 rounded justify-center items-center gap-1 inline-flex'>
                <div className="text-neutral-900 text-sm font-semibold font-['Montserrat']">Choose Flight</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
