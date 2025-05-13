import { WhiteCheckIcon } from '@/assets/svgComponents'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { searchDesign } from '@/api/searchAPI'
import { useSearchStore } from '@/store/search'
import { ResponseType } from '@/types/common'
import { DesignListResponseType } from '@/types/search'

interface Props {
  minPrice: null | number
  maxPrice: null | number
  setMinPrice: Dispatch<SetStateAction<null | number>>
  setMaxPrice: Dispatch<SetStateAction<null | number>>
}

const PriceFilterContent = (props: Props) => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = props
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

  useEffect(() => {
    searchDesign({
      pageParam: 0,
      count: 4,
      sortType: 'ACCURACY',
      keyword: keyword,
      endDate: endDate,
      startDate: startDate,
      isSameDayOrder: isSameDayOrder,
      isLunchBoxCake: isLunchBoxCake,
      isSelfService: isSelfService,
      maxPrice: maxPrice,
      minPrice: minPrice,
      locationList: locationList,
    }).then((res: ResponseType<DesignListResponseType>) => {
      setSearchParams({ totalCount: res.results.totalCount })
    })
  }, [minPrice, maxPrice])

  return (
    <div className="pb-[1.125rem]">
      {priceContents.map((priceContent) => {
        const isSelected = minPrice === priceContent.minPrice && maxPrice === priceContent.maxPrice
        return (
          <button
            onClick={() => {
              setMinPrice(priceContent.minPrice)
              setMaxPrice(priceContent.maxPrice)
              // 00 결과 보기 에서 00을 계산하는 코드
            }}
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
