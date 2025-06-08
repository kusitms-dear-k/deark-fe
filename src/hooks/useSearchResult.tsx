import { useEffect, useState } from 'react'
import { FilterType, ResponseType } from '@/types/common'
import { DesignDetailType } from '@/types/search'
import { useSearchStore } from '@/store/searchStore'
import { useOrderStore } from '@/store/orderStore'
import { getDesignDetailData } from '@/api/searchAPI'
import PriceFilterContent from '@/components/search/PriceFilterContent'
import Filter from '@/components/common/Filter'
import AddressFilterContent from '@/components/search/AddressFilterContent'
import SortFilterContent from '@/components/search/SortFilterContent'
import DateFilterContent from '@/components/search/DateFilterContent'

const useSearchResult = () => {
  // 모달 관련 state
  const isStoreDetailModalOpen = useSearchStore((state) => state.isStoreDetailModalOpen)
  const isDesignDetailModalOpen = useSearchStore((state) => state.isDesignDetailModalOpen)
  const isOrderFormOpen = useOrderStore((state) => state.isOrderFormOpen)
  const isOrderSubmissionSuccessModalOpen = useOrderStore((state) => state.isOrderSubmissionSuccessModalOpen)
  const isLoginRequiredForOrderFormOpen = useOrderStore((state) => state.isLoginRequiredForOrderFormOpen)
  // 필터 관련 state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>('ADDRESS')
  const [selectedFilterContents, setSelectedFilterContents] = useState<string[]>([]) //위치 필터 값
  const [minPrice, setMinPrice] = useState<null | number>(null) //최소 가격 필터 값
  const [maxPrice, setMaxPrice] = useState<null | number>(null) //최대 가격 필터 값
  const [hasUserSelectedPrice, setHasUserSelectedPrice] = useState(false) //가격 필터를 선택 했는지 안했는지 판단하는 state
  //가게 상세보기
  const [storeDetailMenu, setStoreDetailMenu] = useState<'가게 정보' | '디자인' | '리뷰'>('가게 정보')
  const designId = useSearchStore((state) => state.designId) //선택된 designId
  const [designDetail, setDesignDetail] = useState<DesignDetailType>() // 디자인 상세 페이지 데이터
  // zustand 전역 상태
  const totalCount = useSearchStore((state) => state.totalCount)
  const keyword = useSearchStore((state) => state.keyword)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)
  // 가격 중복 리스트
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<
    { minPrice: number | null; maxPrice: number | null }[]
  >([])
  const setState = useOrderStore((state) => state.setState)
  const resetOrderForm = useOrderStore((state) => state.resetOrderForm)

  /**
   * 필터 페이지
   * @param filter 정렬, 위치, 날짜, 가격대
   */
  const renderFilterContent = (filter: FilterType) => {
    switch (filter) {
      case 'SORT':
        return (
          <section className="flex flex-col px-[1.5rem]">
            <SortFilterContent setIsFilterModalOpen={setIsFilterModalOpen} />
          </section>
        )
      case 'ADDRESS':
        return (
          <section>
            <Filter.Menu
              selectedFilterType={selectedFilterType}
              setSelectedFilterType={setSelectedFilterType}
              setIsFilterModalOpen={setIsFilterModalOpen}
            />
            <AddressFilterContent
              selectedFilterContents={selectedFilterContents}
              setSelectedFilterContents={setSelectedFilterContents}
            />
            <Filter.BottomButton
              reset={() => {
                setSearchParams({ locationList: null })
                setIsFilterModalOpen(false)
              }}
              apply={() => {
                setSearchParams({ locationList: selectedFilterContents })
                setIsFilterModalOpen(false)
              }}
              totalResultCount={totalCount}
            />
          </section>
        )
      case 'DATE':
        return (
          <section>
            <Filter.Menu
              setIsFilterModalOpen={setIsFilterModalOpen}
              selectedFilterType={selectedFilterType}
              setSelectedFilterType={setSelectedFilterType}
            />
            <DateFilterContent />
            <Filter.BottomButton
              reset={() => {
                setSearchParams({ startDate: null, endDate: null })
                setIsFilterModalOpen(false)
              }}
              apply={() => setIsFilterModalOpen(false)}
              totalResultCount={totalCount}
            />
          </section>
        )
      case 'PRICE':
        return (
          <section className="flex flex-col justify-start gap-y-[0.125rem] py-[0.438rem]">
            <Filter.Menu
              setIsFilterModalOpen={setIsFilterModalOpen}
              selectedFilterType={selectedFilterType}
              setSelectedFilterType={setSelectedFilterType}
            />
            <PriceFilterContent
              selectedPriceRanges={selectedPriceRanges}
              setSelectedPriceRanges={setSelectedPriceRanges}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              setHasUserSelectedPrice={setHasUserSelectedPrice}
            />
            <Filter.BottomButton
              reset={() => {
                setMinPrice(null)
                setMaxPrice(null)
                setSelectedPriceRanges([]) // 선택된 가격 범위 초기화
                setHasUserSelectedPrice(false) // 사용자 선택 여부도 초기화
                setSearchParams({ minPrice: null, maxPrice: null })
                setIsFilterModalOpen(false)
              }}
              apply={() => {
                setSearchParams({ minPrice: minPrice, maxPrice: maxPrice })
                setIsFilterModalOpen(false)
              }}
              totalResultCount={totalCount}
            />
          </section>
        )
    }
  }

  return {
    resetOrderForm,
    selectedPriceRanges,
    setSelectedPriceRanges,
    isStoreDetailModalOpen,
    isDesignDetailModalOpen,
    isOrderFormOpen,
    isOrderSubmissionSuccessModalOpen,
    isFilterModalOpen,
    setIsFilterModalOpen,
    setState,
    selectedFilterType,
    setSelectedFilterType,
    selectedFilterContents,
    setSelectedFilterContents,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    storeDetailMenu,
    setStoreDetailMenu,
    totalCount,
    keyword,
    setSearchParams,
    designDetail,
    renderFilterContent,
    hasUserSelectedPrice,
    isLoginRequiredForOrderFormOpen,
  }
}
export default useSearchResult
