import StoreProfile from '@/components/search/StoreProfile'
import StoreDetailMenu from '@/components/search/StoreDetailMenu'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import StoreReview from '@/components/search/StoreReview'
import StoreDesign from '@/components/search/StoreDesign'
import StoreInfo from '@/components/search/StoreInfo'
import { StoreDesignListResponseType, StoreDetailType } from '@/types/search'
import { useSearchStore } from '@/store/searchStore'
import { getStoreDetailData } from '@/api/searchAPI'
import { ResponseType } from '@/types/common'
import { useInfiniteStoreDesign } from '@/api/hooks/search/useInfiniteStoreDesign'
import { useOrderStore } from '@/store/orderStore'
import { DrawerContent, DrawerDescription, DrawerFooter, DrawerTitle } from '@/components/ui/drawer'
import Cookies from 'js-cookie'
interface Props {
  storeDetailMenu: '디자인' | '가게 정보' | '리뷰'
  setStoreDetailMenu: Dispatch<SetStateAction<'디자인' | '가게 정보' | '리뷰'>>
}

const StoreDetail = (props: Props) => {

}
export default StoreDetail
