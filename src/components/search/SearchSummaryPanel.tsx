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
    <div className="mt-[15rem] flex justify-between px-[1.25rem] py-[0.25rem]">
      <div className="caption-l py-[0.438rem] text-gray-400">총 {totalCount}개</div>
      <button
        onClick={() => {
          setSelectedFilterType('SORT')
          setSortModalOpen(true)
        }}
        className="body-s flex items-center px-[0.75rem] py-[0.375rem] text-gray-900"
      >
        {renderSortTypeByKor(sortType)}순
        <FillDropDownIcon width={20} height={20} />
      </button>
    </div>
  )
}
export default SearchSummaryPanel
