// hooks/useInfiniteDesignSearch.ts
import { searchDesign } from '@/api/searchAPI'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { SortType } from '@/types/search'

export const useInfiniteDesignSearch = (params: {
  pageParam?: number
  count: number
  sortType: SortType
  keyword?: string | null
  isSameDayOrder?: boolean | null
  locationList?: string[] | null
  startDate?: string | null
  endDate?: string | null
  minPrice?: number | null
  maxPrice?: number | null
  isLunchBoxCake?: boolean | null
  isSelfService?: boolean | null
}) => {
  const {
    pageParam,
    count,
    sortType,
    keyword,
    isSameDayOrder,
    isSelfService,
    isLunchBoxCake,
    endDate,
    startDate,
    maxPrice,
    minPrice,
    locationList,
  } = params

  const queryKey = useMemo(
    () => [
      'designSearch',
      pageParam,
      count,
      sortType,
      keyword,
      isSameDayOrder,
      isSelfService,
      isLunchBoxCake,
      endDate,
      startDate,
      maxPrice,
      minPrice,
      locationList,
    ],
    [
      pageParam,
      count,
      sortType,
      keyword,
      isSameDayOrder,
      isSelfService,
      isLunchBoxCake,
      endDate,
      startDate,
      maxPrice,
      minPrice,
      locationList,
    ]
  )

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      searchDesign({
        pageParam,
        count,
        sortType,
        keyword,
        isSameDayOrder,
        isSelfService,
        isLunchBoxCake,
        endDate,
        startDate,
        maxPrice,
        minPrice,
        locationList,
      }),
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage, allPages)
      const currentPage = lastPage.results.page
      const totalPages = Math.floor(lastPage.results.totalCount / 4)

      const hasMore = currentPage < totalPages - 1
      return hasMore ? currentPage + 1 : undefined
    },
    initialPageParam: 0,
  })
}
