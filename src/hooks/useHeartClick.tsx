import { useState } from 'react'
import Cookies from 'js-cookie'
import { EventApi } from '@/api/eventAPI'

type ModalViewType = 'eventList' | 'newEvent' | 'dateSelect' | 'locationSelect' | null

export function useHeartClick(type: 'design' | 'store') {
  const [isGoLoginModal, setIsGoLoginModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [modalView, setModalView] = useState<ModalViewType>(null)
  const [eventList, setEventList] = useState<{ id: number; name: string; icon: string; isLiked: boolean }[]>([])
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([])

  // 하트 클릭 핸들러
  const handleHeartClick = async (itemId: number) => {
    const loginCheck = !!Cookies.get('ACCESS_TOKEN')
    setIsLogin(loginCheck)
    if (!loginCheck) {
      setIsGoLoginModal(true)
      return
    }
    const events = await EventApi.getMyEvents()
    const checkedEvents =
      type === 'design'
        ? await EventApi.getCheckedEventsByDesign(itemId)
        : await EventApi.getCheckedEventsByStore(itemId)

    const initialSelected = checkedEvents.filter((e) => e.isChecked).map((e) => e.eventId)

    setSelectedEventIds(initialSelected)

    const merged = events.map((event) => ({
      id: event.eventId,
      name: event.title,
      icon: event.thumbnailUrl,
      isLiked: checkedEvents.some((ce) => ce.eventId === event.eventId && ce.isChecked),
    }))
    setEventList(merged)
    setSelectedItem(itemId)
    setModalView('eventList')
  }

  // ...이벤트 추가/토스트 등 나머지 핸들러도 이 훅에 포함

  return {
    isGoLoginModal,
    setIsGoLoginModal,
    isLogin,
    setIsLogin,
    selectedItem,
    setSelectedItem,
    modalView,
    setModalView,
    eventList,
    setEventList,
    toastMessage,
    setToastMessage,
    showToast,
    setShowToast,
    handleHeartClick,
    selectedEventIds,
  }
}
