import { BlueCheckIcon } from '@/assets/svgComponents'
import { useSearchStore } from '@/store/search'
import { SortType } from '@/types/search'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>
}

const SortFilterContent = (props: Props) => {
  const { setIsFilterModalOpen } = props
  const sortType = useSearchStore((state) => state.sortType)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  const sortContents: { filterContent: '정확도' | '최신순' | '인기순'; sortType: SortType }[] = [
    { filterContent: '정확도', sortType: 'ACCURACY' },
    { filterContent: '최신순', sortType: 'LATEST' },
    { filterContent: '인기순', sortType: 'POPULARITY' },
  ]

  return (
    <>
      {sortContents.map((sortContent) => {
        return (
          <button
            onClick={() => {
              setSearchParams({ sortType: sortContent.sortType })
              setIsFilterModalOpen(false)
            }}
            key={sortContent.filterContent}
            className={
              sortContent.sortType === sortType
                ? 'body-l-m flex items-center justify-between border-b border-gray-200 py-[6px]'
                : 'body-l flex items-center justify-between border-b border-gray-200 py-[10px] text-gray-400'
            }
          >
            {sortContent.filterContent}
            {sortContent.sortType === sortType && <BlueCheckIcon width={22} height={34} className="object-cover" />}
          </button>
        )
      })}
    </>
  )
}
export default SortFilterContent
