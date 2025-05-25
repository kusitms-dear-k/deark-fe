import { CakeIcon } from '@/assets/svgComponents'
import type { EventDetail } from '@/types/event'

interface EventHeaderProps {
  event: EventDetail
}

export default function EventHeader({ event }: EventHeaderProps) {
  const hasAddress = !!event.address
  const hasDate = !!event.eventDate

  // D-Day 계산 함수
  const calculateDday = (dateString: string) => {
    if (!dateString) return null

    const eventDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    eventDate.setHours(0, 0, 0, 0)

    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? 'D-Day' : `D+${Math.abs(diffDays)}`
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return ''

    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}.${month}.${day}` // "2025.05.22" 형식
  }

  return (
    <div className="body-l shadow-location-search border-gray-150 mx-auto mt-[2.625rem] flex h-[4.25rem] w-[21.875rem] items-center rounded-lg border bg-white px-5">
      <CakeIcon width={40} height={40} className="mr-1" />

      <div className="flex-1">
        <h1 className="title-l text-gray-900">{event.title}</h1>
        {hasAddress && <p className="caption-m text-gray-500">{event.address}</p>}
      </div>

      <div className="flex flex-col justify-end text-end">
        {hasDate && <div className="title-l text-red-400">{calculateDday(event.eventDate)}</div>}
        {hasDate && <p className="caption-m text-gray-400">{formatDate(event.eventDate)}</p>}
      </div>
    </div>
  )
}
