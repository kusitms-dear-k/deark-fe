'use client';

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
import Image from 'next/image'

const SearchPage = () => {
  const [searchMenu, setSearchMenu] = useState<'디자인' | '스토어'>('디자인')
  const [sort, setSort] = useState<'정확도' | '최신순' | '인기순'>('정확도')
  const [sortModalOpen, setSortModalOpen] = useState(false)
  const [isStoreDetailModalOpen, setIsStoreDetailModalOpen] = useState(true)
  const [isDesignDetailModalOpen, setIsDesignDetailModalOpen] = useState(false)

  const [storeDetailMenu, setStoreDetailMenu] = useState<'가게 정보' | '디자인' | '리뷰'>('가게 정보')

  const renderContent = (storeDetailMenu: '가게 정보' | '디자인' | '리뷰') => {
    switch (storeDetailMenu) {
      case '리뷰':
        return <StoreReview />
      case '디자인':
        return <StoreDesign />
      default:
        return <StoreInfo />
    }
  }

  const renderFilterContent = (filter: FilterType) => {
    switch (filter) {
      case 'SORT':
        return (
          <section className="flex flex-col px-[24px]">
            <SortFilterContent />
          </section>
        )
      case 'ADDRESS':
        return (
          <section>
            <Filter.Menu />
            <AddressFilterContent />
            <Filter.BottomButton />
          </section>
        )
      case 'DATE':
        return (
          <section>
            <Filter.Menu />
            <Filter.BottomButton />
          </section>
        )
      case 'PRICE':
        return (
          <section className="flex flex-col justify-start gap-y-[2px] py-[7px]">
            <Filter.Menu />
            <PriceFilterContent />
            <Filter.BottomButton />
          </section>
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {sortModalOpen && <Filter>{renderFilterContent('ADDRESS')}</Filter>}
      {isStoreDetailModalOpen && (
        <BottomModal>
          <>
            <StoreProfile />
            <StoreDetailMenu storeDetailMenu={storeDetailMenu} setStoreDetailMenu={setStoreDetailMenu} />
            {renderContent(storeDetailMenu)}
            <div className={'bottom-0 w-full border-t border-[var(--gray-150)] bg-[var(--white)] px-5 pt-5'}>
              <button className={'button-l w-full rounded-[4px] bg-[var(--blue-400)] py-3 text-[var(--white)]'}>
                주문하러 가기
              </button>
            </div>
          </>
        </BottomModal>
      )}
      {isDesignDetailModalOpen && (
        <BottomModal>
          <div className={'flex w-full flex-col overflow-y-scroll'}>
            <h3 className="title-m my-3 flex w-full items-center justify-center">메리고라운드</h3>
            <div className="relative h-[360px]">
              <Image src="/common/cake1.png" alt="케이크" fill className="object-cover" />
            </div>
            <section className="border-gray-150 border-b p-5">
              <div className="flex items-center justify-between">
                <h4 className="title-l">블루리안 케이크</h4>
                <p className="caption-m text-gray-700">1,452</p>
              </div>
              <p className="body-m mt-1 text-gray-800">
                아이들에게 인기만점! 여러가지 수채화 색깔로 디자인해 상큼한 맛과 분위기가 매력적인 케이크입니다.
              </p>
              <p className="title-xl">20000원~</p>
            </section>
            <section className="p-5">
              <h4 className="title-l">케이크 옵션</h4>
              <div className="mt-4 flex flex-col gap-y-[18px]">
                <div className="flex gap-x-[21px]">
                  <p className="title-s text-gray-700">크기</p>
                  <div className="flex items-center gap-x-[6px]">
                    <div className="chip-s bg-gray-150 rounded-[2.4px] px-[7.2px] py-[3.5px]">한 입 케이크</div>
                    <div className="chip-s bg-gray-150 rounded-[2.4px] px-[7.2px] py-[3.5px]">도시락 케이크</div>
                    <div className="chip-s bg-gray-150 rounded-[2.4px] px-[7.2px] py-[3.5px]">1호</div>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <p className="title-s text-gray-700">크림 맛</p>
                  <div className="flex items-center gap-x-[6px]">
                    <div className="chip-s bg-gray-150 rounded-[2.4px] px-[7.2px] py-[3.5px]">생크림</div>
                    <div className="chip-s bg-gray-150 rounded-[2.4px] px-[7.2px] py-[3.5px]">딸기크림</div>
                    <div className="chip-s bg-gray-150 rounded-[2.4px] px-[7.2px] py-[3.5px]">초코크림</div>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <p className="title-s text-gray-700">시트 맛</p>
                  <div className="flex items-center gap-x-[6px]">
                    <div className="chip-s bg-gray-150 rounded-[2.4px] px-[7.2px] py-[3.5px]">기본</div>
                    <div className="chip-s bg-gray-150 rounded-[2.4px] px-[7.2px] py-[3.5px]">바나나</div>
                    <div className="chip-s bg-gray-150 rounded-[2.4px] px-[7.2px] py-[3.5px]">얼그레이</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className={'bottom-0 w-full border-t border-[var(--gray-150)] bg-[var(--white)] px-5 pt-5'}>
            <button className={'button-l w-full rounded-[4px] bg-[var(--blue-400)] py-3 text-[var(--white)]'}>
              주문하러 가기
            </button>
          </div>
        </BottomModal>
      )}
      <div className="px-5">
        <Header headerType="SEARCH" />
      </div>
      <SearchMenu searchMenu={searchMenu} setSearchMenu={setSearchMenu} />
      <FilterPanel />
      <SearchSummaryPanel sort={sort} setSortModalOpen={setSortModalOpen} />
      <DesignSearchResult searchMenu={searchMenu} />
      <StoreSearchResult />
    </main>
  );
};
export default SearchPage;
