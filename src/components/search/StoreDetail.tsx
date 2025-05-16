import StoreProfile from '@/components/search/StoreProfile'
import StoreDetailMenu from '@/components/search/StoreDetailMenu'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import StoreReview from '@/components/search/StoreReview'
import StoreDesign from '@/components/search/StoreDesign'
import StoreInfo from '@/components/search/StoreInfo'
import { StoreDesignListResponseType, StoreDetailType } from '@/types/search'
import { useSearchStore } from '@/store/searchStore'
import { getStoreDetailData } from '@/api/searchAPI'
import { ResponseType } from '@/types/common'
import { useInfiniteStoreDesign } from '@/api/hooks/search/useInfiniteStoreDesign'

interface Props {
  storeDetailMenu: '디자인' | '가게 정보' | '리뷰'
  setStoreDetailMenu: Dispatch<SetStateAction<'디자인' | '가게 정보' | '리뷰'>>
}

const StoreDetail = (props: Props) => {
  const { storeDetailMenu, setStoreDetailMenu } = props
  const [storeDetail, setStoreDetail] = useState<StoreDetailType>() // 가게 상세 페이지 데이터
  const storeId = useSearchStore((state) => state.storeId) //선택된 storeId
  const sizeName = useSearchStore((state) => state.sizeName) //케이크 필터

  // 무한스크롤 훅 호출
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteStoreDesign({
    pageParam: 0,
    count: 4,
    storeId: storeId,
    sizeName: sizeName,
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
  const searchResults: ResponseType<StoreDesignListResponseType>[] | undefined = data ? data.pages : undefined

  /**
   * 스토어 상세 페이지 데이터 불러오기
   */
  useEffect(() => {
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
  }, [])

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

  return (
    <>
      {storeDetail ? (
        <>
          <StoreProfile
            storeName={storeDetail.storeName}
            storeAddress={storeDetail.storeAddress}
            likeCount={storeDetail.likeCount}
            storeImageUrl={storeDetail.storeImageUrl}
          />
          <StoreDetailMenu storeDetailMenu={storeDetailMenu} setStoreDetailMenu={setStoreDetailMenu} />
          {renderStoreDetailContent(storeDetailMenu)}
          <div className={'border-gray-150 bottom-0 z-10 w-full border-t bg-white px-[1.25rem] pt-[1.25rem]'}>
            <button className={'button-l w-full rounded-[0.25rem] bg-blue-400 py-[0.75rem] text-white'}>
              주문하러 가기
            </button>
          </div>
        </>
      ) : (
        //TODO: skeleton-ui
        <div></div>
      )}
    </>
  )
}
export default StoreDetail
