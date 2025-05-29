import { useEffect, useRef, useState } from 'react'
import { useSearchStore } from '@/store/searchStore'
import { ResponseType } from '@/types/common'
import { StoreListResponseType } from '@/types/search'
import { useInfiniteStoreSearch } from '@/api/hooks/search/useInfiniteStoreSearch'
import NoSearchResults from '@/components/search/NoSearchResults'
import StoreCard from '@/components/search/StoreCard'
import StoreCardSkeleton from '@/components/skeleton/StoreCardSkeleton'
import { useHeartClick } from '@/hooks/useHeartClick'
import { EventApi } from '@/api/eventAPI'
import EventModal from '../event/EventModal'
import ToastMsg from '../event/ToastMsg'
import MiddleModal from '../common/MiddleModal'
import { useRouter } from 'next/navigation'
import EventSelectionContent from '../event/EventSelectContent'
import NewEventContent from '../event/NewEventContent'
import DateSelectionContent from '../event/DateSelectionContent'
import LocationSelectionContent from '../event/LocationSelectionContent'

interface Props {}

const StoreSearchResult = (props: Props) => {
  const router = useRouter()

  const sortType = useSearchStore((state) => state.sortType)
  const keyword = useSearchStore((state) => state.keyword)
  const isSameDayOrder = useSearchStore((state) => state.isSameDayOrder)
  const isSelfService = useSearchStore((state) => state.isSelfService)
  const isLunchBoxCake = useSearchStore((state) => state.isLunchBoxCake)
  const startDate = useSearchStore((state) => state.startDate)
  const endDate = useSearchStore((state) => state.endDate)
  const minPrice = useSearchStore((state) => state.minPrice)
  const maxPrice = useSearchStore((state) => state.maxPrice)
  const locationList = useSearchStore((state) => state.locationList)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  const {
    isGoLoginModal,
    setIsGoLoginModal,
    isLogin,
    modalView,
    setModalView,
    eventList,
    setEventList,
    handleHeartClick,
    selectedItem,
    toastMessage,
    setToastMessage,
    showToast,
    setShowToast,
    selectedEventIds,
  } = useHeartClick('store')

  // 새 이벤트 생성용 상태
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
  })

  // 무한스크롤 훅 호출
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteStoreSearch({
    pageParam: 0,
    count: 4,
    sortType: sortType,
    keyword: keyword,
    isSameDayOrder: isSameDayOrder,
    isSelfService: isSelfService,
    isLunchBoxCake: isLunchBoxCake,
    startDate: startDate,
    endDate: endDate,
    locationList: locationList,
    minPrice: minPrice,
    maxPrice: maxPrice,
  })

  // Intersection Observer 로 스크롤 끝 감지
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = observerRef.current
    if (!currentRef || !hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    )

    observer.observe(currentRef)

    return () => {
      observer.unobserve(currentRef)
    }
  }, [data, hasNextPage, fetchNextPage, isFetchingNextPage])

  // 가게 검색 결과
  const searchResults: ResponseType<StoreListResponseType>[] | undefined = data ? data.pages : undefined

  // 전체 컴포넌트 갯수
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setSearchParams({ totalCount: searchResults[0]?.results.totalCount })
    }
  }, [searchResults])

  // 이벤트 선택 핸들러 (스토어용)
  // const handleEventSelect = async (eventId: number) => {
  //   await EventApi.mapStoreToEvents({
  //     store_id: selectedItem!,
  //     event_ids: [eventId],
  //   })
  //   setModalView(null)
  //   setToastMessage('이벤트 폴더에 스토어가 추가되었습니다.')
  //   setShowToast(true)
  // }

  // 새 이벤트 생성 핸들러
  const handleAddNewEvent = () => setModalView('newEvent')

  const handleSaveNewEvent = async () => {
    if (newEvent.name) {
      try {
        const eventData = {
          title: newEvent.name,
          event_date: newEvent.date, // 날짜 포맷 변환 필요시 추가
          address: newEvent.location,
        }
        const newEventId = await EventApi.createEvent(eventData)
        const updatedEvents = [
          {
            id: newEventId,
            name: newEvent.name,
            icon: '/search/cake_img.png',
            isLiked: false,
          },
          ...eventList,
        ]
        setEventList(updatedEvents)
        setModalView(null)
        setToastMessage('새 이벤트가 추가되었습니다.')
        setShowToast(true)
        setNewEvent({ name: '', date: '', location: '' })
        if (selectedItem) {
          await EventApi.mapStoreToEvents({
            store_id: selectedItem,
            event_ids: [newEventId],
          })
        }
      } catch (error) {
        setShowToast(true)
      }
    }
  }

  const getModalTitle = () => {
    switch (modalView) {
      case 'eventList':
        return '이벤트 폴더 선택'
      case 'newEvent':
        return '새 이벤트 추가'
      case 'dateSelect':
        return '날짜 설정'
      case 'locationSelect':
        return '장소 설정'
      default:
        return ''
    }
  }

  const handleModalClose = async (selectedIds: number[]) => {
    if (selectedItem) {
      // selectedItem은 디자인/스토어 ID
      try {
        await EventApi.mapStoreToEvents({
          store_id: selectedItem,
          event_ids: selectedIds,
        })
      } catch (error) {
        console.error('스토어 이벤트 폴더 저장 실패', error)
      }
    }
  }

  const renderModalContent = () => {
    switch (modalView) {
      case 'eventList':
        return (
          <EventSelectionContent
            events={eventList}
            onAddNew={handleAddNewEvent}
            onClose={handleModalClose}
            initialSelected={selectedEventIds}
          />
        )
      case 'newEvent':
        return (
          <NewEventContent
            event={newEvent}
            setEvent={setNewEvent}
            onDateSelect={() => setModalView('dateSelect')}
            onLocationSelect={() => setModalView('locationSelect')}
            onSave={handleSaveNewEvent}
            onCancel={() => setModalView('eventList')}
          />
        )
      case 'dateSelect':
        return (
          <DateSelectionContent
            onSelect={(date) => {
              setNewEvent((prev) => ({ ...prev, date }))
              setModalView('newEvent')
            }}
            onCancel={() => setModalView('newEvent')}
          />
        )
      case 'locationSelect':
        return (
          <LocationSelectionContent
            onSelect={(location) => {
              setNewEvent((prev) => ({ ...prev, location }))
              setModalView('newEvent')
            }}
            onCancel={() => setModalView('newEvent')}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="pb-[5.625rem]">
      {searchResults ? (
        searchResults.length > 0 ? (
          searchResults.map((items, index) => {
            return (
              <section
                key={index}
                className={
                  items.results.storeList.length > 0 ? 'flex flex-col gap-y-[1rem] py-[0.5rem] pl-[1.25rem]' : ''
                }
              >
                {items.results.storeList.length > 0 ? (
                  items.results.storeList.map((store) => {
                    return (
                      <div ref={observerRef} key={store.storeId}>
                        <StoreCard
                          onCardClick={() => {
                            setSearchParams({
                              storeId: store.storeId,
                              isStoreDetailModalOpen: true,
                              isDesignDetailModalOpen: false,
                            })
                          }}
                          onHeartClick={(e) => {
                            e.stopPropagation()
                            handleHeartClick(store.storeId)
                          }}
                          {...store}
                        />
                      </div>
                    )
                  })
                ) : (
                  <NoSearchResults />
                )}
              </section>
            )
          })
        ) : (
          <NoSearchResults />
        )
      ) : (
        //skeleton-ui
        [1, 2, 3, 4].map((i) => {
          return <StoreCardSkeleton key={i} />
        })
      )}

      {/* 모달 및 토스트 */}
      {isLogin ? (
        <div>
          <EventModal isOpenModal={modalView !== null} onClose={() => setModalView(null)} title={getModalTitle()}>
            {renderModalContent()}
          </EventModal>
          <ToastMsg message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
        </div>
      ) : (
        <MiddleModal isOpenModal={isGoLoginModal} onClose={() => setIsGoLoginModal(false)}>
          <div className="flex flex-col">
            <div>
              <p className="mb-1 text-center text-[1rem] font-bold">찜하기는 로그인 후 이용이 가능해요.</p>
              <p className="body-s text-center">30초만에 로그인하고 계속 해볼까요?</p>
            </div>
            <button
              className="bg-kakao absolute bottom-0 left-0 flex h-[2.625rem] w-full items-center justify-center gap-2 rounded-b-lg text-center"
              onClick={() => {
                setIsGoLoginModal(false)
                router.push('/sign-up')
              }}
            >
              {/* 카카오 아이콘 등 */}
              카카오톡으로 쉬운 시작
            </button>
          </div>
        </MiddleModal>
      )}
    </div>
  )
}
export default StoreSearchResult
