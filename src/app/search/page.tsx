'use client';

import { useEffect, useState } from 'react'

import { FilterType, ResponseType } from '@/types/common'
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
import { useSearchStore } from '@/store/searchStore'
import DesignDetailContent from '@/components/search/DesignDetailContent'
import { AnimatePresence } from 'framer-motion'
import StoreDetail from '@/components/search/StoreDetail'
import { getDesignDetailData } from '@/api/searchAPI'
import { DesignDetailType } from '@/types/search'

const SearchPage = () => {
  const [searchMenu, setSearchMenu] = useState<'디자인' | '스토어'>('디자인')
  // 모달 관련 state
  const isStoreDetailModalOpen = useSearchStore((state) => state.isStoreDetailModalOpen)
  const isDesignDetailModalOpen = useSearchStore((state) => state.isDesignDetailModalOpen)
  // 필터 관련 state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>('ADDRESS')
  const [selectedFilterContents, setSelectedFilterContents] = useState<string[]>([]) //위치 필터 값
  const [minPrice, setMinPrice] = useState<null | number>(null) //최소 가격 필터 값
  const [maxPrice, setMaxPrice] = useState<null | number>(null) //최대 가격 필터 값
  //가게 상세보기
  const [storeDetailMenu, setStoreDetailMenu] = useState<'가게 정보' | '디자인' | '리뷰'>('가게 정보')
  const designId = useSearchStore((state) => state.designId) //선택된 designId
  const [designDetail, setDesignDetail] = useState<DesignDetailType>() // 디자인 상세 페이지 데이터
  // zustand 전역 상태
  const sortType = useSearchStore((state) => state.sortType)
  const totalCount = useSearchStore((state) => state.totalCount)
  const keyword = useSearchStore((state) => state.keyword)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  /**
   * 스토어,디자인 상세페이지 데이터 불러오기
   */
  useEffect(() => {
    // 1. 초기 상태 실행
    getDesignDetailData(designId)
      .then((res: ResponseType<DesignDetailType>) => {
        console.log('디자인 상세', res.results)
        setDesignDetail(res.results)
      })
      .catch(console.error)

    // 2. 이후 상태 변화 감지
    const unsubscribe = useSearchStore.subscribe((currentStatus, prevState) => {
      getDesignDetailData(currentStatus.designId)
        .then((res) => {
          console.log('디자인 상세:', res)
          setDesignDetail(res.results)
        })
        .catch(console.error)
    })

    return () => unsubscribe()
  }, [])

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
              totalResultCount={totalCount}
            />
          </section>
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* 필터 모달 */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <Filter setIsFilterModalOpen={setIsFilterModalOpen}>{renderFilterContent(selectedFilterType)}</Filter>
        )}
      </AnimatePresence>

      {/* 가게 상세 페이지 모달 */}
      {isStoreDetailModalOpen && (
        <AnimatePresence>
          <BottomModal onClick={() => setSearchParams({ isStoreDetailModalOpen: false })}>
            <StoreDetail setStoreDetailMenu={setStoreDetailMenu} storeDetailMenu={storeDetailMenu} />
          </BottomModal>
        </AnimatePresence>
      )}

      {/* 디자인 상세 페이지 모달 */}
      {isDesignDetailModalOpen && (
        <AnimatePresence>
          <BottomModal onClick={() => setSearchParams({ isDesignDetailModalOpen: false })}>
            <DesignDetailContent designDetail={designDetail} />
          </BottomModal>
        </AnimatePresence>
      )}
      <Header headerType="SEARCH" keyword={keyword} />
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
  );
};
export default SearchPage;
