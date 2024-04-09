'use client'

import * as React from 'react'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1)
  })

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] h-14 justify-start text-left font-normal rounded',
              !date && 'text-muted-foreground',
              className
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
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
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
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
