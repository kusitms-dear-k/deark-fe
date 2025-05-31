'use client'

import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'
import EventButtons from './EventButtons'
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/svgComponents'
import Calendar from '../search/CustomCalendar'

interface DateSelectionContentProps {
  onSelect: (date: string) => void
  onCancel: () => void
}

const DateSelectionContent = ({ onSelect, onCancel }: DateSelectionContentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [month, setMonth] = useState<Date>(new Date())

  const handleConfirm = () => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy년 M월 d일', { locale: ko })
      onSelect(formattedDate)
    }
  }

  // 현재일 이전은 선택 불가
  const disabledDays = { before: new Date() }

  return (
    <div className="flex flex-col items-center border-t border-t-gray-200">
      <div className="body-l-1 mb-[4.625rem] flex justify-center pt-[1.625rem]">
        <Calendar
          mode="single"
          value={selectedDate}
          setValue={setSelectedDate}
          businessDays={[0, 1, 2, 3, 4, 5, 6]} // 모든 요일 허용
        />
        {/* <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          month={month}
          onMonthChange={setMonth}
          disabled={disabledDays}
          locale={ko}
          styles={{
            caption: {
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 1rem',
              alignItems: 'center',
            },
            nav: { display: 'flex', gap: '2rem' },
          }}
          showOutsideDays
          captionLayout="dropdown"
          classNames={{
            today: `text-blue-400`,
            selected: `bg-blue-400 rounded-full text-white`,
          }}
          components={{
            Chevron: ({ orientation, ...props }) =>
              orientation === 'left' ? (
                <ChevronLeftIcon width={24} height={24} />
              ) : (
                <ChevronRightIcon width={24} height={24} />
              ),
          }}
        /> */}
      </div>

      <hr className="w-full border-t border-gray-200" />
      <EventButtons
        onCancel={onCancel}
        onClickActiveBtn={handleConfirm}
        activeBtnText="선택 완료"
        eventValue={selectedDate}
      />
    </div>
  )
}

export default DateSelectionContent
