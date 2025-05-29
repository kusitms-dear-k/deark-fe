import { getStoreDesignDetailData } from '@/api/searchAPI'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useInfiniteStoreDesign = (params: {
  pageParam: number
  count: number
  sizeName: string
  storeId: number
}) => {
  const { pageParam, count, sizeName, storeId } = params

  const queryKey = useMemo(
    () => ['storeDesign', pageParam, count, sizeName, storeId],
    [pageParam, count, sizeName, storeId]
  )

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => getStoreDesignDetailData(pageParam, count, sizeName, storeId),
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage, allPages)
      const currentPage = lastPage.results.page
      const totalPages = Math.floor(lastPage.results.totalCount / 30)

      const hasMore = currentPage < totalPages - 1
      return hasMore ? currentPage + 1 : undefined
    },
    initialPageParam: 0,
  })
}
