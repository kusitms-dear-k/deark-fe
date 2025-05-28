import { FillDropDownIcon } from '@/assets/svgComponents'
import { Dispatch, SetStateAction } from 'react'
import { SortType } from '@/types/search'
import { FilterType } from '@/types/common'

interface Props {
  className?: string
  totalCount: number
  sortType: SortType
  setSortModalOpen: Dispatch<SetStateAction<boolean>>
  setSelectedFilterType: Dispatch<SetStateAction<FilterType>>
}

const SearchSummaryPanel = (props: Props) => {
  const { className='mt-[15rem]', totalCount, sortType, setSortModalOpen, setSelectedFilterType } = props

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
    <div className={`${className ? className : ''} flex justify-between px-[1.25rem] py-[0.25rem]`}>
      <div className="caption-l py-[0.438rem] text-gray-400">총 {totalCount}개</div>
      <button
        disabled={totalCount === 0}
        onClick={() => {
          setSelectedFilterType('SORT')
          setSortModalOpen(true)
        }}
        className={
          totalCount === 0
            ? 'body-s flex items-center px-[0.75rem] py-[0.375rem] text-gray-400'
            : 'body-s flex items-center px-[0.75rem] py-[0.375rem] text-gray-900'
        }
      >
        {renderSortTypeByKor(sortType)}순
        <div className="relative">
          {totalCount === 0 && <div className="absolute h-[20px] w-[20px] bg-white object-cover opacity-[60%]" />}
          <FillDropDownIcon width={20} height={20} />
        </div>
      </button>
    </div>
  )
}
export default SearchSummaryPanel
