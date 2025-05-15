import { create } from 'zustand/index'
import { SortType } from '@/types/search'

interface SearchStoreType {
  isLoading: boolean
  error: boolean | null
  pageParam: number
  count: number
  sortType: SortType
  keyword: string | null
  isSameDayOrder: boolean | null
  locationList: string[] | null
  startDate: string | null
  endDate: string | null
  minPrice: number | null
  maxPrice: number | null
  isLunchBoxCake: boolean | null
  isSelfService: boolean | null
  totalCount: number
  setSearchParams: (params: {
    isLoading?: boolean
    error?: boolean | null
    pageParam?: number
    count?: number
    sortType?: SortType
    keyword?: string | null
    isSameDayOrder?: boolean | null
    locationList?: string[] | null
    startDate?: string | null
    endDate?: string | null
    minPrice?: number | null
    maxPrice?: number | null
    isLunchBoxCake?: boolean | null
    isSelfService?: boolean | null
    totalCount?: number
  }) => void
}

export const useSearchStore = create<SearchStoreType>((set) => ({
  isLoading: false,
  error: null,
  //filter-state
  pageParam: 0,
  count: 6,
  sortType: 'ACCURACY',
  keyword: null,
  isSameDayOrder: null,
  locationList: null,
  startDate: null,
  endDate: null,
  minPrice: null,
  maxPrice: null,
  isLunchBoxCake: null,
  isSelfService: null,
  //data-state
  totalCount: 0,

  // 검색 조건 상태 업데이트 함수 추가
  setSearchParams: (params: {
    isLoading?: boolean
    error?: boolean | null
    pageParam?: number
    count?: number
    sortType?: SortType
    keyword?: string | null
    isSameDayOrder?: boolean | null
    locationList?: string[] | null
    startDate?: string | null
    endDate?: string | null
    minPrice?: number | null
    maxPrice?: number | null
    isLunchBoxCake?: boolean | null
    isSelfService?: boolean | null
    totalCount?: number
  }) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },

  storeSearch: () => {},
}))
