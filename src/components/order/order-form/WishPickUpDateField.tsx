import Calendar from '@/components/search/CustomCalendar'
import { useOrderStore } from '@/store/orderStore'
import { QaDetailTitleType } from '@/types/mypage'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const CloseIcon = ({ width = 24, height = 24, color = '#BDBDBD', ...props }) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} {...props}>
    <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeLinecap="round" />
    <line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeLinecap="round" />
  </svg>
)

const CalendarIcon = ({ width = 24, height = 24, color = '#BDBDBD', ...props }) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.5} {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2" stroke={color} />
    <path d="M16 3v4M8 3v4M3 9h18" stroke={color} strokeLinecap="round" />
  </svg>
)

interface Props {
  businessDays?: number[] // 운영 요일 배열
}

const WishPickUpDateField = ({ businessDays }: Props) => {
  const answers = useOrderStore((state) => state.answers)
  const wishPickUpDate = answers?.find((a) => a.title === '픽업 희망 일자')?.answer ?? ''
  const setState = useOrderStore((state) => state.setState)

  // 모달 상태 관리
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)

  // 선택된 날짜 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(wishPickUpDate ? new Date(wishPickUpDate) : null)

  // 날짜 선택 핸들러 (선택 즉시는 상태만 업데이트, 모달은 닫지 않음)
  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date)
  }

  // 선택 완료 핸들러
  const handleConfirm = () => {
    const dateString = selectedDate ? selectedDate.toISOString().split('T')[0] : ''
    const currentAnswers = useOrderStore.getState().answers ?? []

    const newAnswer = {
      title: '픽업 희망 일자' as QaDetailTitleType,
      answer: dateString,
    }

    const updatedAnswers = currentAnswers.some((a) => a.title === '픽업 희망 일자')
      ? currentAnswers.map((a) => (a.title === '픽업 희망 일자' ? { ...a, answer: dateString } : a))
      : [...currentAnswers, newAnswer]

    setState({ answers: updatedAnswers })
    setIsCalendarModalOpen(false)
  }

  // 날짜 초기화 핸들러
  const handleReset = () => {
    setSelectedDate(null)
    const currentAnswers = useOrderStore.getState().answers ?? []
    const updatedAnswers = currentAnswers.map((a) => (a.title === '픽업 희망 일자' ? { ...a, answer: '' } : a))
    setState({ answers: updatedAnswers })
    setIsCalendarModalOpen(false)
  }

  // 날짜 포맷팅 함수
  const formatSelectedDate = (date: Date | null) => {
    if (!date) return '픽업일자를 선택해주세요.'
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  // 기존 저장된 날짜와 동기화
  useEffect(() => {
    if (wishPickUpDate && !selectedDate) {
      setSelectedDate(new Date(wishPickUpDate))
    }
  }, [wishPickUpDate])

  return (
    <>
      <section>
        <h5 className="title-m flex gap-x-[2px]">
          픽업 희망 일자<span className="title-s text-red-400">*</span>
        </h5>

        {/* 날짜 선택 버튼 (input처럼 보이지만 버튼) */}
        <button
          type="button"
          onClick={() => setIsCalendarModalOpen(true)}
          className={`${
            selectedDate ? 'text-gray-700' : 'text-gray-400'
          } body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-left`}
        >
          <span>{formatSelectedDate(selectedDate)}</span>
          <CalendarIcon width={24} height={24} color="#BDBDBD" />
        </button>
      </section>

      {/* 달력 모달 (검색 필터와 동일한 구조) */}
      <AnimatePresence>
        {isCalendarModalOpen && (
          <div
            className="fixed inset-0 z-50 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]"
            onClick={() => setIsCalendarModalOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 min-h-[20.375rem] w-full rounded-t-[1rem] bg-white py-[1.25rem]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              {/* 모달 헤더 */}
              <div className="border-gray-150 flex items-center justify-between border-b px-[1.25rem] pb-[1rem]">
                <h3 className="title-xl">픽업 희망 일자</h3>
                <button onClick={() => setIsCalendarModalOpen(false)} className="text-gray-400">
                  <CloseIcon width={24} height={24} color="#BDBDBD" />
                </button>
              </div>

              {/* 달력 */}
              <div className="flex justify-center py-4">
                <Calendar<'single'>
                  mode="single"
                  value={selectedDate}
                  setValue={handleDateSelect}
                  businessDays={businessDays} // 운영 요일 전달
                />
              </div>

              {/* 하단 버튼 (검색 필터와 동일한 구조) */}
              <div className="border-gray-150 flex gap-x-[0.5rem] border-t px-[1.25rem] pt-[1.25rem] pb-[0.5rem]">
                <button
                  onClick={handleReset}
                  className="button-l w-[7.125rem] rounded-[0.25rem] bg-gray-200 px-[1.75rem] py-[0.75rem] whitespace-nowrap"
                >
                  초기화
                </button>
                <button
                  onClick={handleConfirm}
                  className="button-l w-full rounded-[0.25rem] bg-blue-400 py-[0.75rem] text-white"
                >
                  선택 완료
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WishPickUpDateField
