import { create } from 'zustand/index'
import {
  OrderFormDesignType,
  OrderFormRequestDetailType,
  OrderFormType,
  OrderMenuType,
  OrderType,
  QaDetailType,
} from '@/types/mypage'
import { ResponseType } from '@/types/common'
import { getMyOrder } from '@/api/mypageAPI'

interface OrderStoreType extends OrderFormType {
  isLoading: boolean
  error: null | boolean
  status: OrderMenuType
  selectedDesignUrl?: string | null
  selectedRequestDetailDesignUrl?: string | null
  selectedEventId: number | null
  selectedEventTitle: string | null,
  isOrderFormOpen: boolean
  isOrderOpen: boolean
  setState: (params: {
    status?: OrderMenuType
    storeId?: number | null
    designType?: OrderFormDesignType | null
    designId?: number | null
    selectedDesignUrl?: string | null
    selectedRequestDetailDesignUrl?: string | null
    requestDetailType?: OrderFormRequestDetailType | null
    requestDetailDesignId?: number | null
    selectedEventId?: number | null
    selectedEventTitle?: string | null
    answers?: QaDetailType[] | null
    isOrderFormOpen?: boolean
    isOrderOpen?: boolean
  }) => void
}

export const useOrderStore = create<OrderStoreType>((set) => ({
  isLoading: false,
  error: null,
  //filter-state
  status: 'PENDING',
  // 주문서 요청 데이터
  storeId: 1,
  designType: null,
  designId: null,
  requestDetailType: null,
  requestDetailDesignId: null,
  selectedDesignUrl: null,
  selectedRequestDetailDesignUrl: null,
  selectedEventId: null,
  selectedEventTitle: null,
  answers: null,
  //모달 오픈
  isOrderFormOpen: false,
  isOrderOpen: false,
  // 상태 업데이트 함수
  setState: (params: {
    status?: OrderMenuType
    storeId?: number | null
    designType?: OrderFormDesignType | null
    designId?: number | null
    selectedDesignUrl?: string | null
    //sdf
    requestDetailType?: OrderFormRequestDetailType | null
    requestDetailDesignId?: number | null
    selectedRequestDetailDesignUrl?: string | null
    selectedEventId?: number | null
    selectedEventTitle?: string | null,
    answers?: QaDetailType[] | null
    isOrderFormOpen?: boolean
    isOrderOpen?: boolean
  }) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
