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
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

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
  const [isGoLoginModal, setIsGoLoginModal] = useState<boolean>(true)
  const [isLogin] = useState<boolean>(true)

  const [selectedDesign, setSelectedDesign] = useState<number | null>(null)
  const [modalView, setModalView] = useState<ModalViewType>(null)

  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
  })

  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')

  const handleHeartClick = (designId: number) => {
    if (!isLogin) {
      setIsGoLoginModal(true)
    } else {
      setSelectedDesign(designId)
      setModalView('eventList')
    }
  }

  const handleEventSelect = (eventId: number) => {
    console.log(`디자인 ${selectedDesign}을 이벤트 ${eventId}에 추가`)

    setModalView(null)

    setToastMessage('아이템을 폴더에 추가했어요')
    setShowToast(true)
  }

  const handleAddNewEvent = () => {
    setModalView('newEvent')
  }

  const handleSaveNewEvent = () => {
    if (newEvent.name) {
      setModalView(null)

      setToastMessage('새 이벤트가 추가되었습니다')
      setShowToast(true)

      setNewEvent({ name: '', date: '', location: '' })
    }
  }

  const getModalTitle = () => {
    switch (modalView) {
      case 'eventList':
        return ''
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
        return <EventSelectionContent onSelect={handleEventSelect} onAddNew={handleAddNewEvent} />
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
            <section className={'grid grid-cols-2 gap-[2px] gap-y-5'}>
              {searchResults.map((item, pageIndex) => {
                return item.results.designList.map((design: DesignType, designIndex: number) => {
                  return (
                    <div key={design.designId} ref={observerRef}>
                      <DesignCard
                        key={design.designId}
                        img={design.designImageUrl}
                        enableDayOrder={design.isSameDayOrder}
                        storeName={design.storeName}
                        isHeart={design.isLiked}
                        description={design.designName}
                        startPrice={design.price}
                        heartCount={design.likeCount}
                        location={design.address}
                        onHeartClick={() => handleHeartClick(design.designId)}
                      />
                    </div>
                  )
                })
              })}
            </section>
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
                // 카카오 로그인 로직
                setIsGoLoginModal(false)
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
