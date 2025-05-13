'use client'

import { useState } from 'react'

import { FilterType } from '@/types/common'
import Header from '@/components/common/Header'
import SearchMenu from '@/components/search/SearchMenu'
import FilterPanel from '@/components/search/FilterPanel'
import DesignSearchResult from '@/components/search/DesignSearchResult'
import StoreSearchResult from '@/components/search/StoreSearchResult'
import SearchSummaryPanel from '@/components/search/SearchSummaryPanel'
import Filter from '@/components/common/Filter'
import AddressFilterContent from '@/components/search/AddressFilterContent'
import PriceFilterContent from '@/components/search/PriceFilterContent'
import SortFilterContent from '@/components/search/SortFilterContent'
import BottomModal from '@/components/common/BottomModal'
import StoreProfile from '@/components/search/StoreProfile'
import StoreDetailMenu from '@/components/search/StoreDetailMenu'
import StoreReview from '@/components/search/StoreReview'
import StoreDesign from '@/components/search/StoreDesign'
import StoreInfo from '@/components/search/StoreInfo'
import { useSearchStore } from '@/store/search'
import DesignDetailContent from '@/components/search/DesignDetailContent'

const SearchPage = () => {
  const [searchMenu, setSearchMenu] = useState<'디자인' | '스토어'>('디자인')
  // 모달 관련 state
  const [isStoreDetailModalOpen, setIsStoreDetailModalOpen] = useState(false)
  const [isDesignDetailModalOpen, setIsDesignDetailModalOpen] = useState(false)
  // 필터 관련 state
  const [sort, setSort] = useState<'정확도' | '최신순' | '인기순'>('정확도')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>('ADDRESS')
  const [selectedFilterContents, setSelectedFilterContents] = useState<string[]>([]) //위치 필터 값
  const [minPrice, setMinPrice] = useState<null | number>(null) //최소 가격 필터 값
  const [maxPrice, setMaxPrice] = useState<null | number>(null) //최대 가격 필터 값
  //가게 상세보기
  const [storeDetailMenu, setStoreDetailMenu] = useState<'가게 정보' | '디자인' | '리뷰'>('가게 정보')
  // zustand 전역 상태
  const sortType = useSearchStore((state) => state.sortType)
  const totalCount = useSearchStore((state) => state.totalCount)
  const locationFilterResultCount = useSearchStore((state) => state.locationFilterResultCount)
  const priceFilterResultCount = useSearchStore((state) => state.priceFilterResultCount)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  /**
   * 가게 상세 페이지
   * @param storeDetailMenu 가게 상세 페이지 메뉴
   */
  const renderStoreDetailContent = (storeDetailMenu: '가게 정보' | '디자인' | '리뷰') => {
    switch (storeDetailMenu) {
      case '리뷰':
        return <StoreReview />
      case '디자인':
        return <StoreDesign />
      default:
        return <StoreInfo />
    }
  }

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
              totalResultCount={locationFilterResultCount}
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
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              maxPrice={maxPrice}
            />
            <Filter.BottomButton
              reset={() => {
                setMinPrice(null)
                setMaxPrice(null)
                setSearchParams({ minPrice: null, maxPrice: null })
                setIsFilterModalOpen(false)
              }}
              apply={() => {
                setSearchParams({ minPrice: minPrice, maxPrice: maxPrice })
                setIsFilterModalOpen(false)
              }}
              totalResultCount={priceFilterResultCount}
            />
          </section>
        )
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* 필터 모달 */}
      {isFilterModalOpen && (
        <Filter setIsFilterModalOpen={setIsFilterModalOpen}>{renderFilterContent(selectedFilterType)}</Filter>
      )}

      {/* 가게 상세 페이지 모달 */}
      {isStoreDetailModalOpen && (
        <BottomModal>
          <>
            <StoreProfile />
            <StoreDetailMenu storeDetailMenu={storeDetailMenu} setStoreDetailMenu={setStoreDetailMenu} />
            {renderStoreDetailContent(storeDetailMenu)}
            <div className={'border-gray-150 bottom-0 w-full border-t bg-white px-[1.25rem] pt-[1.25rem]'}>
              <button className={'button-l w-full rounded-[0.25rem] bg-blue-400 py-[0.75rem] text-white'}>
                주문하러 가기
              </button>
            </div>
          </>
        </BottomModal>
      )}

      {/* 디자인 상세 페이지 모달 */}
      {isDesignDetailModalOpen && (
        <BottomModal>
          <DesignDetailContent />
        </BottomModal>
      )}
      <div className="px-[1.25rem]">
        <Header headerType="SEARCH" />
      </div>
      <SearchMenu searchMenu={searchMenu} setSearchMenu={setSearchMenu} />
      <FilterPanel
        isFilterModalOpen={isFilterModalOpen}
        selectedFilterType={selectedFilterType}
        setIsFilterModalOpen={setIsFilterModalOpen}
        setSelectedFilterType={setSelectedFilterType}
      />
      <SearchSummaryPanel
        totalCount={totalCount}
        sortType={sortType}
        setSelectedFilterType={setSelectedFilterType}
        setSortModalOpen={setIsFilterModalOpen}
      />
      {searchMenu === '스토어' ? <StoreSearchResult /> : <DesignSearchResult />}
    </main>
  )
}
export default SearchPage
