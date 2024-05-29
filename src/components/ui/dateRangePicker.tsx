'use client'

import * as React from 'react'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDispatch, useSelector } from 'react-redux'
import { setDateRange } from '@/redux/slice/flightSlice'
import { RootState } from '@/redux/store'

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: new Date(),
  //   to: addDays(new Date(), 1)
  // })

  const dateRange = useSelector((state: RootState) => state.flight.dateRange)

  const dispatch = useDispatch()

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] h-14 justify-start text-left font-normal rounded',
              !dateRange && 'text-muted-foreground',
              className
            )}
          >
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y')
              )
            ) : (
              <span>Depart-Return</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 bg-white ' align='start'>
          <Calendar
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
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
