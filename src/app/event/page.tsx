'use client'

import HeaderWithBack from '@/components/common/HeaderWithBack'
import AddEventBtn from '@/components/event/main/AddEventBtn'
import { EventApi } from '@/api/eventAPI'
import { EventDetail, StoreItem, DesignItem, CreateEventRequest } from '@/types/event'
import { useEffect, useState } from 'react'
import EventCard from '@/components/event/main/EventCard'
import EventActionSheet from '@/components/event/main/EventActionSheet'
import DeleteEventModal from '@/components/event/main/DeleteEventModal'
import { useRouter } from 'next/navigation'
import EventModal from '@/components/event/EventModal'
import NewEventContent from '@/components/event/NewEventContent'
import DateSelectionContent from '@/components/event/DateSelectionContent'
import LocationSelectionContent from '@/components/event/LocationSelectionContent'
import ToastMsg from '@/components/event/ToastMsg'
import { formatDateForApi } from '@/utils/formatDataForApi'
import { formatDateForDisplay } from '@/components/event/EventEditModal'
import Cookies from 'js-cookie'
import MiddleModal from '@/components/common/MiddleModal'
import { KakaoIcon } from '@/assets/svgComponents'

interface EventWithItems {
  event: EventDetail
  stores: StoreItem[]
  designs: DesignItem[]
}

