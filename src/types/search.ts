import { PageNationType } from '@/types/common';

export type SortType = 'ACCURACY' | 'LATEST' | 'POPULARITY'
export interface StoreType {
  storeId: number;
  storeName: string;
  storeImageUrl: string;
  address: string;
  isSameDayOrder: boolean;
  isUnmanned: boolean;
  isLunchBoxCake: boolean;
  isLiked: boolean;
  likeCount: number;
  designImageUrlList: []
}
export interface DesignType {
  designId: number;
  designName: string;
  designImageUrl:  string;
  storeName: string;
  price: number;
  address:  string;
  isSameDayOrder: boolean;
  isLiked: boolean;
  likeCount: number;
}
export interface DesignListResponseType extends PageNationType {
  designList: DesignType[];
}
