'use client'

import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from 'react'
import { StoreDesignListResponseType, StoreDetailType } from '@/types/search'
import { useSearchStore } from '@/store/searchStore'
import { useOrderStore } from '@/store/orderStore'
import { useInfiniteStoreDesign } from '@/api/hooks/search/useInfiniteStoreDesign'
import { ResponseType } from '@/types/common'
import { getStoreDetailData } from '@/api/searchAPI'
import StoreReview from '@/components/search/StoreReview'
import StoreDesign from '@/components/search/StoreDesign'
import StoreInfo from '@/components/search/StoreInfo'
import StoreProfile from '@/components/search/StoreProfile'
import StoreDetailMenu from '@/components/search/StoreDetailMenu'
import { useParams, useRouter } from 'next/navigation'
import RequireLoginModal from '@/components/mypage/RequireLoginModal'
import OrderSubmissionSuccessModal from '@/components/order/OrderSubmissionSuccessModal'
import OrderForm from '@/components/order/OrderForm'
import { Gray700HeartIcon, HeartIconFill, LeftArrowIcon } from '@/assets/svgComponents'
import { useHeartClick } from '@/hooks/useHeartClick'
import { EventApi } from '@/api/eventAPI'
import EventModal from '@/components/event/EventModal'
import EventSelectionContent from '@/components/event/EventSelectContent'
import ToastMsg from '@/components/event/ToastMsg'

