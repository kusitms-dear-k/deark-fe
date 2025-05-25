import { useSearchStore } from '@/store/searchStore'
import Calendar from '@/components/search/CustomCalendar' // 컴포넌트명 변경
import { useState, useEffect } from 'react'

const DateFilterContent = () => {
  const startDate = useSearchStore((state) => state.startDate)
  const endDate = useSearchStore((state) => state.endDate)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  // 범위 상태 관리 (기존과 동일)
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: startDate ? new Date(startDate) : null,
    end: endDate ? new Date(endDate) : null,
  })

  // 범위 변경 시 Zustand 상태 업데이트
  useEffect(() => {
    setSearchParams({
      startDate: range.start?.toISOString().split('T')[0] || null,
      endDate: range.end?.toISOString().split('T')[0] || null,
    })
  }, [range, setSearchParams])

  return (
    <div className="flex justify-center py-4">
      <Calendar<'range'>
        mode="range" // 범위 모드로 명시적 설정
        value={range}
        setValue={setRange} // 범위 업데이트 함수 전달
      />
    </div>
  )
}

export default DateFilterContent
