import { FillDropDownIcon } from '@/assets/svgComponents'
import { Dispatch, SetStateAction } from 'react'
import { SortType } from '@/types/search'
import { FilterType } from '@/types/common'

interface Props {
  totalCount: number
  sortType: SortType
  setSortModalOpen: Dispatch<SetStateAction<boolean>>
  setSelectedFilterType: Dispatch<SetStateAction<FilterType>>
}

const SearchSummaryPanel = (props: Props) => {
  const { totalCount, sortType, setSortModalOpen, setSelectedFilterType } = props

  const renderSortTypeByKor = (sortType: SortType) => {
    switch (sortType) {
      case 'ACCURACY':
        return '정확도'
      case 'LATEST':
        return '최신'
      default:
        return '인기'
    }
  }

  return (
    <div className={'flex justify-between border-t border-[var(--gray-150)] px-5 py-1'}>
      <div className={'caption-l py-[7px] text-[var(--gray-400)]'}>총 {totalCount}개</div>
      <button
        onClick={() => {
          setSelectedFilterType('SORT')
          setSortModalOpen(true)
        }}
        className={'body-s flex items-center px-3 py-[6px] text-[var(--gray-900)]'}
      >
        {renderSortTypeByKor(sortType)}순
        <FillDropDownIcon width={20} height={20} />
      </button>
    </div>
  )
}
export default SearchSummaryPanel
