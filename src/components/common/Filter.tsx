import { Dispatch, SetStateAction } from 'react'
import { FilterType } from '@/types/common'
import { CancelIcon } from '@/assets/svgComponents'
import { motion } from 'framer-motion'

const Filter = ({
  children,
  setIsFilterModalOpen,
}: {
  children: React.ReactNode
  setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div
      onClick={() => {
        setIsFilterModalOpen(false)
      }}
      className="fixed inset-0 z-50 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 min-h-[20.375rem] w-full rounded-t-[1rem] bg-white py-[1.25rem]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
export default Filter

const Menu = ({
  selectedFilterType,
  setSelectedFilterType,
  setIsFilterModalOpen,
}: {
  selectedFilterType: FilterType
  setSelectedFilterType: Dispatch<SetStateAction<FilterType>>
  setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className="border-gray-150 flex items-center justify-between border-b px-[1.25rem] pb-[1rem]">
      <div className="flex items-center gap-x-[1.5rem]">
        <button
          onClick={() => {
            setSelectedFilterType('ADDRESS')
          }}
          className={selectedFilterType === 'ADDRESS' ? 'title-xl text-black' : 'title-xl text-gray-300'}
        >
          위치
        </button>
        <button
          onClick={() => {
            setSelectedFilterType('DATE')
          }}
          className={selectedFilterType === 'DATE' ? 'title-xl text-black' : 'title-xl text-gray-300'}
        >
          날짜
        </button>
        <button
          onClick={() => {
            setSelectedFilterType('PRICE')
          }}
          className={selectedFilterType === 'PRICE' ? 'title-xl text-black' : 'title-xl text-gray-300'}
        >
          가격대
        </button>
      </div>

      <CancelIcon
        onClick={() => {
          setIsFilterModalOpen(false)
        }}
        width="100%"
        height="100%"
        className="h-[1.5rem] w-[1.5rem]"
      />
    </div>
  )
}

const BottomButton = ({
  reset,
  apply,
  totalResultCount,
}: {
  reset: () => void
  apply?: () => void
  totalResultCount: number
}) => {
  return (
    <div className="border-gray-150 flex gap-x-[0.5rem] border-t px-[1.25rem] pt-[1.25rem] pb-[0.5rem]">
      <button onClick={reset} className="button-l w-[7.125rem] rounded-[0.25rem] bg-gray-200 px-[1.75rem] py-[0.75rem]">
        초기화
      </button>
      <button
        onClick={apply ? apply : undefined}
        className="button-l w-full rounded-[0.25rem] bg-blue-400 py-[0.75rem] text-white"
      >
        {totalResultCount}개 결과보기
      </button>
    </div>
  )
}

Filter.Menu = Menu
Filter.BottomButton = BottomButton