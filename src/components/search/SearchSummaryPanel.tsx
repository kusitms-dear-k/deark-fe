import { FillDropDownIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  sort: '정확도' | '최신순' | '인기순'
  setSortModalOpen: Dispatch<SetStateAction<boolean>>
}

const SearchSummaryPanel = (props: Props) => {
  const { sort, setSortModalOpen } = props
  return (
    <div className={'flex justify-between border-t border-[var(--gray-150)] px-5 py-1'}>
      <div className={'caption-l py-[7px] text-[var(--gray-400)]'}>총 112개</div>
      <button
        onClick={() => {
          setSortModalOpen(true)
        }}
        className={'body-s flex items-center px-3 py-[6px] text-[var(--gray-900)]'}
      >
        {sort}순
        <FillDropDownIcon width={20} height={20} />
      </button>
    </div>
  )
}
export default SearchSummaryPanel