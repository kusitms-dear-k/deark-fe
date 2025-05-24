'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/svgComponents'
import { useState } from 'react'

interface Range {
  start: Date | null
  end: Date | null
}

interface RangeCalendarProps {
  value: Range
  setValue: (range: Range) => void
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function isSameDay(a?: Date | null, b?: Date | null) {
  return (
    !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  )
}

function isInRange(day: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false
  return day > start && day < end
}

// 오늘 날짜인지 확인하는 함수
function isToday(date: Date) {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

export default function RangeCalendar({ value, setValue }: RangeCalendarProps) {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  // 달력 데이터 생성
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = new Date(year, month, 1).getDay()
  const calendar: (Date | null)[] = []
  for (let i = 0; i < firstDay; i++) calendar.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendar.push(new Date(year, month, d))

  // 지난 날짜 비활성화
  const isPast = (date: Date) => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return date < now
  }

  // 날짜 클릭 핸들러
  const handleDayClick = (date: Date) => {
    if (isPast(date)) return
    if (!value.start || (value.start && value.end)) {
      setValue({ start: date, end: null })
    } else if (value.start && !value.end) {
      if (date < value.start) {
        setValue({ start: date, end: value.start })
      } else {
        setValue({ start: value.start, end: date })
      }
    }
  }

  // 월 이동
  const prevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1)
      setMonth(11)
    } else {
      setMonth((m) => m - 1)
    }
  }
  const nextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1)
      setMonth(0)
    } else {
      setMonth((m) => m + 1)
    }
  }

  // 포맷 함수
  const formatMonth = `${year}년 ${month + 1}월`

  return (
    <div className="w-full bg-white px-6">
      {/* 상단: 월 네비게이션 */}
      <div className="flex items-center justify-between px-6 py-4">
        <span className="cal-t text-gray-700">{formatMonth}</span>

        <div>
          <button onClick={prevMonth} className="px-2 text-xl">
            <ChevronLeftIcon width={24} height={24} />
          </button>

          <button onClick={nextMonth} className="px-2 text-xl">
            <ChevronRightIcon width={24} height={24} />
          </button>
        </div>
      </div>
      {/* 요일 헤더 */}
      <div className="body-l-m mb-2 grid grid-cols-7 px-2 text-center">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d} className="font-medium text-gray-700">
            {d}
          </div>
        ))}
      </div>
      {/* 날짜 */}
      <div className="body-l-m grid grid-cols-7 gap-y-2 px-2 pb-4 text-center">
        {calendar.map((date, i) => {
          if (!date) {
            return <div key={i} className="h-10 w-10" />
          }

          // 날짜 상태 계산
          const isCurrentDay = isToday(date)
          const isStart = value.start && isSameDay(date, value.start)
          const isEnd = value.end && isSameDay(date, value.end)
          const isBetween = value.start && value.end && isInRange(date, value.start, value.end)
          const disabled = isPast(date)

          // 날짜 스타일 클래스 계산
          let cellClass = 'body-m-m flex h-10 w-10 items-center justify-center rounded-full transition'

          if (disabled) {
            cellClass += ' bg-white text-stone-300'
          } else if (isStart || isEnd) {
            cellClass += ' bg-blue-400 font-semibold text-white'
          } else if (isBetween) {
            cellClass += ' bg-blue-100'
          } else if (isCurrentDay) {
            cellClass += ' text-blue-400' // 오늘 날짜 강조
          } else {
            cellClass += ' bg-white text-zinc-800 hover:bg-blue-50'
          }

          // 연결된 배경을 위한 wrapper 클래스
          let wrapperClass = 'relative flex justify-center'

          // 범위 내부 - 양쪽 다 채움
          if (isBetween) {
            wrapperClass +=
              ' before:absolute before:inset-y-0 before:left-0 before:right-0 before:bg-blue-100 before:z-0'
          }

          // 시작일 - 오른쪽만 채움 (범위가 있을 때)
          if (isStart && value.end) {
            wrapperClass += ' after:absolute after:inset-y-0 after:left-1/2 after:right-0 after:bg-blue-100 after:z-0'
          }

          // 종료일 - 왼쪽만 채움 (범위가 있을 때)
          if (isEnd && value.start) {
            wrapperClass +=
              ' before:absolute before:inset-y-0 before:left-0 before:right-1/2 before:bg-blue-100 before:z-0'
          }

          return (
            <div key={i} className={wrapperClass}>
              <button disabled={disabled} onClick={() => handleDayClick(date)} className={cellClass + ' relative z-10'}>
                {date.getDate()}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
