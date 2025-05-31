import { create } from 'zustand/index'
import { SortType } from '@/types/search'

interface SearchStoreType {
  isLoading: boolean
  error: boolean | null
  pageParam: number
  count: number
  sortType: SortType
  searchMenu: '디자인' | '스토어'
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
  storeId: number
  designId: number
  sizeName: string
  isDesignDetailModalOpen: boolean
  isStoreDetailModalOpen: boolean
  isTotalSearchPageOpen: boolean
  setSearchParams: (params: {
    isLoading?: boolean
    error?: boolean | null
    pageParam?: number
    count?: number
    sortType?: SortType
    searchMenu?: '디자인' | '스토어'
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
    storeId?: number
    designId?: number
    sizeName?: string
    isDesignDetailModalOpen?: boolean
    isStoreDetailModalOpen?: boolean
    isTotalSearchPageOpen?: boolean
  }) => void
}

export const useSearchStore = create<SearchStoreType>((set) => ({
  isLoading: false,
  error: null,
  //filter-state
  pageParam: 0,
  count: 6,
  sortType: 'POPULARITY',
  searchMenu: '디자인',
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
  designId: 0,
  storeId: 0,
  sizeName: '전체',
  //modal 관련
  isDesignDetailModalOpen: false,
  isStoreDetailModalOpen: false,
  isTotalSearchPageOpen: false,

  // 검색 조건 상태 업데이트 함수 추가
  setSearchParams: (params: {
    isLoading?: boolean
    error?: boolean | null
    pageParam?: number
    count?: number
    sortType?: SortType
    searchMenu?: '디자인' | '스토어'
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
    designId?: number
    storeId?: number
    sizeName?: string
    isDesignDetailModalOpen?: boolean
    isStoreDetailModalOpen?: boolean
    isTotalSearchPageOpen?: boolean
  }) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
