'use client';

import Header from '@/components/common/Header';
import SearchMenu from '@/components/search/SearchMenu';
import FilterPanel from '@/components/search/FilterPanel';
import DesignSearchResult from '@/components/search/DesignSearchResult';
import StoreSearchResult from '@/components/search/StoreSearchResult';
import SearchSummaryPanel from '@/components/search/SearchSummaryPanel';

const SearchPage = () => {
  return (
    <main className={'flex flex-col min-h-screen'}>
      <div className={'px-5'}>
        <Header headerType={'SEARCH'} />
      </div>
      <SearchMenu />
      <FilterPanel />
      <SearchSummaryPanel />
      <DesignSearchResult />
      <StoreSearchResult />
      <button className={'blue-500-button'}></button>
    </main>
  )
}
export default SearchPage;
