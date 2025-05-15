import Cookies from 'js-cookie'
import { SortType } from '@/types/search'

/**
 * 디자인 통합 검색
 */
export const getDesignSearchResult = async ({
  pageParam = 0,
  count,
  sortType,
  keyword,
  isSameDayOrder,
  locationList,
  startDate,
  endDate,
  minPrice,
  maxPrice,
  isLunchBoxCake,
  isSelfService,
}: {
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
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/design/search`
  const queryParams = [
    `page=${pageParam}`,
    `count=${count}`,
    `sortType=${sortType}`,
    keyword ? `keyword=${keyword}` : '',
    isSameDayOrder ? `isSameDayOrder=${isSameDayOrder}` : '',
    startDate ? `startDate=${startDate}` : '',
    endDate ? `endDate=${endDate}` : '',
    minPrice ? `minPrice=${minPrice}` : '',
    maxPrice ? `maxPrice=${maxPrice}` : '',
    isLunchBoxCake ? `isLunchBoxCake=${isLunchBoxCake}` : '',
    isSelfService ? `isSelfService=${isSelfService}` : '',
    ...(locationList?.map((location) => {
      const trimmed = location.endsWith(' 전체') ? location.replace(' 전체', '') : location
      return `locationList=${encodeURIComponent(trimmed)}`
    }) || []),
  ]
    .filter(Boolean)
    .join('&')

  const fullUrl = `${baseUrl}?${queryParams}`

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 디자인 상세 불러오는 API
 */
export const getDesignDetailData = async (designId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/design/detail/${designId}`, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 가게 상세 불러오는 API
 */
export const getStoreDetailData = async (storeId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/detail/${storeId}`, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 가게/디자인 상세 불러오는 API
 */
export const getStoreDesignDetailData = async (
  pageParam: number,
  count: number,
  sizeName: string | null,
  storeId: number
) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/design/store/${storeId}`
  const queryParams = [`page=${pageParam}`, `count=${count}`, sizeName === '전체' ? '' : `sizeName=${sizeName}`]
    .filter(Boolean)
    .join('&')

  const fullUrl = `${baseUrl}?${queryParams}`
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}
