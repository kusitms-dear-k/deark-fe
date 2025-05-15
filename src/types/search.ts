import { PageNationType } from '@/types/common'

export type SortType = 'ACCURACY' | 'LATEST' | 'POPULARITY'

export interface StoreType {
  storeId: number
  storeName: string
  storeImageUrl: string
  address: string
  isSameDayOrder: boolean
  isUnmanned: boolean
  isLunchBoxCake: boolean
  isLiked: boolean
  likeCount: number
  designImageUrlList: []
}

export interface DesignType {
  storeId: number
  designId: number
  designName: string
  designImageUrl: string
  storeName: string
  price: number
  address: string
  isSameDayOrder: boolean
  isLiked: boolean
  likeCount: number
}

export interface DesignDetailType {
  storeName: string
  designName: string
  designImageUrl: string
  description: string
  price: number
  isLiked: boolean
  likeCount: number
  sizeList: string[]
  creamList: string[]
  sheetList: string[]
}

export interface StoreDetailType {
  storeId: number
  storeName: string
  storeDescription: string
  storeImageUrl: string
  storeAddress: string
  isSameDayOrder: true
  is24hSelfService: false
  isLunchBoxCake: true
  isBookmarkedInEvent: false
  businessHours: BusinessHourType[]
  pickUpHours: PickUpHourType[]
  ownerName: string
  likeCount: number
  businessNumber: string
  sizeNameList: string[]
}

export interface PickUpHourType {
  dayName: string
  startTime: string
  endTime: string
}

export interface BusinessHourType {
  dayName: string
  openTime: string
  closeTime: string
}

export interface StoreDesignDetailType {
  designId: number
  designName: string
  designImageUrl: string
  storeName: string
  price: number
  isLiked: boolean
}

export interface DesignListResponseType extends PageNationType {
  designList: DesignType[]
}

export interface StoreDesignListResponseType extends PageNationType {
  designList: StoreDesignDetailType[]
}
