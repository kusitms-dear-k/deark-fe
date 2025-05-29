'use client'

import { useEffect, useRef, useState } from 'react'
import MiddleModal from '../common/MiddleModal'
import { KakaoIcon } from '@/assets/svgComponents'
import EventSelectionContent from '../event/EventSelectContent'
import NewEventContent from '../event/NewEventContent'
import DateSelectionContent from '../event/DateSelectionContent'
import LocationSelectionContent from '../event/LocationSelectionContent'
import EventModal from '../event/EventModal'
import ToastMsg from '../event/ToastMsg'
import { DesignListResponseType, DesignType } from '@/types/search'
import { useInfiniteDesignSearch } from '@/api/hooks/search/useInfiniteDesignSearch'
import { useSearchStore } from '@/store/searchStore'
import { ResponseType } from '@/types/common'
import DesignCardSkeleton from '@/components/skeleton/DesignCardSkeleton'
import DesignCard from '@/components/search/DesignCard'
import NoSearchResults from '@/components/search/NoSearchResults'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { EventApi } from '@/api/eventAPI'
import { formatDateForApi } from '@/utils/formatDataForApi'
import { DrawerTrigger } from '@/components/ui/drawer'
import { addRecentlyViewedDesign } from '@/utils/common/function'
import { useHeartClick } from '@/hooks/useHeartClick'

type ModalViewType = 'eventList' | 'newEvent' | 'dateSelect' | 'locationSelect' | null

const DesignSearchResult = () => {
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
  const storeId = useSearchStore((state) => state.storeId)
  const designId = useSearchStore((state) => state.designId)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  const router = useRouter()

  // 무한스크롤 훅 호출
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteDesignSearch({
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

  // 디자인 검색 결과
  const searchResults: ResponseType<DesignListResponseType>[] | undefined = data ? data.pages : undefined

  // 전체 컴포넌트 갯수
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setSearchParams({ totalCount: searchResults[0]?.results.totalCount })
    }
  }, [searchResults])

  // 이벤트 관련
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
    selectedEventIds,
    toastMessage,
    setToastMessage,
    showToast,
    setShowToast,
  } = useHeartClick('design')

  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
  })

  const handleModalClose = async (selectedIds: number[]) => {
    if (selectedItem) {
      // selectedItem은 디자인/스토어 ID
      try {
        await EventApi.mapDesignToEvents({
          design_id: selectedItem,
          event_ids: selectedIds,
        })
      } catch (error) {
        console.error('디자인 이벤트 폴더 저장 실패', error)
      }
    }
  }

  const handleAddNewEvent = () => {
    setModalView('newEvent')
  }

  const handleSaveNewEvent = async () => {
    if (newEvent.name) {
      try {
        // CreateEventRequest 형식으로 변환
        const eventData = {
          title: newEvent.name,
          event_date: formatDateForApi(newEvent.date), // 날짜 형식 변환 필요
          address: newEvent.location,
        }

        // API 호출로 이벤트 생성
        const newEventId = await EventApi.createEvent(eventData)

        // 성공 후 이벤트 목록 갱신 - 새로 생성된 이벤트 추가
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

        // 모달 닫기
        setModalView(null)

        // 토스트 메시지 표시
        setToastMessage('새 이벤트가 추가되었습니다')
        setShowToast(true)

        // 폼 초기화
        setNewEvent({ name: '', date: '', location: '' })

        // 선택한 디자인을 새 이벤트에 바로 추가하고 싶다면
        if (selectedItem) {
          await EventApi.mapDesignToEvents({
            design_id: selectedItem,
            event_ids: [newEventId],
          })
          setToastMessage('아이템을 새 폴더에 추가했어요')
        }
      } catch (error) {
        console.error('이벤트 생성 실패:', error)
        setToastMessage('이벤트 생성에 실패했습니다')
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

  const renderModalContent = () => {
    switch (modalView) {
      case 'eventList':
        return (
          <EventSelectionContent
            events={eventList}
            onClose={handleModalClose}
            onAddNew={handleAddNewEvent}
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
    <div className="pb-[6.25rem]">
      <section>
        {searchResults ? (
          searchResults.length > 0 ? (
            searchResults.map((item, pageIndex) => {
              return (
                <section
                  key={pageIndex}
                  className={item.results.designList.length > 0 ? 'grid grid-cols-2 gap-[2px] gap-y-5' : ''}
                >
                  {item.results.designList.length > 0 ? (
                    item.results.designList.map((design: DesignType, designIndex: number) => {
                      return (
                        <div key={design.designId} ref={observerRef}>
                          <div className="w-full">
                            <DesignCard
                              onCardClick={() => {
                                router.push(`/design/${design.designId}`)
                                setSearchParams({
                                  designId: design.designId,
                                  storeId: design.storeId,
                                  isDesignDetailModalOpen: true,
                                })
                                addRecentlyViewedDesign(
                                  design.designId,
                                  design.designName,
                                  design.designImageUrl,
                                  design.storeName,
                                  design.isLiked
                                )
                              }}
                              key={design.designId}
                              img={design.designImageUrl}
                              enableDayOrder={design.isSameDayOrder}
                              storeName={design.storeName}
                              isHeart={design.isLiked}
                              description={design.designName}
                              startPrice={design.price}
                              heartCount={design.likeCount}
                              location={design.address}
                              onHeartClick={(e: React.MouseEvent<HTMLDivElement>) => {
                                e.stopPropagation()
                                handleHeartClick(design.designId)
                              }}
                            />
                          </div>
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
          // skeleton-ui
          <section className="grid grid-cols-2 gap-[2px] gap-y-5">
            {[1, 2, 3, 4].map((i) => {
              return <DesignCardSkeleton key={i} />
            })}
          </section>
        )}
      </section>

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
              <KakaoIcon width={19} height={17} />
              카카오톡으로 쉬운 시작
            </button>
          </div>
        </MiddleModal>
      )}
    </div>
  )
}
export default DesignSearchResult
