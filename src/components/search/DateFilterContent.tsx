import { useSearchStore } from '@/store/searchStore'
import RangeCalendar from '@/components/search/CustomRangeCalendar'
import { useState, useEffect } from 'react'

const DateFilterContent = () => {
  const startDate = useSearchStore((state) => state.startDate)
  const endDate = useSearchStore((state) => state.endDate)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  // RangeCalendar는 Date 객체로 관리, zustand는 string(YYYY-MM-DD)로 관리한다고 가정
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: startDate ? new Date(startDate) : null,
    end: endDate ? new Date(endDate) : null,
  })

  // RangeCalendar에서 값이 바뀔 때 zustand 상태에 반영
  useEffect(() => {
    if (range.start) {
      setSearchParams({
        startDate: range.start.toISOString().split('T')[0],
      })
    } else {
      setSearchParams({ startDate: null })
    }
    if (range.end) {
      setSearchParams({
        endDate: range.end.toISOString().split('T')[0],
      })
    } else {
      setSearchParams({ endDate: null })
    }
  }, [range, setSearchParams])

  return (
    <div className="flex justify-center py-4">
      <RangeCalendar value={range} setValue={setRange} />
    </div>
  )
}

export default DateFilterContent