const StoreDetail = () => {
  const params = useParams()
  const router = useRouter()
  const token = Cookies.get('ACCESS_TOKEN')
  const isLoginRequiredForOrderFormOpen = useOrderStore((state) => state.isLoginRequiredForOrderFormOpen)
  const isOrderFormOpen = useOrderStore((state) => state.isOrderFormOpen)
  const isOrderSubmissionSuccessModalOpen = useOrderStore((state) => state.isOrderSubmissionSuccessModalOpen)
  const [storeDetailMenu, setStoreDetailMenu] = useState<'가게 정보' | '디자인' | '리뷰'>('가게 정보')

  const [storeDetail, setStoreDetail] = useState<StoreDetailType>() // 가게 상세 페이지 데이터
  const storeId = parseInt(params.id as string)
  const sizeName = useSearchStore((state) => state.sizeName) //케이크 필터

  const setState = useOrderStore((state) => state.setState)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)
  const resetOrderForm = useOrderStore((state) => state.resetOrderForm)

  const {
    modalView,
    setModalView,
    eventList,
    handleHeartClick,
    selectedEventIds,
    toastMessage,
    showToast,
    setShowToast,
  } = useHeartClick('store')

  // 모달 닫힐 때 API 호출
  const handleModalClose = async (selectedIds: number[]) => {
    if (storeId) {
      await EventApi.mapStoreToEvents({
        store_id: storeId,
        event_ids: selectedIds,
      })
      setShowToast(true)
    }
    setModalView(null)
  }

  useEffect(() => {
    if (storeId) {
      setSearchParams({ storeId: storeId }) // 페이지 로드시 자동으로 설정
    }
  }, [storeId])

  // 무한스크롤 훅 호출
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteStoreDesign({
    pageParam: 0,
    count: 4,
    storeId: parseInt(params.id as string),
    sizeName: sizeName,
  })

  //Intersection Observer 로 스크롤 끝 감지
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
  const searchResults: ResponseType<StoreDesignListResponseType>[] | undefined = data ? data.pages : undefined

  /**
   * 스토어 상세 페이지 데이터 불러오기
   */
  useEffect(() => {
    if (!storeId) return

    // 1. 초기 상태 실행
    getStoreDetailData(storeId)
      .then((res: ResponseType<StoreDetailType>) => {
        console.log('가게 상세', res.results)
        setStoreDetail(res.results)
      })
      .catch(console.error)

    // 2. 이후 상태 변화 감지
    const unsubscribe = useSearchStore.subscribe((currentStatus, prevState) => {
      getStoreDetailData(storeId)
        .then((res: ResponseType<StoreDetailType>) => {
          console.log('가게 상세', res.results)
          setStoreDetail(res.results)
        })
        .catch(console.error)
    })

    return () => unsubscribe()
  }, [storeId])

  // 3초 후 자동 닫힘 처리
  useEffect(() => {
    if (isOrderSubmissionSuccessModalOpen) {
      const timer = setTimeout(() => {
        setState({ isOrderSubmissionSuccessModalOpen: false })
        //초기화
        resetOrderForm()
      }, 3000)

      return () => clearTimeout(timer) // cleanup
    }
  }, [isOrderSubmissionSuccessModalOpen, setState])

  /**
   * 가게 상세 페이지
   * @param storeDetailMenu 가게 상세 페이지 메뉴
   */
  const renderStoreDetailContent = (storeDetailMenu: '가게 정보' | '디자인' | '리뷰') => {
    switch (storeDetailMenu) {
      case '리뷰':
        return <StoreReview />
      case '디자인':
        return storeDetail && <StoreDesign sizeNameList={storeDetail.sizeNameList} searchResults={searchResults} />
      default:
        return (
          storeDetail && (
            <StoreInfo
              isSameDayOrder={storeDetail.isSameDayOrder}
              storeAddress={storeDetail.storeAddress}
              storeName={storeDetail.storeName}
              storeDescription={storeDetail.storeDescription}
              is24hSelfService={storeDetail.is24hSelfService}
              isLunchBoxCake={storeDetail.isLunchBoxCake}
              businessHours={storeDetail.businessHours}
              pickUpHours={storeDetail.pickUpHours}
              ownerName={storeDetail.ownerName}
              businessNumber={storeDetail.businessNumber}
            />
          )
        )
    }
  }

  return isOrderFormOpen ? (
    <OrderForm />
  ) : (
    <div className="relative min-h-screen">
      {/* 로그인 안할 경우 주문서 대신 로그인 요구 모달 */}
      {isLoginRequiredForOrderFormOpen && (
        <RequireLoginModal
          title={'주문하기'}
          onClick={() => setState({ isLoginRequiredForOrderFormOpen: false })}
          onCancelClick={() => setState({ isLoginRequiredForOrderFormOpen: false })}
        />
      )}

      {/* 주문서 문의가 완료될 때 보이는 모달 */}
      {isOrderSubmissionSuccessModalOpen && (
        <OrderSubmissionSuccessModal onClick={() => setState({ isOrderSubmissionSuccessModalOpen: false })} />
      )}

      <div className="flex flex-col">
        <div className="fixed z-30 flex w-full">
          {storeDetail ? (
            <>
              <header className="fixed z-30 flex w-full items-center justify-center bg-white px-5 pt-[75px] pb-[13px]">
                <LeftArrowIcon width={24} height={24} className="cursor-pointer" onClick={() => router.back()} />
                <div className="title-l absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                  {storeDetail?.storeName}
                </div>
                <section
                  className="flex w-full justify-end gap-x-[0.25rem]"
                  onClick={(e) => {
                    handleHeartClick(storeId)
                  }}
                >
                  {storeDetail?.isLiked ? (
                    <HeartIconFill width={24} height={24} />
                  ) : (
                    <Gray700HeartIcon width={20} height={18} />
                  )}
                  <p className="caption-m text-gray-700">{storeDetail?.likeCount}</p>
                </section>
              </header>
              <StoreProfile
                storeName={storeDetail.storeName}
                storeAddress={storeDetail.storeAddress}
                likeCount={storeDetail.likeCount}
                storeImageUrl={storeDetail.storeImageUrl}
                isLiked={storeDetail.isLiked}
                storeId={storeDetail.storeId}
              />
              <StoreDetailMenu storeDetailMenu={storeDetailMenu} setStoreDetailMenu={setStoreDetailMenu} />
            </>
          ) : null}
        </div>

        <div className={'h-[318px]'}></div>

        {renderStoreDetailContent(storeDetailMenu)}
      </div>

      {storeDetailMenu === '가게 정보' && (
        <div>
          <div className="h-[100px]" />

          <div className="border-gray-150 fixed bottom-0 z-10 w-full border-t bg-white px-[1.25rem] pt-[1.25rem] pb-10">
            <button
              onClick={() => {
                if (token) {
                  setState({ isOrderFormOpen: true, storeId: storeDetail?.storeId })
                  setSearchParams({ isStoreDetailModalOpen: false })
                } else {
                  setState({ isLoginRequiredForOrderFormOpen: true })
                }
              }}
              className="button-l w-full rounded-[0.25rem] bg-blue-400 py-[0.75rem] text-white"
            >
              주문 문의하기
            </button>
          </div>
        </div>
      )}

      <EventModal isOpenModal={modalView === 'eventList'} onClose={() => setModalView(null)}>
        <EventSelectionContent
          events={eventList}
          initialSelected={selectedEventIds}
          onAddNew={() => setModalView('newEvent')}
          onClose={handleModalClose}
        />
      </EventModal>
      <ToastMsg message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  )
}
export default StoreDetail
