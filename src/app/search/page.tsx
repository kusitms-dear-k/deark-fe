'use client';

import Header from '@/components/common/Header';
import SearchMenu from '@/components/search/SearchMenu';
import FilterPanel from '@/components/search/FilterPanel';
import DesignSearchResult from '@/components/search/DesignSearchResult';
import StoreSearchResult from '@/components/search/StoreSearchResult';
import SearchSummaryPanel from '@/components/search/SearchSummaryPanel';
import { useState } from 'react';
import Filter from '@/components/common/Filter';
import Image from 'next/image';

const SearchPage = () => {
  const [searchMenu, setSearchMenu] = useState<'디자인' | '스토어'>('디자인')
  const [sort, setSort] = useState<'정확도' | '최신순' | '인기순'>('정확도')
  const [sortModalOpen, setSortModalOpen] = useState(true)

  const renderFilterContent = (filter: 'sort') => {
    switch (filter) {
      case 'sort':
        return (
          <section className={'flex flex-col px-[24px]'}>
            <button className={'flex justify-between items-center body-l py-[10px] border-b border-[var(--gray-200)]'}>
              정확도
              <div className={'relative w-[14px] h-[10px]'}>
                <Image src={'/search/blue-check.svg'} alt={'check'} fill className={'object-cover'} />
              </div>
            </button>
            <button
              className={'flex justify-between  body-l py-[10px] text-[var(--gray-400)] border-b border-[var(--gray-200)]'}>최신순
            </button>
            <button
              className={'flex  justify-between body-l py-[10px] text-[var(--gray-400)] border-b border-[var(--gray-200)]'}>인기순
            </button>
          </section>
        )

    }
  }

  return (
    <main className={'flex min-h-screen flex-col'}>
      {sortModalOpen && (
        <Filter>
          {renderFilterContent('sort')}
        </Filter>
      )}
      <div className={'px-5'}>
        <Header headerType={'SEARCH'} />
      </div>
      <SearchMenu searchMenu={searchMenu} setSearchMenu={setSearchMenu} />
      <FilterPanel />
      <SearchSummaryPanel sort={sort} setSortModalOpen={setSortModalOpen} />
      <DesignSearchResult searchMenu={searchMenu} />
      <StoreSearchResult />
    </main>
  );
}
export default SearchPage;
