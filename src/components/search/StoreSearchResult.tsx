import { useEffect, useRef } from 'react'
import { useSearchStore } from '@/store/searchStore'
import { ResponseType } from '@/types/common'
import { StoreListResponseType } from '@/types/search'
import { useInfiniteStoreSearch } from '@/api/hooks/search/useInfiniteStoreSearch'
import NoSearchResults from '@/components/search/NoSearchResults'
import StoreCard from '@/components/search/StoreCard'
import StoreCardSkeleton from '@/components/skeleton/StoreCardSkeleton'

interface Props {}

const StoreSearchResult = (props: Props) => {
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

  return (
    <div className="pb-[5.625rem]">
      {searchResults ? (
        searchResults.length > 0 ? (
          searchResults.map((items, index) => {
            return (
              <section
                key={index}
                className={
                  items.results.storeList.length > 0
                    ? 'flex flex-col gap-y-[1rem] py-[0.5rem] pl-[1.25rem]'
                    : ''
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
    </div>
  )
}
export default StoreSearchResult
