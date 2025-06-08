import { WhiteCheckIcon } from '@/assets/svgComponents'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getDesignSearchResult } from '@/api/searchAPI'
import { useSearchStore } from '@/store/searchStore'
import { ResponseType } from '@/types/common'
import { DesignListResponseType } from '@/types/search'

interface Props {
  selectedPriceRanges: { minPrice: number | null; maxPrice: number | null }[]
  setSelectedPriceRanges: Dispatch<SetStateAction<{ minPrice: number | null; maxPrice: number | null }[]>>
  minPrice: number | null
  maxPrice: number | null
  setMinPrice: Dispatch<SetStateAction<null | number>>
  setMaxPrice: Dispatch<SetStateAction<null | number>>
  setHasUserSelectedPrice: Dispatch<SetStateAction<boolean>>
}

const PriceFilterContent = (props: Props) => {
  const { selectedPriceRanges, setSelectedPriceRanges, setMinPrice, setMaxPrice, minPrice, maxPrice, setHasUserSelectedPrice } = props
  // zustand 상태
  const keyword = useSearchStore((state) => state.keyword)
  const locationList = useSearchStore((state) => state.locationList)
  const startDate = useSearchStore((state) => state.startDate)
  const endDate = useSearchStore((state) => state.endDate)
  const isSameDayOrder = useSearchStore((state) => state.isSameDayOrder)
  const isLunchBoxCake = useSearchStore((state) => state.isLunchBoxCake)
  const isSelfService = useSearchStore((state) => state.isSelfService)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  const priceContents = [
    { content: '전체', minPrice: null, maxPrice: null },
    { content: '15,000원 이하', minPrice: 0, maxPrice: 15000 },
    { content: '15,000원 ~ 20,000원', minPrice: 15000, maxPrice: 20000 },
    { content: '20,000원 ~ 30,000원', minPrice: 20000, maxPrice: 30000 },
    { content: '40,000원 이상', minPrice: 40000, maxPrice: null },
  ]

  const togglePriceRange = (range: { minPrice: number | null; maxPrice: number | null }) => {
    const isAlreadySelected = selectedPriceRanges.some(
      (r) => r.minPrice === range.minPrice && r.maxPrice === range.maxPrice
    )

    if (range.minPrice === null && range.maxPrice === null) {
      // "전체" 선택 시: 전체 체크
      if (!isAlreadySelected) {
        setSelectedPriceRanges(priceContents) // 모두 선택
      } else {
        setSelectedPriceRanges([]) // 전체 해제
      }
    } else {
      if (isAlreadySelected) {
        // 다른 구간 해제 → "전체"도 해제
        setSelectedPriceRanges((prev) =>
          prev.filter(
            (r) =>
              !(r.minPrice === range.minPrice && r.maxPrice === range.maxPrice) &&
              !(r.minPrice === null && r.maxPrice === null)
          )
        )
      } else {
        // 추가 선택
        const newSelected = [...selectedPriceRanges, range]

        // 모든 구간이 다 선택되었는지 확인
        const isAllSelected = priceContents
          .filter((p) => p.minPrice !== null || p.maxPrice !== null) // "전체" 제외
          .every((p) => newSelected.some((r) => r.minPrice === p.minPrice && r.maxPrice === p.maxPrice))

        if (isAllSelected) {
          setSelectedPriceRanges(priceContents) // 전체 포함한 전부 선택
        } else {
          setSelectedPriceRanges(newSelected.filter((r) => r.minPrice !== null || r.maxPrice !== null)) // "전체" 제외
        }
      }
    }
  }

  useEffect(() => {
    if (selectedPriceRanges.length > 0) {
      setHasUserSelectedPrice(true)
    }

    const isAllSelected = selectedPriceRanges.some((r) => r.minPrice === null && r.maxPrice === null)

    if (isAllSelected) {
      // 전체가 선택된 경우
      setMinPrice(null)
      setMaxPrice(null)
    } else {
      // 개별 구간에서 최소/최대 계산
      const prices = selectedPriceRanges.flatMap((r) => [
        r.minPrice !== null ? r.minPrice : [],
        r.maxPrice !== null ? r.maxPrice : [],
      ])
      const numericPrices = prices.filter((p): p is number => typeof p === 'number')

      const minPrice = numericPrices.length ? Math.min(...numericPrices) : null
      const maxPrice = numericPrices.length ? Math.max(...numericPrices) : null

      setMinPrice(minPrice)
      setMaxPrice(maxPrice)
    }

    getDesignSearchResult({
      pageParam: 0,
      count: 4,
      sortType: 'ACCURACY',
      keyword: keyword,
      endDate: endDate,
      startDate: startDate,
      isSameDayOrder: isSameDayOrder,
      isLunchBoxCake: isLunchBoxCake,
      isSelfService: isSelfService,
      maxPrice: isAllSelected ? null : maxPrice,
      minPrice: isAllSelected ? null : minPrice,
      locationList: locationList,
    }).then((res: ResponseType<DesignListResponseType>) => {
      setSearchParams({ totalCount: res.results.totalCount })
    })
  }, [selectedPriceRanges])

  return (
    <div className="pb-[1.125rem]">
      {priceContents.map((priceContent) => {
        const isSelected = selectedPriceRanges.some(
          (r) => r.minPrice === priceContent.minPrice && r.maxPrice === priceContent.maxPrice
        )
        return (
          <button
            onClick={() => togglePriceRange(priceContent)}
            key={priceContent.content}
            className="flex items-center gap-x-[0.625rem] px-[1.5rem] py-[0.625rem]"
          >
            {isSelected ? (
              <div className="relative flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-blue-400">
                <WhiteCheckIcon width={20} height={20} />
              </div>
            ) : (
              <div className="h-[1rem] w-[1rem] rounded-full border border-gray-300" />
            )}
            <p className={isSelected ? 'title-l' : 'body-l-m text-gray-700'}>{priceContent.content}</p>
          </button>
        )
      })}
    </div>
  )
}
export default PriceFilterContent
