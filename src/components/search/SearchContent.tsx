import SearchMenu from '@/components/search/SearchMenu'
import FilterPanel from '@/components/search/FilterPanel'
import SearchSummaryPanel from '@/components/search/SearchSummaryPanel'
import StoreSearchResult from '@/components/search/StoreSearchResult'
import DesignSearchResult from '@/components/search/DesignSearchResult'
import { Dispatch, SetStateAction, useState } from 'react'
import { FilterType } from '@/types/common'
import { useSearchStore } from '@/store/searchStore'

interface Props {
  searchMenuClassname?: string
  FilterPanelClassname?: string
  SearchSummaryPanelClassname?: string
  isFilterModalOpen: boolean
  selectedFilterType: FilterType
  setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>
  setSelectedFilterType: Dispatch<SetStateAction<FilterType>>
  totalCount: number
  hasUserSelectedPrice: boolean
}

const SearchContent = (props: Props) => {
  const {searchMenuClassname, FilterPanelClassname, SearchSummaryPanelClassname, isFilterModalOpen, selectedFilterType, setIsFilterModalOpen, setSelectedFilterType, totalCount, hasUserSelectedPrice} = props

  const [searchMenu, setSearchMenu] = useState<'디자인' | '스토어'>('디자인')
  const sortType = useSearchStore((state) => state.sortType)

  return (
    <>
      <SearchMenu className={searchMenuClassname} searchMenu={searchMenu} setSearchMenu={setSearchMenu} />
      <FilterPanel
        hasUserSelectedPrice={hasUserSelectedPrice}
        className={FilterPanelClassname}
        isFilterModalOpen={isFilterModalOpen}
        selectedFilterType={selectedFilterType}
        setIsFilterModalOpen={setIsFilterModalOpen}
        setSelectedFilterType={setSelectedFilterType}
      />
      <SearchSummaryPanel
        className={SearchSummaryPanelClassname}
        totalCount={totalCount}
        sortType={sortType}
        setSelectedFilterType={setSelectedFilterType}
        setSortModalOpen={setIsFilterModalOpen}
      />
      {searchMenu === '스토어' ? <StoreSearchResult /> : <DesignSearchResult />}
    </>
  )
}
export default SearchContent
