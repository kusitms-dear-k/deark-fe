// EditEventModal.tsx - 수정 모달 래퍼 컴포넌트
import { useState } from 'react'
import { EventApi } from '@/api/eventAPI'
import { EventDetail, CreateEventRequest } from '@/types/event'
import EventModal from './EventModal'
import NewEventContent from './NewEventContent'
import DateSelectionContent from './DateSelectionContent'
import LocationSelectionContent from './LocationSelectionContent'

interface EditEventModalProps {
  event: EventDetail
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

// 날짜 형식 변환 함수들
export const formatDateForDisplay = (apiDate: string): string => {
  // YYYY-MM-DD -> YYYY년 M월 D일
  if (!apiDate) return ''
  const date = new Date(apiDate)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

const formatDateForApi = (displayDate: string): string => {
  // YYYY년 M월 D일 -> YYYY-MM-DD
  if (!displayDate) return ''
  const matches = displayDate.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/)
  if (!matches) return displayDate

  const [_, year, month, day] = matches
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

const EditEventModal = ({ event, isOpen, onClose, onSave }: EditEventModalProps) => {
  // 초기 데이터 설정 (기존 이벤트 데이터)
  const [eventData, setEventData] = useState({
    name: event.title,
    date: formatDateForDisplay(event.eventDate), // API 형식(YYYY-MM-DD)을 표시 형식으로 변환
    location: event.address,
  })

  const [modalView, setModalView] = useState<'main' | 'dateSelect' | 'locationSelect'>('main')

  // API 호출 함수
  const handleSaveEvent = async () => {
    try {
      // 표시 형식에서 API 형식으로 날짜 변환
      const requestData: CreateEventRequest = {
        title: eventData.name,
        event_date: formatDateForApi(eventData.date),
        address: eventData.location,
      }

      // 이벤트 수정 API 호출
      await EventApi.updateEvent(event.eventId, requestData)

      // 성공 시 콜백 실행
      onSave()
    } catch (error) {
      console.error('이벤트 수정 실패:', error)
    }
  }

  const renderContent = () => {
    switch (modalView) {
      case 'main':
        return (
          <NewEventContent
            event={eventData}
            setEvent={setEventData}
            onDateSelect={() => setModalView('dateSelect')}
            onLocationSelect={() => setModalView('locationSelect')}
            onSave={handleSaveEvent}
            onCancel={onClose}
          />
        )
      case 'dateSelect':
        return (
          <DateSelectionContent
            onSelect={(date) => {
              setEventData((prev) => ({ ...prev, date }))
              setModalView('main')
            }}
            onCancel={() => setModalView('main')}
          />
        )
      case 'locationSelect':
        return (
          <LocationSelectionContent
            onSelect={(location) => {
              setEventData((prev) => ({ ...prev, location }))
              setModalView('main')
            }}
            onCancel={() => setModalView('main')}
          />
        )
    }
  }

  return (
    <EventModal
      isOpenModal={isOpen}
      onClose={onClose}
      title={modalView === 'main' ? '이벤트 수정하기' : modalView === 'dateSelect' ? '날짜 설정' : '장소 설정'}
    >
      {renderContent()}
    </EventModal>
  )
}

export default EditEventModal
