import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button, buttonVariants } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { Passenger } from '@/models/Passenger'

interface FormInformationProps {
  passenger: Passenger
  index: number
  onPassengerChange: (index: number, passenger: Passenger) => void
}

export const FormInformation: React.FC<FormInformationProps> = ({ passenger, index, onPassengerChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onPassengerChange(index, { ...passenger, [name]: value } as Passenger)
  }

  const [selectGender, setSelectGender] = useState<String>('')
  const [date, setDate] = useState<Date | undefined>(new Date())

  const [showSelectGender, setShowSelectGender] = useState<Boolean>(false)
  const genders = ['Male', 'Female']

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
        <div className='w-[200px] h-11 bg-white rounded border border-zinc-500 flex-col justify-start items-start gap-2.5 inline-flex relative '>
          <div className="bg-[#FAFBFC] text-zinc-900 text-sm font-normal font-['Montserrat'] absolute top-[-10px] start-4 px-1 flex">
            Full name <div className="text-red-500 text-sm font-normal font-['Montserrat'] ps-1">*</div>
          </div>
          <input
            type='text'
            name='fullName'
            value={passenger.fullName === undefined ? '' : passenger.fullName}
            onChange={handleChange}
            className='h-full w-full px-4 py-2 rounded border border-zinc-500 text-black'
          />
        </div>

        <div className='w-[200px] h-11 bg-white rounded border border-zinc-500 flex-col justify-start items-start gap-2.5 inline-flex relative '>
          <div className="bg-[#FAFBFC] text-zinc-900 text-sm font-normal font-['Montserrat'] absolute top-[-10px] start-4 px-1 flex">
            Email <div className="text-red-500 text-sm font-normal font-['Montserrat'] ps-1">*</div>
          </div>
          <input
            type='email'
            name='email'
            value={passenger.email}
            onChange={handleChange}
            className='h-full w-full px-4 py-2 rounded border border-zinc-500 text-black'
          />
        </div>

        <div className='w-[200px] h-11 bg-white rounded border border-zinc-500 flex-col justify-start items-start gap-2.5 inline-flex relative '>
          <div className="bg-[#FAFBFC] text-zinc-900 text-sm font-normal font-['Montserrat'] absolute top-[-10px] start-4 px-1 flex">
            Personal ID <div className="text-red-500 text-sm font-normal font-['Montserrat'] ps-1">*</div>
          </div>
          <input
            type='id'
            name='personalId'
            value={passenger.personalId}
            onChange={handleChange}
            className='h-full w-full px-4 py-2 rounded border border-zinc-500 text-black'
          />
        </div>
      </div>

      <div className='flex gap-2'>
        <div className='w-[200px] h-11 bg-white rounded border border-zinc-500 flex-col justify-start items-start gap-2.5 inline-flex relative '>
          <div className="bg-[#FAFBFC] text-zinc-900 text-sm font-normal font-['Montserrat'] absolute top-[-10px] start-4 px-1 flex">
            Gender <div className="text-red-500 text-sm font-normal font-['Montserrat'] ps-1">*</div>
          </div>

          <div
            className='flex justify-between items-center h-full w-full '
            onClick={() => setShowSelectGender(!showSelectGender)}
          >
            {selectGender !== '' ? (
              <div className='h-full w-full flex   justify-start items-center text-sm  px-4 text-black '>
                <div>{selectGender}</div>
              </div>
            ) : (
              <div className='h-full w-full flex  justify-center items-center text-sm  text-black '>
                <div>--Choose gender--</div>
              </div>
            )}

            <div className='flex flex-col justify-center items-center h-8 w-8 relative gap-2.5 p-3'>
              <svg
                width={18}
                height={18}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='flex-grow-0 flex-shrink-0 w-6 h-6 relative'
                preserveAspectRatio='none'
              >
                <path
                  d='M5.25 9L12 15.75L18.75 9'
                  stroke='black'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </div>
          </div>

          <div
            className={
              showSelectGender
                ? 'rounded border-[1px] border-gray-300 bg-white absolute top-11 w-full shadow-md h-fit z-50  '
                : 'rounded border-[1px] border-gray-300 bg-white absolute top-11 w-full shadow-md h-fit hidden'
            }
          >
            {genders.map((gender) => (
              <div
                onClick={() => {
                  setSelectGender(gender)
                  setShowSelectGender(false)
                }}
                className={`cursor-pointer hover:bg-gray-300 py-2 px-4 text-black ${gender === selectGender && 'bg-gray-300'}`}
              >
                {gender}
              </div>
            ))}
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='date'
              variant={'outline'}
              className={cn('w-[200px] h-11 justify-start text-left font-normal rounded border-zinc-500 relative')}
            >
              <div className="bg-[#FAFBFC] text-zinc-900 text-sm font-normal font-['Montserrat'] absolute top-[-10px] start-4 px-1 flex">
                Day of birth <div className="text-red-500 text-sm font-normal font-['Montserrat'] ps-1">*</div>
              </div>
              <div className="text-zinc-900 text-sm font-normal font-['Montserrat']">
                {date ? format(date, 'LLL dd, y') : <span>dd/mm/yyyy</span>}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0 bg-white ' align='start'>
            <DayPicker
              mode='single'
              defaultMonth={date}
              selected={date}
              onSelect={(value) => {
                setDate(value)
              }}
              classNames={{
                months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                ),
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                row: 'flex w-full mt-2',
                cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day_selected: 'bg-green-500 text-white hover:bg-green-600 focus:bg-green-700', // Update the background color here
                day_today: 'bg-accent text-accent-foreground',
                day_outside:
                  'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                day_disabled: 'text-muted-foreground opacity-50',
                day_hidden: 'invisible',
                day_range_start: 'bg-[#8DD3BB] font-bold',
                day_range_middle: 'bg-emerald-100 rounded-none',
                day_range_end: 'bg-[#8DD3BB] font-bold',
                day: 'hover:bg-gray-100 rounded w-9 h-9'
              }}
            />
            {/* <Calendar
            initialFocus
            mode='range'
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(value) => {
              dispatch(setDateRange(value!))
            }}
            numberOfMonths={2}
            classNames={{
              day_range_start: 'bg-[#8DD3BB] font-bold',
              day_range_middle: 'bg-emerald-100 rounded-none',
              day_range_end: 'bg-[#8DD3BB] font-bold',
              day: 'hover:bg-gray-100 rounded w-9 h-9'
            }}
          /> */}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
