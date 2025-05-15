'use client';

import { useState } from 'react';

import { FilterType } from '@/types/common';
import Header from '@/components/common/Header';
import SearchMenu from '@/components/search/SearchMenu';
import FilterPanel from '@/components/search/FilterPanel';
import DesignSearchResult from '@/components/search/DesignSearchResult';
import StoreSearchResult from '@/components/search/StoreSearchResult';
import SearchSummaryPanel from '@/components/search/SearchSummaryPanel';
import Filter from '@/components/common/Filter';
import AddressFilterContent from '@/components/search/AddressFilterContent';
import PriceFilterContent from '@/components/search/PriceFilterContent';
import SortFilterContent from '@/components/search/SortFilterContent';
import StoreDetailModal from '@/components/search/StoreDetailModal';


const SearchPage = () => {
  const [searchMenu, setSearchMenu] = useState<'디자인' | '스토어'>('디자인');
  const [sort, setSort] = useState<'정확도' | '최신순' | '인기순'>('정확도');
  const [sortModalOpen, setSortModalOpen] = useState(false);

  const [isStoreDetailModalOpen, setIsStoreDetailModalOpen] = useState(true);

  const renderFilterContent = (filter: FilterType) => {
    switch (filter) {
      case 'SORT':
        return (
          <section className="flex flex-col px-[24px]">
            <SortFilterContent />
          </section>
        );
      case 'ADDRESS':
        return (
          <section>
            <Filter.Menu />
            <AddressFilterContent />
            <Filter.BottomButton />
          </section>
        );
      case 'DATE':
        return (
          <section>
            <Filter.Menu />
            <Filter.BottomButton />
          </section>
        );
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
      {isStoreDetailModalOpen && <StoreDetailModal />}
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