export default function FavoriteMain() {
  const router = useRouter()

  const [eventList, setEventList] = useState<EventWithItems[]>([])
  const [error, setError] = useState<string | null>(null)

  const [activeEvent, setActiveEvent] = useState<EventDetail | null>(null)
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const [modalView, setModalView] = useState<'newEvent' | 'dateSelect' | 'locationSelect' | null>(null)
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
  })
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [editModalView, setEditModalView] = useState<'main' | 'dateSelect' | 'locationSelect'>('main')
  const [editEvent, setEditEvent] = useState({ name: '', date: '', location: '' })

  const [isGoLoginModal, setIsGoLoginModal] = useState(false)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // 1. 이벤트 목록 불러오기
        const events = await EventApi.getMyEvents()

        // 2. 각 이벤트별 스토어/디자인 병렬 fetch
        const eventWithItems = await Promise.all(
          events.map(async (event) => {
            const [stores, designs] = await Promise.all([
              EventApi.getEventStores(event.eventId),
              EventApi.getEventDesigns(event.eventId),
            ])
            return { event, stores, designs }
          })
        )

        setEventList(eventWithItems)
      } catch (err: any) {
        setError(err.message || '에러 발생')
      }
    }
    fetchAll()

    if (!Cookies.get('ACCESS_TOKEN')) {
      setIsGoLoginModal(true)
    }
  }, [])

  const handleMenuClick = (event: EventDetail) => {
    setActiveEvent(event)
    setIsActionSheetOpen(true)
  }

  const handleDeleteEvent = async () => {
    if (!activeEvent) return

    try {
      await EventApi.deleteEvent(activeEvent.eventId)

      // 성공적으로 삭제된 경우 목록에서 제거
      setEventList((prev) => prev.filter((item) => item.event.eventId !== activeEvent.eventId))

      // 모달 닫기
      setIsDeleteModalOpen(false)
      setIsActionSheetOpen(false)

      router.refresh()
      router.push('/event')
    } catch (err: any) {
      setError(err.message || '삭제 중 오류가 발생했습니다')
    }
  }

  const handleEditClick = (event: EventDetail) => {
    setEditEvent({
      name: event.title,
      date: formatDateForDisplay(event.eventDate), // YYYY-MM-DD → "YYYY년 M월 D일"
      location: event.address,
    })
    setEditModalView('main')
    setIsEditModalOpen(true)
  }

  const handleSaveEditEvent = async () => {
    if (!activeEvent) return
    try {
      const eventData: CreateEventRequest = {
        title: editEvent.name,
        event_date: formatDateForApi(editEvent.date),
        address: editEvent.location,
      }
      await EventApi.updateEvent(activeEvent.eventId, eventData)
      // 목록 새로고침
      const events = await EventApi.getMyEvents()
      const eventWithItems = await Promise.all(
        events.map(async (event) => {
          const [stores, designs] = await Promise.all([
            EventApi.getEventStores(event.eventId),
            EventApi.getEventDesigns(event.eventId),
          ])
          return { event, stores, designs }
        })
      )
      setEventList(eventWithItems)
      setIsEditModalOpen(false)
      setToastMessage('이벤트가 수정되었습니다')
      setShowToast(true)
    } catch (err: any) {
      setError(err.message || '수정 중 오류가 발생했습니다')
    }
  }

  const handleEventAddBtnClick = () => {
    setModalView('newEvent')
  }

  const handleSaveNewEvent = async () => {
    if (newEvent.name) {
      try {
        // API 요청 형식으로 변환
        const eventData: CreateEventRequest = {
          title: newEvent.name,
          event_date: formatDateForApi(newEvent.date),
          address: newEvent.location,
        }

        // API 호출
        const newEventId = await EventApi.createEvent(eventData)

        // 성공 후 이벤트 목록 갱신
        const fetchAll = async () => {
          try {
            const events = await EventApi.getMyEvents()
            const eventWithItems = await Promise.all(
              events.map(async (event) => {
                const [stores, designs] = await Promise.all([
                  EventApi.getEventStores(event.eventId),
                  EventApi.getEventDesigns(event.eventId),
                ])
                return { event, stores, designs }
              })
            )
            setEventList(eventWithItems)
          } catch (err: any) {
            setError(err.message || '에러 발생')
          }
        }

        // 새로 목록 가져오기
        fetchAll()

        // 모달 닫기
        setModalView(null)

        // 토스트 메시지
        setToastMessage('새 이벤트가 추가되었습니다')
        setShowToast(true)

        // 폼 초기화
        setNewEvent({ name: '', date: '', location: '' })
      } catch (error: any) {
        console.error('이벤트 생성 실패:', error)
        setError(error.message || '이벤트 생성에 실패했습니다')
      }
    }
  }

  if (error) {
    console.error('error', error)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-26">
      <HeaderWithBack headerText="찜하기" subText={`마음에 드는 케이크와 스토어를 찜해두세요!`} enableBack={false} />
      <AddEventBtn className="mx-auto mt-16" onClick={handleEventAddBtnClick} />
      <main className="mx-auto mt-[1.125rem] grid w-[21.875rem] grid-cols-2 gap-[0.875rem]">
        {eventList.map(({ event, stores, designs }) => (
          <EventCard
            key={event.eventId}
            event={event}
            stores={stores}
            designs={designs}
            onMenuClick={() => handleMenuClick(event)}
          />
        ))}
      </main>

      {/* 액션 시트 */}
      {isActionSheetOpen && activeEvent && (
        <EventActionSheet
          event={activeEvent}
          onClose={() => setIsActionSheetOpen(false)}
          onEdit={() => {
            setIsActionSheetOpen(false)
            handleEditClick(activeEvent!)
          }}
          onDelete={() => {
            setIsActionSheetOpen(false)
            setIsDeleteModalOpen(true)
          }}
        />
      )}

      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <DeleteEventModal onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteEvent} />
      )}

      {modalView === 'newEvent' && (
        <EventModal isOpenModal={true} onClose={() => setModalView(null)} title="새 이벤트 폴더 추가">
          <NewEventContent
            event={newEvent}
            setEvent={setNewEvent}
            onDateSelect={() => setModalView('dateSelect')}
            onLocationSelect={() => setModalView('locationSelect')}
            onSave={handleSaveNewEvent}
            onCancel={() => setModalView(null)}
          />
        </EventModal>
      )}

      {modalView === 'dateSelect' && (
        <EventModal isOpenModal={true} onClose={() => setModalView('newEvent')} title="날짜 설정">
          <DateSelectionContent
            onSelect={(date) => {
              setNewEvent((prev) => ({ ...prev, date }))
              setModalView('newEvent')
            }}
            onCancel={() => setModalView('newEvent')}
          />
        </EventModal>
      )}

      {modalView === 'locationSelect' && (
        <EventModal isOpenModal={true} onClose={() => setModalView('newEvent')} title="장소 설정">
          <LocationSelectionContent
            onSelect={(location) => {
              setNewEvent((prev) => ({ ...prev, location }))
              setModalView('newEvent')
            }}
            onCancel={() => setModalView('newEvent')}
          />
        </EventModal>
      )}

      {isEditModalOpen && (
        <EventModal isOpenModal={true} onClose={() => setIsEditModalOpen(false)} title="이벤트 수정하기">
          {editModalView === 'main' && (
            <NewEventContent
              event={editEvent}
              setEvent={setEditEvent}
              onDateSelect={() => setEditModalView('dateSelect')}
              onLocationSelect={() => setEditModalView('locationSelect')}
              onSave={handleSaveEditEvent}
              onCancel={() => setIsEditModalOpen(false)}
            />
          )}
          {editModalView === 'dateSelect' && (
            <DateSelectionContent
              onSelect={(date) => {
                setEditEvent((prev) => ({ ...prev, date }))
                setEditModalView('main')
              }}
              onCancel={() => setEditModalView('main')}
            />
          )}
          {editModalView === 'locationSelect' && (
            <LocationSelectionContent
              onSelect={(location) => {
                setEditEvent((prev) => ({ ...prev, location }))
                setEditModalView('main')
              }}
              onCancel={() => setEditModalView('main')}
            />
          )}
        </EventModal>
      )}

      <MiddleModal
        isOpenModal={isGoLoginModal}
        onClose={() => setIsGoLoginModal(false)}
        preventCloseOnOutsideClick={true}
      >
        <div className="flex flex-col">
          <div>
            <p className="mb-1 text-center text-[1rem] font-bold">찜하기는 로그인 후 이용이 가능해요.</p>
            <p className="body-s text-center">30초만에 로그인하고 계속 해볼까요?</p>
          </div>
          <button
            className="bg-kakao absolute bottom-0 left-0 flex h-[2.625rem] w-full items-center justify-center gap-2 rounded-b-lg text-center"
            onClick={() => {
              setIsGoLoginModal(false)
              router.push('/login')
            }}
          >
            <KakaoIcon width={19} height={17} />
            카카오톡으로 쉬운 시작
          </button>
        </div>
      </MiddleModal>

      {/* 토스트 메시지 */}
      <ToastMsg message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  )
}
