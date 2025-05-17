import {
  BlueCakeIcon,
  BlueClockIcon,
  BlueDropDownIcon,
  DropDownIcon,
  GrayCakeIcon,
  GrayCalendarIcon,
  GrayClockIcon,
  WhiteCalendarIcon,
} from '@/assets/svgComponents'
import { Dispatch, SetStateAction } from 'react'
import { FilterType } from '@/types/common'
import { useSearchStore } from '@/store/searchStore'

interface Props {
  isFilterModalOpen: boolean
  setSelectedFilterType: Dispatch<SetStateAction<FilterType>>
  setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>
  selectedFilterType: FilterType
}

const FilterPanel = (props: Props) => {
  const { isFilterModalOpen, setIsFilterModalOpen, setSelectedFilterType, selectedFilterType } = props

  const searchState = useSearchStore.getState()
  const isLunchBoxCake = useSearchStore((state) => state.isLunchBoxCake)
  const isSelfService = useSearchStore((state) => state.isSelfService)
  const isSameDayOrder = useSearchStore((state) => state.isSameDayOrder)
  const locationList = useSearchStore((state) => state.locationList)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  const formatPriceContent = (minPrice: null | number, maxPrice: null | number) => {
    if (minPrice === 0 && maxPrice !== null) return `~${maxPrice} 이하`
    if (minPrice !== 0 && maxPrice !== null) return `${minPrice}~${maxPrice}`
    if (minPrice !== 0 && maxPrice === null) return `${minPrice} 이상`
  }

  const handleIsSelfServiceClick = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'filter-isSelfService');
    }
  };

  const handleIsLunchBoxCakeClick = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'filter-isSelfService');
    }
  };

  return (
    <section className="border-gray-150 fixed top-[11.063rem] z-30 flex w-full items-center gap-x-[0.5rem] overflow-x-scroll border-b bg-white py-[0.75rem] pl-[1.25rem]">
      <button
        onClick={() => {
          setSearchParams({ isSameDayOrder: !searchState.isSameDayOrder })
        }}
        className={
          isSameDayOrder
            ? 'flex h-fit items-center gap-x-[0.375rem] rounded-[1.25rem] bg-blue-400 px-[0.813rem] py-[0.313rem] whitespace-nowrap text-white'
            : 'flex h-fit items-center gap-x-[0.375rem] rounded-[1.25rem] border border-gray-200 px-[0.813rem] py-[0.313rem] whitespace-nowrap'
        }
      >
        <div className="relative h-[1.5rem] w-[1.5rem]">
          {isSameDayOrder ? (
            <WhiteCalendarIcon className="object-cover" width="100%" height="100%" />
          ) : (
            <GrayCalendarIcon className="object-cover" width="100%" height="100%" />
          )}
        </div>
        <p className={isSameDayOrder ? 'body-m text-white' : 'body-m text-gray-500'}>당일 주문</p>
      </button>

      <div className="h-[1.5rem] border-l border-gray-200" />

      <button
        onClick={() => {
          setIsFilterModalOpen(true)
          setSelectedFilterType('ADDRESS')
        }}
        className={
          locationList && locationList.length > 0
            ? 'flex h-fit items-center gap-x-[0.125rem] rounded-[1.25rem] border border-blue-400 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
            : selectedFilterType === 'ADDRESS' && isFilterModalOpen
              ? 'flex h-fit items-center gap-x-[0.125rem] rounded-[1.25rem] border border-blue-400 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
              : 'flex h-fit items-center gap-x-[0.125rem] rounded-[1.25rem] border border-gray-200 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
        }
      >
        <p
          className={
            locationList && locationList.length > 0
              ? 'body-m text-blue-400'
              : selectedFilterType === 'ADDRESS' && isFilterModalOpen
                ? 'body-m text-blue-400'
                : 'body-m text-gray-500'
          }
        >
          위치 {locationList && locationList.length > 0 ? locationList?.length : null}
        </p>

        <div className="relative h-[1.25rem] w-[1.25rem]">
          {locationList && locationList.length > 0 ? (
            <BlueDropDownIcon className="object-cover" width="100%" height="100%" />
          ) : selectedFilterType === 'ADDRESS' && isFilterModalOpen ? (
            <BlueDropDownIcon className="object-cover" width="100%" height="100%" />
          ) : (
            <DropDownIcon className="object-cover" width="100%" height="100%" />
          )}
        </div>
      </button>

      <button
        onClick={() => {
          setIsFilterModalOpen(true)
          setSelectedFilterType('DATE')
        }}
        className={
          selectedFilterType === 'DATE' && isFilterModalOpen
            ? 'flex h-fit items-center gap-x-[0.125rem] rounded-[1.25rem] border border-blue-400 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
            : 'flex h-fit items-center gap-x-[0.125rem] rounded-[1.25rem] border border-gray-200 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
        }
      >
        <p
          className={
            selectedFilterType === 'DATE' && isFilterModalOpen ? 'body-m text-blue-400' : 'body-m text-gray-500'
          }
        >
          날짜
        </p>
        <div className="relative h-[1.25rem] w-[1.25rem]">
          {selectedFilterType === 'DATE' && isFilterModalOpen ? (
            <BlueDropDownIcon className="object-cover" width="100%" height="100%" />
          ) : (
            <DropDownIcon className="object-cover" width="100%" height="100%" />
          )}
        </div>
      </button>

      <button
        onClick={() => {
          setIsFilterModalOpen(true)
          setSelectedFilterType('PRICE')
        }}
        className={
          !(searchState.minPrice === null && searchState.maxPrice === null)
            ? 'flex h-fit items-center gap-x-[0.125rem] rounded-[1.25rem] border border-blue-400 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
            : selectedFilterType === 'PRICE' && isFilterModalOpen
              ? 'flex h-fit items-center gap-x-[0.125rem] rounded-[1.25rem] border border-blue-400 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
              : 'flex h-fit items-center gap-x-[0.125rem] rounded-[1.25rem] border border-gray-200 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
        }
      >
        <p
          className={
            !(searchState.minPrice === null && searchState.maxPrice === null)
              ? 'body-m text-blue-400'
              : selectedFilterType === 'PRICE' && isFilterModalOpen
                ? 'body-m text-blue-400'
                : 'body-m text-gray-500'
          }
        >
          {searchState.minPrice === null && searchState.maxPrice === null
            ? '가격대'
            : formatPriceContent(searchState.minPrice, searchState.maxPrice)}
        </p>
        <div className="relative h-[1.25rem] w-[1.25rem]">
          {!(searchState.minPrice === null && searchState.maxPrice === null) ? (
            <BlueDropDownIcon className="object-cover" width="100%" height="100%" />
          ) : selectedFilterType === 'PRICE' && isFilterModalOpen ? (
            <BlueDropDownIcon className="object-cover" width="100%" height="100%" />
          ) : (
            <DropDownIcon className="object-cover" width="100%" height="100%" />
          )}
        </div>
      </button>

      <button
        onClick={() => {
          handleIsSelfServiceClick()
          setSearchParams({ isSelfService: !searchState.isSelfService })
        }}
        className={
          isSelfService
            ? 'flex h-fit items-center gap-x-[0.375rem] rounded-[1.25rem] border border-blue-400 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
            : 'flex h-fit items-center gap-x-[0.375rem] rounded-[1.25rem] border border-gray-200 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
        }
      >
        <p className={isSelfService ? 'body-m text-blue-400' : 'body-m text-gray-500'}>24시 무인가게</p>
        <div className="relative h-[1.25rem] w-[1.25rem]">
          {isSelfService ? (
            <BlueClockIcon width={'100%'} height={'100%'} className="object-cover" />
          ) : (
            <GrayClockIcon width={'100%'} height={'100%'} className="object-cover" />
          )}
        </div>
      </button>

      <button
        onClick={() => {
          handleIsLunchBoxCakeClick()
          setSearchParams({ isLunchBoxCake: !searchState.isLunchBoxCake })
        }}
        className={
          isLunchBoxCake
            ? 'flex h-fit items-center gap-x-[0.375rem] rounded-[1.25rem] border border-blue-400 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
            : 'flex h-fit items-center gap-x-[0.375rem] rounded-[1.25rem] border border-gray-200 px-[0.75rem] py-[0.313rem] whitespace-nowrap'
        }
      >
        <p className={isLunchBoxCake ? 'body-m text-blue-400' : 'body-m text-gray-500'}>도시락 케이크</p>
        <div className="relative h-[1.25rem] w-[1.25rem]">
          {isLunchBoxCake ? (
            <BlueCakeIcon width={'100%'} height={'100%'} className="object-cover" />
          ) : (
            <GrayCakeIcon width={'100%'} height={'100%'} className="object-cover" />
          )}
        </div>
      </button>
    </section>
  )
}
export default FilterPanel
